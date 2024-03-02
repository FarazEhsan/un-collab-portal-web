// @ts-ignore
import Joi from "joi-browser";
import React, {Fragment, SetStateAction, useEffect, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import Input from "@/components/form/Input";
import Button from "@/components/button/Button";
import TextArea from "@/components/form/TextArea";
import ComboBox from "@/components/form/combo-box";
import {gql, useMutation, useQuery} from "@apollo/client";
import uploadImage from "@/utils/azureblobupload";
import {FileInput} from "flowbite-react";

interface SlideOverProps {
    open: boolean;
    data: any
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    onUpdateProfile: () => void;
}

const projectInfoSchema = {
    name: Joi.string().required().max(55),
    startTime: Joi.date().iso().required(),
    endTime: Joi.string(),
    description: Joi.string().required().max(1000),
    relatedSDGs: Joi.array().min(1).required(),
};

const GET_ALL_SDG = gql`
  query GetAllSDGS {
    allsdgs {
      id
      name
    }
  }
`;

const UPDATE_PROJECT = gql`
    mutation UpdateProject(
  $_id: String!
    $name: String!
    $startTime: String!
    $endTime: String
    $relatedSDGs: [String!]
    $description: String!
    $pictures: [String!]
) {
  updateProject(
    id: $_id
    updateProjectInput: {
      name: $name
      startTime: $startTime
      endTime: $endTime
      description: $description
      relatedSDGs: $relatedSDGs
      pictures: $pictures
    }
  ) {
    _id
    name
    description
    startTime
    endTime
    pictures
    relatedSDGs {
      id
      name
    }
  }
}

  `;

export default function EditProjectSlideOver({
                                                 open,
                                                 data,
                                                 onUpdateProfile,
                                                 setOpen,
                                             }: SlideOverProps) {
    const {
        loading: sdgLoading,
        error: sdgError,
        data: sdgData,
    } = useQuery(GET_ALL_SDG);

    const [updateProject, {data: updatedProject, loading, error}] =
        useMutation(UPDATE_PROJECT);

    const [projectInfo, setProductInfo] = useState({
        name: data.name,
        startTime: data?.startTime,
        endTime: data?.endTime,
        description: data?.description,
        relatedSDGs: [...data?.relatedSDGs],
        // user: "",
    });
    const [errors, setErrors] = useState({
        name: null,
        startTime: null,
        endTime: null,
        description: null,
        relatedSDGs: null,
        //user: null,
    });
    const [relatedSDGs, setRelatedSDGs] = useState([]);
    const [files, setFiles] = useState<Array<File>>([]);

    useEffect(() => {
        const sdgs = data?.relatedSDGs?.map((sdg: any) => {
                return sdg?.id
            }
        )
        setRelatedSDGs(sdgs);
    }, []);

    // useEffect(() => {
    //     console.log('Related SDGs was updated, new value is: ', relatedSDGs)
    // }, [relatedSDGs]);

    const validateForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = Joi.validate(projectInfo, projectInfoSchema, {
            abortEarly: false,
        });
        // console.log("result from joi", result);
        const {error} = result;
        if (!error) {
            postData();
        } else {
            const errorData = {
                name: null,
                startTime: null,
                endTime: null,
                description: null,
                relatedSDGs: null,
                // user: null,
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

    const handleElementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type} = e.target;
        // console.log("name: " + name + " and  value: " + value);
        // console.log("type is", type);
        let errorData = {...errors};
        const errorMessage = validateProperty(e);
        if (errorMessage) {
            // @ts-ignore
            errorData[name] = errorMessage;
        } else {
            // @ts-ignore
            delete errorData[name];
        }
        let projectData = {...projectInfo};
        // @ts-ignore
        projectData[name] = value;
        setProductInfo(projectData);
        setErrors(errorData);
    };

    const validateProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const obj = {[name]: value};
        // @ts-ignore
        const subSchema = {[name]: projectInfoSchema[name]};
        const result = Joi.validate(obj, subSchema);
        const {error} = result;
        return error ? error.details[0].message : null;
    };

    const handleFileChange = (e: any) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    }
    const postData = async () => {
        let uploadedFiles: String[] = []
        const variables =
            {
                _id: data?._id,
                name: projectInfo.name,
                startTime: projectInfo.startTime,
                endTime: projectInfo.endTime,
                description: projectInfo.description,
                relatedSDGs: relatedSDGs,
            }
        if (files) {
            uploadedFiles = await Promise.all(files.map((file: any) => {
                return uploadImage('dynamicfile', file)
            }))
            // @ts-ignore
            if (uploadedFiles?.length) variables.pictures = uploadedFiles
        }

        await updateProject({variables: variables})
        onUpdateProfile()
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
                                        className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-800 shadow-xl">
                                        <div className="px-4 py-6 sm:px-6">
                                            <div
                                                className="flex items-start justify-between">
                                                <h2
                                                    id="slide-over-heading"
                                                    className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100"
                                                >
                                                    Edit Project
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
                                                <div className="px-8">
                                                    <div>
                                                        <Input
                                                            label="Title"
                                                            name="name"
                                                            type="text"
                                                            value={projectInfo?.name}
                                                            onChange={handleElementChange}
                                                            error={errors?.name}
                                                            placeholder="Project Title"
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input
                                                            label="Project Start Date"
                                                            name="startTime"
                                                            type="date"
                                                            value={projectInfo?.startTime}
                                                            onChange={handleElementChange}
                                                            error={errors?.startTime}
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input
                                                            label="Project End Date"
                                                            name="endTime"
                                                            type="date"
                                                            value={projectInfo?.endTime}
                                                            onChange={handleElementChange}
                                                            error={errors?.endTime}
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        {!sdgLoading && (
                                                            <ComboBox
                                                                multiple={true}
                                                                items={sdgData?.allsdgs}
                                                                selectedData={relatedSDGs}
                                                                setSelectedData={setRelatedSDGs}
                                                                label="SDGs"
                                                                name="relatedSDGs"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="mt-4">
                                                        <TextArea
                                                            label="Description"
                                                            name="description"
                                                            placeholder="A short description of your project"
                                                            value={projectInfo?.description}
                                                            error={errors?.description}
                                                            onChange={handleElementChange}
                                                        />
                                                    </div>
                                                    <div id="fileUpload"
                                                         className="mt-4">
                                                        <div
                                                            className="mb-2 block">
                                                            <label
                                                                htmlFor='attachments'
                                                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                                                                Attachments
                                                            </label>
                                                        </div>
                                                        <FileInput
                                                            id="attachments"
                                                            multiple
                                                            accept='image/*'
                                                            onChange={handleFileChange}
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
