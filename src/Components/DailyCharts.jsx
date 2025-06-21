'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register chart types
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const DailyCharts = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Present',
        data: [1, 1, 1, 0, 1, 0, 0], // 1 = Present, 0 = Absent
        backgroundColor: 'rgba(34, 197, 94, 0.7)', // green
      },
      {
        label: 'Absent',
        data: [0, 0, 0, 1, 0, 1, 1], // same days as above
        backgroundColor: 'rgba(239, 68, 68, 0.7)', // red
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: {
        display: true,
        text: 'Daily Attendance (Last 7 Days)',
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
