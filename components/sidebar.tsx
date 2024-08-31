"use client";
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
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setIsSideBarOpen } from "@/app/GlobalStates/Features/sidebarSlice";

import Link from "next/link";
import axios from "axios";
import SubsImage from "./SubsImage";
import { link } from "fs";
interface subscriptions{
  
    _id: string
    channel: {
        _id: string
        username: string,
        avatar: string
    },
    __v: number

}

const Sidebar = () => {
  const isSideBarOpen = useSelector(
    (state: RootState) => state.sidebar.isSideBarOpen
  );
  axios.defaults.withCredentials=true
  const dispatch = useDispatch();
  // const router=useRouter()
  // const {pathname}=router
  const user = useSelector((state: RootState) => state.user);
  const isLoggedIn=useSelector((state:RootState)=>state.isLoggedIn.isLoggedIn)
  const [active, setActive] = useState("Home");
const [data,setData]=useState<subscriptions[]|null>(null)
// const [data, setData] = useState<subscriptions[] | null>(null);

const getSubscriptions = async (): Promise<subscriptions[] | null> => {
  try {
    if(!isLoggedIn) return null
    const response = await axios.post(`${process.env.NEXT_PUBLIC_TEST}/subscribe/subscriptions`);
    if (response.status === 200) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch subscriptions', error);
    return null;
  }
};

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 600) {
      dispatch(setIsSideBarOpen(false));
    } else {
      dispatch(setIsSideBarOpen(true));
    }

    // console.log(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);
  handleResize();

  const fetchSubscriptions = async () => {
    const subscription = await getSubscriptions();
    if (subscription) {
      setData(subscription);
    }
  };

  fetchSubscriptions();

  return () => {
    window.removeEventListener("resize", handleResize);
  }}, [isLoggedIn]);

  return (
    <div>
      <div
        className={`bg-gray-400/5 tablet:px-3 mt-20  flex-col left-0 hover:overflow-y-scroll h-screen overflow-hidden transition-all ${
          isSideBarOpen ? " opacity-100 " : "w-0 opacity-0 "
        } `}
      >
        <div className="w-full">
          <div>
            <Link href={`/`}>
              <div onClick={() => setActive("Home")}>
                <Sidebar_buttons
                  bg={active}
                  title={"Home"}
                  icon={<IoMdHome />}
                />
              </div>
            </Link>
          </div>
          {/* <div>
          <Sidebar_buttons
            bg={false}
            title={"Subscription"}
            icon={<MdSubscriptions />}
          />
        </div> */}
        </div>
        <hr />
        <div>
          <div className="px-3 m-2 flex items-center gap-3">
            You <span className="text-lg font-extralight font-mono">{">"}</span>
          </div>
          <Link href={`/user/${user.username}`}>
            {" "}
            <div onClick={() => setActive("Account")}>
              {" "}
              <Sidebar_buttons
                bg={active}
                title={"Account"}
                icon={<CgProfile />}
              />
            </div>
          </Link>
          {/* <Sidebar_buttons bg={false} title={"History"} icon={<FaHistory />} /> */}
          <div onClick={() => setActive("Liked videos")}>
            <Sidebar_buttons
              bg={active}
              title={"Liked videos"}
              icon={<BiSolidLike />}
            />
          </div>
          {/* <Sidebar_buttons bg={false} title={"Playlist"} icon={<BiSolidVideos />} /> */}
          {/* <Sidebar_buttons bg={false} title={"Watch later"} icon={<MdOutlineWatchLater />} /> */}
          <Link href={`/user/${user.username}`}>
            <div onClick={() => setActive("Your videos")}>
              <Sidebar_buttons
                bg={active}
                title={"Your videos"}
                icon={<RiPlayList2Line />}
              />
            </div>
          </Link>
        </div>
        <hr />
        <div>
          <div className="px-3 m-2"> Subs</div>
         {
          data?.map((e,i)=>(
            <Link href={`/user/${e.channel.username}`} key={i}>
            <Sidebar_buttons
            key={i}
            bg={active}
            title={e.channel.username}
            icon={<SubsImage avatar={e.channel.avatar}/>}
          /></Link>
          ))
         }

        </div>
        <div className="h-[1px] my-3 bg-white/30 w-full m-auto"></div>
      </div>
    </div>
  );
};

export default Sidebar;
