"use client"

import { RootState } from "@/app/GlobalStates/store"
import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import { MdSend } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import CommentElement from "./CommentElement"

const AddComment = ({id,parent}:{id:string,parent:string|null}) => {
  axios.defaults.withCredentials=true
    const[comment,setComment]=useState("")
    const user = useSelector((state:RootState)=>state.user)
    const [addedComment,setAddedComment]=useState<string[]>([])
    const [loading,setLoading]=useState(false)
    const handleSubmit=async()=>{
      setLoading(true)
      if(comment.trim()==""||null||undefined) {
        setLoading(false)
        return}
      try{
        console.log(id,comment,parent)
        const data={
          video:id,
          content:comment,
          parent
        }
        const res=await axios.post(`${process.env.NEXT_PUBLIC_TEST}/comments/post-comment`,data)
        if(res.data.statusCode==200){
          console.log("success")
          setAddedComment([...addedComment,comment])
          setLoading(false)

        }

      }catch(error){
      console.log("error while posting comment",error)

    }
    }
  return (
    <div className="w-full">
      <div className="w-full gap-2 flex">
          <div className="relative w-9 h-8 rounded-full overflow-hidden">{
              user&&
          <Image alt='user pfp' src={user.avatar} layout='fill' objectFit='cover' />}

          </div>
        <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Add comment" className="w-full py-1.5 px-3 rounded-full border bg-transparent" />
        {loading?<div className="h-8 w-9 border border-b-0 border-t-2 animate-spin rounded-full"></div>:<button className="text-4xl" title="post comment" onClick={handleSubmit}><MdSend /></button>}
      </div>
      <div className="w-full mt-2">
            {
              addedComment.map((e,i)=>(
                <CommentElement videoId={id} content={e} avatar={user.avatar} id={id} isReply={false} noOfLikes={0} replies={[]} username={user.username} key={i}/>
              ))
            }
      </div>
    </div>
  )
}

export default AddComment
