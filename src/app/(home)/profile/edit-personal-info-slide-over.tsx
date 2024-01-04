import React, { Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Input from "@/components/form/Input";
import Button from "@/components/button/Button";
// @ts-ignore
import Joi from "joi-browser";
import { gql, useMutation } from "@apollo/client";

interface SlideOverProps {
  open: boolean;
  data: any;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

const personalInfoSchema = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dob: Joi.date().required(),
  country: Joi.string().min(3),
  city: Joi.string().min(3),
};
export default function EditPersonalInfoSlideOver({
  open,
  data,
  setOpen,
}: SlideOverProps) {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: data?.firstName,
    lastName: data?.lastName,
    dob: data?.dob,
    country: data?.country,
    city: data?.city,
  });
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    dob: null,
    country: null,
    city: null,
  });

  const validateForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = Joi.validate(personalInfo, personalInfoSchema, {
      abortEarly: false,
    });
    // console.log(result);

    const { error } = result;

    if (!error) {
      postData();
    } else {
      const errorData = {
        firstName: null,
        lastName: null,
        dob: null,
        country: null,
        city: null,
      };
      for (let item of error.details) {
        const name = item.path[0];
        // @ts-ignore
        errorData[name] = item.message;
      }
      // console.log(errors);
      setErrors(errorData);
      return errorData;
    }
  };

  const handleElementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let errorData = { ...errors };
    const errorMessage = validateProperty(e);
    if (errorMessage) {
      // @ts-ignore
      errorData[name] = errorMessage;
    } else {
      // @ts-ignore
      delete errorData[name];
    }
    let personalData = { ...personalInfo };
    // @ts-ignore
    personalData[name] = value;
    setPersonalInfo(personalData);
    setErrors(errorData);
  };

  const validateProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const obj = { [name]: value };
    // @ts-ignore
    const subSchema = { [name]: personalInfoSchema[name] };
    const result = Joi.validate(obj, subSchema);
    const { error } = result;
    return error ? error.details[0].message : null;
  };

  const UPDATE_PERSONAL_INFO = gql`
    mutation UpdateContactInfo(
      $userid: String!
      $firstName: String
      $lastName: String
      $dob: String
      $country: String
      $city: String
    ) {
      updateUser(
        id: $userid
        updateUserInput: {
          firstName: $firstName
          lastName: $lastName
          dob: $dob
          country: $country
          city: $city
        }
      ) {
        _id
        name
        firstName
        lastName
        userName
        email
        contactNumber
        city
        country
        dob
        age
        facebook
        twitter
        instagram
        tiktok
        linkedin
        skills {
          name
        }
        groups {
          name
          description
        }
      }
    }
  `;

  const [updatePersonal, { data: updatedData, loading, error }] =
    useMutation(UPDATE_PERSONAL_INFO);

    const dob = new Date(personalInfo?.dob);
    const formattedDob = dob.toISOString().split('T')[0];

  const postData = async () => {
    console.log(personalInfo);

    //TODO: Implement

    const variables = {
      userid: "6592a7f6b3d29da97f359cc3",
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      dob: personalInfo.dob,
      country: personalInfo.country,
      city: personalInfo.city,
    };
    console.log("whats with the variables?", variables);

    await updatePersonal({ variables: variables });
    console.log("Update data adter personal update", data);

    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-800 shadow-xl">
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2
                          id="slide-over-heading"
                          className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100"
                        >
                          Edit Personal Info
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400 focus-visible:outline-0"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Main */}
                    <form onSubmit={validateForm}>
                      <div>
                        <div className="px-8">
                          <div>
                            <Input
                              label="First Name"
                              name="firstName"
                              placeholder={personalInfo.firstName}
                              value={personalInfo?.firstName}
                              onChange={handleElementChange}
                              error={errors?.firstName}
                            />
                          </div>
                          <div className="mt-4">
                            <Input
                              label="Last Name"
                              name="lastName"
                              placeholder={personalInfo.lastName}
                              value={personalInfo?.lastName}
                              onChange={handleElementChange}
                              error={errors?.lastName}
                            />
                          </div>
                          <div className="mt-4">
                         
                            <Input
                              label="Date of Birth"
                              name="dob"
                              type="date"
                              onChange={handleElementChange}
                              error={errors?.dob}
                              value={formattedDob}
                            />
                          </div>
                          <div className="mt-4">
                            <Input
                              label="Country"
                              name="country"
                              placeholder={personalInfo.country}
                              value={personalInfo?.country}
                              onChange={handleElementChange}
                              error={errors?.country}
                            />
                          </div>
                          <div className="mt-4">
                            <Input
                              label="City"
                              name="city"
                              placeholder={personalInfo.city}
                              value={personalInfo?.city}
                              onChange={handleElementChange}
                              error={errors?.city}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                        <div className="flex justify-end space-x-3">
                          <Button
                            onClick={() => setOpen(false)}
                            colorType="secondary"
                          >
                            Cancel
                          </Button>
                          <Button type="submit">Update</Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
