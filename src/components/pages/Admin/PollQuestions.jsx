import React from 'react'
import PollQuestion from './PollQuestion'
const PollQuestions = ({questions}) => {

  return (
    <>
      {questions.map((question)=> (
      <PollQuestion key={question.id} 
                    question={question}
                    />
                  
      ))}
    </>
  )
}

export default PollQuestions
