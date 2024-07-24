"use client";
import axios, { AxiosProgressEvent } from "axios";
import React, { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { MdVideoFile } from "react-icons/md";
import { CancelTokenSource } from "axios";

interface Upload {
  title: string;
  thumbnail: File | null;
  video: File | null;
  description: string;
}

interface FileStatus {
  video: string;
  thumbnail: string;
}

const Page: React.FC = () => {
  axios.defaults.withCredentials = true;
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);
  const cancelTokenSource = useRef<CancelTokenSource | null>(null); // Ref for cancel token

  const [uploadData, setUploadData] = useState<Upload>({
    title: "",
    thumbnail: null,
    video: null,
    description: "",
  });

  const [fileStatus, setFileStatus] = useState<FileStatus>({
    video: "",
    thumbnail: "",
  });

  const [uploadPercentage, setUploadPercentage] = useState<number>(0);

  const handleClick1 = () => {
    videoInputRef.current?.click();
  };

  const handleClick2 = () => {
    thumbnailInputRef.current?.click();
  };

  const truncate = (str: string) => {
    const suffix = str.split(".");
    const dotIndex = str.lastIndexOf(".");

    if (str.length < 20) return str;
    return (
      str.substring(0, dotIndex).substring(0, 15) +
      "...." +
      suffix[suffix.length - 1]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { video, thumbnail, title, description } = uploadData;
    const form = new FormData();
    if (!video || !thumbnail || !title || !description) return;

    form.append("video", video);
    form.append("thumbnail", thumbnail);
    form.append("title", title);
    form.append("description", description);

    // Create a new CancelToken source
    cancelTokenSource.current = axios.CancelToken.source();

    const config = {
      onUploadProgress: function (progressEvent: AxiosProgressEvent) {
        const percentCompleted = (progressEvent.loaded / progressEvent.total!) * 100;
        setUploadPercentage(Math.ceil(percentCompleted));
      },
      cancelToken: cancelTokenSource.current.token,
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/video/upload",
        form,
        config
      );
      console.log(res);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Upload canceled');
      } else {
        console.error('Upload error:', error);
      }
    }
  };

  const handleChange = (e: any) => {
    const { type, name, value, files } = e.target;

    if (type === "file") {
      if (name === "video" && files && files.length > 0) {
        const file = files[0];
        setFileStatus((prevStatus) => ({ ...prevStatus, video: file.name }));
        setUploadData((prevData) => ({ ...prevData, video: file }));
      } else if (name === "thumbnail" && files && files.length > 0) {
        const file = files[0];
        setFileStatus((prevStatus) => ({
          ...prevStatus,
          thumbnail: file.name,
        }));
        setUploadData((prevData) => ({ ...prevData, thumbnail: file }));
      }
    } else {
      setUploadData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleCancel = () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Upload canceled by user');
      setUploadPercentage(0)
    }
  };

  return (
    <div className="w-full  h-full flex flex-col items-center justify-center mt-10">
      <form method="post" onSubmit={handleSubmit} className="min-w-1/2 w-[50%] pb-10 flex flex-col items-center gap-3">
        <input
          type="file"
          name="video"
          id="video"
          hidden
          ref={videoInputRef}
          onChange={handleChange}
          accept="video/*"
          required
        />
        <p className="text-lg self-start">Video file:</p>
        <div
          className={`flex w-full min-w-96 rounded-xl bg-white/5 items-center justify-center transition-all ease-in-out duration-700 border-dashed border ${
            fileStatus.video === "" ? "h-44" : "h-[55px]"
          }`}
          onClick={handleClick1}
        >
          <span
            className={`transition-all ease-in-out duration-700 ${
              fileStatus.video === "" ? "text-8xl" : "text-4xl"
            }`}
          >
            <MdVideoFile className="" />
          </span>
          {fileStatus.video === "" ? (
            <p>Browse videos to upload</p>
          ) : (
            <>
              <p>{truncate(fileStatus.video)}</p>
              <button
                className="ml-[10%] flex items-center gap-2 bg-red-500 hover:scale-105 rounded group py-0.5 px-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setFileStatus((prevStatus) => ({ ...prevStatus, video: "" }));
                  setUploadData((prevData) => ({ ...prevData, video: null }));
                }}
              >
                <span>Remove</span>
                <ImCross className="group-hover:rotate-90 transition"/>
              </button>
            </>
          )}
        </div>
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          hidden
          ref={thumbnailInputRef}
          onChange={handleChange}
          accept="image/*"
          required
        />
        <p className="text-lg self-start">Thumbnail: (required)</p>
        <div
          className={`flex w-full rounded-xl bg-white/5 p-2 items-center justify-center transition-all ease-in-out duration-700 border-dashed border ${
            fileStatus.thumbnail === "" ? "h-44" : "h-[55px]"
          }`}
          onClick={handleClick2}
        >
          <span
            className={`transition-all ease-in-out duration-700 ${
              fileStatus.thumbnail === "" ? "text-8xl" : "text-4xl"
            }`}
          >
            <MdVideoFile />
          </span>
          {fileStatus.thumbnail === "" ? (
            <p>Browse thumbnail to upload</p>
          ) : (
            <>
              <p>{truncate(fileStatus.thumbnail)}</p>
              <button
                className="ml-[10%] flex items-center gap-2 bg-red-500 hover:scale-105 rounded py-0.5 px-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setFileStatus((prevStatus) => ({ ...prevStatus, thumbnail: "" }));
                  setUploadData((prevData) => ({ ...prevData, thumbnail: null }));
                }}
              >
                <span>Remove</span>
                <ImCross />
              </button>
            </>
          )}
        </div>
        <div className="w-full">
          <label className="block my-2 text-lg">Title</label>
          <textarea
            name="title"
            onChange={handleChange}
            className="w-full bg-transparent border rounded-lg resize-none px-4 py-1.5"
            rows={1}
            required
          />
        </div>
        <div className="w-full">
          <label className="block my-2 text-lg">Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            className="w-full bg-transparent border rounded-lg px-4 py-1.5"
            rows={3}
            required
          />
        </div>
        {uploadPercentage!==0?
        <div className="w-full">
        <div className="w-full h-2 bg-white rounded-full overflow-hidden">
          <div
            className="h-full bg-red-500"
            style={{ width: `${uploadPercentage}%` }}
          ></div>
        </div>
        <p>{Math.ceil(uploadPercentage)}%</p>
        </div>:""}
        <div className=" flex w-full gap-7 ">
        <button
          type="submit"
          className="bg-green-500 py-1.5 rounded-full w-full max-w-96"
        >
          Upload{" "}
          <span className="inline-block">
            <FaUpload />
          </span>
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-red-500 py-1.5 rounded-full w-full max-w-96 "
        >
          Cancel Upload
        </button></div>
      </form>
    </div>
  );
};

export default Page;
