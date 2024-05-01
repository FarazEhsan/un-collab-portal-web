'use client'
import TwoColumnContainer from "@/components/navigation/twoColumnContainer";
import PostCard from "@/app/[locale]/(home)/post-card";
import {useEffect, useState} from "react";
import CreatePostSlideOver from "@/components/overlays/create-post-slide-over";
import {gql, useQuery} from "@apollo/client";
import CardSkeleton from "@/components/skeletons/card-skeleton";
import useSocket from "@/hooks/useSocketClient";
import {useTranslations} from "next-intl";

const GET_ALL_TOPICS = gql`
    query GetAllTopics{
  alltopics{
  _id
    title
    images
    createdAt
    commentsCount
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

    author{
    name
      userName
      picture
    }
    description
  }
}
  `;

export default function Home() {
    const {loading, error, data, refetch} = useQuery(GET_ALL_TOPICS);

    const [openCreatePostSlideOver, setOpenCreatePostSlideOver] = useState(false);
    const [topics, setTopics] = useState([])

    const socket = useSocket();

    useEffect(() => {
        const handleTopicPosted = () => {
            // console.log('topic posted...');
            refetch();
        };
        socket?.on('topicPosted', handleTopicPosted);
    }, []);

    useEffect(() => {
        setTopics(data?.alltopics);
        // console.log('updating topics', data)
    }, [data]);

    const refetchPosts = () => {
        // console.log("Updating feed through refetch");
        refetch();
    }
    const t = useTranslations('Home');

    const secondaryColumnContent =
        <div>
            <button
                onClick={() => setOpenCreatePostSlideOver(!openCreatePostSlideOver)}
                className="bg-custom-orange hover:bg-amber-500 dark:bg-amber-500 dark:hover:bg-custom-orange text-gray-900 rounded-md font-semibold py-2 px-3 w-full">
                {t('createNewPost')}
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
