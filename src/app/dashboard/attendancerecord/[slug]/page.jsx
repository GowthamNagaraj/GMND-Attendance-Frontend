"use client"
import AttendanceRecords from "@/Components/AttendanceRecords";
import { Header } from "@/Components/Header";
import axios from "axios";
import fileDownload from "js-file-download";
import { useState } from "react";

// app/dashboard/attendancerecord/page.jsx
export default function AttendanceRecordPage({params}) {
  const user_id = params.slug;
  
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  async function downloadExcels(event) {
  event.preventDefault();

  const fDate = fromDate.split("-");
  const tDate = toDate.split("-");

  const from = `${fDate[0]}-${fDate[1]}-${fDate[1]}`;
  const to = `${tDate[0]}-${tDate[1]}-${tDate[1]}`;

  console.log(from,to);
  
  try {
    const res = await axios.get(`http://localhost:1998/GMND/api/downloadRecords/download`, {
      params: { from, to },
      responseType: 'blob'
    });

    fileDownload(res.data, 'attendance.xlsx');
  } catch (error) {
    console.log("error: ", error);
  }
}
  
  return (
    <section className="w-full min-h-screen bg-white px-4 py-6 overflow-x-hidden">
      <div className="flex flex-col max-w-screen-2xl mx-auto">
        {/* Heading */}
        <Header header={"Records"} subHeader={"Records for daily attendance records..."} team={true} download={false}/>
      </div>



      <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">

        <form className="xl:max-w-full lg:max-w-full max-w-56 mx-auto">

          <div className="flex flex-col xl:flex-row lg:flex-row gap-x-4 items-center justify-center">
            <div className="flex flex-col xl:flex-row lg:flex-row gap-x-6">
              <div className="flex flex-row items-center justify-center gap-x-5">
                <label htmlFor="FROM" className="text-lg font-bold text-sky-800">FROM:</label>
                <input type="date" onChange={(e)=>setFromDate(e.target.value)} className="bg-sky-800 border border-sky-300 text-slate-50 font-bold text-lg rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-sky-700 dark:border-sky-600 dark:placeholder-sky-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" />
              </div>
              <div className="flex flex-row items-center justify-center gap-x-5">
                <label htmlFor="FROM" className="text-lg font-bold text-sky-800">TO:</label>
                <input type="date" onChange={(e)=>setToDate(e.target.value)} className="bg-sky-800 border border-sky-300 text-slate-50 font-bold text-lg rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-sky-700 dark:border-sky-600 dark:placeholder-sky-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" />
              </div>
            </div>
            <button type="button" onClick={(e)=>downloadExcels(e)} className="text-sky-700 hover:text-sky-100 cursor-pointer border border-sky-700 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-300 rounded-full text-lg font-bold p-2 text-center me-2 mb-2 dark:border-sky-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-sky-600 dark:focus:ring-sky-800">GO</button>
          </div>
        </form>

      </div>
      <div className="w-full mt-4 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <AttendanceRecords userid={ user_id }/>
      </div>

    </section>
  );
}
