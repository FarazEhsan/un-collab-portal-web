"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import CarouselModal from "@/components/modals/carousel-modal";
import CommentSection from "@/components/cards/comment-section";
import CommentTextArea from "@/components/form/CommentTextArea";
import ReactionButtons from "@/components/form/reaction-buttons";
import TimeAgo from "@/components/form/time-ago";
import { useUser } from "@auth0/nextjs-auth0/client";
import {getNameString, ReactionType} from "@/utils/extraFunctions";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

type Comment = {
  _id: string;
  text: string;
  createdAt: string;
  author: {
    userName: string;
  };
  parentComment: {
    _id: string;
  };
};

const PostCard = ({
  postDetails,
  socket,
  refetchPosts,
  clickable = false,
  limitComments = false,
}: any) => {
  const {
    user: auth0User,
    error: auth0UserError,
    isLoading: auth0Loading,
  } = useUser();
  const [openCarouselModal, setOpenCarouselModal] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState("");
  const [reactionsCount, setReactionsCount] = useState({ up: 0, down: 0 });
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [reactionData, setReactionData] = useState<any>([]);
  const [nameString, setNameString] = useState('')


  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const postComment = (e: React.FormEvent) => {
    e.preventDefault();

    const commentData = {
      text: comment,
      author: auth0User?.sub?.toString(),
      topic: postDetails._id,
      parentComment: null,
      reactions: null,
    };

    if (socket) {
      console.log(commentData);
      socket?.emit("postComment", commentData);
      setComment("");
    }
  };

  const onReactionChange = (reaction: string) => {
    setSelectedReaction(reaction);
    postReaction(reaction);
  };

  const postReaction = (reaction: string) => {
    console.log("posting reaction:", reaction);
    const reactionData = {
      type: reaction,
      user: auth0User?.sub?.toString(),
      comment: null,
      topic: postDetails._id,
    };
    socket?.emit("postTopicReaction", reactionData);
  };

  useEffect(() => {
    console.log("postDetails.comments in post-card", postDetails.comments);
    socket?.emit("joinForum", postDetails._id);
    if (postDetails.comments) {
      console.log("setting comments", postDetails.comments);
      setAllComments(postDetails.comments);
    }
    if (postDetails.reactions) {
      setReactionData(postDetails.reactions);
      renderReactions(postDetails.reactions);
    }
  }, []);

  useEffect(() => {

    const handleTopicReactionPosted = (newReaction: any) => {
      console.log("reaction posted...", newReaction);

      if (reactionData) {
        setReactionData([...reactionData, newReaction]);
        renderReactions([...reactionData, newReaction])
      }
    };
    const handleTopicCommentPosted = (newComment: any) => {
      console.log("comment posted...");
      console.log("new comment from commentPosted", newComment);
      console.log("all comments", allComments);
      if (allComments) {
        setAllComments([...allComments, newComment]);
      }
      //refetchCommentData();
    };

    const handleTopicReactionCountUpdated = (newCount: any) =>{
      console.log('new reaction count', newCount);
    }

    socket?.on("topicReactionPosted", handleTopicReactionPosted);
    socket?.on("updatedTopicReactionCounts", handleTopicReactionCountUpdated);
    socket?.on("commentPosted", handleTopicCommentPosted);

    return () => {
      // Clean up the listener when the component is unmounted
      socket?.off("topicReactionPosted", handleTopicReactionPosted);
      socket?.off("commentPosted", handleTopicCommentPosted);
    };
  }, [allComments, reactionData]);

  const renderReactions = (reactionsData: any) => {
    let up = 0;
    let down = 0;
    console.log("rendering reactions");
    if (reactionsData) {
      // up = 0
      // down = 0
      reactionsData?.map((r: any) => {
        if (r.type === ReactionType.Up) up++;
        if (r.type === ReactionType.Down) down++;
        if (r.author === auth0User?._id) setSelectedReaction(r.type);
      });
    }
    setReactionsCount({ up, down });
  };

  useEffect(() => {
    console.log(postDetails?.author?.name)
    setNameString(getNameString(postDetails?.author?.name));
  }, [postDetails]);

  let hoverClasses = "";
  if (clickable) hoverClasses = "dark:hover:bg-gray-800 hover:bg-gray-100";

  return (
    <div
      className={`dark:bg-gray-900  bg-white border border-gray-200 dark:border-gray-700 rounded-xl shadow-md dark:shadow-gray-950 p-4 ${hoverClasses}`}
    >
      {/*Image*/}

      {/*Post Body*/}
      <div className="">
        <div className="flex flex-row items-center">
          <img
            className="inline-block h-10 w-10 rounded-full object-cover"
            src={postDetails?.author?.picture ? postDetails?.author?.picture : `https://ui-avatars.com/api/?name=${nameString}?background=random`}
            alt=""
          />
          <div className="ml-2">
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
              {postDetails?.author?.userName}
            </h2>
            {/*<p className="text-xs text-gray-500 dark:text-gray-400">2*/}
            {/*    hours ago</p>*/}
            <TimeAgo timestamp={postDetails?.createdAt} />
          </div>
        </div>
        <div className="mt-4">
          {clickable ? (
            <Link
              className="text-lg font-medium leading-7 text-gray-900 dark:text-gray-100 hover:underline cursor-pointer"
              href={`topic/${postDetails._id}`}
            >
              {postDetails?.title}
            </Link>
          ) : (
            <h2 className="text-lg font-medium leading-7 text-gray-900 dark:text-gray-100">
              {postDetails?.title}
            </h2>
          )}
        </div>
      </div>

      {postDetails?.images?.length ? (
        <div
          onClick={() => setOpenCarouselModal(!openCarouselModal)}
          className="h-96 my-4 rounded-md"
        >
          <img
            src={postDetails.images[0]}
            className="h-full w-full object-contain rounded-md"
          />
          <CarouselModal
            open={openCarouselModal}
            setOpen={setOpenCarouselModal}
            images={postDetails.images}
          />
        </div>
      ) : (
        ""
      )}

      <div>
        <p className="text-base leading-6 text-gray-800 dark:text-gray-200">
          {postDetails?.description?.substring(0, 225)}
          {postDetails?.description?.length > 255 ? "..." : ""}
        </p>
      </div>

      {/*Reactions*/}
      <div className="mt-6">
        <ReactionButtons
          selectedReaction={selectedReaction}
          setSelectedReaction={onReactionChange}
          reactionCount={postDetails?.reactionCounts}
        />
      </div>
      {
        limitComments && (
              <div>
                <h4 className="mt-6 text-base font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Comments: {postDetails?.commentsCount}
                </h4>
              </div>
          )
      }


      {/*Comments*/}
      {!limitComments && (
          <>
            <div className="mt-6">
              <CommentTextArea
                  onSubmit={postComment}
                  onChange={handleCommentChange}
                  value={comment}
                  label="Add a Comment"
                  name="comment"
              />
            </div>
            <div className="mt-6">
              <CommentSection
                  comments={allComments}
                  topicId={postDetails?._id}
                  commentsCount={postDetails?.commentsCount}
                  limitComments={limitComments}
                  socket={socket}
                  image={postDetails?.author?.picture ? postDetails?.author?.picture : `https://ui-avatars.com/api/?name=${nameString}?background=random`}
              />
            </div>
          </>

      )}
    </div>
  );
};

export default PostCard;
