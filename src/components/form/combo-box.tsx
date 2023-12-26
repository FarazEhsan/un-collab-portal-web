import React, {useState} from 'react';
import {Combobox} from "@headlessui/react";
import Badge from "@/components/badge";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/24/outline";
import {classNames} from "@/utils/extraFunctions";



const ComboBox = ({multiple, data, label}:any) => {
    const [query, setQuery] = useState('')
    const [selectedData, setSelectedData] = useState([])

    const filteredData =
        query === ''
            ? data
            : data.filter((item:any) => {
                return item.name.toLowerCase().includes(query.toLowerCase())
            })

    // @ts-ignore
    return (
        <Combobox as="div" value={selectedData} onChange={setSelectedData}
                  multiple={multiple}>
            <Combobox.Label
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">{label}</Combobox.Label>
            {multiple && selectedData?.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                    {selectedData?.map((item:any) => (
                        <Badge key={item.id} text={item.name}/>
                    ))}
                </div>
            )}
            <div className="relative mt-2">
                <Combobox.Input
                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 dark:text-gray-100 dark:ring-gray-600 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-custom-teal sm:text-sm sm:leading-6"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(item) => item?.name}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>
                {filteredData.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredData.map((item:any) => (
                            <Combobox.Option
                                key={item.id}
                                value={item}
                                className={({ active }) =>
                                    classNames(
                                        'relative cursor-default select-none py-2 pl-8 pr-4',
                                        active ? 'bg-custom-teal text-white' : 'text-gray-900 dark:text-white'
                                    )
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <span className={classNames('block truncate', selected && 'font-semibold')}>{item.name}</span>

                                        {selected && (
                                            <span
                                                className={classNames(
                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5',
                                                    active ? 'text-white' : 'text-custom-teal'
                                                )}
                                            >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    );
};

export default ComboBox;
