"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Data } from "./Comments";
import AddComment from "./AddComment";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalStates/store";
import axios from "axios";



const CommentElement = ({
  content,
  id,
  avatar,
  videoId,
  username,
  replies,
  isReply = false,
  noOfLikes
}: {
  videoId: string;
  content: string;
  id: string;
  avatar: string;
  username: string;
  replies: Data[];
  isReply: boolean;
  noOfLikes:number;
}) => {
  const [likes, setLikes] = useState(noOfLikes);
  const [liked, setLiked] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState(false);
  const [options, setOptions] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const [deleted,setDeleted]=useState(false)
  axios.defaults.withCredentials=true
 
  const deleteComment=async()=>{
    try {
      const res=await axios.post("http://localhost:8000/api/v1/comments/delete-comment",{commentId:id})
      // console.log(res)
      if(res.status==200)
       setDeleted(true)
      
    } catch (error) {
      console.log("error while deleting",error)
    }
  }
  const likeComment=async()=>{
    try {
      
      const res=await axios.post("http://localhost:8000/api/v1/likes/like-comment",{commentId:id})
      // console.log(res)
      if(res.status==200){
       
      setLiked(!liked);
        setLikes((current) => (liked ? current - 1 : current + 1))}
      
    } catch (error) {
      console.log("error while liking",error)
    }


  }
  return (
    <div className="w-full flex flex-col gap-3 py-2 bg-white/5 z-0">
  <div className="w-full px-2 flex rounded-lg z-0 gap-2 relative">
    <div className="relative h-8 w-8 rounded-full overflow-hidden">
      <Image alt="user pfp" src={avatar} fill style={{ objectFit: 'cover' }} />
    </div>
    <div className="flex-grow">
      <div className="text-sm font-bold">{deleted?<p className="font-thin italic text-gray-300 text-sm">deleted</p>:username}</div>
      <div>{deleted?<p className="font-thin italic text-gray-300 text-sm">deleted (will dissapear after refreshing)</p>:content}</div>
      {!isReply ? (
        <>
          <button
            onClick={() => setReply((w) => !w)}
            className="text-gray-300 text-sm pl-2"
          >
            reply
          </button>{" "}
          {replies && replies.length > 0 && (
            <button
              className="text-sm underline text-gray-300 ml-2"
              onClick={() => setShowReply((current) => !current)}
            >
              {showReply
                ? "hide replies"
                : `show replies - ${replies.length}`}
            </button>
          )}
        </>
      ) : null}
    </div>

    {/* Dropdown options menu */}
    {username === user.username && (
      <div className="relative z-50">
        <BsThreeDotsVertical
          onClick={() => setOptions((e) => !e)}
          className="cursor-pointer z text-xl text-white"
        />
        <div
          className={`absolute   bg-[#282828] top-7 right-0 rounded-md transition-transform origin-top-right ${
            options ? "scale-100" : "scale-0"
          }`}
        >
          <div className="h-2 w-2  relative bg-[#282828] rounded-sm -top-1 rotate-45 left-[88%]"></div>
          <button onClick={deleteComment} className="text-red-500 font-bold m-2 mt-0 text-nowrap"> Delete comment</button>
        </div>
      </div>
    )}

    {/* Like button */}
    <div
      className="text-lg cursor-pointer relative z-40"
      onClick={likeComment}
    >
      {liked ? <FaHeart   className="text-red-500" /> : <FaRegHeart />}{" "}
      <p className="text-sm text-center">{likes > 0 ? likes : ""}</p>
    </div>
  </div>

  {reply &&<div className="ml-10"> <AddComment id={videoId} parent={id} /></div>}
  <div className="ml-10 border-l border-white/40">
    {showReply &&
      replies &&
      replies.length > 0 &&
      replies.map((e: Data, i: number) => (
        <CommentElement
          videoId={videoId}
          isReply={true}
          replies={e.replies}
          content={e.content}
          id={e._id}
          noOfLikes={e.noOfLikes}
          avatar={e.owner.avatar}
          username={e.owner.username}
          key={i}
        />
      ))}
  </div>
</div>

  );
};

export default CommentElement;
