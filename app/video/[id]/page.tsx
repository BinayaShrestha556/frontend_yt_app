"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React from 'react'
const params=useParams()
const getData= async ()=>{
  const res=await axios.get(`http://localhost:8000/api/v1/video/v/${params.id}`)
  if(res.status==200){
    return res.data.data
  }
  console.log(res)
  throw new Error("not loaded")
}
const page = () => {
  return (
    <div>
      <video  className='w-[70%]' controls src="http://res.cloudinary.com/dtnzu6ts5/video/upload/v1721616653/ovudh8kwaoibsptmrfa5.mp4"></video>
    </div>
  )
}

export default page
