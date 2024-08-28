export const dynamic = "force dynamic";
export const revalidate = 0;

import React from "react";
import Card from "./Card";
const getData = async () => {
  try {
    const { signal } = new AbortController();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TEST}/video/all-videos`,
      { cache: "no-store" }
    );
    // console.log(res.data.data);
    const res = await response.json();

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const Fyp = async () => {
  const data = await getData();
  // console.log(data)
  return (
    <div className="grid gap-x-3 gap-y-10 grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5  pb-24 p-2">
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
