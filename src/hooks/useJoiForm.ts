import { useState, ChangeEvent, FormEvent } from 'react';
// @ts-ignore
import Joi from "joi-browser";
// @ts-ignore
import { Schema, ValidationResult } from 'joi-browser';

interface FormState {
  [key: string]: string | undefined;
}

interface FormErrors {
  [key: string]: string | undefined;
}

export function useJoiForm(initialState: FormState, schema: Schema) {
  const [data, setData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): FormErrors | null => {
    const options = { abortEarly: false };
    const { error }: ValidationResult = Joi.validate(data, schema, options);
    if (!error) return null;

    const errors: FormErrors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };



  const validateProperty = ({ name, value }: { name: string; value: string }) => {
    const fieldSchema = schema._inner.children.find((child: any) => child.key === name)?.schema;
  
    if (!fieldSchema) {
      console.log("No schema for", name);
      return null;
    }
  
    const { error }: ValidationResult = fieldSchema.validate(value);
    return error ? error.details[0].message : null;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    console.log('handle change called', input.name, input.value)
  
    const newData = { ...data, [input.name]: input.value };
    //@ts-ignore
    const errorMessage = validateProperty({ name: input.name, value: newData[input.name] });
  
    setData(newData);
  
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      if (errorMessage) newErrors[input.name] = errorMessage;
      else delete newErrors[input.name];
      return newErrors;
    });
  };

  const handleSubmit = (e: FormEvent,callback: () => void ) => {
    e.preventDefault();

    const errors = validateForm();
    setErrors(errors || {});
    if (errors) return;

    // Call the server
    console.log("Submitted");
    callback()
  };

  return {
    data,
    errors,
    handleChange,
    handleSubmit
  };
}