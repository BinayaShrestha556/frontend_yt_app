import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
interface props {
  title: string;
  thumbnail: string;
  avatar: string;
  username: string;
  time: Date;
  views: number;
  _id:string
}

export default function Card({
  title,
  thumbnail,
  avatar,
  time,
  username,
  views,
  _id
}: props) {
  const date = new Date(time);
  // console.log(avatar)
  
const truncate =(string:string)=>{
  const newString = string.substring(0,50)
  if (string.length<50)return newString
  return newString+"..."

}

  return (
    <div title={title} className="w-full  rounded-xl  flex flex-col  gap-2 leading-tight hover:scale-[101%]  transition-all ease-in-out duration-75 ">
      <Link href={`/video/${_id}`}>
      <div className="w-full h-60 relative bg-gray-200 overflow-hidden rounded-xl">
        <Image
          alt="thumbnail"
          src={thumbnail}
          fill
          style={{objectFit: "cover"}}
        />
      </div>
      <div className="flex w-full gap-2">
        <div className="w-10">
          <div className="w-10 aspect-square relative overflow-hidden rounded-full bg-gray-500 mt-1">
            <Image alt="user" src={avatar} 	sizes="(max-width: 500px) 100vw, 33vw" fill style={{objectFit: "cover"}} />
          </div>
        </div>
        <div className="flex-grow">
          <div className="w-full text-lg leading-6">
            {truncate(title)}
          </div>
          <div className="text-gray-300/90 leading-5 text-base">{username}</div>
          <div  className="text-gray-300/90 leading-5 text-base"> <span>{views} views</span> | {date.toJSON().slice(0,10)}</div>
        </div>
        <div className="w-4 mt-1 text-lg"><BsThreeDotsVertical /></div>
      </div></Link>
    </div>
  );
}
