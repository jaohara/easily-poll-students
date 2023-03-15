import { useState, useEffect } from "react";
import sha256 from "sha256";
import useApi from "./useApi";
import { graphqlOperation } from "@aws-amplify/api";
import {
  // createAnswer,
  // updateAnswer,
  updateQuestion,
} from "../graphql/mutations";
import {
  onCreateAnswerForQuestion,
  onUpdateAnswerForQuestion,
  onUpdateQuestion,
} from "../graphql/subscriptions";

// 3/5/23 - commented out LinkName stuff for updated schema
// Modified graphQL query to include answer data with the question data
const getQuestionWithAnswers = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
      # poll {
      #   id
      #   title
      #   isLocked
      #   isActive
      #   roomSize
      #   createdAt
      #   updatedAt
      #   userPollsId
      #   # pollLinkNameId
      # }
      answers {
        nextToken
        items {
          answer
          id
          createdAt
          owner {
            canVote
          }
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
  const [ answerData, setAnswerData ] = useState();
  const [ answerTally, setAnswerTally ] = useState();
  // const [ calculatingAnswerTally, setCalculatingAnswerTally ] = useState(false);
  const [ questionIsLoaded, setQuestionIsLoaded ] = useState(false);
  const [ questionIsLoading, setQuestionIsLoading ] = useState(false);
  const [ questionData, setQuestionData ] = useState();

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

  // ================
  // Helper functions
  // ================
  
  // parses answer options if array was stored as string
  const parseAnswerOptions = (answerOptionsData) => Array.isArray(answerOptionsData) ?
    answerOptionsData : JSON.parse(answerOptionsData);

  // calculates answer tally in a form for charts from an answerData array and returns
  //  the object. answerData is an array of the Objects returned by the getAnswer query.
  const calculateAnswerTallyFromAnswerData = (data = answerData) => {
    if (!data) {
      console.log("calculateAnswerTallyFromAnswerData: no data provided")
      return;
    }

    const answerCount = {};

    for (let i = 0; i < data.length; i++) {
      if (data[i].owner.canVote) {
        //TODO: we will need to rework this for multiple choice questions
        //  gross, but nested for loop to iterate through the internal array?
        const currentAnswer = data[i].answer[0];

        if (!answerCount[currentAnswer]) {
          // does not exist in answerCount object, so create it
          answerCount[currentAnswer] = 1;
        }
        else {
          answerCount[currentAnswer]++;
        }
      }
    }

    return {
      data: Object.values(answerCount),
      labels: Object.keys(answerCount),
    }
  };
  
  // calculates answer tally in a form for charts and saves it in state
  const calculateAndSetAnswerTally = () => {
    setAnswerTally(calculateAnswerTallyFromAnswerData())
  };

  // gets question data from server and saves it in client state
  const fetchAndSetQuestionData = async () => {
    if (questionId === null || questionIsLoading) {
      return;
    }

    console.log("questionId set, fetching question data...");

    setQuestionIsLoading(true);

    // build out getQuestion query
    try {
      const questionResponse = await API.graphql({
        query: getQuestionWithAnswers,
        ...questionVariablesObject,
      });

      // data comes back at questionResponse.data.getQuestion
      const questionResponseData = questionResponse.data.getQuestion;
      const questionAnswerOptionsArray = parseAnswerOptions(questionResponseData.answerOptions);
      const questionResponseAnswerData = questionResponseData.answers.items;

      questionResponseData.answerOptions = questionAnswerOptionsArray;

      console.log("questionResponseData:", questionResponseData);
      console.log("answerData:", questionResponseAnswerData);
      setQuestionData(questionResponseData);
      setAnswerData(questionResponseAnswerData);
      setQuestionIsLoaded(true);
    }
    catch (err) {
      console.error("Error fetching question data: ", err);
    }

    setQuestionIsLoading(false);
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

  // =============
  // Subscriptions
  // =============

  // is this as useful as the answers subscription?
  const subscribeToQuestion = () => {
    return API.graphql({
      query: onUpdateQuestion,
      ...questionVariablesObject,
    }).subscribe({
      next: (response) => {
        const newQuestionData = response.value.data.onUpdateQuestion;
        console.log("questionData received from subscription:", newQuestionData);

        if (newQuestionData !== null) {
          const newQuestionAnswerOptionsArray = JSON.parse(newQuestionData.answerOptions);
          newQuestionData.answerOptions = newQuestionAnswerOptionsArray;
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

  // adds a guest answer to this question. Does not check if guest is in poll - 
  //  this function is wrapped in usePollData
  const addAnswer = ({ guest, answerValue }) => {
    const timeStamp = Date.now();
    const verify = sha256(guest.key + timeStamp);

    // console.log("attempting to add answer with current guest:", guest);

    const guestAnswerRequestObject = {
      body: {
        answer: answerValue,
        id: guest.id,
        questionId: questionId,
        timeStamp: timeStamp,
        verify: verify,
      },
      headers: {},
    };

    // console.log("about to post guestAnswerRequestObject: ", guestAnswerRequestObject);

    API.post('guest', '/answer', guestAnswerRequestObject)
      .then((res) => console.log("addAnswer: success: ", res))
      .catch((err) => console.error("addAnswer: failure: ", err));

    // const guestAnswerDataObject = {
    //   input: {
    //     answer: answerValue,
    //     guestAnswersId: guest.id,
    //     questionAnswersId: questionId,
    //   }
    // };

    // console.log("addGuestAnswer with guestAnswerDataObject:", guestAnswerDataObject);

    // const submitData = async () => {
    //   await API.graphql(graphqlOperation(createAnswer, guestAnswerDataObject));
    // };

    // submitData();
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
  }, [questionId]);

  useEffect(() => {
    calculateAndSetAnswerTally();
  }, [answerData]);

  // update question data when the questionId is changed
  // useEffect(() => {
  //   fetchAndSetQuestionData();
  // }, [questionId])

  // items exported from hook
  return {
    addAnswer,
    answerData,
    answerTally,
    calculateAnswerTallyFromAnswerData,
    questionData,
    questionIsLoaded,
    updateQuestionData,
  };
}

export default useQuestionData;
