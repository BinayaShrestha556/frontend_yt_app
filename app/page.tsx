
import Card from "@/components/Card";
import { RootState } from "./GlobalStates/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginState } from "./GlobalStates/Features/login/loginSlice";
import axios from "axios";
import Fyp from "@/components/Fyp";


const Main = () => {

  return (
    <div className=" z-0">

    


    <div className="  w-full z-0">
 
<Fyp/>
    </div>
    </div>
  );
};

export default Main;
