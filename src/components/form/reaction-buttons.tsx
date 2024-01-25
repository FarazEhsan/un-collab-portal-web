import React, {SetStateAction, useState} from 'react'
import { RadioGroup } from '@headlessui/react'
import classNames from "classnames";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import {ReactionType} from "@/utils/extraFunctions";

const reactions = [
    { name: ReactionType.Up, bgColor: 'text-gray-400', selectedColor: 'text-green-500', icon: FaCaretUp, hoverColor: 'hover:text-green-300' },
    { name: ReactionType.Down, bgColor: 'text-gray-400', selectedColor: 'text-red-500', icon: FaCaretDown, hoverColor: 'hover:text-red-300' },
]

interface ReactionButtonProps {
    selectedReaction: string | null,
    setSelectedReaction: React.Dispatch<SetStateAction<string>>,
}
export default function ReactionButtons({selectedReaction, setSelectedReaction}:ReactionButtonProps) {

    return (
        <RadioGroup value={selectedReaction} onChange={setSelectedReaction}>
            <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                Reaction
            </RadioGroup.Label>
            <div className="mt-2 flex items-center space-x-3">
                {reactions.map((reaction) => (
                    <RadioGroup.Option
                        key={reaction.name}
                        value={reaction.name}
                        className={({ active, checked }) =>
                            classNames(
                                reaction.hoverColor,
                                active && checked ? reaction.selectedColor : reaction.bgColor,
                                !active && checked ? reaction.selectedColor : reaction.bgColor,
                                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                            )
                        }
                    >
                        <RadioGroup.Label as="span" className="sr-only">
                            {reaction.name}
                        </RadioGroup.Label>
                        {/*<span*/}
                        {/*    aria-hidden="true"*/}
                        {/*    className={classNames(reaction.bgColor, 'h-8 w-8 rounded-full border border-black border-opacity-10')}*/}
                        {/*/>*/}
                        <div className={`h-8 w-8`}>
                            <reaction.icon className="h-8 w-8"/>
                        </div>
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    )
}
