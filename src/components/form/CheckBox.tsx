import {ChangeEventHandler} from "react";

interface CheckBoxProps {
    name: string,
    label: string,
    subtitle?: string,
    data: any,
    onChange?: ChangeEventHandler
}

export default function CheckBox({
                                     name,
                                     label,
                                     subtitle,
                                     data: elements,
                                     onChange
                                 }: CheckBoxProps) {
    return (
        <div>
            <label
                className="text-base font-semibold text-gray-900">{label}</label>
            <p className="text-sm text-gray-500">{subtitle}</p>
            <fieldset>
                <legend className="sr-only">{name}</legend>
                <div className="space-y-5">
                    {elements?.map((element: any) => (
                        <div className="relative flex items-start"
                             key={element.id}>
                            <div className="flex h-6 items-center">
                                <input
                                    id={element.id}
                                    aria-describedby={`${element.id}-description`}
                                    name={element.id}
                                    checked={element?.checked}
                                    type="checkbox"
                                    onChange={onChange}
                                    className="h-4 w-4 rounded border-gray-300 text-custom-teal focus:ring-custom-teal"
                                />
                            </div>
                            <div className="ml-3 text-sm leading-6">
                                <label htmlFor={element.id}
                                       className="font-medium text-gray-900">
                                    {element?.title ? element?.title : element?.name}
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    )
}
