import React, {useEffect} from 'react';
import Comment from "@/components/cards/comment";

const CommentSection = ({
                            comments,
    topicId,
                            commentsCount = 0,
                            limitComments = false
                        }: any) => {
    const renderComments = () => {
        const topLevelComments = comments?.filter(
            (comment: any) => comment?.parentComment === null
        );

        const childComments = comments?.filter(
            (comment: any) => comment?.parentComment !== null
        );

        return topLevelComments?.map((parent:any) => (
            {
                ...parent,
                replies: childComments?.filter(
                    (child:any) => (child.parentComment?._id ? child.parentComment?._id : child.parentComment) === parent._id
                )
            }
        ))


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
                            <Comment topicId={topicId} key={comment._id} comment={comment}
                                     replies={comment.replies}/>
                        ))}
                    </div>
                )
            }

        </div>
    );
};

export default CommentSection;
