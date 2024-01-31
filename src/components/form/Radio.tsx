import {ChangeEventHandler} from "react";

interface RadioProps {
    name: string,
    label: string,
    subtitle?: string,
    defaultChecked?: string,
    data: any,
    onChange?: ChangeEventHandler
}

export default function Radio({
                                  name,
                                  label,
                                  subtitle,
                                  defaultChecked,
                                  data: elements,
                                  onChange
                              }: RadioProps) {
    // Data Format: {id: string, title: string}
    return (
        <div>
            <label
                className="text-base font-semibold text-gray-900">{label}</label>
            <p className="text-sm text-gray-500">{subtitle}</p>
            <fieldset className="mt-4">
                <legend className="sr-only">{label}</legend>
                <div className="space-y-4">
                    {elements?.map((element: any) => (
                        <div key={element?.id} className="flex items-center">
                            <input
                                id={element?.id}
                                name={name}
                                type="radio"
                                defaultChecked={element?.id === defaultChecked}
                                onChange={onChange}
                                className="h-4 w-4 border-gray-300 text-custom-teal focus:ring-custom-teal"
                            />
                            <label htmlFor={element?.id}
                                   className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                {element?.title ? element?.title : element?.name}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    )
}
