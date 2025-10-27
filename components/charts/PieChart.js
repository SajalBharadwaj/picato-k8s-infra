'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function PieChart({ data, labels, title }) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title || 'Distribution',
        data: data,
        backgroundColor: [
          'rgba(220, 38, 38, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(16, 185, 129, 0.6)',
        ],
        borderColor: [
          'rgba(220, 38, 38, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: !!title,
        text: title,
      },
    },
  };

  return (
    <div className="h-80">
      <Pie data={chartData} options={options} />
    </div>
  );
}
