import React, {
    ChangeEvent,
    Fragment,
    SetStateAction,
    useEffect,
    useState
} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {XMarkIcon} from '@heroicons/react/24/outline'
import Input from "@/components/form/Input";
import 'react-quill/dist/quill.snow.css';
import TextEditor from "@/components/form/text-editor";
import {useUser} from "@auth0/nextjs-auth0/client";
import {io} from "socket.io-client";
import Button from "@/components/button/Button";

interface SlideOverProps {
    open: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>>
}

const WS_URL = 'http://localhost:8080'
export default function CreatePostSlideOver({open, setOpen}: SlideOverProps) {
    const {user, error, isLoading} = useUser();

    useEffect(() => {
        const socket =  io('http://localhost:8080');
        console.log(socket)

    }, []);


    // const {
    //     sendJsonMessage,
    //     lastJsonMessage,
    //     readyState
    // } = useWebSocket(WS_URL, {
    //     onOpen: () => {
    //         console.log('WebSocket connection established.');
    //     },
    //     shouldReconnect: () => true,
    // });
    const [postDetails, setPostDetails] = useState({
        title: '',
        description: ''
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(postDetails)
        if (socket?.readyState) {
            console.log('Socket connected');

        }
        // if (readyState === ReadyState.OPEN && user) {
        //     console.log('sending')
        //     sendJsonMessage({
        //         event: "postTopic",
        //         data: {
        //             ...postDetails,
        //             author: user?.sub
        //         }
        //     })
        // }
    }
    const handleProcedureContentChange = (content: any) => {
        setPostDetails(prevState => ({...prevState, description: content}));
    };
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPostDetails(prevState => ({...prevState, title: e.target.value}));
    };
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel
                                    className="pointer-events-auto w-screen max-w-2xl">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1">
                                            {/* Header */}
                                            <div
                                                className="bg-gray-50 px-4 py-6 sm:px-6">
                                                <div
                                                    className="flex items-start justify-between space-x-3">
                                                    <div className="space-y-1">
                                                        <Dialog.Title
                                                            className="text-base font-semibold leading-6 text-gray-900">
                                                            New post
                                                        </Dialog.Title>
                                                        <p className="text-sm text-gray-500">
                                                            Get started by
                                                            filling in the
                                                            information below to
                                                            create your new
                                                            post.
                                                        </p>
                                                    </div>
                                                    <div
                                                        className="flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="relative text-gray-400 hover:text-gray-500"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span
                                                                className="absolute -inset-2.5"/>
                                                            <span
                                                                className="sr-only">Close panel</span>
                                                            <XMarkIcon
                                                                className="h-6 w-6"
                                                                aria-hidden="true"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Divider container */}
                                            <div>
                                                <div className="mx-6 my-4">
                                                    <Input label="Title"
                                                           name="title"
                                                           required={true}
                                                           onChange={handleTitleChange}
                                                    />
                                                </div>
                                                <div className="mx-6 my-4">
                                                    <TextEditor
                                                        onChange={handleProcedureContentChange}/>

                                                </div>

                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div
                                            className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <div
                                                className="flex justify-end space-x-3">
                                                <Button type="button" colorType="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                                                <Button type="submit">Create</Button>
                                            </div>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
