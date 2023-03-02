
import React from 'react'
//import{useContext } from 'react'
import EpChart from "../../UI/EpChart/EpChart";
//import useQuestionData from '../../../hooks/useQuestionData';
//import pollReport from '../pollReportTestData';

//import usePollData from '../../../hooks/usePollData';
//import { AppDataContext } from '../../../contexts/AuthContext/AppDataContext';

const pollReport = {
  title: "Test Poll Report", // poll.title
  createdAt: "02-23-2023", //poll.createdAt - this is an arbitrary datetime string right now
  questions: [
    {
      prompt: "Are you left-handed or right-handed?", //question.prompt
      answerTally: {
        labels: ["Right-handed", "Left-handed"], // generated from question.answerOptions
        data: [13,7], // maps to sum of each answer 
      }
    },
    {
      prompt: "Yankees or Mets?", //question.prompt
      answerTally: {
        labels: ["Yankees", "Mets"], // generated from question.answerOptions
        data: [3,17], // maps to sum of each answer 
      }
    },
    {
      prompt: "Which instrument do you want to study?", //question.prompt
      answerTally: {
        labels: ["Guitar", "Bass", "Piano", "Drums"], // generated from question.answerOptions
        data: [6,4,3,7], // maps to sum of each answer 
      }
    },
    {
      prompt: "What's your favorite major US sport?", //question.prompt
      answerTally: {
        labels: ["Baseball", "Football", "Basketball", "Soccer"], // generated from question.answerOptions
        data: [7,3,5,5], // maps to sum of each answer 
      }
    },
    {
      prompt: "Where is your favorite place to live?", //question.prompt
      answerTally: {
        labels: ["City", "Suburbs", "Country"], // generated from question.answerOptions
        data: [8,5,7], // maps to sum of each answer 
      }
    },
  ]
};

/*const { answerTally} = useQuestionData({
  questionId: "5e4d07c6-d6a6-4257-b4a8-6edc4d8a68fa"
});*/

/*const { questions } = usePollData({
  pollId: '5f0b6335-712e-4555-91f4-43410e682fc7'
})*/


/*const {
  currentQuestion,
} = useContext(AppDataContext);*/



//Get current  poll Id 
//Loop through poll to retrive questions
//Hook p

const PollResult = () => {



  return (

    <>
    
    <h1>Poll Results</h1>

    {pollReport.questions.map((question, index) => (
    <div key={index}>
    <h2>{question.prompt}</h2>
   
    <EpChart  labels={question.answerTally.labels} data={question.answerTally.data} />
  </div>
  
    ))}
      

      
    </>
  )
}

export default PollResult



