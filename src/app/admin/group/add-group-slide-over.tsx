import React, { Fragment, SetStateAction, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Input from "@/components/form/Input";
import Button from "@/components/button/Button";
import { gql, useMutation } from "@apollo/client";
// @ts-ignore
import Joi from "joi-browser";
import { useJoiForm } from "@/hooks/useJoiForm";
import { Schema } from "joi";

interface SlideOverProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  handleGroupAdded: () => void;
}

const groupSchema: Schema = Joi.object({
  name: Joi.string().required().max(55).label("Group Title"),
  description: Joi.string().required().label("Description"),
});

export default function AddGroupSlideOver({ open, setOpen, handleGroupAdded }: SlideOverProps) {
  const groupInfo = {
    name: "",
    description: ""
  };


  const {
    data: formData,
    errors,
    handleChange,
    handleSubmit,
  } = useJoiForm(groupInfo, groupSchema);

  const ADD_NEW_Group = gql`
    mutation AddNewGroup(
      $name: String!
      $description: String!
    ) {
        createGroup(
        createGroupInput: {
          name: $name
          description: $description
        }
      ) {
         name
         description
      }
    }`;

  const [addNewGroup, { data: newGroup, loading, error }] =
    useMutation(ADD_NEW_Group);



  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("calling handle submin");
    handleSubmit(e, postData);
    
  };

  const postData = async () => {
    const variables = {
      name: formData.name,
      description: formData.description,
    };

    await addNewGroup({ variables: variables })
    handleGroupAdded();
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
                          Add New Group
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
                    <form onSubmit={onSubmit}>
                      <div>
                        <div className="px-8">
                          <div>
                            <Input
                              label="Group Title"
                              name="name"
                              type="text"
                              value={formData?.name}
                              onChange={handleChange}
                              error={errors?.name}
                              placeholder="Group Title"
                            />
                          </div>
                          <div className="mt-4">
                            <Input
                              label="Description"
                              name="description"
                              type="text"
                              value={formData?.description}
                              onChange={handleChange}
                              error={errors?.code}
                              placeholder="Description"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex-shrink-0 border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
                        <div className="flex justify-end space-x-3">
                          <Button
                            onClick={() => setOpen(false)}
                            colorType="secondary"
                          >
                            Cancel
                          </Button>
                          <Button type="submit">Create</Button>
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
