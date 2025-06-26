"use client"
import { getAttendanceReports } from '@/api/AttendanceApiCalls';
import { DailyCharts } from '@/Components/DailyCharts';
import { DoughnutChart } from '@/Components/DoughnutChart';
import { Header } from '@/Components/Header';
import { Bird, Coffee, Fan, Squirrel } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
// import Progress from "@/ComponentsProgress"

export default function DashboardPage({ params }) {
  const {slug} = useParams()
  const userid = slug
  const token = localStorage.getItem("token");
  const thisMonth = new Date().toLocaleString('default',{month: 'long'})

  const psArr = [];
  const absArr = [];
  const wkArr = [];
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [weekend,setWeekend] = useState(0);
  const [records, setRecords] = useState([])

  const [month, setMonth] = useState([
    { name: "Januvary", days: 31 },
    { name: "february ", days: 28 },
    { name: "March", days: 31 },
    { name: "Apirl", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "Augest", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 }
  ]);

  const mon = month.find((item) => {
    return item.name == thisMonth;
  })

  useEffect(()=>{
    getData()
  },[])

  async function getData() {
    try {
      const reports = await getAttendanceReports({ userid, token })
      // console.log(reports.attendance);
      
      for (let i = 0; i < reports.attendance.length; i++) {
        psArr.push(reports.attendance[i].present)
        absArr.push(reports.attendance[i].absent)
        wkArr.push(reports.attendance[i].weekend)
      }
      
      setRecords(reports.attendance)
      setPresent(psArr.reduce((prevValue,currValue)=> {return prevValue + currValue}))
      setAbsent(absArr.reduce((prevValue,currValue)=> {return prevValue + currValue}))
      setWeekend(wkArr.reduce((prevValue,currValue)=> {return prevValue + currValue}))
      
    } catch (error) {
      console.error("Failed to fetch reports:", err);
    }
  }
    
  
    
  
  return (
    <section className="w-full min-h-screen bg-white px-4 py-6 overflow-x-hidden">
      <div className="flex flex-col gap-y-6 max-w-screen-2xl mx-auto">
        {/* Heading */}
        <div className="flex justify-between">
          <Header header={"Dashboard"} subHeader={"Status for daily attendance records..."} team={false} download={true}/>
        </div>
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1 */}
          <div className="w-full h-28 bg-gray-100 rounded-md flex items-center justify-between px-4">
            <div className="flex flex-col gap-y-1">
              <h2 className="text-xl font-bold text-sky-800">{thisMonth.toUpperCase()}</h2>
              <p className="text-sky-800">{present} / {mon.days} days</p>
            </div>
            <Bird size={40} className="text-sky-800" />
          </div>

          {/* Card 2 */}
          <div className="w-full h-28 bg-lime-100 rounded-md flex items-center justify-between px-4">
            <div className="flex flex-col gap-y-1">
              <h2 className="text-xl font-bold text-lime-800">Presents </h2>
              <p className="text-lime-800">{present} / {mon.days} days</p>
            </div>
            <Coffee size={40} className="text-lime-800" />
          </div>

          {/* Card 3 */}
          <div className="w-full h-28 bg-red-100 rounded-md flex items-center justify-between px-4">
            <div className="flex flex-col gap-y-1">
              <h2 className="text-xl font-bold text-red-800">Absents </h2>
              <p className="text-red-800">{absent} / {mon.days} days</p>
            </div>
            <Squirrel size={40} className="text-red-800" />
          </div>

          {/* Card 4 */}
          <div className="w-full h-28 bg-green-100 rounded-md flex items-center justify-between px-4">
            <div className="flex flex-col gap-y-1">
              <h2 className="text-xl font-bold text-green-800">Weekends</h2>
              <p className="text-green-800">{weekend} / {mon.days} days</p>
            </div>
            <Fan size={40} className="text-green-800"/>
          </div>
        </div>

        {/* graph */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            <div className="bg-slate-100 w-full xl:h-full lg:h-full md:h-72 h-40 p-1 flex items-center justify-center">
                <DoughnutChart />
            </div>
            <div className="bg-slate-100 w-full xl:h-full lg:h-full md:h-72 h-40 p-1 flex items-center justify-center">
                <DailyCharts days={mon.days} userid={userid} token={token}/>
            </div>
        </div>
        {/* banner */}
        <div className="text-2xl font-bold flex flex-col justify-center gap-y-2 items-center">
          <span className="text-orange-500">{`சோதிப்பது காலமாக இருந்தாலும் சாதிப்பது நீங்களாக இருங்கள்`} </span>
          <br />
          <span className="text-blue-500">{`தோல்வி உன்னை துரத்தினால், நீ வெற்றியை நோக்கி ஓடு`}</span>
          <br />
          <span className="text-green-500">{`தைரியம் பயத்தை விட ஒரு படி மேலே உள்ளது`}</span>
        </div>
      </div>
      {/* <Progress progressHidden={isLoading} /> */}
    </section>
  );
}
