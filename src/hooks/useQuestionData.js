/*eslint-disable*/

//TODO: Remove eslint-disable!


import { useState, useEffect } from "react";
import useApi from "./useApi";
import { graphqlOperation } from "@aws-amplify/api";
import {
  createAnswer,
  updateAnswer,
  updateQuestion,
} from "../graphql/mutations";
import {
  onCreateAnswerForQuestion,
  onUpdateAnswerForQuestion,
  onUpdateQuestion,
} from "../graphql/subscriptions";

// Modified graphQL query to include answer data with the question data
const getQuestionWithAnswers = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      poll {
        id
        title
        isLocked
        isActive
        roomSize
        createdAt
        updatedAt
        userPollsId
        pollLinkNameId
      }
      answers {
        nextToken
        items {
          answer
          id
          createdAt
          updatedAt
          questionAnswersId
          guestAnswersId
        }
      }
      id
      prompt
      answerOptions
      questionType
      createdAt
      updatedAt
      pollQuestionsId
    }
  }`;

function useQuestionData({
  questionId = null,
  subscribeToChanges = false,
}) {
  const [ questionIsLoaded, setQuestionIsLoaded ] = useState(false);
  const [ questionData, setQuestionData ] = useState();
  const [ answerData, setAnswerData ] = useState();

  // initialize graphQL api from other hook
  const API = useApi();

  // common vars for queries on this question
  const questionVariablesObject = {
    variables: {
      id: questionId,
    }
  };

  // common vars for queries on answers for this question
  const questionAnswersVariablesObject = {
    variables: {
      questionAnswersId: questionId,
    }
  };

  const fetchAndSetQuestionData = async () => {
    if (questionId === null) {
      return;
    }

    // build out getQuestion query
    try {
      const questionResponse = await API.graphql({
        query: getQuestionWithAnswers,
        ...questionVariablesObject,
      });

      // data comes back at initialQuestionResponse.data.getQuestion
      const questionResponseData = questionResponse.data.getQuestion;
      const questionResponseAnswerData = questionResponseData.answers.items;

      console.log("questionResponseData:", questionResponseData);
      console.log("answerData:", questionResponseAnswerData);
      setQuestionIsLoaded(true);
      setQuestionData(questionResponseData);
      setAnswerData(questionResponseAnswerData);
    }
    catch (err) {
      console.error("Error fetching question data: ", err);
    }
  };

  // function for client to modify question data
  const updateQuestionData = (newData) => { 
    const newDataObject = {
      input: {
        id: questionId,
        ...newData,
      }
    };

    console.log("updateQuestionData with newDataObject:", newDataObject);

    const submitData = async () => {
      await API.graphql(graphqlOperation(updateQuestion, newDataObject));
    };

    submitData();
  }

  // logic for subscription - is this as useful as the answers subscription?
  const subscribeToQuestion = () => {
    return API.graphql({
      query: onUpdateQuestion,
      ...questionVariablesObject,
    }).subscribe({
      next: (response) => {
        const newQuestionData = response.value.data.onUpdateQuestion;
        console.log("questionData received from subscription:", newQuestionData);

        if (newQuestionData !== null) {
          setQuestionData(newQuestionData);
        }
        else {
          //oh fuck
          const responseErrors = response.value.errors;
          console.error("Error with data received from subscription:", responseErrors);
        }
      },
      error: (err) => console.warn(err),
    })
  };

  const subscribeToCreatedAnswers = () => {
    return API.graphql({
      query: onCreateAnswerForQuestion,
      ...questionAnswersVariablesObject,
    }).subscribe({
      next: (response) => {
        const newAnswer = response.value.data.onCreateAnswerForQuestion;
        console.log("Received newAnswer:", newAnswer);
        
        // new Answer data is appended
        setAnswerData(oldAnswerData => [...oldAnswerData, newAnswer]);
      },
      error: (err) => console.warn(err),
    });
  };

  const subscribeToUpdatedAnswers = () => {
    return API.graphql({
      query: onUpdateAnswerForQuestion,
      ...questionAnswersVariablesObject,
    }).subscribe({
      next: (response) => {
        const updatedAnswer = response.value.data.onUpdateAnswerForQuestion;
        console.log("updatedAnswer Response:", response);
        console.log("Received updatedAnswer:", updatedAnswer);
        
        // go through the current answer array and replace the updated answer
        setAnswerData(oldAnswerData => oldAnswerData.map(
          answer => answer.id === updatedAnswer.id ? updatedAnswer : answer
        ));
      },
      error: (err) => console.warn(err),
    });
  };

  const addGuestAnswer = ({ guestId, answerValue }) => {
    const guestAnswerDataObject = {
      input: {
        answer: answerValue,
        guestAnswersId: guestId,
        questionAnswersId: questionId,
      }
    };

    console.log("addGuestAnswer with guestAnswerDataObject:", guestAnswerDataObject);

    const submitData = async () => {
      await API.graphql(graphqlOperation(createAnswer, guestAnswerDataObject));
    };

    submitData();
  };

  // TODO: Idea for this - maybe make the "addGuestAnswer" function check to see
  // if the guest has already answered for this question, then either have it
  // add a new answer if they haven't or update if they already have.
  const updateGuestAnswer = ({ guestId, newAnswerValue }) => {

  };

  // load data on initial render
  useEffect(() => {
    fetchAndSetQuestionData();

    // if necessary, mash that subscribe button and return useEffect cleanup callback
    if (subscribeToChanges && questionId !== null) {
      const questionSubscription = subscribeToQuestion();
      const questionAnswerCreatedSubscription = subscribeToCreatedAnswers();
      const questionAnswerUpdatedSubscription = subscribeToUpdatedAnswers();
      return () => {
        questionSubscription.unsubscribe();
        questionAnswerCreatedSubscription.unsubscribe();
        questionAnswerUpdatedSubscription.unsubscribe();
      };
    }
  }, []);

  // update question data when the questionId is changed
  useEffect(() => {
    fetchAndSetQuestionData();
  }, [questionId])

  // items exported from hook
  return {
    addGuestAnswer,
    answerData,
    questionData,
    questionIsLoaded,
    updateQuestionData,
  };
}

export default useQuestionData;
