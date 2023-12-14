import React from 'react';
import SingleColumnContainer from "@/components/navigation/singleColumnContainer";

const ProfilePage = () => {
    return (
        <SingleColumnContainer>
            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
                <div>
                    <div className="flex flex-col items-center">
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                            className="h-32 w-32 flex-none rounded-full bg-white dark:bg-gray-800 object-cover"
                        />
                        <h2 className="mt-4 text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100">
                            Tom Cook
                        </h2>
                        <p
                            className="text-gray-900 dark:text-gray-100">He/Him
                        </p>
                    </div>
                </div>
                <div>
                <h2 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100">
                        Personal Info
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500 ">
                        This information will be displayed publicly so be careful what you share.
                    </p>
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
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">City</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900 dark:text-gray-100">California</div>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Country</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900 dark:text-gray-100">USA</div>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Age</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900 dark:text-gray-100">50</div>
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
                    <h2 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100">
                        Contact Info
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500 ">
                        This information will be displayed publicly so be careful what you share.
                    </p>
                    <dl className="mt-4 space-y-6 divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm leading-6">
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Email</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900 dark:text-gray-100">tom.cook@example.com</div>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Phone/Whatsapp</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900 dark:text-gray-100">0123456778</div>
                            </dd>
                        </div>
                    </dl>
                </div>
                <div>
                    <h2 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100">
                        Social media Accounts
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500 ">
                        This information will be displayed publicly so be careful what you share.
                    </p>
                    <dl className="mt-4 space-y-6 divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm leading-6">
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Linkedin</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900 dark:text-gray-100">linkedin.com/tom-cook</div>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Facebook</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900 dark:text-gray-100">facebook.com/tom-cook</div>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Instagram</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900 dark:text-gray-100">instagram.com/tom-cook</div>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">X</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900 dark:text-gray-100">x.com/tom-cook</div>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">TikTok</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900 dark:text-gray-100">N/A</div>
                            </dd>
                        </div>
                    </dl>
                </div>
                <div>
                    <h2 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100">
                        Groups
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500 ">
                        This information will be displayed publicly so be careful what you share.
                    </p>
                    <dl className="mt-4 space-y-6 divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm leading-6">
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Primary Groups</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <ul>
                                <li className="text-gray-900 dark:text-gray-100">Youth Advisory Board</li>
                                <li className="text-gray-900 dark:text-gray-100">Youth 2030 Cities Alumni</li>
                                <li className="text-gray-900 dark:text-gray-100">Young Gamechangers</li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
                <div>
                    <h2 className="text-lg font-semibold leading-7 text-gray-900 dark:text-gray-100">
                        Highlights
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500 ">
                        This information will be displayed publicly so be careful what you share.
                    </p>
                    <dl className="mt-4 space-y-6 divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm leading-6">
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Project Name</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900 dark:text-gray-100">Example Project</div>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Targeted SDGs</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <ul>
                                    <li className="text-gray-900 dark:text-gray-100">No Poverty</li>
                                    <li className="text-gray-900 dark:text-gray-100">Zero Hunger</li>
                                    <li className="text-gray-900 dark:text-gray-100">Quality Education</li>
                                </ul>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Timeline</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-900 dark:text-gray-100">01/01/2021 - 01/01/2023</div>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Description</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900 dark:text-gray-100">Just a random description under 100 words</div>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Key Achievements</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900 dark:text-gray-100">None</div>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Partners</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900 dark:text-gray-100">Tom Chef</div>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Method of monitoring and evaluation, reporting</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900 dark:text-gray-100">None</div>
                            </dd>
                        </div>
                        <div className="pt-6 sm:flex">
                            <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Pictures</dt>
                            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                                <div className="text-gray-900 dark:text-gray-100">None</div>
                            </dd>
                        </div>
                    </dl>
                </div>

            </div>
        </SingleColumnContainer>
    );
};

export default ProfilePage;