import React, {ChangeEvent, useEffect, useState} from 'react';
import TimeAgo from "@/components/form/time-ago";
import ReactionButtons from "@/components/form/reaction-buttons";
import Button from "@/components/button/Button";
import CommentTextArea from "@/components/form/CommentTextArea";
import {Transition} from "@headlessui/react";
import useSocketClient from "@/hooks/useSocketClient";
import {useUser} from "@auth0/nextjs-auth0/client";
import {ReactionType} from "@/utils/extraFunctions";

const Comment = ({comment, replies, topicId, socket}: any) => {
    const {
        user: auth0User,
        error: auth0UserError,
        isLoading: auth0Loading,
    } = useUser();
    const [selectedReaction, setSelectedReaction] = useState('')
    const [reactionsCount, setReactionsCount] = useState({up: 0, down: 0});
    const [reactionData, setReactionData] = useState<any>([]);
    const [displayCommentBox, setDisplayCommentBox] = useState(false);
    const [reply, setReply] = useState('')

    const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
        setReply(e.target.value);
    };
    // console.log(comment)
    const postComment = (e: React.FormEvent) => {
        e.preventDefault();

        const commentData = {
            text: reply,
            author: auth0User?.sub?.toString(),
            topic: topicId,
            parentComment: comment?._id,
            reactions: null,
        };

        if (socket) {
            console.log(commentData);
            socket?.emit("postComment", commentData);
            setReply("");
        }
    };
    const renderReactions = (reactionsData: any) => {
        let up = 0;
        let down = 0;
        console.log("rendering reactions");
        if (reactionsData) {
            // up = 0
            // down = 0
            reactionsData?.map((r: any) => {
                if (r.type === ReactionType.Up) up++;
                if (r.type === ReactionType.Down) down++;
                if (r.author === auth0User?._id) setSelectedReaction(r.type);
            });
        }
        setReactionsCount({ up, down });
    };

    useEffect(() => {
        renderReactions(comment?.reactions);
        setReactionData(comment?.reactions);
    }, []);

    const onReactionChange = (reaction: string) => {
        setSelectedReaction(reaction);
        postReaction(reaction);
    };

    const postReaction = (reaction: string) => {
        console.log("posting reaction:", reaction);
        const reactionData = {
            type: reaction,
            user: auth0User?.sub?.toString(),
            comment: comment?._id,
            topic: topicId,
        };
        console.log('reactin data being posted',reactionData)
        socket?.emit("postCommentReaction", reactionData);
    };


    useEffect(() => {

        const handleCommentReactionPosted = (newReaction: any) => {
            console.log("reaction posted...", newReaction);

            if (reactionData) {
                setReactionData([...reactionData, newReaction]);
                renderReactions([...reactionData, newReaction])
            }
        };

        socket?.on("commentReactionPosted", handleCommentReactionPosted);

        return () => {
            // Clean up the listener when the component is unmounted
            socket?.off("commentReactionPosted", handleCommentReactionPosted);
        };
    }, [reactionData]);

    return (
        <div key={comment._id} className="my-4">
            <div className="flex flex-row">
                <img
                    className="inline-block h-6 w-6 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
                <div className="ml-2">
                    <div className="">
                        <div className="flex flex-row items-center ">
                            <h2 className="mr-1 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">{comment.author?.userName}</h2>
                            {/*<p className="ml-1 text-xs text-gray-500 dark:text-gray-400">2*/}
                            {/*    hours ago</p>*/}
                            <TimeAgo timestamp={comment.createdAt}/>
                        </div>
                        <p className="text-base leading-6 text-gray-800 dark:text-gray-200">{comment.text}</p>
                    </div>
                    <div className="flex flex-row">
                        {
                            comment?.parentComment ? (
                                ''
                            ) : (
                                <Button colorType="link"
                                        onClick={() => setDisplayCommentBox(!displayCommentBox)}>Reply</Button>
                            )
                        }

                        <ReactionButtons selectedReaction={selectedReaction}
                                         setSelectedReaction={onReactionChange}
                                         reactionCount={reactionsCount}/>
                    </div>
                </div>
            </div>
            <Transition
                show={displayCommentBox}
                enter="transform transition ease-in-out duration-700"
                enterFrom="-translate-y-1/3 opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="transform transition ease-in-out duration-350"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="-translate-y-1/3 opacity-0"
            >
                <div className="my-2 mx-8">
                    <CommentTextArea
                        onSubmit={postComment}
                        onChange={handleCommentChange}
                        value={reply}
                        label="Add a Comment"
                        name="comment"
                    />
                </div>
            </Transition>
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
