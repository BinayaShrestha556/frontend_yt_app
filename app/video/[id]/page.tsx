import Button from "@/components/Button";
import Comments from "@/components/Comments";
import Video from "@/components/Video";
import VideoBottomPart from "@/components/VideoBottomPart";
import axios from "axios";
import Image from "next/image";

axios.defaults.withCredentials = true;
const getData = async (id: string) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_TEST}/video/v/${id}`);
  // console.log(res.data);
  if (res.status === 200) {
    return res.data.data;
  }
};

const handleSubscribe = () => {
  console.log("hello is my boi");
};

interface Params {
  params: {
    id: string;
  };
}

const Page = async ({ params }: Params) => {
  const data = await getData(params.id);
  const {
    _id,

    videoFile,

    thumbnail,

    title,

    description,

    views,
    createdAt,
  } = data;
  const date = new Date(createdAt);

  return (
    <div className="flex justify-center p-3 pb-40">
      <div className=" w-full min-w-[70%] flex flex-col h-full overflow-y-scroll">
        <Video url={videoFile}  />
        <p className="text-xl font-bold pl-1">{title}</p>
        <VideoBottomPart id={_id}/>
        <div className="bg-white/20 rounded-lg py-2 px-4 ">
        <p className="text-gray-300 text-sm ml-1">{views} views . {date.getFullYear()}-{date.getMonth()}-{date.getDate()}</p>
        <p>Description:</p>
        <p>{description}</p>
       
</div>
        <p className="text-xl font-bold mt-5">Comments</p>
        <hr className="h-px  w-full m-auto bg-gray-200 border-0 dark:bg-gray-700"/>
      <div className="text-white mt-5">
        <Comments id={params.id}/>
      </div>
      </div>
     
    </div>
  );
};

export default Page;
