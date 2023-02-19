import { useState, useEffect } from "react";
import useApi from "./useApi";
import { graphqlOperation } from "@aws-amplify/api";
import { 
  getQuestion 
  // TODO: Should this also pull in answer data per question?
} from "../graphql/queries";
import {
  updateQuestion
} from "../graphql/mutations";
import {
  onUpdateQuestion
} from "../graphql/subscriptions";

/*
  This should probably also grab the Answer and Guest data and package 
  all of this into a pretty JS object that is stored in state as questionData.

  By doing this, we won't have to worry about manually triggering updates across
  multiple hooks when Answers or whatever are added to a 
*/


// TODO: REMOVE THIS DUMMY TEST DATA
// id for Mets Question
const QUESTION_ID =  "e0d8f812-b498-4bf4-9c4f-0a49337d7286";  
// Probably not used here, but this is the Poll ID for the session that it belongs to
const POLL_ID = "000f74a0-3745-4e23-a767-9b93e9ff3b55";



// should this maybe take the questionID in as well as an arg?
//  potentially - see what the implications are when you build it without
function useQuestionData(subscribeToChanges = false) {
  const [ questionId, setQuestionId ] = useState(QUESTION_ID);
  const [ questionIsLoaded, setQuestionIsLoaded ] = useState();
  const [ questionData, setQuestionData ] = useState();

  // initialize graphQL api from other hook
  const API = useApi();

  // package these common variables up for less code reuse
  const questionVariablesObject = {
    variables: {
      id: QUESTION_ID,
    }
  };


  // TODO: REMOVE - this is just to trigger an update via JS to test subscription 
  //  response
  // const dumbTestUpdate = (newPrompt) => {
  //   const submitData = async () => {
  //     await API.graphql(graphqlOperation(updateQuestion, {
  //       input: {
  //         id: QUESTION_ID,
  //         prompt: newPrompt,
  //     }}));
  //   };

  //   submitData();
  // };

  const updateQuestionData = (newData) => {
    const newDataObject = {
      input: {
        id: QUESTION_ID,
        ...newData,
      }
    };

    console.log(newDataObject);

    const submitData = async () => {
      await API.graphql(graphqlOperation(updateQuestion, newDataObject));
    };

    submitData();
  }

  // logic for subscription
  const subscribe = () => {
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

  // load data on initial render
  useEffect(() => {
    const fetchData = async () => {
      // build out getQuestion query
      try {
        const initialQuestionResponse = await API.graphql({
          query: getQuestion,
          ...questionVariablesObject,
        });
  
        // data comes back at initialQuestionResponse.data.getQuestion

        console.log("Initial question Response:")
        console.log(initialQuestionResponse);
        setQuestionIsLoaded(true);
        setQuestionData(initialQuestionResponse.data.getQuestion);
      }
      catch (err) {
        console.error("Error fetching initial question data: ", err);
      }
    };

    fetchData();

    // if necessary, mash that subscribe button and return useEffect cleanup callback
    if (subscribeToChanges) {
      const questionSubscription = subscribe();
      return () => questionSubscription.unsubscribe();
    }
  }, []);

  // items exported from hook
  return {
    questionData,
    questionIsLoaded,
    updateQuestionData,
  }
}

export default useQuestionData;