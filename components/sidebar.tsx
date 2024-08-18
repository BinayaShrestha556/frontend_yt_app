"use client"
import React, { useEffect, useState } from "react";
import Sidebar_buttons from "./sidebar_buttons";
import { IoMdHome } from "react-icons/io";
import { MdOutlineWatchLater, MdSubscriptions } from "react-icons/md";
import { FaGreaterThan, FaHistory } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiPlayList2Line } from "react-icons/ri";
import { BiSolidLike, BiSolidVideos } from "react-icons/bi";
import Footer from "./Footer";
import { RootState } from "@/app/GlobalStates/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

const Sidebar = () => {
  const isSideBarOpen=useSelector((state:RootState)=>state.sidebar.isSideBarOpen)
  // const router=useRouter()
  // const {pathname}=router
  const user=useSelector((state:RootState)=>state.user)
  const [active,setActive]=useState("Home")
  return (
    <div>
     
    <div className={`bg-gray-400/5 px-3 flex  flex-col left-0 hover:overflow-y-scroll h-screen overflow-hidden transition-all ${isSideBarOpen?"w-60 opacity-100":"w-0 opacity-0"} `}>
      <div className="w-full"> 
      
        <div>
          
        <Link href={`/`}><div onClick={()=>setActive("Home")}><Sidebar_buttons bg={active} title={"Home"} icon={<IoMdHome />} /></div></Link>
        </div>
        {/* <div>
          <Sidebar_buttons
            bg={false}
            title={"Subscription"}
            icon={<MdSubscriptions />}
          />
        </div> */}
      </div>
      <hr/>
      <div>
        <div className="px-3 m-2 flex items-center gap-3">You <span className="text-lg font-extralight font-mono">{">"}</span></div>
       <Link href={`/user/${user.username}`}> <div onClick={()=>setActive("Account")}> <Sidebar_buttons bg={active} title={"Account"} icon={<CgProfile/>} /></div></Link>
        {/* <Sidebar_buttons bg={false} title={"History"} icon={<FaHistory />} /> */}
        <div onClick={()=>setActive("Liked videos")}><Sidebar_buttons bg={active} title={"Liked videos"} icon={<BiSolidLike />} /></div>
        {/* <Sidebar_buttons bg={false} title={"Playlist"} icon={<BiSolidVideos />} /> */}
        {/* <Sidebar_buttons bg={false} title={"Watch later"} icon={<MdOutlineWatchLater />} /> */}
        <Link href={`/user/${user.username}`}><div onClick={()=>setActive("Your videos")}><Sidebar_buttons bg={active} title={"Your videos"} icon={<RiPlayList2Line />} /></div></Link>

      </div>
      <hr />
<div>
  <div className="px-3 m-2"> Subscriptions</div>
  <Sidebar_buttons bg={active} title={"subAccount"} icon={<CgProfile/>} />



<Footer/>
</div>
<div className="h-[1px] my-3 bg-white/30 w-full m-auto"></div>

    </div>
    </div>
  );
};

export default Sidebar;
