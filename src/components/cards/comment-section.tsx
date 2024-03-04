import React from "react";
import Comment from "@/components/cards/comment";
import {useTranslations} from "next-intl";

const CommentSection = ({
                            comments,
                            topicId,
                            commentsCount = 0,
                            limitComments = false,
                            image,
                            socket
                        }: any) => {
    const renderComments = () => {
        const topLevelComments = comments?.filter(
            (comment: any) => comment?.parentComment === null
        );

        const childComments = comments?.filter(
            (comment: any) => comment?.parentComment !== null
        );

        return topLevelComments?.map((parent: any) => ({
            ...parent,
            replies: childComments?.filter(
                (child: any) =>
                    (child.parentComment?._id
                        ? child.parentComment?._id
                        : child.parentComment) === parent._id
            ),
        }));

        // let filteredComments = comments?.filter(
        //     (comment: any) => comment?.parentComment?._id === parentId
        // );
        //
        //
        // // console.log('filteredComments', filteredComments)
        // return filteredComments?.map((comment: any) => ({
        //     ...comment,
        //     replies: renderComments(comment._id),
        // }));
    };

    const commentTree = renderComments();

    const t = useTranslations('PostCard.fields');

    return (
        <div>
            <h4 className="mb-2 text-base font-medium leading-6 text-gray-900 dark:text-gray-200">
                {t('comments')}: {commentsCount}
            </h4>
            {commentsCount === 0 ? (
                <p className="text-base leading-6 text-gray-500 dark:text-gray-200">
                    No comments yet.
                </p>
            ) : (
                <div>
                    {commentTree?.map((comment: any) => (
                        <Comment
                            topicId={topicId}
                            key={comment._id}
                            comment={comment}
                            replies={comment.replies}
                            socket={socket}
                            image={image}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentSection;
