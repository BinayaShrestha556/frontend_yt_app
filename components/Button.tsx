"use client"
import React from 'react'


const Button = ({onClickFn,children,styles}:{onClickFn:React.MouseEventHandler,children:React.ReactNode,styles:string}) => {
  return (
    <button onClick={onClickFn} className={styles}>
        {children}
      
    </button>
  )
}

export default Button
