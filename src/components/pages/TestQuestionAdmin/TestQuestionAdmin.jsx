import { useState, useEffect, React}  from 'react';

import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import "./TestQuestionAdmin.scss";

// TODO: Extract this stuff to a hook
import { API, 
  graphqlOperation 
} from "@aws-amplify/api";
import config from '../../../aws-exports';
import { createQuestion } from '../../../graphql/mutations';

API.configure(config);

//end hook todo stuff

const TestQuestionAdmin = () => {
  const [ questionData, setQuestionData ] = useState({});
  // const [ , setQuestionData ] = useState({});
  const [ question, setQuestion ] = useState("");
  const [ questionSubmitted, setQuestionSubmitted ] = useState(false);
  // something like this will be the actual approach
  // const [ answers, setAnswers ] = useState([]);
  
  // dummy approach for demo
  const [ answerOne, setAnswerOne ] = useState("");
  const [ answerTwo, setAnswerTwo ] = useState("");

  // to handle managing the answers in the array
  // const handleAnswerChange(e) => {
  //   console.log()
  // }

  const handleCreateQuestion = () => {
    // dumb check for length
    if (question.length === 0 || answerOne.length === 0 || answerTwo.length === 0) {
      return;
    }
    
    console.log("Question submitted!");
    console.log(`Q: ${question}`);
    console.log(`A1: ${answerOne}`);
    console.log(`A2: ${answerTwo}`);
    

    const submitQuestion = async () => {
      const questionData = await API.graphql(graphqlOperation(createQuestion, {
        input: {
          // answers: [],
          // TODO: Replace ", " in answer_options items (replace with escaped char?) to prevent
          //  them from breaking the parse step in TestQuestionVote
          answer_options: [answerOne, answerTwo],
          answer_type: "Radio",
          is_active: true,
          prompt: question,
        }
      }));
      // this should only be on success I suppose
      setQuestionSubmitted(true);
      setQuestionData(questionData.data.createQuestion);

      // TODO: remove
      console.log(questionData);
    };

    submitQuestion();
  }

  useEffect(() => {
    // stub to smother linter warning
    console.log("Component mounted");
  },[]);

  return (
    <div className="test-question-admin">
      <h1>Create a New Question</h1>
      <div className='admin-input-wrapper'>
        <TextField 
          disabled={questionSubmitted}
          fullWidth 
          id="question-input" 
          label="Question" 
          onChange={e => setQuestion(e.target.value)}
          variant="outlined" 
          value={question}
          />
      </div>

      <div className='admin-input-wrapper'>
        <TextField 
          disabled={questionSubmitted}
          fullWidth 
          id="answer-one-input" 
          label="Answer One" 
          onChange={e => setAnswerOne(e.target.value)}
          variant="outlined" 
          value={answerOne}
          />
      </div>

      <div className='admin-input-wrapper'>
        <TextField 
          disabled={questionSubmitted}
          fullWidth 
          id="answer-two-input" 
          label="Answer Two" 
          onChange={e => setAnswerTwo(e.target.value)}
          variant="outlined" 
          value={answerTwo}
        />
      </div>
      <Button
        disabled={questionSubmitted}
        onClick={() => handleCreateQuestion()}
      >
        Create Question
      </Button>


      {
        questionSubmitted &&
        (
          <div className="question-data-container">
            Created Question <Link to={`/join-question/${questionData.id}`}>{questionData.id}</Link>
          </div>
        )
      }
    </div>
  );
}
 
export default TestQuestionAdmin;