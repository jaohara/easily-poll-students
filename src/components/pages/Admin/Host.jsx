import React from 'react'
import { useState } from 'react'
import HostQuestions from './HostQuestions'
import AddQuestion from './AddQuestion'
export var questionAll = [] //store questions created by host
const Host = () => {
  const [questions, setQuestion] = useState([])
  
  //console.log(questions.length)

//Add question
const addQuestion =(question)=>{

  //console.log(question);
  //Generate random id for questions
  var id = Math.floor(Math.random()*1000+1)
  const newQuestion ={id, ...question}
  //questionAll.push(newQuestion)
  setQuestion([...questions, newQuestion])
   
  }
 
//Delete question
const deleteQuestion = (id) =>{
  //filters out the questions by id not actually deleting
  setQuestion(questions.filter((question) => question.id !== id))
  //remove console
  console.log('delete', id)
}
//Add question from host to gloabal variable questionAll
questionAll = questions
  return (
    <div >
      <h1>Poll Test</h1>
      <AddQuestion onAdd={addQuestion}/>
      <HostQuestions questions={questions} onDelete={deleteQuestion} />
    </div>
  );
}
export default Host;
