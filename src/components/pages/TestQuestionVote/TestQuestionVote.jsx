/* eslint-disable */ 
// TODO: REMOVE!




import { useEffect, useState, React } from 'react';
import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';

import "./TestQuestionVote.scss";

// TODO: more stuff to extract to a hook 
import {
  API,
  // graphqlOperation
} from "@aws-amplify/api";
import config from "../../../aws-exports";
import { getQuestion } from "../../../graphql/queries";
import { updateQuestion } from '../../../graphql/mutations';
import { onUpdateQuestion } from '../../../graphql/subscriptions';
import { graphqlOperation } from '@aws-amplify/api';

API.configure(config);
// TODO: When you extract this, you need to consider some way to log stuff

// end hook stuff

const TestQuestionVote = () => {
  const [ questionData, setQuestionData ] = useState({});
  // with above approach, we probably could just check status of questionData
  // to check if it's loaded
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ voteSubmitted, setVoteSubmitted ] = useState(false);
  let { id } = useParams();

  // TODO: This might be worth extracting to a shared module
  // parse the array strings returned in AWSJSON to an array, returning an 
  // empty array if the array is null or undefined
  const parseAndReturnAnswerArray = (answerString, replaceBackslashes = false) => 
    answerString === null || answerString === undefined ? [] :
    answerString
      .slice(1, answerString.length - 1)
      .replaceAll("\\", replaceBackslashes ? "" : "\\")
      .split(", ");

  // TODO: Something like this should live within the data access hook
  const parseAndSetQuestionData = (data) => {
    console.log("data before parsing: ")
    // console.log(data.data.getQuestion);
    console.log(data);
          
    // TODO: this might be a schema mistake - answer_options is a String rather
    //  than AWSJSON. Update this later. Or not.
    // make the answer_options array string an actual array
    data.answer_options = parseAndReturnAnswerArray(data.answer_options);
    
    // make the answers array awsjson an actual array
    data.answers = data.answers === null ? [] : JSON.parse(data.answers);

    setQuestionData(data);
    setIsLoaded(true);

    // TODO: remove log statements
    // see shape of parsed data
    console.log("parsed data, to be saved to state:")
    console.log(data);
  };

  // get the data for the question at the id in url
  const fetchQuestion = async () => {
    const data = await API.graphql({
      query: getQuestion, 
      variables: {
        id: id,
      }
    });

    parseAndSetQuestionData(data.data.getQuestion);
  };

  // subscribe to updates to the question
  const subscribe = () => {
    return API.graphql({
      query: onUpdateQuestion,
      variables: {
        id: id,
      }
    })
    .subscribe({
      next: questionData => parseAndSetQuestionData(questionData.value.data.onUpdateQuestion)
      // next: questionData => console.log(questionData.value.data.onUpdateQuestion)
    })
  }

  useEffect(() => {
    fetchQuestion();
    // subscribe and store subscription
    const questionSubscription = subscribe();
    // return cleanup for subscriptions
    return () => questionSubscription.unsubscribe();
  }, []);

  // gets the Count of answers for each one
  const getAnswerCount = () => {
    const answerCount = [];

    if (questionData !== null || questionData !== undefined) {
      questionData.answer_options.forEach((answer, index) => {
        answerCount[index] = questionData.answers.filter(answer => answer === index).length;
      })
    }

    return answerCount;
  }


  // maybe this takes in the answer id
  const handleVote = (answerId) => {
    // ARBITRARY CLIENT-SIDE RESTRICTIONS FOR IN-CLASS DEMO
    // do not submit if we already have more than 50 votes
    const VOTE_LIMIT = 50;
    if (!voteSubmitted && questionData.answers.length < VOTE_LIMIT) {
      console.log(`pressed button ${answerId}`);
      
      const submitVote = async () => {
        await API.graphql(
          graphqlOperation(updateQuestion, {
            input: {
              id: id,
              answers: JSON.stringify([...questionData.answers, answerId]),
            }
          }));
        setVoteSubmitted(true);
      };
      submitVote();
    }
  }

  return (
    <div className="test-question-wrapper">
      <h1>Question {id}</h1>

      <div className="test-question-container">
        {
          isLoaded && questionData !== undefined ? (
            <>
              <h1>{questionData.prompt}</h1>
              <div className="answer-count-wrapper">
                {
                  getAnswerCount().map((count, index) => (
                    <p key={`answer-count-${index}`}>
                      <strong>{questionData.answer_options[index]}:</strong> {count}
                    </p>
                  ))
                }

              </div>
              {
                questionData.answer_options.map((answer, index) => (
                  <div className='test-question-choice-wrapper' key={`answer-wrapper-${index}`}>
                    <Button
                      fullWidth
                      disabled={voteSubmitted}
                      key={`answer-${index}`}
                      onClick={() => handleVote(index)}
                    >
                      {answer}
                    </Button>
                  </div>
                ))
              }
            </>
            ) : (
            <p>Loading...</p>
          )
        }
      </div>
    </div>  
  );
}
 
export default TestQuestionVote;