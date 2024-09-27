import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

type UsersLineChartProps = {
  data: object | undefined;
};

const UsersLineChart: React.FC<UsersLineChartProps> = ({ data = [] }) => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const settings = {
    labels,
    datasets: [
      {
        label: 'Users',
        data: values,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Dates',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Users',
        },
      },
    },
  };

  return (
    <div>
      <h2>Registered participants per day</h2>
      <Line data={settings} options={options} />
    </div>
  );
};

export default UsersLineChart;
