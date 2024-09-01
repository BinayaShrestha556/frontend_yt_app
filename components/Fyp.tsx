import React from "react";
import Card from "./Card";
const getData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TEST}/video/all-videos`,
    { cache: "no-store" }
  );
  const data = await response.json();
  return data.data;
};
const Fyp = async () => {
  const data = await getData();
  // console.log(data)
  return (
   <> {data?<div className="grid gap-x-3 min-h-[80vh] gap-y-10 w-full grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5  p-2">
      { data.map((e: any, i: any) => (
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
    </div>:<div className="h-[98vh] m-auto flex items-center justify-center text-xl font-bold -mt-20"><p className="m-auto">No Videos To Show</p></div>}</>
  );
};
export default Fyp;
