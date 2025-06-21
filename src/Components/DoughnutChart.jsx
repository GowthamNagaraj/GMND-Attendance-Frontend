'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register chart types
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const DoughnutChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Presents',
        data: [25, 28, 30, 26, 27],
        backgroundColor: 'rgba(34, 197, 94, 0.6)', // Tailwind green-500
      },
      {
        label: 'Absents',
        data: [5, 2, 1, 4, 3],
        backgroundColor: 'rgba(239, 68, 68, 0.6)', // Tailwind red-500
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: {
        display: true,
        text: 'Monthly Attendance Overview',
        color: '#0c4a6e', // Tailwind sky-900
        font: { size: 18 },
      },
    },
  };

  return <Bar data={data} options={options} />;
};
