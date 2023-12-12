"use client"
import React, {useState} from 'react';
import Link from "next/link";
import {useRouter} from "next/navigation";

const LoginForm = () => {
    const router = useRouter();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(prevState => ({...prevState, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //TODO: Remove log
        console.log(credentials);

        try {
            //TODO: implement
            router.push('/home')
        } catch (error) {
            //TODO: Remove log
            console.log(error);
        }
    }

    return (
        <form className="space-y-6"
              onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email"
                       className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        onChange={handleChange}
                        className="block w-full rounded-md
                                                border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                                                focus:ring-2 focus:ring-inset focus:ring-custom-teal sm:text-sm sm:leading-6
                                                dark:bg-gray-800 dark:ring-gray-700 dark:focus:ring-custom-teal"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="password"
                       className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                    Password
                </label>
                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm
                                                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                                                focus:ring-2 focus:ring-inset focus:ring-custom-teal sm:text-sm sm:leading-6
                                                dark:bg-gray-800 dark:ring-gray-700 dark:focus:ring-custom-teal"
                    />
                </div>
            </div>

            <div
                className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-custom-teal focus:ring-custom-teal
                                                dark:bg-gray-800 dark:border-gray-700 dark:text-custom-teal dark:focus:ring-custom-teal"
                    />
                    <label htmlFor="remember-me"
                           className="ml-3 block text-sm leading-6 text-gray-700 dark:text-gray-400">
                        Remember me
                    </label>
                </div>

                <div className="text-sm leading-6">
                    <Link href="#"
                          className="font-semibold text-custom-blue hover:text-custom-teal">
                        Forgot password?
                    </Link>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-custom-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-custom-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-blue"
                >
                    Sign in
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
