import React from "react";

import { BiCheckCircle } from "react-icons/bi";

import "./EpPollQuestionsList.scss";

function EpPollQuestionsList ({
  answeredQuestions = [],
  className,
  currentQuestionId,
  hideIcon = false,
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
              ${answeredQuestions.includes(question.id) ? "answered" : ""}
              ${hideIcon ? "no-icon" : ""}
            `}
            key={`ep-poll-questions-list-item-${index}`}
            onClick={e => {
              e.preventDefault();
              setCurrentQuestionId(question.id);
            }}
          >
            {question.prompt}

            {
              !hideIcon && (
                <div className="question-answered-icon">
                  <BiCheckCircle />
                </div>
              )
            }

          </div>
        ))
      }
    </div>
  )
}

export default EpPollQuestionsList;
