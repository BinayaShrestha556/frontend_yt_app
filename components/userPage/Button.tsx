"use client"
import React, { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import { RootState } from '@/app/GlobalStates/store'
import axios from 'axios'
import Link from 'next/link'


const Button = ({username,_id,isSubscribed}:{username:string,_id:string,isSubscribed:boolean}) => {
  useEffect(()=>{
    setSubscribed(isSubscribed)
  },[isSubscribed])
  const currentUser=useSelector((store:RootState)=>store.user.username)
  const isLoggedIn=useSelector((store:RootState)=>store.isLoggedIn)
  const [subscribed,setSubscribed]=useState(isSubscribed)
  axios.defaults.withCredentials=true
  const handleSubscribe = async () => {
    if (isLoggedIn)
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_TEST}/subscribe/subscribeTo`,
          { channel: _id }

        );
     
        if (res.data.statusCode === 200) {
          setSubscribed(!isSubscribed);
        }
      } catch (error) {
        console.log("error while subscribing", error);
      }
  };
  return (
    <div className='py-2 px-4'>
       
      {currentUser!==username?<button onClick={handleSubscribe} className="py-1 px-3 bg-transparent border rounded-lg mt-2"   >{subscribed?"subscribed":"subscribe"}</button>: <Link href={"/"}><button className='py-1 px-3 bg-transparent border rounded-lg mt-2'>edit profile</button></Link>}
    </div>
  )
}

export default Button
