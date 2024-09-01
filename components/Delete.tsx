"use client"
import { RootState } from '@/app/GlobalStates/store'
import axios from 'axios'
import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const Delete = ({videoId,username}:{videoId:string,username:string}) => {
    const isLoggedIn=useSelector((state:RootState)=>state.isLoggedIn.isLoggedIn)
    const user=useSelector((state:RootState)=>state.user.username)
    const [isDeleteOpen,setIsDeleteOpen]=useState(false)
    const handleClick=async()=>{
        if(!isLoggedIn)
            return
        if(user===username){
            try {
                const res=await axios.post(`${process.env.NEXT_PUBLIC_TEST}/video/delete`,{videoId})
                if(res.status==200){
                    alert("deleted")
                }
            } catch (error) {
                console.log(error)
            }
        }
        
    }
  return (
    <div className='relative text-white'>
        {user===username&&<div className="relative">
      <BsThreeDotsVertical onClick={()=>setIsDeleteOpen((e)=>!e)}/>
      {isDeleteOpen&&<div onClick={handleClick} className='px-3 py-2 cursor-pointer  text-nowrap bg-red-500 font-bold rounded-xl border border-white/10 absolute right-full'> Delete Video</div>}</div>}
    </div>
  )
}

export default Delete
