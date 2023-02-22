import React from 'react';

import EpButton from "../../UI/EpButton/EpButton";
import EpTextInput from "../../UI/EpTextInput/EpTextInput";
import { MdRemoveCircleOutline } from "react-icons/md";

/*
  This is the container for the current poll session that the poll creator
  is managing. It combines the functionality of what was formerly "AddQuestion"
  and "HostQuestions"
*/
const CurrentPollContainer = ({
  addAnswer,
  addQuestion,
  handleSubmitPoll,
  pollTitle,
  questions,
  removeAnswer,
  removeQuestion,
  setPollTitle,
  updateAnswer,
  updateQuestion,
}) => {
  const handleAddQuestion = () => addQuestion("");

  return ( 
    <div className="current-poll-container">    
      <EpButton
        className="current-poll-add-question"
        onClick={handleAddQuestion}
      >
        Add Question
      </EpButton>

      {
        // TODO: UI placeholder, no functionality yet
      }
      <EpButton
        className="current-poll-add-question"
        disabled={true}
      >
        Import Questions
      </EpButton>


      {
        // TODO: Debug placeholder, remove
      }
      <EpButton
        onClick={() => console.log(questions)}
      >
        Log Questions Array
      </EpButton>

      {
        // TODO: Probably not where this lives in the end
      }
      <EpButton
        onClick={() => handleSubmitPoll()}
      >
        Submit Poll
      </EpButton>

      <div className="poll-title-wrapper">
        <EpTextInput
          fullWidth
          label="New Poll Title"
          onChange={e => setPollTitle(e.target.value)}
          value={pollTitle}
        />
      </div>

      {
        questions.length > 0 ?  
          questions.map((question, questionIndex) => (
            <CurrentPollQuestion
              addAnswer={addAnswer}
              key={`question-${questionIndex}`}
              question={question}
              questionIndex={questionIndex}
              removeAnswer={removeAnswer}
              removeQuestion={removeQuestion}
              updateAnswer={updateAnswer}
              updateQuestion={updateQuestion}
            />
          )) : (
            <div className="current-poll-element current-poll-empty">
              <span className="no-questions">There aren&apos;t any questions in this poll. Add at least one with &quot;Add Question&quot;.</span>
            </div>
          )
      }
    </div>
  );
};


/*
  A component to represent the editable questions in the current poll.
*/
function CurrentPollQuestion ({
  addAnswer,
  question, 
  questionIndex,
  removeAnswer,
  removeQuestion,
  updateAnswer,
  updateQuestion,
}) {
  return (
    <div 
      className="current-poll-question"
      key={`question-${questionIndex}`}
    >
      <div className="current-poll-question-prompt current-poll-element">
        <EpTextInput
          label={`Question ${questionIndex+1} Prompt`}
          className="current-poll-element-input"
          onChange={(e) => updateQuestion(questionIndex, e.target.value, null)}
          value={question.prompt}
        /> 
        
        <CurrentPollElementDeleteButton 
          onClick={() => removeQuestion(questionIndex)}
        />
      </div>
  
      <div className="current-poll-question-answerOptions">
        {
          question.answerOptions.length > 0 ? 
            question.answerOptions.map((answer, answerIndex) => (
              <CurrentPollAnswer
                answer={answer}
                answerIndex={answerIndex}
                key={`answer-${questionIndex}-${answerIndex}`}
                questionIndex={questionIndex}
                removeAnswer={removeAnswer}
                updateAnswer={updateAnswer}
              />
            )) :
            (
              <span className="no-answerOptions">There aren&apos;t any answerOptions for this question.</span>
            )
        }

        <EpButton
          className="current-poll-add-answer"
          onClick={() => addAnswer("", questionIndex)}
        >
          Add Answer
        </EpButton>
      </div>
    </div>
  )
} 

/*
  A component to represent the editable answerOptions in the current poll.
*/
function CurrentPollAnswer ({ 
  answer, 
  answerIndex,
  questionIndex,
  removeAnswer,
  updateAnswer,
}) {
  return (
    <div 
      className="current-poll-answer current-poll-element"
      key={`answer-${questionIndex}-${answerIndex}`}
    >
      <EpTextInput
        className="current-poll-element-input"
        label={`Answer ${answerIndex+1}`}
        onChange={(e) => updateAnswer(questionIndex, answerIndex, e.target.value)}
        value={answer}
      />
      <CurrentPollElementDeleteButton 
        onClick={() => removeAnswer(questionIndex, answerIndex)}
      />
    </div>
  );
}

function CurrentPollElementDeleteButton ({onClick}) {
  return (
    <EpButton
      className="current-poll-delete-element"
      onClick={onClick}
      tabIndex={-1}
    >
      <MdRemoveCircleOutline />
    </EpButton>
  )
}
 
export default CurrentPollContainer;