"use client"
import React, { useEffect } from 'react'
import { setIsSideBarOpen } from '@/app/GlobalStates/Features/sidebarSlice'
import { store } from '@/app/GlobalStates/store'
import { RootState } from '@/app/GlobalStates/store'
import { useDispatch, useSelector } from 'react-redux'
const Video = ({url}:{url:string}) => {
  // const isSideBarOpen= useSelector((state:RootState)=>state.sidebar.isSideBarOpen)
  const dispatch=useDispatch()
  // useEffect(()=>{dispatch(setIsSideBarOpen(false))},[])
  
  return (
    <div>
      <video controls className='w-full max-h-[60vh]' src={url}></video>
      
    </div>
  )
}

export default Video
