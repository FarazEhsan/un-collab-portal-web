import React, {Fragment, SetStateAction} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import Input from "@/components/form/Input";
import Button from "@/components/button/Button";

interface SlideOverProps {
    open: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>>
}

const data = {
    heroImage: 'https://source.unsplash.com/random',
    title: 'ProjectCard Title',
    sdgs: ['sdg1', 'sdg2', 'sdg3', 'sdg3', 'sdg3', 'sdg3', 'sdg3', 'sdg3', 'sdg3', 'sdg3'],
    timeline: {from: '01/01/2021', to: '01/01/2023'},
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consectetur faucibus tortor, id finibus lectus auctor in. Vivamus luctus iaculis dui, id posuere eros congue aliquam. In lobortis gravida iaculis. Vestibulum at ultricies arcu, eu scelerisque sem. Praesent in massa bibendum, egestas libero a, dignissim urna. Duis in mollis est. Nunc feugiat ipsum cursus urna vestibulum, sed fermentum eros mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
}

export default function EditPersonalInfoSlideOver({open, setOpen}: SlideOverProps) {
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
                                                    Edit Personal Info
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
                                        <div>
                                            <div
                                                className="px-8">
                                                <div>
                                                    <Input label="First Name"
                                                           name="firstName"
                                                           placeholder="Tom"/>
                                                </div>
                                                <div className="mt-4">
                                                    <Input label="Last Name"
                                                           name="lastName"
                                                           placeholder="Cook"/>
                                                </div>
                                                <div className="mt-4">
                                                    <Input label="Age"
                                                           name="age"
                                                           placeholder="99"/>
                                                </div>
                                                <div className="mt-4">
                                                    <Input label="Country"
                                                           name="country"
                                                           placeholder="USA"/>
                                                </div>
                                                <div className="mt-4">
                                                    <Input label="City"
                                                           name="city"
                                                           placeholder="California"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="mt-4 flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <div
                                                className="flex justify-end space-x-3">
                                                <Button onClick={() => setOpen(false)} colorType="secondary">Cancel</Button>
                                                <Button>Create</Button>
                                            </div>
                                        </div>
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
