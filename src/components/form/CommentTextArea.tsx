'use client'
import {
    ChangeEventHandler,
    FocusEventHandler,
    FormEventHandler, useEffect,
    useState
} from 'react'
import {
    FaceFrownIcon,
    FaceSmileIcon,
    FireIcon,
    HandThumbUpIcon,
    HeartIcon,
    XMarkIcon,
} from '@heroicons/react/20/solid'
import {PaperAirplaneIcon} from "@heroicons/react/24/outline";
import {useUser} from "@auth0/nextjs-auth0/client";
import {getNameString} from "@/utils/extraFunctions";
import {gql, useQuery} from "@apollo/client";

const moods = [
    {
        name: 'Excited',
        value: 'excited',
        icon: FireIcon,
        iconColor: 'text-white',
        bgColor: 'bg-red-500'
    },
    {
        name: 'Loved',
        value: 'loved',
        icon: HeartIcon,
        iconColor: 'text-white',
        bgColor: 'bg-pink-400'
    },
    {
        name: 'Happy',
        value: 'happy',
        icon: FaceSmileIcon,
        iconColor: 'text-white',
        bgColor: 'bg-green-400'
    },
    {
        name: 'Sad',
        value: 'sad',
        icon: FaceFrownIcon,
        iconColor: 'text-white',
        bgColor: 'bg-yellow-400'
    },
    {
        name: 'Thumbsy',
        value: 'thumbsy',
        icon: HandThumbUpIcon,
        iconColor: 'text-white',
        bgColor: 'bg-blue-500'
    },
    {
        name: 'I feel nothing',
        value: null,
        icon: XMarkIcon,
        iconColor: 'text-gray-400',
        bgColor: 'bg-transparent'
    },
]

interface CommentTextAreaProps {
    label: string,
    name: string,
    rows?: number,
    className?: string,
    placeholder?: string,
    value?: string | number,
    error?: string | null | undefined,
    onChange?: ChangeEventHandler,
    onFocus?: FocusEventHandler,
    onSubmit: FormEventHandler,
}

export default function CommentTextArea({
                                            label = 'Label',
                                            name = 'Name',
                                            rows = 3,
                                            className,
                                            placeholder = 'Add a Comment...',
                                            value,
                                            error,
                                            onChange,
                                            onFocus,
                                            onSubmit,

                                        }: CommentTextAreaProps) {
    // const [selected, setSelected] = useState(moods[5])
    const {user, error: dataError, isLoading} = useUser();
    const GET_USER_DETAILS = gql`
    query GetUserDetails($id: String!) {
      user(id: $id) {
        _id
        name
        picture
      }
    }
  `;

    const {loading, error: gqlDataError, data, refetch} = useQuery(GET_USER_DETAILS, {
        variables: {id: user?.sub?.toString()},
    });
    const [nameString, setNameString] = useState('')
    useEffect(() => {
        setNameString(getNameString(data?.user?.name));
    }, [data]);

    return (
        <div className={`flex items-start space-x-4 ${className}`}>
            <div className="flex-shrink-0">
                <img
                    className="inline-block h-8 w-8 rounded-full object-cover"
                    src={data?.user?.picture ? data?.user?.picture : `https://ui-avatars.com/api/?name=${nameString}?background=random`}
                    alt=""
                />
            </div>
            <div className="min-w-0 flex-1">
                <form className="relative" onSubmit={onSubmit}>
                    <div
                        className="overflow-hidden dark:bg-gray-700 rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-500 focus-within:ring-2 focus-within:ring-custom-teal dark:focus-within:ring-custom-teal">
                        <label htmlFor={name} className="sr-only">
                            {label}
                        </label>
                        <textarea
                            rows={rows}
                            name={name}
                            id={name}
                            className="block w-full resize-none dark:text-gray-100 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            onFocus={onFocus}
                        />
                    </div>

                    <div
                        className="absolute bottom-0 right-0 flex justify-between">
                        <div className="">
                            <button
                                type="submit"
                                className=" items-center rounded-md text-custom-blue px-3 py-2 text-sm font-semibold shadow-sm hover:text-custom-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-teal"
                            >
                                <PaperAirplaneIcon height={24} width={24}/>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
