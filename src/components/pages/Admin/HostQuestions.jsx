import React from 'react'
import HostQuestion from './HostQuestion'
const HostQuestions = ({questions, onDelete}) => {

  return (
    <>
      {questions.map((question)=> (
      <HostQuestion key={question.id} 
                    question={question}
                    onDelete={onDelete}
                    
                    />
                    
      ))}
      
    </>
  )
}

export default HostQuestions
