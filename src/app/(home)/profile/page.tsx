"use client";
import React, { useState } from "react";
import SingleColumnContainer from "@/components/navigation/singleColumnContainer";
import RoundButton from "@/components/button/round-button";
import ProjectCard, { Project } from "@/components/cards/project-card";
import Button from "@/components/button/Button";
import EditPersonalInfoSlideOver from "@/app/(home)/profile/edit-personal-info-slide-over";
import EditContactInfoSlideOver from "@/app/(home)/profile/edit-contact-info-slide-over";
import AddProjectSlideOver from "@/app/(home)/profile/add-project-slide-over";
import { gql, useQuery } from "@apollo/client";
import CardSkeleton from "@/components/skeletons/card-skeleton";

const ProfilePage = () => {
  const [openEditPersonalInfoSlideOver, setOpenEditPersonalInfoSlideOver] =
    useState(false);
  const [openEditContactInfoSlideOver, setOpenEditContactInfoSlideOver] =
    useState(false);
  const [openAddProjectSlideOver, setOpenAddProjectSlideOver] = useState(false);

  const GET_USER_DETAILS = gql`
    query GetUserDetails {
      user(id: "6592a7f6b3d29da97f359cc3") {
        _id
        name
        userName
        email
        contactNumber
        city
        country
        dob
        age
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
          name
          description
          startTime
          endTime
          relatedSDGs {
            name
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_USER_DETAILS);

  const [profileData, setProfileData] = useState(data);

  const handleUpdateProfile = (updatedData: any) => {
    // Update the main profile data
    setProfileData(updatedData);
  };

  return (
    <SingleColumnContainer>
      {loading ? (
        <CardSkeleton />
      ) : (
        <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
          <div>
            <div className="flex flex-col items-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                className="h-32 w-32 flex-none rounded-full bg-white dark:bg-gray-800 object-cover"
              />
              <h2 className="mt-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100">
                {data?.user?.name}
              </h2>
              <p className="text-gray-900 dark:text-gray-100">
                {data?.user?.userName}
              </p>
              <div className="mt-2">
                {data?.user?.facebook && (
                  <RoundButton classNames="mx-1 bg-[#0866ff] hover:bg-[#478cfc]">
                    {/*Facebook*/}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </RoundButton>
                )}
                {data?.user?.instagram && (
                  <RoundButton classNames="mx-1 bg-[#d62976] hover:bg-[#cf4e87]">
                    {/*Instagram*/}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </RoundButton>
                )}
                {data?.user?.linkedin && (
                  <RoundButton classNames="mx-1 bg-[#0077b5] hover:bg-[#3d8ab3]">
                    {/*Linkedin*/}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </RoundButton>
                )}
                {data?.user?.tiktok && (
                  <RoundButton classNames="mx-1 bg-[#000] hover:bg-[#4f4e4e]">
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
                  <RoundButton classNames="mx-1 bg-[#1DA1F2] hover:bg-[#6bc4fa]">
                    {/*Twitter*/}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </RoundButton>
                )}
                {data?.user?.contactNumber && (
                  <RoundButton classNames="mx-1 bg-[#25d366] hover:bg-[#69cf8f]">
                    {/*Whatsapp*/}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
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
                  Personal Info
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-500 ">
                  This information will be displayed publicly so be careful what
                  you share.
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
                Update
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
                  City
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900 dark:text-gray-100">
                    {data?.user?.city}
                  </div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">
                  Country
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900 dark:text-gray-100">
                    {data?.user?.country}
                  </div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">
                  Age
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900 dark:text-gray-100">
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
                  Contact Info
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-500 ">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
              <Button
                onClick={() =>
                  setOpenEditContactInfoSlideOver(!openEditContactInfoSlideOver)
                }
                colorType="link"
                classNames="ml-auto"
              >
                Update
              </Button>
            </div>
            <dl className="mt-4 space-y-6 divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm leading-6">
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">
                  Email
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900 dark:text-gray-100">
                    {data?.user?.email}
                  </div>
                </dd>
              </div>
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">
                  Phone/Whatsapp
                </dt>
                <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                  <div className="text-gray-900 dark:text-gray-100">
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
                  Groups
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-500 ">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
              <Button colorType="link" classNames="ml-auto">
                Update
              </Button>
            </div>

            <dl className="mt-4 space-y-6 divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm leading-6">
              <div className="pt-6 sm:flex">
                <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">
                  Primary Groups
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
                  Highlights
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-500 ">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
              <Button
                colorType="link"
                classNames="ml-auto"
                onClick={() =>
                  setOpenAddProjectSlideOver(!openAddProjectSlideOver)
                }
              >
                Add
              </Button>
              <AddProjectSlideOver
                open={openAddProjectSlideOver}
                setOpen={setOpenAddProjectSlideOver}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              {data?.user?.projects?.map((project: any) => {
                return (
                  <ProjectCard
                    name={project.name}
                    description={project.description}
                    startTime={project.startTime}
                    endTime={project.endTime}
                    relatedSDGs={project.relatedSDGs}
                  />
                );
              })}
              {/* <ProjectCard />
              <ProjectCard />
              <ProjectCard /> */}
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
          />
          <EditContactInfoSlideOver
            open={openEditContactInfoSlideOver}
            setOpen={setOpenEditContactInfoSlideOver}
            data={data?.user}
            onUpdateProfile={handleUpdateProfile}
          />
        </>
      )}
    </SingleColumnContainer>
  );
};

export default ProfilePage;
