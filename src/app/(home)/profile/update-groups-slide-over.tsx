import React, {Fragment, SetStateAction, useEffect, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import Button from "@/components/button/Button";
// @ts-ignore
import Joi from "joi-browser";
import {gql, useQuery} from "@apollo/client";
import ComboBox from "@/components/form/combo-box";

interface SlideOverProps {
    open: boolean;
    data: any;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    onUpdateProfile: () => void;
}

const GET_ALL_GROUPS = gql`
    query GetAllGroups{
    allgroups{
    _id
    name
    description
    
  }
}
  `;

export default function UpdateGroupsSlideOver({
                                                  open,
                                                  data,
                                                  setOpen,
                                                  onUpdateProfile
                                              }: SlideOverProps) {
    const {
        loading,
        error,
        data: groupsData,
        refetch
    } = useQuery(GET_ALL_GROUPS);

    const [comboBoxData, setComboBoxData] = useState<Array<any>>([])
    const [selectedGroups, setSelectedGroups] = useState<Array<any>>([])

    useEffect(() => {
        const g = groupsData?.allgroups?.map((item: any) => (
            {
                id: item._id,
                name: item.name
            }
        ))
        // console.log('filtered groups data', g)
        if (g) setComboBoxData([...g])
    }, [groupsData]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: implement onSubmit
        console.log(selectedGroups)
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
                                        className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-900 shadow-xl">
                                        <div className="px-4 py-6 sm:px-6">
                                            <div
                                                className="flex items-start justify-between">
                                                <h2
                                                    id="slide-over-heading"
                                                    className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100"
                                                >
                                                    Update groups
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
                                                    <ComboBox
                                                        label='Groups'
                                                        multiple
                                                        items={comboBoxData}
                                                        selectedData={selectedGroups}
                                                        setSelectedData={setSelectedGroups}
                                                    />
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
