"use client";
import React, {Fragment, ReactNode, useEffect, useState} from "react";
import {Dialog, Menu, Transition} from "@headlessui/react";
import {
    Bars3Icon,
    BellIcon,
    MoonIcon,
    SunIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {classNames, getNameString} from "@/utils/extraFunctions";
import {ChevronDownIcon, MagnifyingGlassIcon,} from "@heroicons/react/20/solid";
import {useTheme} from "next-themes";
import Link from "next/link";
import UN_Habitat_Logo from "../../../public/UN-Habitat_logo_English.png";
import {useUser} from '@auth0/nextjs-auth0/client';
import {gql, useQuery} from "@apollo/client";
import {usePathname} from "next/navigation";

export type NavItem = {
    name: string;
    href: string;
    icon: any;
    current: boolean;
};

let userNavigation = [
    {name: "Your profile", href: "/profile"},
    {name: "Sign out", href: "/api/auth/logout"},
];

const adminNavigation = [
    {name: "Admin Panel", href: "/admin"},
    {name: "Home", href: "/home"},
    {name: "Your profile", href: "/profile"},
    {name: "Sign out", href: "/api/auth/logout"},
];

interface SideNavProps {
    children: ReactNode;
    navData: NavItem[];
}

const GET_USER_DETAILS = gql`
    query GetUserDetails($id: String!) {
      user(id: $id) {
        _id
        name
        picture
      }
    }
  `;

export default function SideNav({children, navData}: SideNavProps) {
    const {theme, setTheme} = useTheme();
    const {user, error, isLoading} = useUser();
    const pathname = usePathname();

    const {
        loading,
        error: dataError,
        data,
        refetch
    } = useQuery(GET_USER_DETAILS, {
        variables: {id: user?.sub?.toString()},
    });

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [nameString, setNameString] = useState('')

    useEffect(() => {
        // @ts-ignore
        if (user?.unhroles?.find((role: string) => role === 'admin')) {
            userNavigation = [
                ...adminNavigation
            ]
        }
    }, [user]);

    useEffect(() => {
        setNameString(getNameString(data?.user?.name));
    }, [data]);

    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-50 lg:hidden"
                        onClose={setSidebarOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80"/>
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel
                                    className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div
                                            className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button
                                                type="button"
                                                className="-m-2.5 p-2.5"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon
                                                    className="h-6 w-6 text-white"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div
                                        className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2 dark:bg-gray-900 dark:border-gray-700">
                                        <div
                                            className="flex h-16 shrink-0 items-center">
                                            <img
                                                className="h-8 w-auto"
                                                src={UN_Habitat_Logo.src}
                                                alt="Your Company"
                                            />
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list"
                                                className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list"
                                                        className="-mx-2 space-y-1">
                                                        {navData.map((item) => (
                                                            <li key={item.name}>
                                                                <Link
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        item.href === pathname
                                                                            ? "bg-gray-50 text-custom-teal dark:bg-gray-800 dark:text-custom-orange"
                                                                            : "text-gray-700 dark:text-gray-400 hover:text-custom-blue hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-custom-blue",
                                                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                                    )}
                                                                >
                                                                    {React.createElement(item.icon, {
                                                                        className: classNames(
                                                                            item.href === pathname
                                                                                ? "text-custom-teal dark:text-custom-orange"
                                                                                : "text-gray-400 group-hover:text-custom-blue",
                                                                            "h-6 w-6 shrink-0"
                                                                        ),
                                                                        "aria-hidden": "true",
                                                                    })}
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div
                    className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div
                        className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 dark:bg-gray-900 dark:border-gray-700">
                        <div className="flex h-20 shrink-0 items-center">
                            <img
                                className="h-14 w-auto"
                                src={UN_Habitat_Logo.src}
                                alt="UN logo"
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list"
                                className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navData.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={classNames(
                                                        item.href === pathname
                                                            ? "bg-gray-50 text-custom-teal dark:bg-gray-800 dark:text-custom-orange"
                                                            : "text-gray-700 dark:text-gray-400 hover:text-custom-blue hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-custom-blue",
                                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                    )}
                                                >
                                                    {React.createElement(item.icon, {
                                                        className: classNames(
                                                            item.href === pathname
                                                                ? "text-custom-teal dark:text-custom-orange"
                                                                : "text-gray-400 group-hover:text-custom-blue",
                                                            "h-6 w-6 shrink-0"
                                                        ),
                                                        "aria-hidden": "true",
                                                    })}
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                {/*Top Nav*/}
                <div className="lg:pl-72">
                    <div
                        className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                        </button>

                        {/* Separator */}
                        <div
                            className="h-6 w-px bg-gray-900/10 dark:bg-white/10 lg:hidden"
                            aria-hidden="true"/>

                        <div
                            className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6  ">
                            <form autoComplete="none"
                                  className="relative flex flex-1" action="#"
                                  method="GET">
                                <label htmlFor="search-field"
                                       className="sr-only">
                                    Search
                                </label>
                                <MagnifyingGlassIcon
                                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 dark:text-gray-600"
                                    aria-hidden="true"
                                />
                                <input autoComplete="on"
                                       style={{display: 'none'}}
                                       id="fake-hidden-input-to-stop-google-address-lookup"/>
                                <input
                                    id="search-field"
                                    className="dark:bg-gray-900 block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-0 sm:text-sm"
                                    placeholder="Search..."
                                    type="search"
                                    name="search"
                                    autoComplete="none"
                                />
                            </form>
                            <div
                                className="flex items-center gap-x-4 lg:gap-x-6">
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    type="button"
                                    className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400">
                                    <span className="sr-only">Theme</span>
                                    {
                                        theme === 'dark' ? (

                                            <SunIcon className="h-6 w-6"
                                                     aria-hidden="true"/>
                                        ) : (

                                            <MoonIcon className="h-6 w-6"
                                                      aria-hidden="true"/>
                                        )
                                    }
                                </button>
                                <button type="button"
                                        className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400">
                                    <span
                                        className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6"
                                              aria-hidden="true"/>
                                </button>

                                {/* Separator */}
                                <div
                                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10 dark:lg:bg-white/10"
                                    aria-hidden="true"
                                />

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative">
                                    <Menu.Button
                                        className="-m-1.5 flex items-center p-1.5">
                                        <span
                                            className="sr-only">Open user menu</span>
                                        <img
                                            className="h-8 w-8 rounded-full bg-gray-50 dark:bg-gray-800 object-cover"
                                            // src={user?.picture ? user?.picture : noProfilePictureImage.src}
                                            src={data?.user?.picture ? data?.user?.picture : `https://ui-avatars.com/api/?name=${nameString}?background=random`}
                                            alt=""
                                        />
                                        <span
                                            className="hidden lg:flex lg:items-center">
                      <span
                          className="ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
                          aria-hidden="true"
                      >
                        {user?.nickname}
                      </span>
                      <ChevronDownIcon
                          className="ml-2 h-5 w-5 text-gray-400 dark:text-gray-600"
                          aria-hidden="true"
                      />
                    </span>
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white dark:bg-gray-800 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            {userNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({active}) => (
                                                        item.name === 'Sign out' ? (
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        active ? "bg-gray-50 dark:bg-gray-700" : "",
                                                                        "block px-3 py-1 text-sm leading-6 text-gray-900 dark:text-gray-100"
                                                                    )}
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            ) :
                                                            <Link
                                                                href={item.href}
                                                                className={classNames(
                                                                    active ? "bg-gray-50 dark:bg-gray-700" : "",
                                                                    "block px-3 py-1 text-sm leading-6 text-gray-900 dark:text-gray-100"
                                                                )}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    {children}
                </div>

                {/*Call Children Here*/}
            </div>
        </>
    );
}
