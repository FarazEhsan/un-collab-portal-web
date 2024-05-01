'use client'
import React from 'react';
import {gql, useQuery} from "@apollo/client";
import SingleColumnContainer
    from "@/components/navigation/singleColumnContainer";
import CardSkeleton from "@/components/skeletons/card-skeleton";
import useSocketClient from "@/hooks/useSocketClient";
import PostCard from "@/app/[locale]/(home)/post-card";

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
       UPVOTE
       DOWNVOTE
}
  commentsCount
    comments{
    _id
        text
        createdAt
        reactionCounts{
       UPVOTE
       DOWNVOTE
}
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

const TopicDetails = ({params}: { params: { id: string } }) => {
    const {
        loading: loadingTopic,
        error: topicDataError,
        data: topicData,
        refetch: refetchTopicData
    } = useQuery(GET_TOPIC_DETAILS, {
        variables: {id: params.id},
    });

    const socket = useSocketClient()

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
                )
            }
        </SingleColumnContainer>
    );
};

export default TopicDetails;
