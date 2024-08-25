
import Page from "@/components/userPage/Page";

import React from "react";
interface Params {
  params: {
    username: string;
  };
}
const page=({params}:Params)=>{
  return(
    <Page username={params.username}/>
  )
}
export default page;
