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
      <EpChart 
        chartType={'pie'} 
        data={answerTally.data}
        labels={answerTally.labels}        
      />
      <EpChart 
        chartType={'bar'} 
        data={answerTally.data}
        labels={answerTally.labels}
      />
    </div>
      )
    }
    </>
  );
}
   
export default EpChartDemo;