"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import axios from "axios";
import { RootState } from "@/app/GlobalStates/store";
// import { store } from "@/app/GlobalStates/store";
import { useSelector } from "react-redux";
import { FaShare } from "react-icons/fa";

interface Data {
  _id: string;
  owner: {
    _id: string;
    username: string;
    fullname: string;
    avatar: string;
    coverImage: string;
    subscribersCount: number;
    subscribedToCount: number;
    isSubscribed: boolean;
  };
  likesNumber: number;
}

interface VideoBottomPartProps {
  id: string;
}

const VideoBottomPart: React.FC<VideoBottomPartProps> = ({ id }) => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.isLoggedIn.isLoggedIn
  );
  axios.defaults.withCredentials = true;
  axios.defaults.withCredentials = true;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data | null>(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const getData = async (): Promise<Data | null> => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/video/get-other-info-on-video",
        { videoId: id }
      );
      setLoading(false);
      // console.log(response.data.data);
      return response.data.data[0];
    } catch (error) {
      setLoading(true);
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);

      if (result) {
        setLikes(result.likesNumber);
        setIsSubscribed(result.owner.isSubscribed); // Update likes state based on fetched data
      }
    };

    fetchData();
  }, [id]);

  if (loading || !data) {
    return <p>Loading...</p>;
  }

  const handleLike = async () => {
    if (!isLoggedIn) {alert("need to login first");return};
    try {
      await axios.post("http://localhost:8000/api/v1/likes/like", {
        videoId: id,
      });
      // setLiked(!liked);
      setLikes((prevLikes) => prevLikes + 1);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  const handleSubscribe = async () => {
    if (isLoggedIn)
      try {
        const res = await axios.post(
          "http://localhost:8000/api/v1/subscribe/subscribeTo",
          { channel: data.owner._id }

        );
     
        if (res.data.statusCode === 200) {
          setIsSubscribed(!isSubscribed);
        }
      } catch (error) {
        console.log("error while subscribing", error);
      }
  };
  return (
    <div className="w-full flex gap-6 mt-2 rounded-xl p-3">
      <div className="flex items-center gap-3">
        <div className="rounded-full overflow-hidden w-12 relative h-12">
          <Image
            src={data.owner.avatar}
            alt="pfp"
            layout="fill"
            objectFit="cover"
          />{" "}
        </div>
        <div>
          <p className="font-semibold text-lg">{data.owner.username}</p>
          <p className="text-base text-gray-300">{data.owner.subscribersCount} subs</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          onClickFn={handleSubscribe}
          styles={`rounded-full px-5 py-2   h-fit  font-bold ${
            isSubscribed
              ? "bg-transparent text-white border border-white "
              : "bg-white text-black"
          }`}
        >
        {isSubscribed?"Subscribed":"Subscribe"}
        </Button>
        <div className=" bg-white/20 flex text-xl py-2 px-6 rounded-full gap-2 items-center">
          <div className="cursor-pointer " onClick={handleLike}>
            {false ? <AiFillLike /> : <AiOutlineLike />}
          </div>
          <p className="text-sm">{likes}</p>
          |
          <AiOutlineDislike />
        </div>
        <button className="text-white bg-white/30 py-1.5 px-3 rounded-full text text-sm font-semibold flex items-center gap-1.5 "  onClick={()=>{navigator.clipboard.writeText(`http://localhost:3000/video/${id}`)}}><FaShare  />Share</button>
      </div>
    </div>
  );
};

export default VideoBottomPart;
