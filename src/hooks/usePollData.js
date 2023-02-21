/*eslint-disable*/

//TODO: Remove eslint-disable!

import { useState, useEffect } from "react";
import { graphqlOperation } from "@aws-amplify/api";
import { 
  getPoll // TODO: Replace with custom query that returns guets and questions a la useQuestionData
} from "../graphql/queries";
import {
  createPoll,
  createQuestion,
  updatePoll,
} from "../graphql/mutations";
import {
  onCreateGuestForPoll,
  onUpdateGuestForPoll,
  onUpdatePoll,
  onUpdateQuestion,
} from "../graphql/subscriptions";

import useApi from "./useApi";
import useQuestionData from "./useQuestionData";

// TODO: REMOVE DUMMY DATA
const USER_ID = "001";


// TODO: similar to "useQuestionData", I'm going to need to create a custom query -
//  probably something like "getPollWithQuestionsAndGuests"?
const getPollWithQuestionsAndGuests = /* GraphQL */ `
query GetPoll($id: ID!) {
  getPoll(id: $id) {
    user {
      id
      email
      firstName
      lastName
      createdAt
      updatedAt
    }
    questions {
      nextToken
      items {
        id
        prompt
        answerOptions
        questionType
        createdAt
        updatedAt
        pollQuestionsId
      }
    }
    guests {
      nextToken
      items {
        id
        name
        key
        createdAt
        updatedAt
        pollGuestsId
      }
    }
    linkName {
      name
      id
      createdAt
      updatedAt
      linkNamePollId
    }
    id
    title
    isActive
    isLocked
    roomSize
    createdAt
    updatedAt
    userPollsId
    pollLinkNameId
  }
}
`;


/*
  TODO: The idea is that this hook should be able to both pull exising poll data 
  when fed a pollId and facilitate creating a poll before a poll 
*/
function usePollData({
  pollId = null, // null before poll has been created
  subscribeToChanges = false,
  userId = USER_ID,
}) {
  const [ pollIsLoaded, setPollIsLoaded ] = useState(false);
  const [ pollData, setPollData ] = useState();
  const [ pollGuestData, setPollGuestData ] = useState();
  const [ currentQuestionId, setCurrentQuestionId ] = useState(null);

  const {
    addGuestAnswer,
    answerData, 
    questionData, 
    questionIsLoaded, 
    updateQuestionData, 
  } = useQuestionData({subscribeToChanges: true, questionId: currentQuestionId});

  const API = useApi();

  // common vars for queries on this poll
  const pollVariablesObject = {
    variables: {
      id: pollId,
    }
  };

  const fetchAndSetPollData = async () => {
    if (pollId === null) {
      return;
    }

    console.log("pollId set, fetching poll data...");

    try {
      const pollResponse = await API.graphql({
        // query: getPoll,
        query: getPollWithQuestionsAndGuests,
        ...pollVariablesObject,
      });

      const pollResponseData = pollResponse.data.getPoll;
      console.log("pollResponseData:", pollResponseData);
      setPollData(pollResponseData);
    }
    catch (err) {
      console.error("Error fetching poll data:", err);
    }
  };

  // TODO: TEST
  const addNewPoll = ({ roomSize = 10, title}) => {
    const newPollDataObject = {
      input: {
        isActive: false,
        isLocked: false,
        roomSize: roomSize,
        title: title,
        userPollsId: userId,
      }
    };

    // gather all questions up 
    const newQuestionDataArray = [];

    console.log("addNewPoll with newPollDataObject:", newPollDataObject);

    const submitData = async () => {
      await API.graphql(graphqlOperation(createPoll, newPollDataObject));
    };

    submitData();
  };

  const updatePollData = (newData) => {
    if (pollId === null) {
      console.warn("updatePollData: Cannot update poll data, poll has not been created.");
      return;
    }

    const newDataObject = {
      input: {
        id: pollId,
        ...newData,
      }
    };

    console.log("updatePollData with newDataObject:", newDataObject);

    const submitData = async () => {
      await API.graphql(graphqlOperation(updatePoll, newDataObject));
    };

    submitData();
  };

  // TODO: Implement
  const addNewPollGuest = ({}) => {

  };

  // TODO: Implement
  const togglePollGuest = (guestId) => {

  };

  // subscriptions
  const subscribeToPoll = () => {
    if (pollId === null) {
      return;
    }

    return API.graphql({
      query: onUpdatePoll,
      ...pollVariablesObject,
    }).subscribe({
      next: (response) => {
        const newPollData = response.value.data.onUpdatePoll;
        console.log("pollData received from subscription:", newPollData);

        if (newPollData !== null) {
          setPollData(newPollData);
        }
        else {
          // very bad times
          const responseErrors = response.value.errors;
          console.error("Error with data received from subscription:", responseErrors);
        }
      },
      error: (err) => console.warn(err),
    })
  };

  useEffect(() => {
    pollId !== null && fetchAndSetPollData();

    if (subscribeToChanges) {
      const pollSubscription = subscribeToPoll();
      return () => {
        pollSubscription.unsubscribe();
      };
    }
  }, []);
  
  useEffect(() => {
    fetchAndSetPollData();
  }, [pollId]);

  return {
    //...(condition && { objKey: objValue }), // <- conditionally add an object property
    pollData,
    pollIsLoaded,
    updatePollData,
  }
}

export default usePollData;
