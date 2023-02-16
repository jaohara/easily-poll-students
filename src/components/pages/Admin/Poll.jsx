import React from 'react'
import { Button } from '@mui/material';
import { questionAll } from './Host';
//import PollQuestion from './PollQuestion';
import PollQuestions from './PollQuestions'
//import  isHost  from './PollQuestion';
//import Admin from './Admin';
//import AddQuestion from './AddQuestion';

const Poll = () => {
    
    var questions = questionAll
    console.log(questions);
    
    return (
      
      <div >
        <h1>List of question for poll go here</h1>
        
        <PollQuestions questions={questions} />
        <Button>Submit</Button>

      </div>
    );
  }

export default Poll
