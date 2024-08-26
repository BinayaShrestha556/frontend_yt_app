"use client"
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoginState } from "@/app/GlobalStates/Features/login/loginSlice";
import { useRouter } from "next/navigation";

interface form {
  username: string;
  password: string;
  avatar: File | null;
  coverImage: File | null;
  email: string;
  fullname: string;
  conformPassword:string;
}

const Page = () => {
  const router=useRouter()
  const dispatch=useDispatch()
  const [loading,setLoading]=useState(false)
  const [formData, setFormData] = useState<form>({
    username: "",
    password: "",
    conformPassword:"",
    avatar: null,
    coverImage: null,
    email: "",
    fullname: "",
  });

    const onChange=(e:any)=>{
      
   
      const { name, value, type, files } = e.target;
      if (type === 'file') {
        setFormData({
          ...formData,
          [name]: files ? files[0] : null
        });
      } else {
        setFormData({
          ...formData,
          [name]: value
        });
      }
  
    }
  
  const submitForm =async(e:any)=>{
    e.preventDefault()
    setLoading(true)
    const form=new FormData();
    if(!formData.username||!formData.fullname||!formData.email||!formData.password){
      alert("all field required")
      setLoading(false)
      return
    }
    if(formData.password!=formData.conformPassword){
      alert("Password dont match")
      setLoading(false)
      return
    }
    if (!formData.avatar) {alert("pfp needed");setLoading(false);return}

    form.append("username",formData.username)
    form.append("password",formData.password)
    form.append("avatar",formData.avatar)
    form.append("email",formData.email)
    form.append("fullname",formData.fullname)
    if(formData.coverImage)
    form.append("coverImage",formData.coverImage )
  try{
    console.log(form)
    const res=await axios.post(`${process.env.NEXT_PUBLIC_TEST}/user/register`,form)
    // console.log(
    //   res
    // )
    if(res.data.statusCode==200)
    {
      try{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_TEST}/user/login`,{username:formData.username,password:formData.password})
        // console.log(response)
        dispatch(setLoginState(true))
        window.location.replace("https://localhost:3000")
       
    }
    catch(error){
      console.log(error, " login error")
      
    }
    // router.push("/user/login")
  }
  }catch(error:any){
    console.log(error)
    // alert(error.response.data.message)
  }


  }
  return ( 
  <div className="flex justify-center items-center w-full h-[800px] -mt-20">
    <form action="submit"className=" flex flex-col gap-4 w-[90%] tablet:w-[50%]" onSubmit={submitForm} method="post">
    
            
            <input type="text" name="fullname" placeholder="Full Name" onChange={onChange} className="w-full px-4 py-1.5 rounded-lg bg-transparent border border-white focus:border-green-500" />
        
    
            
            <input type="text" name="username" placeholder="Username" onChange={onChange} className="w-full px-4 py-1.5 rounded-lg bg-transparent border border-white focus:border-green-500" />
        
    
            
            <input type="text" name="password" placeholder="Password" onChange={onChange} className="w-full px-4 py-1.5 rounded-lg bg-transparent border border-white focus:border-green-500" />
        
            <input type="text" name="conformPassword" placeholder="Conform Password" onChange={onChange} className="w-full px-4 py-1.5 rounded-lg bg-transparent border border-white focus:border-green-500" />

            
            <input type="email" name="email" placeholder="Email" onChange={onChange} className="w-full px-4 py-1.5 rounded-lg bg-transparent border border-white focus:border-[1px-solid-green]" />
        
        <div>
            <label  className="block     text-white">profile picture</label>
            <input type="file" name="avatar" placeholder="Profile pic" onChange={onChange} className="w-full px-4 py-1.5 rounded-lg " />
        </div>
        <div className="m-auto">{loading&&
           <div className="h-10 w-10 rounded-full border-l-green-400 border-t-red-500 border-2 border-b-0 animate-spin"></div>}
        </div>
        <div className="flex justify-around">
          <button type="submit" className="text-white px-4 py-1.5 rounded-full w-[30%] bg-green-500">register</button><button type="button" className="text-green-500 px-4 py-1.5 rounded-full bg-transparent underline">I have an account</button>

        </div>

    </form>

    
  </div>
)};

export default Page;
