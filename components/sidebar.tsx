"use client";
import React, { useEffect, useState } from "react";
import Sidebar_buttons from "./sidebar_buttons";
import { IoMdHome } from "react-icons/io";

import { CgProfile } from "react-icons/cg";
import { RiPlayList2Line } from "react-icons/ri";
import { BiSolidLike } from "react-icons/bi";

import { RootState } from "@/app/GlobalStates/store";
import {  useSelector } from "react-redux";


import Link from "next/link";
import axios from "axios";
import SubsImage from "./SubsImage";
import { cn } from "@/lib/util";

interface subscriptions {
  _id: string;
  channel: {
    _id: string;
    username: string;
    avatar: string;
  };
  __v: number;
}

const Sidebar = () => {
  const isSideBarOpen = useSelector(
    (state: RootState) => state.sidebar.isSideBarOpen
  );
  const sidebarForSmall=useSelector((state:RootState)=>state.sidebar.sideBarForSmall)
  axios.defaults.withCredentials = true;
  

  const user = useSelector((state: RootState) => state.user);
  const isLoggedIn = useSelector(
    (state: RootState) => state.isLoggedIn.isLoggedIn
  );
  const [active, setActive] = useState("Home");
  const [data, setData] = useState<subscriptions[] | null>(null);

  const getSubscriptions = async (): Promise<subscriptions[] | null> => {
    try {
      if (!isLoggedIn) return null;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_TEST}/subscribe/subscriptions`
      );
      if (response.status === 200) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch subscriptions", error);
      return null;
    }
  };

  useEffect(() => {
    
    const fetchSubscriptions = async () => {
      const subscription = await getSubscriptions();
      if (subscription) {
        setData(subscription);
      }
    };

    fetchSubscriptions();
  }, [isLoggedIn]);

  return (
    <div className={cn("overflow-hidden transition-all w-0 xl:block",isSideBarOpen?"xl:w-64 ":"xl:w-0",sidebarForSmall?"w-64":"w-0")}>
      <div
        className={`bg-gray-400/5 md:px-3  w-full flex-col left-0 hover:overflow-y-scroll h-screen overflow-hidden transition-all `}
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
        </div>
        <hr className="mt-2" />
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

          <div onClick={() => setActive("Liked videos")}>
            <Sidebar_buttons
              bg={active}
              title={"Liked videos"}
              icon={<BiSolidLike />}
            />
          </div>

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
        <div className="mt-3 border-[1px] border-neutral-700" />
        <div>
          <div className="px-3 m-2"> Subs</div>
          {isLoggedIn ? (
            data?.map((e, i) => (
              <Link href={`/user/${e.channel.username}`} key={i}>
                <Sidebar_buttons
                  key={i}
                  bg={active}
                  title={e.channel.username}
                  icon={<SubsImage avatar={e.channel.avatar} />}
                />
              </Link>
            ))
          ) : (
            <Link href={"/user/login"} className="w-full p-2">
              <div className="px-3 py-1.5 m-auto w-[98%] rounded border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer font-bold">
                login
              </div>
            </Link>
          )}
        </div>
        <div className="h-[1px] my-3 bg-white/30 w-full m-auto"></div>
      </div>
    </div>
  );
};

export default Sidebar;
