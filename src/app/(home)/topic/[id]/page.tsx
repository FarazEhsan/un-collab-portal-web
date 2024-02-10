'use client'
import React from 'react';
import {gql, useQuery} from "@apollo/client";
import SingleColumnContainer
    from "@/components/navigation/singleColumnContainer";
import CardSkeleton from "@/components/skeletons/card-skeleton";
import useSocketClient from "@/hooks/useSocketClient";
import PostCard from "@/components/cards/post-card";

const TopicDetails = ({params}: { params: { id: string } }) => {
    // const {
    //     user: auth0User,
    //     error: auth0UserError,
    //     isLoading: auth0Loading,
    // } = useUser();
    // const [openCarouselModal, setOpenCarouselModal] = useState(false);
    // const [selectedReaction, setSelectedReaction] = useState('')
    // const [reactionsCount, setReactionsCount] = useState({up: 0, down: 0})
    // const [comment, setComment] = useState('');

    const socket = useSocketClient()

    const GET_TOPIC_DETAILS = gql`
    query TopicDetails($id: String!) {
  topic(id: $id){
  _id
   title
    images
    createdAt
    author{
      userName
      name
      picture
    }
    description
    reactions{
    type
    user{
      _id
    }
  }
  reactionCounts{
      _id
      count
    }
  commentsCount
    comments{
    _id
        text
        createdAt
       reactions{
        type
        user{
          _id
        }
      }
        author{
          userName
          name
          picture
        }
        parentComment{
        _id
      }
    }
  }
}
  `;

    const {
        loading: loadingTopic,
        error: topicDataError,
        data: topicData,
        refetch: refetchTopicData
    } = useQuery(GET_TOPIC_DETAILS, {
        variables: {id: params.id},
    });

    // const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setComment(e.target.value);
    // }

    // const postComment = (e: React.FormEvent) => {
    //     e.preventDefault();
    //
    //     const commentData = {
    //         text: comment,
    //         author: auth0User?.sub?.toString(),
    //         topic: topicData?.topic?._id,
    //         parentComment: null,
    //         reactions: null
    //     }
    //
    //     if (socket) {
    //         console.log(commentData)
    //         socket?.emit('postComment', commentData);
    //         setComment('');
    //     }
    // }

    // const onReactionChange = (reaction: string) => {
    //     setSelectedReaction(reaction);
    //     postReaction(reaction)
    // }

    // const postReaction = (reaction: string) => {
    //     console.log('posting reaction:', reaction)
    //     const reactionData = {
    //         type: reaction,
    //         user: auth0User?.sub?.toString(),
    //         comment: null,
    //         topic: topicData?.topic?._id
    //     }
    //     socket?.emit('postTopicReaction', reactionData);
    // }

    // useEffect(() => {
    //     const handleTopicReactionPosted = () => {
    //         console.log('reaction posted...');
    //         refetchTopicData();
    //     };
    //     const handleTopicCommentPosted = () => {
    //         console.log('comment posted...');
    //         refetchTopicData();
    //     };
    //
    //     socket?.on('topicReactionPosted', handleTopicReactionPosted);
    //     socket?.on('commentPosted', handleTopicCommentPosted);
    //
    //     return () => {
    //         // Clean up the listener when the component is unmounted
    //         socket?.off('topicReactionPosted', handleTopicReactionPosted);
    //         socket?.off('commentPosted', handleTopicCommentPosted);
    //     };
    // }, []);
    //
    //
    // const renderReactions = () => {
    //     let up = 0;
    //     let down = 0;
    //     console.log('rendering reactions')
    //     if (!loadingTopic && !topicDataError) {
    //         // up = 0
    //         // down = 0
    //         topicData?.topic?.reactions?.map((r: any) => {
    //             if (r.type === ReactionType.Up) up++;
    //             if (r.type === ReactionType.Down) down++;
    //             if (r.author === auth0User?._id) setSelectedReaction(r.type)
    //         })
    //     }
    //     setReactionsCount({up, down})
    // }
    //
    // useEffect(() => {
    //     renderReactions()
    // }, [topicData]);
    //

    return (
        <SingleColumnContainer>
            {
                loadingTopic ? (
                    <CardSkeleton/>
                ) : (
                    <div className="xl:mx-28">
                        <PostCard postDetails={topicData?.topic}
                                  socket={socket}/>
                    </div>

                    // <div
                    //     className="xl:mx-28 dark:bg-gray-900 bg-white border border-gray-200 dark:border-gray-700 rounded-xl shadow-md dark:shadow-gray-950 p-4">
                    //     <div className="flex flex-row items-center">
                    //         <img
                    //             className="inline-block h-10 w-10 rounded-full"
                    //             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    //             alt=""
                    //         />
                    //         <div className="ml-2">
                    //             <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">{topicData?.topic?.author?.userName}</h2>
                    //             {/*<p className="text-xs text-gray-500 dark:text-gray-400">2*/}
                    //             {/*    hours ago</p>*/}
                    //             <TimeAgo
                    //                 timestamp={topicData?.topic?.createdAt}/>
                    //         </div>
                    //
                    //     </div>
                    //     <div className="mt-4">
                    //         <h1 className="text-lg font-medium leading-7 text-gray-900 dark:text-gray-100">
                    //             {topicData?.topic?.title}
                    //         </h1>
                    //     </div>
                    //
                    //     {
                    //         topicData?.topic?.images?.length ? (
                    //                 <div
                    //                     onClick={() => setOpenCarouselModal(!openCarouselModal)}
                    //                     className="h-96 mb-6 rounded-md">
                    //
                    //                     <img
                    //                         src={topicData?.topic?.images[0]}
                    //                         className="h-full w-full object-contain rounded-md"
                    //                     />
                    //                     <CarouselModal open={openCarouselModal}
                    //                                    setOpen={setOpenCarouselModal}
                    //                                    images={topicData?.topic?.images}
                    //                     />
                    //                 </div>
                    //             )
                    //             :
                    //             ''
                    //     }
                    //
                    //     <div>
                    //         <p className="text-base leading-6 text-gray-800 dark:text-gray-200">{topicData?.topic?.description}</p>
                    //     </div>
                    //     {/*Reactions*/}
                    //     <div className="mt-6">
                    //         <ReactionButtons selectedReaction={selectedReaction}
                    //                          setSelectedReaction={onReactionChange}
                    //                          reactionCount={reactionsCount}
                    //         />
                    //     </div>
                    //
                    //     {/*Comments*/}
                    //     <div className="mt-6">
                    //         <CommentTextArea onSubmit={postComment}
                    //                          onChange={handleCommentChange} value={comment}
                    //                          label="Add a Comment" name="comment"/>
                    //     </div>
                    //
                    //     <div className="mt-6">
                    //         <CommentSection comments={topicData?.topic?.comments}
                    //                         commentsCount={topicData?.topic?.commentsCount}/>
                    //     </div>
                    //
                    // </div>

                )
            }
        </SingleColumnContainer>
    );
};

export default TopicDetails;
