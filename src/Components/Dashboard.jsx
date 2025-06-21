"use client"
import { DoorOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const userImg = "/images/user.png" 

const Dashboard = () => {
  const userid = 1;
  const linkList = [
    {
      id:1,
      name: "Dashboard",
      link: `/dashboard/${userid}`
    },
    {
      id:2,
      name: "Attendance-Records",
      link: `/records/${userid}`
    }
  ]

  return (
    <div className='min-w-screen min-h-screen flex overflow-hidden'>
      <div className="min-w-48 min-h-screen bg-sky-900 fixed flex flex-col items-center justify-around">
        {/* users side */}
        <div className="flex flex-col gap-y-2 items-center">
          <Image src={userImg} alt="user" width={50} height={50} className="rounded-full bg-sky-100"/>
          <h2 className='text-sky-200 font-bold text-lg xl:text-2xl lg:text-2xl'>Gowtham</h2>
          <span className='border-b border-b-sky-400 h-0.5 min-w-48 mt-4'></span>
        </div>
        {/* Lists */}
        <div className="flex flex-col items-center">
          <ul>
            {
              linkList.map((list,index)=>(
                <li key={index} className='text-sky-100 text-sm font-bold mt-4'>
                  <Link href={list.link}>{list.name}</Link>
                </li>
              ))
            }
          </ul>
        </div>
        {/* logout */}
        <button className='p-2 mt-4 flex items-center justify-center cursor-pointer hover:bg-sky-100 hover:text-sky-800 text-sky-100 rounded-3xl font-bold text-lg gap-x-3 border-2 border-sky-100'>Logout <DoorOpen size={24} className='text-sky-500 hover:text-sky-800'/></button>
      </div>
      <div className="min-w-screen min-h-screen bg-sky-100"></div>
    </div>
  )
}

export default Dashboard
