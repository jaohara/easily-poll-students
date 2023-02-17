/* eslint-disable */
// TODO: REMOVE ABOVE LINE!


import { 
  React,
  useState,
} from 'react';

import CurrentPollContainer from './CurrentPollContainer';

import "./CreatePoll.scss";



// TODO: Remove this after functionality is demonstrated
const testQuestion = { 
  prompt: "Are you left handed or right handed?", 
  answers: ["Left-handed", "Right-handed"],
}


/*
  This is the component for the Create Poll (formerly Admin) page.
*/
const CreatePoll = () => {
  const [ questions, setQuestions ] = useState([testQuestion]);

  // add question 
  const addQuestion = (questionText) => {
    setQuestions([...questions, { prompt: questionText, answers: [""]}]);
  };

  // remove questions by filtering on index
  const removeQuestion = (questionIndex) => 
    setQuestions(questions.filter((q, i) => i !== questionIndex));

  const updateQuestion = (questionIndex, questionText = null, answers = null) => {
    setQuestions(questions.map((q, i) => {
      if (i === questionIndex) {
        return {
          prompt: questionText === null ? q.prompt : questionText,
          answers: answers === null ? q.answers : answers,
        };
      } 
      else {
        return {
          prompt: q.prompt,
          answers: q.answers,
        }
      }
    }));
  };

  const addAnswer = (answerText, questionIndex) => {
    // console.log(`calling addAnswer with '${answerText}' on qi: ${questionIndex}`)
    updateQuestion(questionIndex, null, [...questions[questionIndex].answers, answerText]);
  };

  const removeAnswer = (questionIndex, answerIndex) => {
    updateQuestion(questionIndex, null, 
      questions[questionIndex].answers.filter((a, i) => i !== answerIndex))
  };

  const updateAnswer = (questionIndex, answerIndex, answerText) => {
    updateQuestion(questionIndex, null, 
      questions[questionIndex].answers.map((a, i) => i === answerIndex ? answerText : a))
  };

  return ( 
    <div className="create-poll-container">
      <h1>Create a Poll</h1>
      <CurrentPollContainer
        addAnswer={addAnswer}
        addQuestion={addQuestion}
        questions={questions}
        removeAnswer={removeAnswer}
        removeQuestion={removeQuestion}
        updateAnswer={updateAnswer}
        updateQuestion={updateQuestion}
      />
    </div>
   );
};
 
export default CreatePoll;