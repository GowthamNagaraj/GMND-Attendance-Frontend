"use client"
import { DailyCharts } from '@/Components/DailyCharts';
import { DoughnutChart } from '@/Components/DoughnutChart';
import { Header } from '@/Components/Header';
import { Bird, Coffee, Fan, Squirrel } from 'lucide-react';
import React from 'react';
// import Progress from "@/ComponentsProgress"

export default function DashboardPage({ params }) {
  const slug = params[0];
  // const [isLoading, setIsLoading] = useState(true)
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
              <h2 className="text-xl font-bold text-sky-800">TOTALS</h2>
              <p className="text-sky-800">28 / 365 days</p>
            </div>
            <Bird size={40} className="text-sky-800" />
          </div>

          {/* Card 2 */}
          <div className="w-full h-28 bg-lime-100 rounded-md flex items-center justify-between px-4">
            <div className="flex flex-col gap-y-1">
              <h2 className="text-xl font-bold text-lime-800">PRESENTS</h2>
              <p className="text-lime-800">28 / 365 days</p>
            </div>
            <Coffee size={40} className="text-lime-800" />
          </div>

          {/* Card 3 */}
          <div className="w-full h-28 bg-red-100 rounded-md flex items-center justify-between px-4">
            <div className="flex flex-col gap-y-1">
              <h2 className="text-xl font-bold text-red-800">ABSENT</h2>
              <p className="text-red-800">28 / 365 days</p>
            </div>
            <Squirrel size={40} className="text-red-800" />
          </div>

          {/* Card 4 */}
          <div className="w-full h-28 bg-green-100 rounded-md flex items-center justify-between px-4">
            <div className="flex flex-col gap-y-1">
              <h2 className="text-xl font-bold text-green-800">WEEKENDS</h2>
              <p className="text-green-800">28 / 365 days</p>
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
                <DailyCharts />
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
