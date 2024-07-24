import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
 const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/video/all-videos"
      );
      console.log(res.data.data);

      return res.data.data;
    } catch (error) {
      alert("error while fetching videos");
      console.log(error);
    }
  };
const Fyp =async () => {
 
 
const data=await getData()
  return (
    <div className="grid gap-x-3 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  pb-24 p-2">
      {data.map((e: any, i: any) => (
        <Card
          avatar={e.owner.avatar}
          thumbnail={e.thumbnail}
          time={e.createdAt}
          title={e.title}
          username={e.owner.username}
          views={e.views}
          _id={e._id}
          key={i}
        />
      ))}
    </div>
  );
};
export default Fyp;
