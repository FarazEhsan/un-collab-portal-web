import React, {Fragment, SetStateAction, useRef} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import Input from "@/components/form/Input";
import Button from "@/components/button/Button";
import {gql, useMutation} from "@apollo/client";
// @ts-ignore
import Joi from "joi-browser";
import {useJoiForm} from "@/hooks/useJoiForm";
import getManagementApiToken from "@/utils/auth0token";
import {Schema} from "joi";

interface SlideOverProps {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    handleUserAdded: () => void;
}

const userInfoSchema: Schema = Joi.object({
    firstName: Joi.string().required().max(55).label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().label("Email"),
});

export default function AddUserSlideOver({
                                             open,
                                             setOpen,
                                             handleUserAdded
                                         }: SlideOverProps) {
    const userInfo = {
        firstName: "",
        lastName: "",
        email: "",
    };

    const userAuth0Info = useRef<any>(null);
    const {
        data: formData,
        errors,
        handleChange,
        handleSubmit,
    } = useJoiForm(userInfo, userInfoSchema);

    const ADD_NEW_USER = gql`
    mutation AddNewUser(
      $_id: ID!
      $name: String!
      $firstName: String!
      $lastName: String!
      $userName: String!
      $email: String!
    ) {
      createUser(
        createUserInput: {
          _id: $_id
          name: $name
          firstName: $firstName
          lastName: $lastName
          userName: $userName
          email: $email
        }
      ) {
        _id
        name
        firstName
        lastName
        userName
        email
      }
    }`;

    const [addNewUser, {data: newUser, loading, error}] =
        useMutation(ADD_NEW_USER);

    async function submitFormToAuth0() {
        let userJson = null;

        //1- Get the token
        const token = await getManagementApiToken();
        console.log("Token", token);

        //2- Create the user
        const userRes = await fetch(
            "https://dev-huxjkvfkb5f36hh4.us.auth0.com/api/v2/users",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    email: formData.email,
                    connection: "Username-Password-Authentication",
                    password: "Falcon_303303",
                }),
            }
        );
        console.log("User Response", userRes.status);

        if (userRes.status === 409) {
            console.log("User already exists");
        } else if (userRes.status === 201) {
            // 1- Get the roles and Assign role to the userI
            // 2- Send email to the user to reset password

            userJson = await userRes.json();
            console.log("User Json", userJson);
            const userId = userJson.user_id;
            console.log("User Id", userId);
            const rolesRes = await fetch(
                "https://dev-huxjkvfkb5f36hh4.us.auth0.com/api/v2/roles",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            if (rolesRes.status === 200) {
                const rolesJson = await rolesRes.json();
                console.log("Roles Json", rolesJson);

                const userRole = rolesJson.filter(
                    (role: { name: string }) => role.name === "user"
                );
                console.log("User Role", userRole);
                const userRoleRes = await fetch(
                    `https://dev-huxjkvfkb5f36hh4.us.auth0.com/api/v2/users/${userId}/roles`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            roles: [userRole[0].id],
                        }),
                    }
                );
                console.log("User Role Response", userRoleRes.status);
                if (userRoleRes.status === 200) {
                    console.log("User Role Assigned");
                }
            }

            const userPasswordResetRes = await fetch(
                "https://dev-huxjkvfkb5f36hh4.us.auth0.com/dbconnections/change_password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        client_id: process.env.AUTH0_CLIENT_ID,
                        email: formData.email,
                        connection: "Username-Password-Authentication",
                    }),
                }
            );

            console.log("User Password Reset Response", userPasswordResetRes.status);
            if (userPasswordResetRes.status === 200) {
                //const userPasswordResetJson = await userPasswordResetRes.json()

                console.log("Password reset link sent", userPasswordResetRes);
                return userJson;
            }
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const auth0Response = await submitFormToAuth0();
        userAuth0Info.current = auth0Response;
        console.log("Auth0 Response", userAuth0Info.current);
        if (userAuth0Info.current) {
            console.log("calling handle submin");
            handleSubmit(e, postData);
        }
    };

    const postData = async () => {
        console.log(" User info for mongo submission", userInfo);

        //TODO: Implement

        const variables = {
            _id: userAuth0Info?.current.user_id,
            name: formData.firstName + " " + formData.lastName,
            firstName: formData.firstName,
            lastName: formData.lastName,
            userName: userAuth0Info?.current.nickname,
            email: formData.email,
        };

        await addNewUser({variables: variables})
        handleUserAdded();
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
                                                    Add User
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
                                                            label="First Name"
                                                            name="firstName"
                                                            type="text"
                                                            value={formData?.firstName}
                                                            onChange={handleChange}
                                                            error={errors?.firstName}
                                                            placeholder="First Name"
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input
                                                            label="Last Name"
                                                            name="lastName"
                                                            type="text"
                                                            value={formData?.lastName}
                                                            onChange={handleChange}
                                                            error={errors?.lastName}
                                                            placeholder="Last Name"
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input
                                                            label="Email"
                                                            name="email"
                                                            type="text"
                                                            value={formData?.email}
                                                            onChange={handleChange}
                                                            error={errors?.email}
                                                            placeholder="user@email.com"
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
                                                        type="submit">Create</Button>
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
