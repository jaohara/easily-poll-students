import React from 'react'
import { useState } from 'react'
import { Button } from '@mui/material'

import { Link } from 'react-router-dom'

const AddQuestion = ({onAdd}) => {
  const [text, setQuestion] = useState('')
  const [options, setOptions] = useState([{ id: 1, value: '' }, { id: 2, value: '' }])


  //check if question is added
  const onSubmit = (Event) => {
    Event.preventDefault()
    if (!text){
      alert('Please add question')
      return
    }

    

    //check for minimum two options
    const checkOptions = options.filter(option => option.value !== '')
    if (checkOptions.length < 2) {
      alert('Please add at least two options')
      return
    }


    onAdd({ text, options: checkOptions })
    setQuestion('')
    setOptions([{ id: 1, value: '' }, { id: 2, value: '' }])
  }

  const addOption = () => {
    setOptions([...options, { id: options.length + 1, value: '' }])
  }
  
  return (
    <form onSubmit={onSubmit}>
      <div className='add-form'>
        <input 
          type='text' 
          placeholder='Enter Question' 
          value={text} 
          onChange={(Event) => setQuestion(Event.target.value)}
        />
        {options.map(option => (
          <div key={option.id}>
            <input 
              type='radio' 
              name='options' 
            />
            <input 
              type='text' 
              placeholder='Enter option' 
              value={option.value} 
              onChange={(Event) => {
                const newOptions = options.map(o => 
                  o.id === option.id ? { ...o, value: Event.target.value } : o
                )
                setOptions(newOptions)
              }}
            />
          </div>
        ))}
      </div>
      <Button type='button' onClick={addOption}>Add Option</Button>
      <Button type='submit' value='Add Question' >Add Question</Button>
      <Button type='button'  component={Link} to="/poll" >Create Poll</Button>
    </form>
  )
}

export default AddQuestion
