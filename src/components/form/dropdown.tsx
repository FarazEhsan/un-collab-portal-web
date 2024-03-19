import {Fragment, useEffect} from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {classNames} from "@/utils/extraFunctions";
import {Link} from "@/navigation";

export default function Dropdown({label, data, selected, setSelected}:any) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 drop-shadow-none rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-950">
                    {label}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {
                            data && (
                                data.map((d:any) => (
                                    <Menu.Item key={d.id}>
                                        {({ active }) => (
                                            <Link
                                                onClick={() => {setSelected(d)}}
                                                locale={d.short}
                                                href='/'
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                {d.title}
                                            </Link>
                                        )}
                                    </Menu.Item>
                                ))
                            )
                        }
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
