import {ExclamationCircleIcon} from '@heroicons/react/20/solid';
import {ChangeEventHandler, FocusEventHandler} from "react";
import {classNames} from "@/utils/extraFunctions";

interface InputProps {
    label: string,
    type?: string,
    name: string,
    className?: string,
    placeholder?: string,
    value?: string | number,
    error?: string | null | undefined,
    onChange?: ChangeEventHandler,
    onFocus?: FocusEventHandler,
    required?: boolean,
}

export default function Input(
    {
        label = 'Label',
        type = 'text',
        name = 'Name',
        className,
        placeholder = 'Placeholder',
        value,
        error,
        onChange,
        onFocus,
        required = false,

    }: InputProps
) {
    return (
        <div className={className}>
            <label htmlFor={name}
                   className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                {label}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <input
                    type={type}
                    name={name}
                    id={name}
                    onChange={onChange}
                    onFocus={onFocus}
                    required={required}
                    className={classNames(error ?
                            'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500 dark:text-red-700 dark:ring-red-900 dark:placeholder:text-red-800'
                            :
                            'text-gray-900 ring-gray-300 dark:text-gray-50 dark:ring-gray-500 placeholder:text-gray-300 dark:placeholder:text-gray-400 focus:ring-custom-teal dark:focus:ring-custom-teal',
                        'block w-full dark:bg-gray-700 rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6')}
                    placeholder={placeholder}
                    value={value}
                />
                {
                    error && (
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ExclamationCircleIcon
                                className="h-5 w-5 text-red-500 dark:text-red-800"
                                aria-hidden="true"/>
                        </div>
                    )
                }
            </div>
            {
                error && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-700"
                       id={`${name}-error`}>
                        {error}
                    </p>
                )
            }
        </div>
    );
}
