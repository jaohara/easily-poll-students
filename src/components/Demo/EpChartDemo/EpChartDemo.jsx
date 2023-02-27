import React from 'react';
//import { useState } from "react";
//import { Data } from "./SampleData";
import EpChart from '../../UI/EpChart/EpChart';

import useQuestionData from '../../../hooks/useQuestionData';

const EpChartDemo = () => {
  const { answerTally } = useQuestionData({
    questionId: "5e4d07c6-d6a6-4257-b4a8-6edc4d8a68fa"
  });

  return (
    <>
    {
      answerTally && (
    <div className="App">
      <EpChart chartType={'pie'} chartData={{
        //labels: Data.map((data) => data.year), 
        labels: answerTally.labels,
        datasets: [
          {
            //label: "Users Gained ",
            data: answerTally.data,
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
      }} />
      <EpChart chartType={'bar'} chartData={{
        //labels: Data.map((data) => data.year), 
        labels: answerTally.labels,
        datasets: [
          {
            //label: "Users Gained ",
            data: answerTally.data,
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
      }} />
    </div>
      )
    }
    </>
  );
}
   
export default EpChartDemo;