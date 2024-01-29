'use client'
import React, {ChangeEvent, useEffect, useState} from 'react';
import CarouselModal from "@/components/modals/carousel-modal";
import CommentSection from "@/components/cards/comment-section";
import CommentTextArea from "@/components/form/CommentTextArea";
import ReactionButtons from "@/components/form/reaction-buttons";
import TimeAgo from "@/components/form/time-ago";
import {useUser} from "@auth0/nextjs-auth0/client";
import {ReactionType} from "@/utils/extraFunctions";
import {gql, useQuery} from "@apollo/client";


const data = {
    heroImage: 'https://source.unsplash.com/random',
    username: 'Username',
    time: '2 hours ago',
    title: 'Post Title...',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consectetur faucibus tortor, id finibus lectus auctor in. Vivamus luctus iaculis dui, id posuere eros congue aliquam. In lobortis gravida iaculis. Vestibulum at ultricies arcu, eu scelerisque sem. Praesent in massa bibendum, egestas libero a, dignissim urna. Duis in mollis est. Nunc feugiat ipsum cursus urna vestibulum, sed fermentum eros mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    comments: [
        {
            id: 1,
            parentId: null,
            comment: 'comment 1',
            user: 'user1',
        }, {
            id: 2,
            parentId: 1,
            comment: 'comment 2: child comment of 1',
            user: 'user2',
        }, {
            id: 3,
            parentId: 2,
            comment: 'comment 3: child comment of 2',
            user: 'user3',
        }, {
            id: 4,
            parentId: null,
            comment: 'comment 4',
            user: 'user4',
        }, {
            id: 5,
            parentId: 2,
            comment: 'comment 5: child comment of 2',
            user: 'user5',
        }, {
            id: 6,
            parentId: 5,
            comment: 'comment 6: child comment of 5',
            user: 'user6',
        }, {
            id: 7,
            parentId: 6,
            comment: 'comment 7: child comment of 6',
            user: 'user7',
        },
    ]
}


const PostCard = ({postDetails, socket, refetchPosts}: any) => {
    const {
        user: auth0User,
        error: auth0UserError,
        isLoading: auth0Loading,
    } = useUser();
    const [openCarouselModal, setOpenCarouselModal] = useState(false)
    const [selectedReaction, setSelectedReaction] = useState('')
    const [reactionsCount, setReactionsCount] = useState({up: 0, down: 0})
    const [comment, setComment] = useState('');

    const GET_REACTIONS = gql`
    query TopicDetails($id: String!) {
  topic(id: $id){
   
    reactions{
    type
    user{
      _id
    }
  }
  }
}
  `;
    const GET_COMMENTS = gql`
    query TopicDetails($id: String!) {
  topic(id: $id){
  commentsCount
    comments{
    _id
        text
        createdAt
        author{
          userName
        }
        parentComment{
        _id
      }
    }
  }
}
  `;

    const {
        loading: loadingReactions,
        error: reactionsDataError,
        data: reactionsData,
        refetch: refetchReactionData
    } = useQuery(GET_REACTIONS, {
        variables: {id: postDetails._id},
    });
    const {
        loading: loadingComments,
        error: commentsDataError,
        data: commentsData,
        refetch: refetchCommentData
    } = useQuery(GET_COMMENTS, {
        variables: {id: postDetails._id},
    });

    // console.log('comments data', reactionsData)

    const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    }

    const postComment = (e: React.FormEvent) => {
        e.preventDefault();

        const commentData = {
            text: comment,
            author: auth0User?.sub?.toString(),
            topic: postDetails._id,
            parentComment: null,
            reactions: null
        }

        if (socket) {
            console.log(commentData)
            socket?.emit('postComment', commentData);
            setComment('');
        }
    }

    const onReactionChange = (reaction: string) => {
        setSelectedReaction(reaction);
        postReaction(reaction)
    }

    const postReaction = (reaction: string) => {
        console.log('posting reaction:', reaction)
        const reactionData = {
            type: reaction,
            user: auth0User?.sub?.toString(),
            comment: null,
            topic: postDetails._id
        }
        socket?.emit('postTopicReaction', reactionData);
    }

    useEffect(() => {
        const handleTopicReactionPosted = () => {
            console.log('reaction posted...');
            refetchReactionData();
        };
        const handleTopicCommentPosted = () => {
            console.log('comment posted...');
            refetchCommentData();
        };

        socket.on('topicReactionPosted', handleTopicReactionPosted);
        socket.on('commentPosted', handleTopicCommentPosted);

        return () => {
            // Clean up the listener when the component is unmounted
            socket.off('topicReactionPosted', handleTopicReactionPosted);
            socket.off('commentPosted', handleTopicCommentPosted);
        };
    }, []);


    const renderReactions = () => {
        let up = 0;
        let down = 0;
        console.log('rendering reactions')
        if (!loadingReactions && !reactionsDataError) {
            // up = 0
            // down = 0
            reactionsData?.topic?.reactions?.map((r: any) => {
                if (r.type === ReactionType.Up) up++;
                if (r.type === ReactionType.Down) down++;
                if (r.author === auth0User?._id) setSelectedReaction(r.type)
            })
        }
        setReactionsCount({up, down})
    }

    useEffect(() => {
        renderReactions()
    }, [reactionsData]);

    return (
        <div
            className="dark:bg-gray-900 dark:hover:bg-gray-800 hover:bg-gray-200 bg-white border border-gray-200 dark:border-gray-700 rounded-xl shadow-md dark:shadow-gray-950 p-4">
            {/*Image*/}


            {/*Post Body*/}
            <div className="">
                <div className="flex flex-row items-center">
                    <img
                        className="inline-block h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                    <div className="ml-2">
                        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">{postDetails?.author?.userName}</h2>
                        {/*<p className="text-xs text-gray-500 dark:text-gray-400">2*/}
                        {/*    hours ago</p>*/}
                        <TimeAgo timestamp={postDetails?.createdAt}/>
                    </div>

                </div>
                <h2 className="mt-4 text-lg font-medium leading-7 text-gray-900 dark:text-gray-100">{postDetails?.title}</h2>

            </div>

            {
                postDetails?.images?.length ? (
                        <div
                            onClick={() => setOpenCarouselModal(!openCarouselModal)}
                            className="h-96 mb-6 rounded-md">

                            <img
                                src={postDetails.images[0]}
                                className="h-full w-full object-contain rounded-md"
                            />
                            <CarouselModal open={openCarouselModal}
                                           setOpen={setOpenCarouselModal}
                                           images={postDetails.images}
                            />
                        </div>
                    )
                    :
                    ''
            }


            <div>
                <p className="text-base leading-6 text-gray-800 dark:text-gray-200">{(postDetails?.description.substring(0, 225))}{postDetails?.description?.length > 255 ? '...' : ''}</p>
            </div>

            {/*Reactions*/}
            <div className="mt-6">
                <ReactionButtons selectedReaction={selectedReaction}
                                 setSelectedReaction={onReactionChange}
                                 reactionCount={reactionsCount}
                />
            </div>

            {/*Comments*/}
            <div className="mt-6">
                <CommentTextArea onSubmit={postComment}
                                 onChange={handleCommentChange} value={comment}
                                 label="Add a Comment" name="comment"/>
            </div>

            <div className="mt-6">
                <CommentSection comments={commentsData?.topic?.comments} commentsCount={commentsData?.topic?.commentsCount}/>
            </div>
        </div>
    );
};

export default PostCard;
