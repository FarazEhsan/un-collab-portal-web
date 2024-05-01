import React, {ChangeEvent, useEffect, useState} from 'react';
import TimeAgo from "@/components/form/time-ago";
import ReactionButtons from "@/components/form/reaction-buttons";
import Button from "@/components/button/Button";
import CommentTextArea from "@/components/form/CommentTextArea";
import {Transition} from "@headlessui/react";
import {useUser} from "@auth0/nextjs-auth0/client";
import {getNameString} from "@/utils/extraFunctions";
import {useTranslations} from "next-intl";

const Comment = ({comment, replies, topicId, socket, image}: any) => {
    const {
        user: auth0User,
        error: auth0UserError,
        isLoading: auth0Loading,
    } = useUser();
    const t = useTranslations('PostCard.buttons');

    const [selectedReaction, setSelectedReaction] = useState('')
    const [reactionData, setReactionData] = useState<any>([]);
    const [displayCommentBox, setDisplayCommentBox] = useState(false);
    const [reply, setReply] = useState('');
    const [nameString, setNameString] = useState('');
    const [reactionCount, setReactionCount] = useState({UPVOTE: 0, DOWNVOTE: 0})

    useEffect(() => {
        renderReactions(comment?.reactions);
        setReactionData(comment?.reactions);
        if (comment?.reactionCounts) {
            setReactionCount(comment?.reactionCounts);
        }
    }, []);

    useEffect(() => {
        const handleCommentReactionPosted = (newReaction: any) => {
            // console.log("reaction posted...", newReaction);

            if (reactionData) {
                if (newReaction.comment === comment._id) {
                    setReactionData([...reactionData, newReaction]);
                    renderReactions([...reactionData, newReaction])
                }
            }
        };

        const handleCommentReactionCountUpdated = (newCount: any) => {
            // console.log('new reaction count', newCount);
            if (newCount.commentId === comment?._id) {
                setReactionCount(newCount?.reactionCounts);
            }
        }

        socket?.on("commentReactionPosted", handleCommentReactionPosted);
        socket?.on("updatedCommentReactionCounts", handleCommentReactionCountUpdated);

        return () => {
            // Clean up the listener when the component is unmounted
            socket?.off("commentReactionPosted", handleCommentReactionPosted);
            socket?.off("updatedCommentReactionCounts", handleCommentReactionCountUpdated);
        };
    }, [reactionData]);

    useEffect(() => {
        // console.log(comment?.author?.name)
        setNameString(getNameString(comment?.author?.name));
    }, [comment]);

    const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
        setReply(e.target.value);
    };

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
            // console.log(commentData);
            socket?.emit("postComment", commentData);
            setReply("");
        }
    };

    const renderReactions = (reactionsData: any) => {
        if (reactionsData) {
            reactionsData?.map((r: any) => {
                if (r.author === auth0User?._id) setSelectedReaction(r.type);
            });
        }
    };

    const onReactionChange = (reaction: string) => {
        setSelectedReaction(reaction);
        postReaction(reaction);
    };

    const postReaction = (reaction: string) => {
        // console.log("posting reaction:", reaction);
        const reactionData = {
            type: reaction,
            user: auth0User?.sub?.toString(),
            comment: comment?._id,
            topic: topicId,
        };
        // console.log('reactin data being posted',reactionData)
        socket?.emit("postCommentReaction", reactionData);
    };

    return (
        <div key={comment._id} className="my-4">
            <div className="flex flex-row">
                <img
                    className="inline-block h-6 w-6 rounded-full object-cover"
                    src={comment?.author?.picture ? comment?.author?.picture : `https://ui-avatars.com/api/?name=${nameString}?background=random`}

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
                                        onClick={() => setDisplayCommentBox(!displayCommentBox)}>{t("reply")}</Button>
                            )
                        }

                        <ReactionButtons selectedReaction={selectedReaction}
                                         setSelectedReaction={onReactionChange}
                                         reactionCount={reactionCount}/>
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
                                 topicId={topicId}
                                 socket={socket}
                                 image={image}
                                 replies={reply.replies}/>
                    ))}
                </div>
            )}
        </div>
    )
};

export default Comment;
