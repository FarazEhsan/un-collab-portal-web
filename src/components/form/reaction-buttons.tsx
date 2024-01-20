import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import classNames from "classnames";
import {ArrowDownIcon, ArrowUpIcon} from "@heroicons/react/24/outline";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const colors = [
    { name: 'up', bgColor: 'text-gray-400', selectedColor: 'text-green-500', icon: FaCaretUp, hoverColor: 'hover:text-green-300' },
    { name: 'down', bgColor: 'text-gray-400', selectedColor: 'text-red-500', icon: FaCaretDown, hoverColor: 'hover:text-red-300' },
]

export default function ReactionButtons() {
    const [selectedColor, setSelectedColor] = useState(colors[1])

    return (
        <RadioGroup value={selectedColor} onChange={setSelectedColor}>
            <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                Reaction
            </RadioGroup.Label>
            <div className="mt-2 flex items-center space-x-3">
                {colors.map((color) => (
                    <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                            classNames(
                                color.hoverColor,
                                active && checked ? color.selectedColor : color.bgColor,
                                !active && checked ? color.selectedColor : color.bgColor,
                                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                            )
                        }
                    >
                        <RadioGroup.Label as="span" className="sr-only">
                            {color.name}
                        </RadioGroup.Label>
                        {/*<span*/}
                        {/*    aria-hidden="true"*/}
                        {/*    className={classNames(color.bgColor, 'h-8 w-8 rounded-full border border-black border-opacity-10')}*/}
                        {/*/>*/}
                        <div className={`h-8 w-8`}>
                            <color.icon className="h-8 w-8"/>
                        </div>
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    )
}
