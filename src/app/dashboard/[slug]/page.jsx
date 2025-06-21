import { DailyCharts } from '@/Components/DailyCharts';
import { DoughnutChart } from '@/Components/DoughnutChart';
import { Bird, Coffee, Squirrel } from 'lucide-react';
import React from 'react';

export default function DashboardPage({ params }) {
  const slug = params?.slug;

  return (
    <section className="w-full min-h-screen bg-white px-4 py-6 overflow-x-hidden">
      <div className="flex flex-col gap-y-6 max-w-screen-2xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col gap-y-2">
          <h1 className="text-4xl font-bold text-sky-800">Dashboard:</h1>
          <p className="text-lg font-medium">Status for daily attendance records...</p>
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
            <Squirrel size={40} className="text-green-800" />
          </div>
        </div>

        {/* graph */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="bg-slate-100 w-full h-96">
                <DoughnutChart />
            </div>
            <div className="bg-slate-100 w-full h-96">
                <DailyCharts />
            </div>
        </div>
      </div>
    </section>
  );
}
