"use client"
import { DoorOpen, FileDown, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const Header = ({header,subHeader,team, download}) => {

  // function handleMouseEnter(msg){
  //   alert(msg)
  // }
  return (
    <div className="flex justify-between min-w-full items-center">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-4xl font-bold text-sky-800">{header}:</h1>
        <p className="text-lg font-medium">{subHeader}</p>
      </div>
      <div className="flex gap-x-6">
        <Link href={`#`} className='bg-sky-800 rounded-full p-3'>
        {/* onMouseEnter={()=>handleMouseEnter("Teams")} */}
          <Users size={28} color="#ffffff" hidden={team}/>

          <FileDown size={28} color="#ffffff" hidden={download}/>
        </Link>

        <Link href="/" className='bg-sky-800 rounded-full p-3'><DoorOpen size={28} color="#ffffff"/></Link>
      </div>
    </div>
  )
}
