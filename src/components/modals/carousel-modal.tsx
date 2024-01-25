import React, {Fragment, SetStateAction} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import {Carousel} from "flowbite-react";

interface CarouselModalProps {
    open: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>>,
    images: any[]
}

export default function CarouselModal({
                                          open,
                                          setOpen,
                                          images
                                      }: CarouselModalProps) {

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                    <div
                        className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="h-screen w-full relative transform overflow-auto bg-black p-0 text-left shadow-xl transition-all">
                                <div
                                    className="absolute z-10 right-0 top-0 pr-4 pt-4 sm:block">
                                    <button
                                        type="button"
                                        className="rounded-md text-white hover:text-gray-500 focus:outline-none"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6"
                                                   aria-hidden="true"/>
                                    </button>
                                </div>
                                <div
                                    className="h-screen w-full flex items-center justify-center">
                                    <div className="h-5/6 w-5/6 mx-auto">


                                        {
                                            images?.length && (
                                                <Carousel slide={false}>
                                                    {
                                                        images.map((image: string) => (
                                                            <img
                                                                src={image}
                                                                className="h-full w-full object-contain"
                                                            />
                                                        ))
                                                    }
                                                </Carousel>
                                            )
                                        }


                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
