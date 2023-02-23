import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function EpChart( { chartData } ) {
  return (
    <div className="chart-container">
      <Pie
        data={chartData}
        options={{
          aspectRatio: 2,
          plugins: {
            title: { 
              display: true,
              text: "Users Gained between 2016-2020"
            }
          }
        }}
      />
    </div>
  );
}

export default EpChart;