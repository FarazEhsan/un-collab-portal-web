'use client'
import TwoColumnContainer from "@/components/navigation/twoColumnContainer";
import PostCard from "@/components/cards/post-card";
import {useEffect, useState} from "react";
import CreatePostSlideOver from "@/components/overlays/create-post-slide-over";
import {gql, useQuery} from "@apollo/client";
import CardSkeleton from "@/components/skeletons/card-skeleton";
import useSocket from "@/hooks/useSocketClient";

export default function Home() {
    const [openCreatePostSlideOver, setOpenCreatePostSlideOver] = useState(false);

    const GET_ALL_TOPICS = gql`
    query GetAllTopics{
  alltopics{
  _id
    title
    images
    createdAt
    reactions{
    type
    user{
      _id
    }
  }
    author{
      userName
      picture
    }
    description
  }
}
  `;

    const [topics, setTopics] = useState([])

    const {loading, error, data, refetch} = useQuery(GET_ALL_TOPICS);

    const socket = useSocket();


    const refetchPosts = () => {
        console.log("Updating feed through refetch");
        refetch();
    }

    useEffect(() => {
        setTopics(data?.alltopics);
        console.log('updating topics', data)
    }, [data]);

    useEffect(() => {
        const handleTopicPosted = () => {
            console.log('topic posted...');
            refetch();
        };

        socket?.on('topicPosted', handleTopicPosted);
    }, []);


    const secondaryColumnContent =
        <div>
            <button
                onClick={() => setOpenCreatePostSlideOver(!openCreatePostSlideOver)}
                className="bg-custom-orange hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-custom-orange text-gray-900 rounded-md font-semibold py-2 px-3 w-full">
                Create New Post
            </button>
            <CreatePostSlideOver open={openCreatePostSlideOver}
                                 setOpen={setOpenCreatePostSlideOver}
                                 onNewPostCreated={refetchPosts}
            />
        </div>

    return (
        <TwoColumnContainer secondaryContent={secondaryColumnContent}>
            {
                loading ? (
                    <CardSkeleton/>
                ) : (
                    <div className=" xl:mx-[15%]">
                        {
                            topics?.map((topic: any, index: number) => (
                                <div key={index} className="mb-6">
                                    <PostCard refetchPosts={refetchPosts}
                                              socket={socket}
                                              postDetails={topic}
                                              clickable={true}
                                              limitComments={true}
                                    />
                                </div>
                            ))
                        }
                    </div>

                )
            }

        </TwoColumnContainer>
    )
}
