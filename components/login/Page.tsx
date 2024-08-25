"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { setLoginState } from '@/app/GlobalStates/Features/login/loginSlice'
import { useDispatch } from 'react-redux'
// import { error } from 'console'

const Page = () => {
  // axios.defaults.withCredentials=true
  const [formData,setFormData]=useState({
    username:"",
    password:""
  })
  const dispatch=useDispatch()
  const router=useRouter()
  const onChange=(e:any)=>{
   
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value })
  

  }
  const login=async(e:any)=>{
    e.preventDefault()
    try{
    const response = await axios.post(`${process.env.NEXT_PUBLIC_TEST}/user/login`,formData)
    // console.log(response)
    dispatch(setLoginState(true))
    router.push("/")
  }catch(err){
    console.log(err)
  }


 

  }
  const handleOnclick=async()=>{
    const res=await axios.post(`${process.env.NEXT_PUBLIC_TEST}/user/refresh-access`)
    // if(res)
    //   // console.log(res)


  }
  
  return (
    <div className='w-full h-full  flex justify-center items-center -mt-20'>
      <form action="submit" onSubmit={login} className='flex flex-col gap-6 w-[20%]' method="post">
        <div>
        
          <input type="text" onChange={onChange} className='bg-transparent rounded border-[1px] border-white px-3 py-1.5 w-full ' placeholder='username' name="username" id="" />
        </div>
        <div>
        
        <input type="password" onChange={onChange} className='bg-transparent rounded border border-white px-3 py-1.5 w-full' placeholder='password ' name="password" id="" />
      </div>
      <div className='flex justify-around '>
      <button type='submit' className='px-4 py-1.5  rounded-full bg-green-500'>submit</button>
      <button type='button' onClick={handleOnclick} className='px-4 py-1.5 rounded-full text-green-500 underline'>register</button>
</div>
      

      </form>
      
      
    </div>
  )
}

export default Page
