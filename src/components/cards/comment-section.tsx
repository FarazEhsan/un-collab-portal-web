import React from 'react';
import Comment from "@/components/cards/comment";

const CommentSection = ({
                            comments,
                            commentsCount = 0,
                            limitComments = false
                        }: any) => {
    const renderComments = (parentId = null) => {
        let filteredComments = comments?.filter(
            (comment: any) => comment?.parentComment === parentId
        );

        if (commentsCount > 3 && limitComments) {
            filteredComments = filteredComments?.slice(0, 3)
        }
        // console.log('filteredComments', filteredComments)
        return filteredComments?.map((comment: any) => ({
            ...comment,
            replies: renderComments(comment._id),
        }));
    };

    const commentTree = renderComments();

    return (
        <div>
            <h4 className="mb-2 text-base font-medium leading-6 text-gray-900 dark:text-gray-200">Comments:</h4>
            {
                commentsCount === 0 ? (
                    <p className="text-base leading-6 text-gray-500 dark:text-gray-200">No
                        comments yet.</p>

                ) : (
                    <div>
                        {commentTree?.map((comment: any) => (
                            <Comment key={comment._id} comment={comment}
                                     replies={comment.replies}/>
                        ))}
                        {
                            commentsCount > 3 && limitComments ? (
                                <p className="text-base leading-6 text-gray-500 dark:text-gray-200">Open
                                    topic to view all comments</p>
                            ) : (
                                ''
                            )
                        }
                    </div>
                )
            }

        </div>
    );
};

export default CommentSection;
