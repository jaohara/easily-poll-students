import React from "react";

import "./EpPollQuestionsList.scss";

function EpPollQuestionsList ({
  className,
  currentQuestionId,
  setCurrentQuestionId,
  pollQuestions,
}) {
  return (
    <div 
      className={className}
    >
      <h1 className='ep-poll-questions-header'>Questions</h1>
      {
        pollQuestions.length > 0 && pollQuestions.map((question, index) => (
          <div 
            className={`
              ep-poll-questions-list-item
              ${question.id === currentQuestionId ? "active" : ""}
            `}
            key={`ep-poll-questions-list-item-${index}`}
            onClick={e => {
              e.preventDefault();
              setCurrentQuestionId(question.id);
            }}
          >
            {question.prompt}
          </div>
        ))
      }
    </div>
  )
}

export default EpPollQuestionsList;
