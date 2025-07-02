'use client';

import { getAttendanceReports } from '@/api/AttendanceApiCalls';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

// Register chart types
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const DailyCharts = ({days,userid,token}) => {
  const thisMonthDays = []
  const thisDays = []
  const thereDays = []
  
  useEffect(()=>{
    getdays();
  },[ ])

  async function getdays() {

    const records = await getAttendanceReports({ userid, token })
    const recordAttendance = records.attendance
    // console.log(records.attendance);

    // for (let i = 0; i < recordAttendance.length; i++) {
    //   // console.log(recordAttendance[i].dateandtime.split("-")[0]);
    //   thereDays.push(recordAttendance[i].dateandtime.split("-")[0].trim())
    // }
    
    for (let i = 1; i <= days; i++) {
      thisMonthDays.push(i*0)
    }
    const arr = [1];
    thisDays.push(thisMonthDays.map((val,idx)=>arr[idx] ?? val))
    
    console.log(thisDays[0]);
    
    
  }
  
  const data = {
    labels: ['12/6/2025', '13/6/2025', '13/5/2025', '13/5/2025', '13/5/2025', '13/5/2025', '13/6/2025', '13/6/2025', '17/6/2025', '18/6/2025', '19/6/2025', '20/6/2025', '22/6/2025', '23/6/2025', '24/6/2025', '25/6/2025', '26/6/2025'],
    datasets: [
      {
        label: 'Present',
        data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1 = Present, 0 = Absent
        backgroundColor: 'rgba(34, 197, 94, 0.7)', // green
      },
      {
        label: 'Absent',
        data: [0, 0, 0, 1, 0, 0, 0], // same days as above
        backgroundColor: 'rgba(239, 68, 68, 0.7)', // red
      },
      {
        label: 'Weekends',
        data: [0, 0, 0, 0, 0, 1, 1], // same days as above
        backgroundColor: 'rgba(239, 268, 68, 0.7)', // yellow
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: {
        display: true,
        text: 'Daily Attendance (30 Days)',
        color: '#0c4a6e',
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          callback: value => (value === 1 ? '✔️' : '❌'),
        },
        beginAtZero: true,
        max: 1,
      },
    },
  };

  return <Bar data={data} options={options} />;
};
