"use client"
import { DoorOpen, FileDown, Users } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import Progress from "@/Components/Progress";
import axios from "axios";
import fileDownload from "js-file-download"; 
import { useParams } from 'next/navigation';

export const Header = ({header,subHeader,team, download}) => {

  const API = process.env.NEXT_PUBLIC_API_BASE_URL
  const user_id = useParams().slug;
  console.log("user_id: ", user_id);
  
  const [isLoading, setIsLoading] = useState(true)

  async function downloadExcelSheet() {
    setIsLoading(false);
    const res = await axios.get(`${API}/downloadRecords/download`, {
      responseType: 'blob'
    });

    console.log("file resp: ", res.data);
    setIsLoading(true);
    fileDownload(res.data, 'attendance.xlsx');
  }
  return (
    <div className="flex justify-between min-w-full items-center xl:flex-row lg:flex-row flex-col">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-4xl font-bold text-sky-800">{header}:</h1>
        <p className="text-lg font-medium">{subHeader}</p>
      </div>
      <div className="flex gap-x-6">
        {/* <Link href={`#`} className='bg-sky-800 rounded-full p-3'>
          <Users size={28} color="#ffffff" hidden={team}/>

          <FileDown size={28} color="#ffffff" hidden={download} onClick={downloadExcelSheet}/>
        </Link> */}

        <Link href="/" className='bg-sky-800 rounded-full p-3'><DoorOpen size={28} color="#ffffff"/></Link>
      </div>
      <Progress progressHidden={isLoading} />
    </div>
  )
}
