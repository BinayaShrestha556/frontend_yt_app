import React from 'react'
import Image from 'next/image'

const SubsImage = ({avatar}:{avatar:string}) => {
  return (
    <div className='relative w-8 h-8 rounded-full overflow-hidden'>
        <Image alt='avatar' fill src={avatar} style={{objectFit: "cover"}}/>
      
    </div>
  )
}

export default SubsImage
