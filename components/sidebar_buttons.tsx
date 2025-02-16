import React from 'react'

const Sidebar_buttons = ({icon,title,bg}:{icon:React.ReactNode,title:String,bg:string}) => {
  return (
    <div className={`flex  px-4 py-[10px] gap-4 items-center rounded-lg ${bg===title?"bg-white/15":""} hover:bg-white/15 cursor-pointer`}>
        <div className='text-2xl'>{icon}</div>
        <div className='text-sm font-semibold hidden md:block'>{title}</div>
      
    </div>
  )
}

export default Sidebar_buttons
