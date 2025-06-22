import { DoorOpen, LayoutDashboard, Sheet } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const userImg = "/images/user.png"

export default function DashboardLayout({ children }) {
    const userid = 1;
    const linkList = [
        {
            id: 1,
            name: "Dashboard",
            link: `/dashboard/${userid}`,
            icon: <LayoutDashboard size={24} color="#ffffff" strokeWidth={2}/>
        },
        {
            id: 2,
            name: "Attendance-Records",
            link: `/dashboard/attendancerecord`,
            icon: <Sheet size={24} color="#ffffff" strokeWidth={2} />
        }
    ]
    return (
        <div className="min-h-screen w-full flex overflow-x-hidden">
            {/* Sidebar */}
            <div className="w-16 md:w-24 lg:w-48 xl:w-48 h-screen transition-all bg-sky-900 fixed left-0 top-0 flex flex-col items-center gap-y-12 py-6 z-10">
                {/* User Info */}
                <div className="flex flex-col gap-y-2 items-center">
                    <Image src={userImg} alt="user" width={24} height={24} className="xl:min-w-24 xl:min-h-24 md:min-w-16 md:min-h-16 min-w-10 min-h-10 rounded-full bg-sky-100" />
                    <h2 className="text-sky-200 font-bold text-xs xl:text-2xl lg:text-xl">Gowtham</h2>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col items-center">
                    <ul>
                        {linkList.map((list, index) => (
                            <li key={index} className="text-sky-100 text-sm font-bold mt-4">
                                <Link href={list.link} className='flex items-center gap-x-2'>{list.icon} <span  className='transition-all hidden xl:block lg:block'>{list.name}</span></Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Logout */}
                <button className="p-2 mt-4 mb-2 flex items-center justify-center cursor-pointer hover:bg-sky-100 hover:text-sky-800 text-sky-100 rounded-3xl font-bold text-lg gap-x-3 border-2 border-sky-700">
                    <span className='transition-all hidden xl:block lg:block'>Logout</span>
                    <DoorOpen size={24} className="text-sky-500 hover:text-sky-800" />
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-16 md:ml-24 lg:ml-48 xl:ml-48 min-h-screen transition-all bg-sky-100 overflow-y-auto overflow-x-hidden">
                {children}
            </div>
        </div>

    )
}