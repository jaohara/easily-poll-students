import React from 'react';
import { useState } from "react";
import { Data } from "./SampleData";
import EpChart from '../../UI/EpChart/EpChart';

const EpChartDemo = () => {
  const [chartData] = useState({
    labels: Data.map((data) => data.year), 
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2,
        
      }
    ]
  });

  return (
    <div className="App">
      <EpChart chartData={chartData} />
    </div>
  );
}
   
export default EpChartDemo;