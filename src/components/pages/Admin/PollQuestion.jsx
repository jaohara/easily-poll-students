
import React from 'react'
//below is 'x' icon
export var isHost = Boolean
//import { Radio } from '@mui/material'

//radio button to mapped with options
const RadioOptions = ({ options }) => {
  return (
    <div>
      {options.map(option => (
        <div key={option.id}>
          <input 
            type='radio' 
            name='options' 
            value={option.value} 
          />
          {option.value}
        </div>
      ))}
    </div>
  )
}

//renders poll question for host side

//to do Add question numbering for display

//function defines single question with options
const PollQuestion = ({question}) => {
    return (
      <div >
          <h3>
              {question.text} 
          </h3>
          <RadioOptions options={question.options} />
      </div>
    )
}
export default PollQuestion
