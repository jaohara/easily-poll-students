/* eslint-disable */
// TODO: REMOVE ABOVE LINE!


import { 
  React,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from "react-router-dom";

import { AppDataContext } from '../../../contexts/AuthContext/AppDataContext';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

import CurrentPollContainer from './CurrentPollContainer';

import "./CreatePoll.scss";

const testQuestion = { 
  prompt: "Are you left handed or right handed?", 
  answerOptions: ["Left-handed", "Right-handed"],
}


const CreatePoll = () => {
  const navigate = useNavigate();

  const [ pollTitle, setPollTitle ] = useState("New Poll");
  const [ questions, setQuestions ] = useState([testQuestion]);

  const { addPoll } = useContext(AppDataContext);

  const { user } = useContext(AuthContext);

  // add question 
  const addQuestion = (questionText) => {
    setQuestions([...questions, { prompt: questionText, answerOptions: [""]}]);
  };

  // remove questions by filtering on index
  const removeQuestion = (questionIndex) => 
    setQuestions(questions.filter((q, i) => i !== questionIndex));

  const updateQuestion = (questionIndex, questionText = null, answerOptions = null) => {
    setQuestions(questions.map((q, i) => {
      if (i === questionIndex) {
        return {
          prompt: questionText === null ? q.prompt : questionText,
          answerOptions: answerOptions === null ? q.answerOptions : answerOptions,
        };
      } 
      else {
        return {
          prompt: q.prompt,
          answerOptions: q.answerOptions,
        }
      }
    }));
  };

  const addAnswer = (answerText, questionIndex) => {
    // console.log(`calling addAnswer with '${answerText}' on qi: ${questionIndex}`)
    updateQuestion(questionIndex, null, [...questions[questionIndex].answerOptions, answerText]);
  };

  const removeAnswer = (questionIndex, answerIndex) => {
    updateQuestion(questionIndex, null, 
      questions[questionIndex].answerOptions.filter((a, i) => i !== answerIndex))
  };

  const updateAnswer = (questionIndex, answerIndex, answerText) => {
    updateQuestion(questionIndex, null, 
      questions[questionIndex].answerOptions.map((a, i) => i === answerIndex ? answerText : a))
  };

  const handleSubmitPoll = async () => {
    if (questions.length === 0) {
      console.error("handleSubmitPoll: Cannot submit a poll without any questions, aborting");
      return;
    }

    if (pollTitle.length === 0) {
      console.error("handleSubmitPoll: poll title cannot be 0");
      return;
    }

    // TODO: Have some way to filter out questions without valid answerOptions
    //  (less than 2 answerOptions)

    // const newPollData = await createNewPoll({ title: pollTitle, questions: questions });
    const newPollData = await addPoll({ title: pollTitle, questions: questions });

    console.log("handleSubmitPoll: newPolldata:", newPollData);

    // assuming a lot here - this was successful, so we'll redirect
    navigate(`/hooks/${newPollData.id}`);
  }

  return ( 
    <div className="create-poll-container">
      <h1>Create a Poll</h1>
      <CurrentPollContainer
        addAnswer={addAnswer}
        addQuestion={addQuestion}
        handleSubmitPoll={handleSubmitPoll}
        pollTitle={pollTitle}
        questions={questions}
        removeAnswer={removeAnswer}
        removeQuestion={removeQuestion}
        setPollTitle={setPollTitle}
        updateAnswer={updateAnswer}
        updateQuestion={updateQuestion}
      />
    </div>
   );
};
 
export default CreatePoll;