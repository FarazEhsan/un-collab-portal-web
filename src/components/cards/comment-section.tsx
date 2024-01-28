import React from 'react';
import Comment from "@/components/cards/comment";

const CommentSection = ({ comments }:any) => {
    const renderComments = (parentId = null) => {
        const filteredComments = comments.filter(
            (comment:any) => comment?.parentComment === parentId
        );
        console.log('filteredComments', filteredComments)
        return filteredComments.map((comment:any) => ({
            ...comment,
            replies: renderComments(comment._id),
        }));
    };

    const commentTree = renderComments();

    return (
        <div>
            <h4 className="mb-2 text-base font-medium leading-6 text-gray-900 dark:text-gray-200">Comments:</h4>
            {commentTree.map((comment: any) => (
                <Comment key={comment._id} comment={comment}
                         replies={comment.replies}/>
            ))}
        </div>
    );
};

export default CommentSection;
