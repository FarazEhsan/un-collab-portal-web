"use client";
import React, {Fragment, SetStateAction} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import Input from "@/components/form/Input";
import Button from "@/components/button/Button";
// @ts-ignore
import Joi from "joi-browser";
import {gql, useMutation} from "@apollo/client";
import {Schema} from "joi";
import {useJoiForm} from "@/hooks/useJoiForm";

interface SlideOverProps {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    data: any;
    onUpdateProfile: () => void; // Callback function to update the main profile
}

const contactInfoSchema: Schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    contactNumber: Joi.string().required().label("Contact Number"),
    facebook: Joi.string().label("Facebook").allow(""),
    instagram: Joi.string().label("Instagram").allow(""),
    linkedin: Joi.string().label("Linkedin").allow(""),
    tiktok: Joi.string().label("TikTok").allow(""),
    twitter: Joi.string().label("Twitter").allow(""),
});
export default function EditContactInfoSlideOver({
                                                     open,
                                                     setOpen,
                                                     data,
                                                     onUpdateProfile,
                                                 }: SlideOverProps) {
    const contactInfo = {
        email: data?.email,
        contactNumber: data?.contactNumber,
        facebook: data?.facebook,
        instagram: data?.instagram,
        linkedin: data?.linkedin,
        tiktok: data?.tiktok,
        twitter: data?.twitter,
    };

    const {data: formData, errors, handleChange, handleSubmit} = useJoiForm(
        contactInfo,
        contactInfoSchema
    );

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(e, postData);

    };

    const UPDATE_CONTACT_INFO = gql`
    mutation UpdateContactInfo(
      $userid: String!
      $email: String
      $contactNumber: String
      $facebook: String
      $twitter: String
      $instagram: String
      $tiktok: String
      $linkedin: String
    ) {
      updateUser(
        id: $userid
        updateUserInput: {
          email: $email
          contactNumber: $contactNumber
          facebook: $facebook
          twitter: $twitter
          instagram: $instagram
          tiktok: $tiktok
          linkedin: $linkedin
        }
      ) {
        _id
        name
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

    const [updateContact, {data: updatedData, loading, error}] =
        useMutation(UPDATE_CONTACT_INFO);

    const postData = async () => {
        console.log(contactInfo);

        //TODO: Implement

        const variables = {
            userid: data?._id,
            email: formData.email,
            contactNumber: formData.contactNumber,
            facebook: formData.facebook,
            twitter: formData.twitter,
            instagram: formData.instagram,
            tiktok: formData.tiktok,
            linkedin: formData.linkedin,
        };
        console.log("whats with the variables?", variables);

        await updateContact({variables: variables});
        console.log("Update data adter contact update", data);

        onUpdateProfile();
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
                                        className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-900 shadow-xl">
                                        <div className="px-4 py-6 sm:px-6">
                                            <div
                                                className="flex items-start justify-between">
                                                <h2
                                                    id="slide-over-heading"
                                                    className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100"
                                                >
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
                                        <form onSubmit={onSubmit}>
                                            <div>
                                                <div className="px-8">
                                                    <div>
                                                        <Input
                                                            label="Email"
                                                            name="email"
                                                            type="email"
                                                            value={formData?.email}
                                                            onChange={handleChange}
                                                            error={errors?.email}
                                                            placeholder="tomcook@example.com"
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input
                                                            label="Phone"
                                                            name="contactNumber"
                                                            value={formData?.contactNumber}
                                                            onChange={handleChange}
                                                            error={errors?.contactNumber}
                                                            placeholder="0123456789"
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input
                                                            label="Facebook"
                                                            name="facebook"
                                                            value={formData?.facebook}
                                                            onChange={handleChange}
                                                            error={errors?.facebook}
                                                            placeholder="www.facebook.com/tom-cook"
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input
                                                            label="Instagram"
                                                            name="instagram"
                                                            value={formData?.instagram}
                                                            onChange={handleChange}
                                                            error={errors?.instagram}
                                                            placeholder="www.instagram.com/tom-cook"
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input
                                                            label="Twitter"
                                                            name="twitter"
                                                            value={formData?.twitter}
                                                            onChange={handleChange}
                                                            error={errors?.twitter}
                                                            placeholder="www.twitter.com/tom-cook"
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input
                                                            label="TikTok"
                                                            name="tiktok"
                                                            value={formData?.tiktok}
                                                            onChange={handleChange}
                                                            error={errors?.tiktok}
                                                            placeholder="www.tiktok.com/tom-cook"
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input
                                                            label="Linkedin"
                                                            name="linkedin"
                                                            value={formData?.linkedin}
                                                            onChange={handleChange}
                                                            error={errors?.linkedin}
                                                            placeholder="www.linkedin.com/tom-cook"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="mt-4 flex-shrink-0 border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                                                <div
                                                    className="flex justify-end space-x-3">
                                                    <Button
                                                        onClick={() => setOpen(false)}
                                                        colorType="secondary"
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        type="submit">Update</Button>
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
