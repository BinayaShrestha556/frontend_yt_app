import axios from "axios";
import React from "react";
import CommentElement from "./CommentElement";
import AddComment from "./AddComment";
export interface Data {
  _id: string;
  content: string;
  replies: Data[];
  noOfLikes: number;
  owner: {
    _id: string;
    username: string;
    fullname: string;
    avatar: string;
  };
  createdAt: string;
}
const getComments = async (id: string): Promise<[Data] | null> => {
  try {
    const res = await axios.get(`http://localhost:8000/api/v1/comments/${id}`);
    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    console.error("error while fetching comment", error);
  }
  return null;
};

const Comments = async ({ id }: { id: string }) => {
  const comments = await getComments(id);
  return (
    <div className="w-full mt-2">
      <AddComment id={id} parent={null} />
      <div className="w-full mt-2">
        {comments
          ? comments.map((e: Data, i: number) => (
              <div className="w-full mb-2 rounded-lg ">
                <CommentElement
                  isReply={false}
                  replies={e.replies}
                  content={e.content}
                  id={e._id}
                  avatar={e.owner.avatar}
                  videoId={id}
                  noOfLikes={e.noOfLikes}
                  username={e.owner.username}
                  key={i}
                />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Comments;
