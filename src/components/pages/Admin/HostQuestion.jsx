
import React from 'react'
//below is 'x' icon for deleting
import {FaTimes} from 'react-icons/fa'
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

//to do Add question numbering 

//function defines single question with option
 
const HostQuestion = ({question, onDelete}) => {

    return (
      <div >
          <h3>
              {question.text} 
              <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={()=>onDelete(question.id)}/>
          </h3>
          <RadioOptions options={question.options} />
  
      </div>
    )

  
}

export default HostQuestion
