// @ts-ignore
import Joi from "joi-browser";
import React, {Fragment, SetStateAction, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import Input from "@/components/form/Input";
import Button from "@/components/button/Button";
import {gql, useMutation} from "@apollo/client";
import {useJoiForm} from "@/hooks/useJoiForm";
import {Schema} from "joi";
import {FileInput} from "flowbite-react";
import uploadImage from "@/utils/azureblobupload";
import noProfilePictureImage from '../../../../public/no-profile-picture.jpg'

interface SlideOverProps {
    open: boolean;
    data: any;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    onUpdateProfile: () => void;
}

const personalInfoSchema: Schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    dob: Joi.date().required().label("Date of Birth"),
    country: Joi.string().min(3).label("Country"),
    city: Joi.string().min(3).label("City"),
    picture: Joi.string().label("Picture").allow(null)
});

const UPDATE_PERSONAL_INFO = gql`
    mutation UpdateContactInfo(
      $userid: String!
      $firstName: String
      $lastName: String
      $dob: String
      $country: String
      $city: String
      $picture: String
    ) {
      updateUser(
        id: $userid
        updateUserInput: {
          firstName: $firstName
          lastName: $lastName
          dob: $dob
          country: $country
          city: $city
          picture: $picture
        }
      ) {
        _id
        name
        firstName
        lastName
        userName
        email
        contactNumber
        city
        country
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
        projects {
          _id
          name
          description
          startTime
          endTime
          relatedSDGs {
            id
            name
          }
        }
      }
    }
  `;

export default function EditPersonalInfoSlideOver({
                                                      open,
                                                      data,
                                                      setOpen,
                                                      onUpdateProfile
                                                  }: SlideOverProps) {
    const [updatePersonal, {data: updatedData, loading, error}] =
        useMutation(UPDATE_PERSONAL_INFO);

    const [photo, setPhoto] = useState<File>()
    const [photoURL, setPhotoURL] = useState(data?.picture ? data?.picture : noProfilePictureImage.src);

    const personalInfo = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        dob: data?.dob,
        country: data?.country,
        city: data?.city,
        picture: data?.picture
    };
    const dob = personalInfo.dob ? new Date(personalInfo?.dob) : new Date();
    const formattedDob = dob.toISOString().split('T')[0];

    const {data: formData, errors, handleChange, handleSubmit} = useJoiForm(
        personalInfo,
        personalInfoSchema
    );
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(e, postData);
    };

    const postData = async () => {
        // console.log(personalInfo);
        let variables = {
            userid: data._id,
            firstName: formData.firstName,
            lastName: formData.lastName,
            dob: formData.dob,
            country: formData.country,
            city: formData.city,
            picture: ""
        };

        if (photo) {
            // console.log('uploading photo', photo)
            variables.picture = await uploadImage('dynamicfile', photo);
            await updatePersonal({variables: variables});
        } else {
            await updatePersonal({variables: variables});
        }
        // console.log("whats with the variables?", variables);
        // console.log("Update data adter personal update", data);
        onUpdateProfile()
        setOpen(false);
    };

    const handleFileChange = (e: any) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
            setPhotoURL(URL.createObjectURL(e.target.files[0]))
        } else setPhotoURL(noProfilePictureImage.src)
        // console.log(photo)
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
                                        <form onSubmit={onSubmit}>
                                            <div>
                                                <div className="px-8">
                                                    <div>
                                                        <label
                                                            htmlFor='profilePicture'
                                                            className="mb-2 block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                                                            Photo
                                                        </label>
                                                        <div
                                                            className="flex justify-center items-center mb-4">
                                                            <img
                                                                className="h-20 w-20 rounded-full object-cover"
                                                                // src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                src={photoURL}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <FileInput
                                                            id="picture"
                                                            accept='image/*'
                                                            onChange={handleFileChange}
                                                            name="picture"

                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input
                                                            label="First Name"
                                                            name="firstName"
                                                            placeholder={personalInfo.firstName}
                                                            value={formData?.firstName}
                                                            onChange={handleChange}
                                                            error={errors?.firstName}
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input
                                                            label="Last Name"
                                                            name="lastName"
                                                            placeholder={personalInfo.lastName}
                                                            value={formData?.lastName}
                                                            onChange={handleChange}
                                                            error={errors?.lastName}
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input
                                                            label="Date of Birth"
                                                            name="dob"
                                                            type="date"
                                                            onChange={handleChange}
                                                            error={errors?.dob}
                                                            value={formData?.dob}
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input
                                                            label="Country"
                                                            name="country"
                                                            placeholder={personalInfo.country}
                                                            value={formData?.country}
                                                            onChange={handleChange}
                                                            error={errors?.country}
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input
                                                            label="City"
                                                            name="city"
                                                            placeholder={personalInfo.city}
                                                            value={formData?.city}
                                                            onChange={handleChange}
                                                            error={errors?.city}
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
