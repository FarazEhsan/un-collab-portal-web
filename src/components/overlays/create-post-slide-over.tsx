'use client'
import React, {ChangeEvent, Fragment, SetStateAction, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import Input from "@/components/form/Input";
import 'react-quill/dist/quill.snow.css';
import {useUser} from "@auth0/nextjs-auth0/client";
import Button from "@/components/button/Button";
import TextArea from "@/components/form/TextArea";
import {FileInput} from "flowbite-react";
import useSocket from "@/hooks/useSocketClient";
// @ts-ignore
import Joi from 'joi-browser'
import  {Schema} from "joi";
import {useJoiForm} from "@/hooks/useJoiForm";
import uploadImage from '@/utils/azureblobupload';
interface SlideOverProps {
    open: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>>,
    onNewPostCreated: () => void;
}

const postSchema: Schema = Joi.object({
    title: Joi.string().required().label('Title'),
    description: Joi.string().required().label('Description')
});


export default function CreatePostSlideOver({open, setOpen, onNewPostCreated}: SlideOverProps) {
    const {user, error, isLoading} = useUser();
    const socket = useSocket();
    useEffect(()=>{
        if(socket)
        socket.emit('findAllForumEvents');
    })

    const postData = {
        title: '',
        description: '',
    }

    const [files, setFiles] = useState<Array<File>>([]);

    const { data: formData, errors, handleChange, handleSubmit } = useJoiForm(
        postData,
        postSchema
    );

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(e, sendData)


        setOpen(false);
    }



    const sendData = async () => {
        let uploadedFiles: String[]= []
        if(files){
            uploadedFiles= await Promise.all(files.map((file:any)=>{
                return uploadImage('dynamicfile', file)
            }))
        }

        socket?.emit('postTopic', {"title": formData.title, "description": formData.description, "author": user?.sub, "images":uploadedFiles});
    }

    const handleFileChange = (e: any) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
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
                            className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16 ">
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
                                    className="pointer-events-auto w-screen max-w-2xl ">
                                    <form
                                        onSubmit={onSubmit}
                                        className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-900 shadow-xl">
                                        <div className="flex-1">
                                            {/* Header */}
                                            <div
                                                className="bg-gray-50 dark:bg-gray-800 px-4 py-6 sm:px-6">
                                                <div
                                                    className="flex items-start justify-between space-x-3">
                                                    <div className="space-y-1">
                                                        <Dialog.Title
                                                            className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100">
                                                            New post
                                                        </Dialog.Title>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            Get started by
                                                            filling in the
                                                            information below to
                                                            create your new
                                                            post.
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="relative text-gray-400 hover:text-gray-500"
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

                                            {/* Divider container */}
                                            <div>
                                                <div className="mx-6 my-4">
                                                    <Input label="Title"
                                                           name="title"
                                                           required={true}
                                                           onChange={handleChange}
                                                           value={formData?.title}
                                                           error={errors?.title}
                                                    />
                                                </div>
                                                <div className="mx-6 my-4">
                                                    <TextArea
                                                        label="Description"
                                                        name="description"
                                                        onChange={handleChange}
                                                        value={formData?.description}
                                                        error={errors?.description}
                                                    />
                                                </div>
                                                <div id="fileUpload"
                                                     className="mx-6 my-4">
                                                    <div className="mb-2 block">
                                                        <label
                                                            htmlFor='attachments'
                                                            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                                                            Attachments
                                                        </label>
                                                    </div>
                                                    <FileInput id="attachments"
                                                               className='ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-custom-teal dark:focus:ring-custom-teal'
                                                               multiple
                                                               accept='image/*'
                                                               onChange={handleFileChange}
                                                    />
                                                </div>

                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div
                                            className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                                            <div
                                                className="flex justify-end space-x-3">
                                                <Button type="button"
                                                        colorType="secondary"
                                                        onClick={() => setOpen(false)}>Cancel</Button>
                                                <Button
                                                    type="submit">Create</Button>
                                            </div>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
