import { DoorOpen } from 'lucide-react'
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
            link: `/dashboard/${userid}`
        },
        {
            id: 2,
            name: "Attendance-Records",
            link: `/dashboard/attendancerecord`
        }
    ]
    return (
        <div className="min-h-screen w-full flex overflow-x-hidden">
            {/* Sidebar */}
            <div className="w-48 h-screen bg-sky-900 fixed left-0 top-0 flex flex-col items-center justify-between py-6 z-10">
                {/* User Info */}
                <div className="flex flex-col gap-y-2 items-center">
                    <Image src={userImg} alt="user" width={75} height={75} className="rounded-full bg-sky-100" />
                    <h2 className="text-sky-200 font-bold text-2xl">Gowtham</h2>
                    <span className="border-b border-b-sky-400 w-full mt-4"></span>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col items-center">
                    <ul>
                        {linkList.map((list, index) => (
                            <li key={index} className="text-sky-100 text-sm font-bold mt-4">
                                <Link href={list.link}>{list.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Logout */}
                <button className="p-2 mt-4 mb-2 flex items-center justify-center cursor-pointer hover:bg-sky-100 hover:text-sky-800 text-sky-100 rounded-3xl font-bold text-lg gap-x-3 border-2 border-sky-100">
                    Logout
                    <DoorOpen size={24} className="text-sky-500 hover:text-sky-800" />
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-48 min-h-screen bg-sky-100 overflow-y-auto overflow-x-hidden">
                {children}
            </div>
        </div>

    )
}