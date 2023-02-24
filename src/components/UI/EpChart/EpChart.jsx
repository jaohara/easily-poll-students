import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  BarElement,
  Title} from 'chart.js';
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale,
  LinearScale,
  BarElement,
  Title, ArcElement, Tooltip, Legend);

function EpChart( { chartData, chartType } ) {
  if (chartType === 'pie')
  return (
    <div className="chart-container">
      <Pie
        data={chartData}
        options={{
          aspectRatio: 2,
          plugins: {
            title: { 
              display: true,
              text: "Pie Chart Demo"
            }
          }
        }}
      />
    </div>
  );
     else if (chartType === 'bar')
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
    
export default EpChart;