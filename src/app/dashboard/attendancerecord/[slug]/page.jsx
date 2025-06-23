"use client"
import AttendanceRecords from "@/Components/AttendanceRecords";
import { Header } from "@/Components/Header";
import { useState } from "react";

// app/dashboard/attendancerecord/page.jsx
export default function AttendanceRecordPage({params}) {
  const userid = params[0];
  // console.log("slug: ", slug);

  const [year, setYear] = useState([
    "YEARS",2024, 2025, 2026
  ]);

  const [month, setMonth] = useState([
    { name: "MONTHS",days:0},
    { name: "JAN", days: 31 },
    { name: "FEB", days: 28 },
    { name: "MAR", days: 31 },
    { name: "APR", days: 30 },
    { name: "MAY", days: 31 },
    { name: "JUN", days: 30 },
    { name: "JUL", days: 31 },
    { name: "AUG", days: 31 },
    { name: "SEP", days: 30 },
    { name: "OCT", days: 31 },
    { name: "NOV", days: 30 },
    { name: "DEC", days: 31 }
  ]);

  const [days, setDays] = useState(["DAYS",0])

  function handleMonth(e) {
    const arr = []
    for (let index = 1; index <= e.target.value; index++) {
      arr.push(index)
    }
    setDays(arr)
  }

  return (
    <section className="w-full min-h-screen bg-white px-4 py-6 overflow-x-hidden">
      <div className="flex flex-col max-w-screen-2xl mx-auto">
        {/* Heading */}
        <Header header={"Records"} subHeader={"Records for daily attendance records..."} team={true} download={false}/>
      </div>



      <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">

        <form class="max-w-full mx-auto">

          <div className="flex flex-col xl:flex-row lg:flex-row gap-x-4">
            <select class="bg-sky-800 border border-gray-300 text-slate-50 text-lg font-bold rounded-lg focus:ring-sky-100 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {/* <option selected>YEAR</option> */}
              {
                year.map((item, index) =>
                  <option option={item} key={index}>{item}</option>
                )
              }
            </select>
            <select class="bg-sky-800 border border-gray-300 text-slate-50 text-lg font-bold rounded-lg focus:ring-sky-100 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => handleMonth(e)}>
              {/* <option selected>MONTH</option> */}
              {
                month.map((item, index) =>
                  <option option={item.name} key={index} value={item.days}>{item.name}</option>
                )
              }
            </select>
            <select class="bg-sky-800 border border-gray-300 text-slate-50 text-lg font-bold rounded-lg focus:ring-sky-100 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {/* <option selected>DAYS</option> */}
              {
                days.map((item, index) => (
                  <option option={item} key={index}>{item}</option>
                ))
              }
            </select>

            <button type="button" class="text-sky-700 hover:text-sky-100 cursor-pointer border border-sky-700 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-300 rounded-full text-lg font-bold p-2 text-center me-2 mb-2 dark:border-sky-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-sky-600 dark:focus:ring-sky-800">GO</button>

            <div className="flex flex-col xl:flex-row lg:flex-row gap-x-6">
              <div className="flex items-center justify-center gap-x-2">
                <label htmlFor="FROM" className="text-lg font-bold text-sky-800">FROM:</label>
                <input type="date" class="bg-sky-800 border border-sky-300 text-slate-50 font-bold text-lg rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-sky-700 dark:border-sky-600 dark:placeholder-sky-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" />
              </div>
              <div className="flex items-center justify-center gap-x-2">
                <label htmlFor="FROM" className="text-lg font-bold text-sky-800">TO:</label>
                <input type="date" class="bg-sky-800 border border-sky-300 text-slate-50 font-bold text-lg rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-sky-700 dark:border-sky-600 dark:placeholder-sky-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" />
              </div>
            </div>
          </div>
        </form>

      </div>
      <div class="w-full mt-4 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <AttendanceRecords userid={'6849694b758b866ea8a40c61'}/>
      </div>

    </section>
  );
}
