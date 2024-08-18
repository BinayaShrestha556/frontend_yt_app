


const Video = ({url}:{url:string}) => {

  
  return (
    <div>
      <video controls className='w-full max-h-[60vh]' src={url}></video>
      
    </div>
  )
}

export default Video
