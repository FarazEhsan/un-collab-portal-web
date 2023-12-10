import React from 'react';
import SingleColumnContainer from "@/components/navigation/singleColumnContainer";

const ProfilePage = () => {
    return (
        <SingleColumnContainer>
            <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Profile</h2>
                {/*<p className="mt-1 text-sm leading-6 text-gray-500 ">*/}
                {/*    This information will be displayed publicly so be careful what you share.*/}
                {/*</p>*/}

                <div className="mt-8">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                        className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                    />
                </div>

                <dl className="mt-4 space-y-6 divide-y divide-gray-100 dark:divide-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm leading-6">
                    <div className="pt-6 sm:flex">
                        <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-900 dark:text-gray-100">Tom Cook</div>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-900 dark:text-gray-100">tom.cook@example.com</div>
                        </dd>
                    </div>
                    <div className="pt-6 sm:flex">
                        <dt className="font-medium text-gray-900 dark:text-gray-100 sm:w-64 sm:flex-none sm:pr-6">Title</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                            <div className="text-gray-900 dark:text-gray-100">Human Resources Manager</div>
                        </dd>
                    </div>
                </dl>
            </div>
        </SingleColumnContainer>
    );
};

export default ProfilePage;
