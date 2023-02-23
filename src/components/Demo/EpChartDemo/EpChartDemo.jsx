import React, { useEffect } from 'react';
//import { useState } from "react";
import { Data } from "./SampleData";
import EpChart from '../../UI/EpChart/EpChart';

import useQuestionData from '../../../hooks/useQuestionData';

const EpChartDemo = () => {
  const { questionData, answerData, questionIsLoaded } = useQuestionData({ questionId: "d3a126ab-292a-4d0d-bee9-d4c73d19016d" })
  //const [chartData, setChartData] = useState();

  useEffect(() => {
    console.log("question data: ", questionData),
    console.log("answer data: ", answerData)
    
  }, [questionIsLoaded])

  useEffect(() => {
    console.log("type of answer data", typeof answerData)
    console.log("expected data array", answerData.map((data) => data.answer[0]))
    console.log("original data array", Data.map((data) => data.userGain))
    //setChartData ()
  },
  [answerData])

  return (
    <>
    {
      questionIsLoaded && answerData && (
        <div className="App">
      <EpChart chartData={{
      labels: questionData.answerOptions,
      datasets: [
        {
          label: "Users Gained ",
          //data: Data.map((data) => data.userGain),

          data: answerData.map((data) => data.answer[0]),
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