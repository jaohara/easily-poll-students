import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const EpBar = ({ chartData }) => {
  return (
    <div className="chart-container">
      <Bar
        data={chartData}
        options={{
          indexAxis: 'y',
          plugins: {
            title: {
              display: true,
              text: "Bar Chart Demo"
            },
            legend: {
              //position: 'right',
              display: false
            }
          }
        }}
      />
    </div>
  );
}

export default EpBar;