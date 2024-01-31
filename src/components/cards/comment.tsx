import React from 'react';
import TimeAgo from "@/components/form/time-ago";

const Comment = ({comment, replies}: any) => {

    return (
        <div key={comment._id} className="my-4">
            <div className="flex flex-row">
                <img
                    className="inline-block h-6 w-6 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
                <div className="ml-2">
                    <div className="flex flex-row items-center">
                        <h2 className="mr-1 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">{comment.author?.userName}</h2>
                        {/*<p className="ml-1 text-xs text-gray-500 dark:text-gray-400">2*/}
                        {/*    hours ago</p>*/}
                        <TimeAgo timestamp={comment.createdAt}/>
                    </div>
                    <p className="text-base leading-6 text-gray-800 dark:text-gray-200">{comment.text}</p>
                </div>
            </div>
            {replies && (
                <div className="ml-8">
                    {replies.map((reply: any) => (
                        <Comment key={reply._id} comment={reply}
                                 replies={reply.replies}/>
                    ))}
                </div>
            )}
        </div>
    )
};

export default Comment;
