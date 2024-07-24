import React from 'react'

const Sidebar_buttons = ({icon,title,bg=false}:{icon:React.ReactNode,title:String,bg:boolean}) => {
  return (
    <div className={`flex  px-4 py-[10px] gap-6 items-center rounded-lg ${bg?"bg-white/15":""} hover:bg-white/15 cursor-pointer`}>
        <div className='text-2xl'>{icon}</div>
        <div className='text-sm font-semibold '>{title}</div>
      
    </div>
  )
}

export default Sidebar_buttons
