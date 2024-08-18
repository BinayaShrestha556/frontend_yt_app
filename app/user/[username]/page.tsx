"use client"
import Card from '@/components/Card';
import Button from '@/components/userPage/Button';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
interface Params{
  params:{
    username:string;
  }
}
interface data{
  _id: string;
  username: string;
  fullname: string;
  avatar: string;
  coverImage: string;
  subscribersCount: number;
  subscribedToCount: number;
  isSubscribed: boolean;

}
axios.defaults.withCredentials=true
const getUserData=async(username:string):Promise<data|null>=>{
 try {
   const data=await axios.get(`${process.env.NEXT_PUBLIC_TEST}/user/channel/${username}`)
   console.log
   if(data.data.statusCode===200)
   return data.data.data
  return null
 } catch (error) {
  console.log("error while fetching user",error)
  return null
  
 }

}
const getVideoData = async (username:string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_TEST}/video/uname/${username}`
    );
    console.log(res.data.data);

    return res.data.data;
  } catch (error) {
    
    console.log(error);
    return null
  }
  
};
const page = ({params}:Params) => {
  const [userData,setUserData]=useState<data>()
  const [videoData,setVideoData]=useState<any>()
 useEffect(()=>{
  const getData=async()=>{
    const userData=await getUserData(params.username)
    if(userData)
    setUserData(userData)
  const videoData=await getVideoData(params.username)
  if(videoData){
    setVideoData(videoData)
  
  
  }
  
  }
  getData();


 })

  return (
    <div className='pb-52'>
      <div className="flex flex-col gap-3 text-white">
        
        <div className="coverimage relative  w-full h-52 bg-white/20">
         { userData&&<Image src={userData.coverImage} placeholder='blur' blurDataURL={userData.avatar} alt='coverimage' fill objectFit='cover'/>}

        </div>
        <div className="flex gap-3 w-full">
        <div className='h-32 w-32 relative rounded-full overflow-hidden'>
         { userData&&(<Image src={userData.avatar}  alt='pfp' fill objectFit='cover'/> )}
        </div>
         {userData&&(<div className=''>
          <p className='text-3xl font-bold '>{userData.fullname}</p>

          <p className='text-gray-500 '>{userData.username}</p>
          <div className='flex text-gray-500'>
          <p >
            {userData.subscribersCount} subscribers • &nbsp; 

          </p>
          <p className=''> {userData.subscribedToCount} videos</p>

          </div>
{userData&&<Button username={userData.username} _id={userData._id} isSubscribed={userData.isSubscribed} />}

         </div>)}



        </div>
        <hr className="w-full" />
        { videoData &&<div className='grid grid-cols-4'>
          {
            videoData.map((e:any,i:number)=>(
              <Card
              avatar={e.owner.avatar}
              thumbnail={e.thumbnail}
              time={e.createdAt}
              title={e.title}
              username={e.owner.username}
              views={e.views}
              _id={e._id}
              key={i}
            />
            ))
          }

        </div>}
        
        </div>
      </div>
        
      
  
  )
}

export default page
