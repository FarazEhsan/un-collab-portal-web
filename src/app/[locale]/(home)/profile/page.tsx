"use client";
import React, {useEffect, useLayoutEffect, useState} from "react";
import SingleColumnContainer
    from "@/components/navigation/singleColumnContainer";
import RoundButton from "@/components/button/round-button";
import ProjectCard from "@/components/cards/project-card";
import Button from "@/components/button/Button";
import EditPersonalInfoSlideOver
    from "@/app/[locale]/(home)/profile/edit-personal-info-slide-over";
import EditContactInfoSlideOver
    from "@/app/[locale]/(home)/profile/edit-contact-info-slide-over";
import AddProjectSlideOver from "@/app/[locale]/(home)/profile/add-project-slide-over";
import {gql, useQuery} from "@apollo/client";
import CardSkeleton from "@/components/skeletons/card-skeleton";
import {useUser} from "@auth0/nextjs-auth0/client";
import UpdateGroupsSlideOver
    from "@/app/[locale]/(home)/profile/update-groups-slide-over";
import {getNameString} from "@/utils/extraFunctions";
import {useTranslations} from "next-intl";

const GET_USER_DETAILS = gql`
    query GetUserDetails($id: String!) {
      user(id: $id) {
        _id
        name
        firstName
        lastName
        userName
        email
        picture
        dob
        age
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
          pictures
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

const ProfilePage = () => {
    const {
        user: auth0User,
        error: auth0UserError,
        isLoading: auth0Loading,
    } = useUser();

    const t = useTranslations('ProfilePage');

    const {loading, error, data, refetch} = useQuery(GET_USER_DETAILS, {
        variables: {id: auth0User?.sub?.toString()},
    });

    const [openEditPersonalInfoSlideOver, setOpenEditPersonalInfoSlideOver] =
        useState(false);
    const [openEditContactInfoSlideOver, setOpenEditContactInfoSlideOver] =
        useState(false);
    const [openAddProjectSlideOver, setOpenAddProjectSlideOver] = useState(false);
    const [openUpdateGroupsSlideOver, setOpenUpdateGroupsSlideOver] = useState(false)
    const [nameString, setNameString] = useState('')

    // console.log(data)
    useEffect(() => {
        setNameString(getNameString(data?.user?.name));
    }, [data]);

    useLayoutEffect(() => {
        if (!auth0Loading) {
            console.log('calling refecth')
            refetch();
        }
    }, [auth0User, auth0Loading]);

    const handleUpdateProfile = () => {
        // Update the main profile data
        console.log("Updating profile through refetch");
        refetch();
    };

    return (
        <SingleColumnContainer>
            {loading ? (
                <CardSkeleton/>
            ) : (
                <div
                    className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                    <div>
                        <div className="flex flex-col items-center">
                            {
                                nameString && (
                                    <img
                                        src={data?.user?.picture ? data?.user?.picture : `https://ui-avatars.com/api/?name=${nameString}?background=random`}
                                        alt=""
                                        className="h-32 w-32 flex-none rounded-full bg-white dark:bg-gray-800 object-cover"
                                    />
                                )
                            }
                            <h2 className="mt-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100">
                                {data?.user?.name}
                            </h2>
                            <p className="text-gray-900 dark:text-gray-100">
                                {data?.user?.userName}
                            </p>
                            <div className="mt-2">
                                {data?.user?.facebook && (
                                    <RoundButton
                                        classNames="mx-1 bg-[#0866ff] hover:bg-[#478cfc]"
                                        profileURL={data?.user?.facebook}>
                                        {/*Facebook*/}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                        </svg>
                                    </RoundButton>
                                )}
                                {data?.user?.instagram && (
                                    <RoundButton
                                        classNames="mx-1 bg-[#d62976] hover:bg-[#cf4e87]"
                                        profileURL={data?.user?.instagram}>
                                        {/*Instagram*/}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </RoundButton>
                                )}
                                {data?.user?.linkedin && (
                                    <RoundButton
                                        classNames="mx-1 bg-[#0077b5] hover:bg-[#3d8ab3] "
                                        profileURL={data?.user?.linkedin}>
                                        {/*Linkedin*/}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                                        </svg>
                                    </RoundButton>
                                )}
                                {data?.user?.tiktok && (
                                    <RoundButton
                                        classNames="mx-1 bg-[#000] hover:bg-[#4f4e4e]"
                                        profileURL={data?.user?.tiktok}>
                                        {/*Tiktok*/}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                            className="h-4 w-4"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"
                                            />
                                        </svg>
                                    </RoundButton>
                                )}
                                {data?.user?.twitter && (
                                    <RoundButton
                                        classNames="mx-1 bg-[#000] hover:bg-[#4f4e4e]"
                                        profileURL={data?.user?.twitter}>
                                        {/*Twitter*/}
                                        <svg fill="currentColor"
                                             xmlns="http://www.w3.org/2000/svg"
                                             className="h-4 w-4"
                                             viewBox="0 0 448 512">
                                            <path
                                                d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                                        </svg>
                                    </RoundButton>
                                )}

                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row items-center">
                            <div>
                                <h2 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100">
                                    {t('sections.personalInfo.header.title')}
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-gray-500 ">
                                    {t('sections.personalInfo.header.subtitle')}
                                </p>
                            </div>
                            <Button
                                onClick={() =>
                                    setOpenEditPersonalInfoSlideOver(
                                        !openEditPersonalInfoSlideOver
                                    )
                                }
                                colorType="link"
                                classNames="ml-auto"
                            >
                                {t('buttons.update')}
                            </Button>
                        </div>
                        <dl className="mt-4 space-y-6 divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm leading-6">
                            {/*<div className="pt-6 sm:flex">*/}
                            {/*    <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Name</dt>*/}
                            {/*    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                            {/*        <div className="text-gray-900 dark:text-gray-100">Tom</div>*/}
                            {/*    </dd>*/}
                            {/*</div>*/}
                            {/*<div className="pt-6 sm:flex">*/}
                            {/*    <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Surname</dt>*/}
                            {/*    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                            {/*        <div className="text-gray-900 dark:text-gray-100">Cook</div>*/}
                            {/*    </dd>*/}
                            {/*</div>*/}
                            <div className="pt-6 sm:flex">
                                <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">
                                    {t('sections.personalInfo.fields.city')}
                                </dt>
                                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                    <div
                                        className="text-gray-900 dark:text-gray-100">
                                        {data?.user?.city}
                                    </div>
                                </dd>
                            </div>
                            <div className="pt-6 sm:flex">
                                <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">
                                    {t('sections.personalInfo.fields.country')}
                                </dt>
                                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                    <div
                                        className="text-gray-900 dark:text-gray-100">
                                        {data?.user?.country}
                                    </div>
                                </dd>
                            </div>
                            <div className="pt-6 sm:flex">
                                <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">
                                    {t('sections.personalInfo.fields.age')}
                                </dt>
                                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                    <div
                                        className="text-gray-900 dark:text-gray-100">
                                        {data?.user?.age}
                                    </div>
                                </dd>
                            </div>
                            {/*<div className="pt-6 sm:flex">*/}
                            {/*    <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Pronouns</dt>*/}
                            {/*    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                            {/*        <div className="text-gray-900 dark:text-gray-100">Him/He</div>*/}
                            {/*    </dd>*/}
                            {/*</div>*/}
                        </dl>
                    </div>
                    <div>
                        <div className="flex flex-row items-center">
                            <div>
                                <h2 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100">
                                    {t('sections.contactInfo.header.title')}
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-gray-500 ">
                                    {t('sections.contactInfo.header.subtitle')}
                                </p>
                            </div>
                            <Button
                                onClick={() =>
                                    setOpenEditContactInfoSlideOver(!openEditContactInfoSlideOver)
                                }
                                colorType="link"
                                classNames="ml-auto"
                            >
                                {t('buttons.update')}
                            </Button>
                        </div>
                        <dl className="mt-4 space-y-6 divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm leading-6">
                            <div className="pt-6 sm:flex">
                                <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">
                                    {t('sections.contactInfo.fields.email')}
                                </dt>
                                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                    <div
                                        className="text-gray-900 dark:text-gray-100">
                                        {data?.user?.email}
                                    </div>
                                </dd>
                            </div>
                            <div className="pt-6 sm:flex">
                                <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">
                                    {t('sections.contactInfo.fields.phone')}
                                </dt>
                                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                    <div
                                        className="text-gray-900 dark:text-gray-100">
                                        {data?.user?.contactNumber}
                                    </div>
                                </dd>
                            </div>
                        </dl>
                    </div>
                    {/*<div>*/}
                    {/*    <h2 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100">*/}
                    {/*        Social media Accounts*/}
                    {/*    </h2>*/}
                    {/*    <p className="mt-1 text-sm leading-6 text-gray-500 ">*/}
                    {/*        This information will be displayed publicly so be careful what you share.*/}
                    {/*    </p>*/}
                    {/*    <dl className="mt-4 space-y-6 divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm leading-6">*/}
                    {/*        <div className="pt-6 sm:flex">*/}
                    {/*            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Linkedin</dt>*/}
                    {/*            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                    {/*                <div className="text-gray-900 dark:text-gray-100">linkedin.com/tom-cook</div>*/}
                    {/*            </dd>*/}
                    {/*        </div>*/}
                    {/*        <div className="pt-6 sm:flex">*/}
                    {/*            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Facebook</dt>*/}
                    {/*            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                    {/*                <div className="text-gray-900 dark:text-gray-100">facebook.com/tom-cook</div>*/}
                    {/*            </dd>*/}
                    {/*        </div>*/}
                    {/*        <div className="pt-6 sm:flex">*/}
                    {/*            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Instagram</dt>*/}
                    {/*            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                    {/*                <div className="text-gray-900 dark:text-gray-100">instagram.com/tom-cook</div>*/}
                    {/*            </dd>*/}
                    {/*        </div>*/}
                    {/*        <div className="pt-6 sm:flex">*/}
                    {/*            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">X</dt>*/}
                    {/*            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                    {/*                <div className="text-gray-900 dark:text-gray-100">x.com/tom-cook</div>*/}
                    {/*            </dd>*/}
                    {/*        </div>*/}
                    {/*        <div className="pt-6 sm:flex">*/}
                    {/*            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">TikTok</dt>*/}
                    {/*            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                    {/*                <div className="text-gray-900 dark:text-gray-100">N/A</div>*/}
                    {/*            </dd>*/}
                    {/*        </div>*/}
                    {/*    </dl>*/}
                    {/*</div>*/}
                    <div>
                        <div className="flex flex-row items-center">
                            <div>
                                <h2 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100">
                                    {t('sections.groups.header.title')}
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-gray-500 ">
                                    {t('sections.groups.header.subtitle')}
                                </p>
                            </div>
                            <Button colorType="link" classNames="ml-auto"
                                    onClick={() => setOpenUpdateGroupsSlideOver(!openUpdateGroupsSlideOver)}>
                                {t('buttons.update')}
                            </Button>
                        </div>

                        <dl className="mt-4 space-y-6 divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm leading-6">
                            <div className="pt-6 sm:flex">
                                <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">
                                    {t('sections.groups.fields.primaryGroups')}
                                </dt>
                                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                    <ul>
                                        {data?.user?.groups?.map((group: any, index: number) => (
                                            <li
                                                key={index}
                                                className="text-gray-900 dark:text-gray-100"
                                            >
                                                {group?.name}
                                            </li>
                                        ))}
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div>
                        <div className="flex flex-row items-center">
                            <div>
                                <h2 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100">
                                    {t('sections.highlights.header.title')}
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-gray-500 ">
                                    {t('sections.highlights.header.subtitle')}
                                </p>
                            </div>
                            <Button
                                colorType="link"
                                classNames="ml-auto"
                                onClick={() =>
                                    setOpenAddProjectSlideOver(!openAddProjectSlideOver)
                                }
                            >
                                {t('buttons.add')}
                            </Button>
                            <AddProjectSlideOver
                                open={openAddProjectSlideOver}
                                setOpen={setOpenAddProjectSlideOver}
                                onUpdateProfile={handleUpdateProfile}
                                data={data?.user}
                            />
                        </div>

                        <div
                            className="grid xl:grid-cols-3 md:grid-cols-2 gap-4 mt-4">
                            {data?.user?.projects?.map((project: any) => {
                                return (
                                    <>
                                        <ProjectCard
                                            key={project._id}
                                            project={project}
                                            onUpdateProfile={handleUpdateProfile}
                                        />

                                    </>
                                );
                            })}
                        </div>

                        {/*<dl className="mt-4 space-y-6 divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm leading-6">*/}
                        {/*    <div className="pt-6 sm:flex">*/}
                        {/*        <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Project Name</dt>*/}
                        {/*        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                        {/*            <div className="text-gray-900 dark:text-gray-100">Example Project</div>*/}
                        {/*        </dd>*/}
                        {/*    </div>*/}
                        {/*    <div className="pt-6 sm:flex">*/}
                        {/*        <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Targeted SDGs</dt>*/}
                        {/*        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                        {/*            <ul>*/}
                        {/*                <li className="text-gray-900 dark:text-gray-100">No Poverty</li>*/}
                        {/*                <li className="text-gray-900 dark:text-gray-100">Zero Hunger</li>*/}
                        {/*                <li className="text-gray-900 dark:text-gray-100">Quality Education</li>*/}
                        {/*            </ul>*/}
                        {/*        </dd>*/}
                        {/*    </div>*/}
                        {/*    <div className="pt-6 sm:flex">*/}
                        {/*        <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Timeline</dt>*/}
                        {/*        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                        {/*        <div className="text-gray-900 dark:text-gray-100">01/01/2021 - 01/01/2023</div>*/}
                        {/*        </dd>*/}
                        {/*    </div>*/}
                        {/*    <div className="pt-6 sm:flex">*/}
                        {/*        <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Description</dt>*/}
                        {/*        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                        {/*            <div className="text-gray-900 dark:text-gray-100">Just a random description under 100 words</div>*/}
                        {/*        </dd>*/}
                        {/*    </div>*/}
                        {/*    <div className="pt-6 sm:flex">*/}
                        {/*        <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Key Achievements</dt>*/}
                        {/*        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                        {/*            <div className="text-gray-900 dark:text-gray-100">None</div>*/}
                        {/*        </dd>*/}
                        {/*    </div>*/}
                        {/*    <div className="pt-6 sm:flex">*/}
                        {/*        <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Partners</dt>*/}
                        {/*        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                        {/*            <div className="text-gray-900 dark:text-gray-100">Tom Chef</div>*/}
                        {/*        </dd>*/}
                        {/*    </div>*/}
                        {/*    <div className="pt-6 sm:flex">*/}
                        {/*        <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Method of monitoring and evaluation, reporting</dt>*/}
                        {/*        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                        {/*            <div className="text-gray-900 dark:text-gray-100">None</div>*/}
                        {/*        </dd>*/}
                        {/*    </div>*/}
                        {/*    <div className="pt-6 sm:flex">*/}
                        {/*        <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Pictures</dt>*/}
                        {/*        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">*/}
                        {/*            <div className="text-gray-900 dark:text-gray-100">None</div>*/}
                        {/*        </dd>*/}
                        {/*    </div>*/}
                        {/*</dl>*/}
                    </div>
                </div>
            )}

            {!loading && (
                <>
                    <EditPersonalInfoSlideOver
                        open={openEditPersonalInfoSlideOver}
                        setOpen={setOpenEditPersonalInfoSlideOver}
                        data={data?.user}
                        onUpdateProfile={handleUpdateProfile}
                    />
                    <EditContactInfoSlideOver
                        open={openEditContactInfoSlideOver}
                        setOpen={setOpenEditContactInfoSlideOver}
                        data={data?.user}
                        onUpdateProfile={handleUpdateProfile}
                    />
                    <UpdateGroupsSlideOver open={openUpdateGroupsSlideOver}
                                           data={[]}
                                           setOpen={setOpenUpdateGroupsSlideOver}
                                           onUpdateProfile={handleUpdateProfile}/>
                </>
            )}
        </SingleColumnContainer>
    );
};

export default ProfilePage;
