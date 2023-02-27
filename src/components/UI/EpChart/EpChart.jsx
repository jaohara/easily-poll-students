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

function EpChart({ 
  chartType = "pie",
  colors = [
    "#519e8a",
    "#FF785A",
    "#6A7FDB",
    "#EC0B43",
    "#F4B942",
    "#45CB85",
  ],
  data,
  labels, 
}) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors,
        borderColor: "black",
        borderWidth: 2,
      }
    ]
  };

  return (
    <div className="chart-container">
      {
        chartType === 'pie' && (
          <Pie
            data={chartData}
            options={{
              aspectRatio: 2,
            }}
          />
        )
      }
      {
        chartType === 'bar' && (
          <Bar
            data={chartData}
            options={{
              indexAxis: 'y',
            }}
          />
        )
      }
    </div>
  );
}
    
export default EpChart;
