"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { RootState } from "@/app/GlobalStates/store";
import { setLoginModalState } from "@/app/GlobalStates/Features/modalSlice";
import { setLoginState } from "@/app/GlobalStates/Features/login/loginSlice";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn.isLoggedIn);
  const modalState = useSelector((state: RootState) => state.loginModal.isModalOpen);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/user/logout");
      dispatch(setLoginState(false));
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLoginClick = () => {
    dispatch(setLoginModalState(!modalState));
    router.push("/user/login");
  };

  return (
    <nav className="w-full fixed bg-black z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center text-white text-2xl gap-6">
          <GiHamburgerMenu />
          <span className="font-semibold">NewTube</span>
        </div>

        <div className="flex flex-grow items-center justify-center">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-4 py-1.5 bg-transparent border border-gray-200 rounded-l-full w-1/2"
            placeholder="Search"
          />
          <button className="px-4 py-1.5 bg-gray-300 rounded-r-full border-l border-gray-200 flex items-center">
            <CiSearch size={24} />
          </button>
        </div>

        <div className="flex items-center text-white text-xl gap-4">
          <MdVideoCall />
          <IoMdNotificationsOutline />
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-8 h-8 rounded-full bg-gray-400/50 flex items-center justify-center"
            >
              <span>Logout</span>
            </button>
          ) : (
            <button
              onClick={handleLoginClick}
              className="px-4 py-1.5 text-sm rounded-md bg-blue-500"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
