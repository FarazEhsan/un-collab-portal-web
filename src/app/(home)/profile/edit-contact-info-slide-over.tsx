'use client'
import React, {Fragment, SetStateAction, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import Input from "@/components/form/Input";
import Button from "@/components/button/Button";
// @ts-ignore
import Joi from "joi-browser";

interface SlideOverProps {
    open: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>>
    data: any
}

const contactInfoSchema = {
    email: Joi.string().email().required(),
    contactNumber: Joi.string()
        .length(10)
        .required(),
    facebook: Joi.string()
        .min(3),
    instagram: Joi.string()
        .min(3),
    linkedin: Joi.string()
        .min(3),
    tiktok: Joi.string()
        .min(3),
    twitter: Joi.string()
        .min(3),
}
export default function EditContactInfoSlideOver({
                                                     open,
                                                     setOpen,
                                                     data
                                                 }: SlideOverProps) {
    const [contactInfo, setContactInfo] = useState({
        email: data?.email,
        contactNumber: data?.contactNumber,
        facebook: data?.facebook,
        instagram: data?.instagram,
        linkedin: data?.linkedin,
        tiktok: data?.tiktok,
        twitter: data?.twitter
    });
    const [errors, setErrors] = useState({
        email: null, linkedin: null, contactNumber: null, facebook: null,
        instagram: null, twitter: null, tiktok: null,
    });

    const validateForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = Joi.validate(contactInfo, contactInfoSchema, {abortEarly: false});
        // console.log(result);

        const {error} = result;

        if (!error) {
            postData();
        } else {
            const errorData = {
                email: null, linkedin: null, contactNumber: null, facebook: null,
                instagram: null, twitter: null, tiktok: null,
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

    const handleSave = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        let errorData = {...errors};
        const errorMessage = validateProperty(e);
        if (errorMessage) {
            // @ts-ignore
            errorData[name] = errorMessage;
        } else {
            // @ts-ignore
            delete errorData[name];
        }
        let contactData = {...contactInfo};
        // @ts-ignore
        contactData[name] = value;
        setContactInfo(contactData);
        setErrors(errorData);
    };

    const validateProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const obj = {[name]: value};
        // @ts-ignore
        const subSchema = {[name]: contactInfoSchema[name]};
        const result = Joi.validate(obj, subSchema);
        const {error} = result;
        return error ? error.details[0].message : null;
    };

    const postData = () => {
        console.log(contactInfo);
        //TODO: Implement
    }

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
                    <div
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel
                                    className="pointer-events-auto w-screen max-w-md">
                                    <div
                                        className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-800 shadow-xl">
                                        <div className="px-4 py-6 sm:px-6">
                                            <div
                                                className="flex items-start justify-between">
                                                <h2 id="slide-over-heading"
                                                    className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100">
                                                    Edit Contact Info
                                                </h2>
                                                <div
                                                    className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative rounded-md bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400 focus-visible:outline-0"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span
                                                            className="absolute -inset-2.5"/>
                                                        <span
                                                            className="sr-only">Close panel</span>
                                                        <XMarkIcon
                                                            className="h-6 w-6"
                                                            aria-hidden="true"/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Main */}
                                        <form onSubmit={validateForm}>
                                            <div>
                                                <div
                                                    className="px-8">

                                                    <div>
                                                        <Input label="Email"
                                                               name="email"
                                                               type="email"
                                                               value={contactInfo?.email}
                                                               onChange={handleSave}
                                                               error={errors?.email}
                                                               placeholder="tomcook@example.com"/>
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input label="Phone"
                                                               name="contactNumber"
                                                               value={contactInfo?.contactNumber}
                                                               onChange={handleSave}
                                                               error={errors?.contactNumber}
                                                               placeholder="0123456789"/>
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input label="Facebook"
                                                               name="facebook"
                                                               value={contactInfo?.facebook}
                                                               onChange={handleSave}
                                                               error={errors?.facebook}
                                                               placeholder="www.facebook.com/tom-cook"/>
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input label="Instagram"
                                                               name="instagram"
                                                               value={contactInfo?.instagram}
                                                               onChange={handleSave}
                                                               error={errors?.instagram}
                                                               placeholder="www.instagram.com/tom-cook"/>
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input label="Twitter"
                                                               name="twitter"
                                                               value={contactInfo?.twitter}
                                                               onChange={handleSave}
                                                               error={errors?.twitter}
                                                               placeholder="www.twitter.com/tom-cook"/>
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input label="TikTok"
                                                               name="tiktok"
                                                               value={contactInfo?.tiktok}
                                                               onChange={handleSave}
                                                               error={errors?.tiktok}
                                                               placeholder="www.tiktok.com/tom-cook"/>
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input label="Linkedin"
                                                               name="linkedin"
                                                               value={contactInfo?.linkedin}
                                                               onChange={handleSave}
                                                               error={errors?.linkedin}
                                                               placeholder="www.linkedin.com/tom-cook"/>
                                                    </div>

                                                </div>
                                            </div>
                                            <div
                                                className="mt-4 flex-shrink-0 border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                                                <div
                                                    className="flex justify-end space-x-3">
                                                    <Button
                                                        onClick={() => setOpen(false)}
                                                        colorType="secondary">Cancel</Button>
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
    )
}
