"use client";
import { setLoginModalState } from "@/app/GlobalStates/Features/login/modalSlice";
import { setLoginState } from "@/app/GlobalStates/Features/login/loginSlice";
import { setIsSideBarOpen } from "@/app/GlobalStates/Features/login/sidebarSlice";
import { RootState } from "@/app/GlobalStates/store";
import axios from "axios";
import React, { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";

const Navbar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn.isLoggedIn);
  const modalState = useSelector((state: RootState) => state.loginModal.isModalOpen);
  const isSideBarOpen= useSelector((state: RootState)=> state.sidebar.isSideBarOpen)
  const dispatch = useDispatch();
  const router = useRouter();
  axios.defaults.withCredentials=true

  const handleOnclickLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/user/logout");
      // Update Redux state
      dispatch(setLoginState(false));
      // Redirect to homepage and reload
      router.push("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const checkLogin = async () => {

    try {
      const refresh=await axios.post("http://localhost:8000/api/v1/user/refresh-access")
      console.log(refresh.status, " refresh")
      const loginUser = await axios.post(
        "http://localhost:8000/api/v1/user/current-user"
      );
      if (loginUser.status == 200) {
        dispatch(setLoginState(true));
        return;
      }
      
    } catch (error:any) {
      console.log(error)
    }
  };
  useEffect(() => {
    // Any client-side specific logic can go here
    console.log("helooooooooo")
    checkLogin()
  }, []);

  return (
    <div className="w-full fixed bg-black/30 z-50">
      <div className="justify-between flex items-center px-7 py-4 w-full">
        <div className="left flex gap-6 text-white text-2xl justify-between items-center">
          <GiHamburgerMenu onClick={()=>{dispatch(setIsSideBarOpen(!isSideBarOpen))}}/>
          <Link href={"/"}>
          <span className="text-2xl font-semibold text-white">NewTube</span></Link>
        </div>
        <div className="mid w-[40%] flex justify-center">
          <input
            type="text"
            className="px-4 py-1.5 bg-transparent border border-gray-200/35 rounded-l-full w-[80%]"
            placeholder="Search"
          />
          <button className="w-20 rounded-r-full border-r-[1px] border-t-[1px] border-b-[1px] border-gray-200/35 bg-gray-300/20 flex items-center justify-center text-3xl">
            <CiSearch />
          </button>
        </div>
        <div className="right flex justify-center items-center text-[30px] gap-4">
          <Link href={isLoggedIn?"/video/upload":"/user/login"}><MdVideoCall/></Link>
          <IoMdNotificationsOutline />
          {isLoggedIn ? (
            <div onClick={handleOnclickLogout} className="w-8 h-8 rounded-full bg-gray-400/50"></div>
          ) : (
            <button
              onClick={() => {
                dispatch(setLoginModalState(!modalState));
                router.push("/user/login");
              }}
              className="px-2.5 py-1.5 text-sm rounded-md bg-blue-500"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
