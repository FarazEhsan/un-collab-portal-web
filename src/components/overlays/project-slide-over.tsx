import React, {Fragment, SetStateAction, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import CarouselModal from "@/components/modals/carousel-modal";
import Button from "@/components/button/Button";
import EditProjectSlideOver from "@/app/(home)/profile/edit-project-slide-over";
import Badge from "@/components/badge";
import {Project} from "@/components/cards/project-card";

interface SlideOverProps {
    open: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>>,
    project: Project
    onUpdateProfile: () => void
}

export default function ProjectSlideOver({
                                             open,
                                             setOpen,
                                             project,
                                             onUpdateProfile
                                         }: SlideOverProps) {
    const [openCarouselModal, setOpenCarouselModal] = useState(false);
    const [openEditProjectSlideOver, setOpenEditProjectSlideOver] = useState(false);

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
                                                    Project Details
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
                                            <div className="pb-1 sm:pb-6">
                                                <div>
                                                    <div
                                                        className="flex justify-end mb-2">
                                                        <Button colorType="link"
                                                                onClick={() => setOpenEditProjectSlideOver(!openEditProjectSlideOver)}>Edit</Button>
                                                    </div>
                                                    {
                                                        project?.pictures ? (
                                                            <div
                                                                onClick={() => setOpenCarouselModal(!openCarouselModal)}
                                                                className="relative h-40 sm:h-56 cursor-pointer">
                                                                <img
                                                                    src={project?.pictures[0]}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                                <CarouselModal
                                                                    open={openCarouselModal}
                                                                    images={project?.pictures}
                                                                    setOpen={setOpenCarouselModal}/>
                                                            </div>
                                                        ) : (
                                                            ''
                                                        )
                                                    }

                                                    <div
                                                        className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                                                        <div
                                                            className="sm:flex-1">
                                                            <div>
                                                                <div
                                                                    className="flex items-center">
                                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">
                                                                        {project?.name}
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="px-4 pb-5 pt-5 sm:px-0 sm:pt-0">
                                                <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-200 sm:w-40 sm:flex-shrink-0">
                                                            Timeline
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2">
                                                            <p>
                                                                {project?.startTime} - {project?.endTime}
                                                            </p>
                                                        </dd>
                                                    </div>
                                                    <div>

                                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-200 sm:w-40 sm:flex-shrink-0">
                                                            Description
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2">
                                                            <p>
                                                                {project?.description}
                                                            </p>
                                                        </dd>
                                                    </div>
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-200 sm:w-40 sm:flex-shrink-0">
                                                            Targeted SDGs
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2">
                                                            <ul>
                                                                {project?.relatedSDGs?.map((sdg, index) => (
                                                                    <Badge
                                                                        key={index}
                                                                        text={sdg?.name}
                                                                        classNames="mr-2 my-1"/>
                                                                ))}
                                                            </ul>
                                                        </dd>
                                                    </div>
                                                    {/*<div>*/}
                                                    {/*    <dt className="text-sm font-medium text-gray-500 dark:text-gray-200 sm:w-40 sm:flex-shrink-0">Key*/}
                                                    {/*        Achievements*/}
                                                    {/*    </dt>*/}
                                                    {/*    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 dark:text-gray-100">None</dd>*/}
                                                    {/*</div>*/}
                                                    {/*<div>*/}
                                                    {/*    <dt className="text-sm font-medium text-gray-500 dark:text-gray-200 sm:w-40 sm:flex-shrink-0">Partners</dt>*/}
                                                    {/*    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2">*/}
                                                    {/*        Tom Chef*/}
                                                    {/*    </dd>*/}
                                                    {/*</div>*/}
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                    <EditProjectSlideOver open={openEditProjectSlideOver}
                                          data={project}
                                          onUpdateProfile={onUpdateProfile}
                                          setOpen={setOpenEditProjectSlideOver}/>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
