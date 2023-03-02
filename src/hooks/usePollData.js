/*eslint-disable*/

//TODO: Remove eslint-disable!

import { useState, useEffect } from "react";
import { graphqlOperation } from "@aws-amplify/api";
import {
  createGuest,
  createPoll,
  createQuestion,
  updateGuest,
  updatePoll,
} from "../graphql/mutations";
import {
  onCreateGuestForPoll,
  // onCreateQuestionForPoll, // see note below
  onUpdateGuestForPoll,
  onUpdatePoll,
  // onUpdateQuestionForPoll, // see note below
} from "../graphql/subscriptions";

/*
  Do we need to subsribe to "onCreateQuestionForPoll" and "onUpdateQuestionForPoll"? 
  Potentially not - I'm not sure if either of these entities will change during the
  lifecycle of a poll. It's more likely that the questions will be created when the 
  poll is created via the "addNewPoll" function. I wrote more thoughts in the comment
  above commented-out "subscribeToQuestions" function stub.

  We can return to this later if this is something we want to do.
*/

import useApi from "./useApi";
import useQuestionData from "./useQuestionData";

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
  questionId = null,
  subscribeToChanges = false,
  userId = null,
}) {
  const [ pollIsLoaded, setPollIsLoaded ] = useState(false);
  const [ pollIsLoading, setPollIsLoading ] = useState(false);
  const [ pollData, setPollData ] = useState();
  const [ pollQuestionsData, setPollQuestionsData ] = useState();
  const [ pollGuestsData, setPollGuestsData ] = useState();
  const [ currentQuestionId, setCurrentQuestionId ] = useState();

  const {
    addGuestAnswer: addGuestAnswerToCurrentQuestion,
    answerData: currentAnswerData,
    answerTally: currentAnswerTally,
    calculateAnswerTallyFromAnswerData, 
    questionData: currentQuestionData, 
    questionIsLoaded: currentQuestionIsLoaded, 
    updateQuestionData: updateCurrentQuestionData, 
  } = useQuestionData({subscribeToChanges: true, questionId: currentQuestionId});

  const API = useApi();

  // common vars for queries on this poll
  const pollVariablesObject = {
    variables: {
      id: pollId,
    }
  };


  // common vars for guest queries and subs
  const guestsVariablesObject = {
    variables: {
      pollGuestsId: pollId,
    }
  };

  // common vars for question queries and subs
  const questionsVariablesObject = {
    variables: {
      pollQuestionsId: pollId, 
    }
  };

  const fetchAndSetPollData = async () => {
    // if (!pollId === null || pollIsLoading) {
    if (!pollId || pollIsLoading) {
      return;
    }

    console.log("pollId set, fetching poll data...");

    setPollIsLoading(true);

    try {
      const pollResponse = await API.graphql({
        query: getPollWithQuestionsAndGuests,
        ...pollVariablesObject,
      });

      const pollResponseData = pollResponse.data.getPoll;
      const pollResponseGuestData = pollResponseData.guests.items;
      const pollResponseQuestionData = pollResponseData.questions.items;

      console.log("pollResponseData:", pollResponseData);
      console.log("pollResponseGuestData:", pollResponseGuestData);
      console.log("pollResponseQuestionData:", pollResponseQuestionData);
      setPollData(pollResponseData);
      setPollGuestsData(pollResponseGuestData);
      setPollQuestionsData(pollResponseQuestionData);
      setCurrentQuestionId(pollResponseQuestionData[0].id);
      setPollIsLoaded(true);
    }
    catch (err) {
      console.error("Error fetching poll data:", err);
    }

    setPollIsLoading(false);
  };

  // TODO: Finish implementing question adding portion and test
  const createNewPoll = ({ roomSize = 10, title, questions }, callback = async () => {}) => {
    if (!userId) {
      console.error("createNewPoll: Cannot create poll - user isn't logged in");
      return;
    }

    const newPollDataObject = {
      input: {
        isActive: true,
        isLocked: false,
        roomSize: roomSize,
        title: title,
        userPollsId: userId,
      }
    };

    console.log("addNewPoll with newPollDataObject:", newPollDataObject);

    const submitData = async () => {
      const newPollResponse = await API.graphql(graphqlOperation(createPoll, newPollDataObject));
      const newPollData = newPollResponse.data.createPoll;

      console.log("createNewPoll: newPollData:", newPollData);

      // TODO: now append questions
      for (let i = 0; i < questions.length; i++) {
        // this assumes the items in the "questions" array match the shape of the question data
        const newQuestionDataObject = {
          input: {
            pollQuestionsId: newPollData.id,
            ...questions[i],
            // HARDCODING IN "single" QUESTION TYPE
            // TODO: make some way to choose this option
            questionType: "single",
          }
        }

        await API.graphql(graphqlOperation(createQuestion, newQuestionDataObject));
        await callback();
      }

      return newPollData;
    };

    return submitData();
  };

  const updatePollData = (newData) => {
    if (!userId) {
      console.error("updatePollData: Cannot update poll data, user is not logged in");
    }

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

  // TODO: test
  const addNewPollGuest = ({name, key}) => {
    if (pollId === null) {
      console.log("pollId is null, not creating guest.");
      return;
    }

    const newGuestDataObject = {
      input: {
        canVote: true,
        key: key,
        name: name,
        pollGuestsId: pollId,
      }
    };

    console.log("addNewPollGuest with newGuestDataObject:", newGuestDataObject);

    const submitData = async () => {
      await API.graphql(graphqlOperation(createGuest, newGuestDataObject));
    };

    submitData();
  };

  // TODO: Test
  const togglePollGuestLock = (guestId) => {
    if (!userId) {
      console.error("togglePollGuestLock: Cannot toggle guest, user is not logged in.");
      return;
    }

    // first ensure guest exists
    let guestData = null;

    for (let i = 0; i < pollGuestsData; i++){
      if (pollGuestsData[i].id === guestId) {
        guestData = pollGuestsData[i];
      }
    }

    if (guestData === null) {
      console.log(`togglePollGuestLock: guest "${guestId}" does not exist, aborting`);
      return;
    }

    console.log(`togglePollGuestLock: toggling guest '${guestData.id}' canVote to '${!guestData.canVote}'`);

    const guestDataObject = {
      input: {
        id: guestId,
        canVote: !guestData.canVote,
      }
    };

    const submitData = async () => {
      await API.graphql(graphqlOperation(updateGuest, guestDataObject));
    }

    submitData();
  };

  // subscriptions
  const subscribeToPoll = () => {
    if (pollId === null || subscribeToChanges === false) {
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
    });
  };

  const subscribeToCreatedGuests = () => {
    if (pollId === null || subscribeToChanges === false) {
      return;
    }

    return API.graphql({
      query: onCreateGuestForPoll,
      ...guestsVariablesObject,
    }).subscribe({
      next: (response) => {
        const newGuestData = response.value.data.onCreateGuestForPoll;
        console.log("newGuestData received from subscription:", newGuestData);

        if (newGuestData !== null) {
          setPollGuestsData(oldGuestsData => [...oldGuestsData, newGuestData]);
        }
        else {
          // very bad times
          const responseErrors = response.value.errors;
          console.error("Error with data received from subscription:", responseErrors);
        }
      },
      error: (err) => console.warn(err),
    });
  };

  // TODO: test
  const subscribeToUpdatedGuests = () => {
    if (pollId === null || subscribeToChanges === false) {
      return;
    }

    return API.graphql({
      query: onUpdateGuestForPoll,
      ...guestsVariablesObject,
    }).subscribe({
      next: (response) => {
        const updatedGuestData = response.value.data.onUpdateGuestForPoll;
        console.log("updatedGuestData received from subscription:", updatedGuestData);

        if (newGuestData !== null) {
          setPollGuestsData(oldGuestsData => oldGuestsData.map(guest => 
            guest.id === updatedGuestData.id ? updatedGuestData : guest
          ));
        }
        else {
          // very bad times
          const responseErrors = response.value.errors;
          console.error("Error with data received from subscription:", responseErrors);
        }
      },
      error: (err) => console.warn(err),
    });
  };

  // TODO: implement
  //
  // Do we actually need this? I don't think we need it until a scenario where
  // we can append questions on the fly, but I don't think we want to be doing
  // this when a poll is already live. I envision that the user flow for poll
  // creation will have a user create all of the poll questions before the poll 
  // has started. This also makes for far fewer headaches. 
  //
  // const subscribeToQuestions = () => {
  //   if (pollId === null || subscribeToChanges === false) {
  //     return;
  //   }
  // };

  useEffect(() => {
    if (!pollId) {
      return;
    }

    console.log("in useEffect for pollId changing:", pollId);

    fetchAndSetPollData();

    if (subscribeToChanges) {
      const pollSubscription = subscribeToPoll();
      const pollGuestCreatedSubscription = subscribeToCreatedGuests();
      const pollGuestUpdatedSubscription = subscribeToUpdatedGuests();
      return () => {
        pollSubscription.unsubscribe();
        pollGuestCreatedSubscription.unsubscribe();
        pollGuestUpdatedSubscription.unsubscribe();
      };
    }
  }, [pollId]);

  // Not sure if I want to handle this like this. questionId should probably 
  //  not be pulled from a param but instead set to the first questionId of questionData 
  //  like in fetchAndSetPollData
  useEffect(() => {
    setCurrentQuestionId(questionId);
  }, [questionId])
  
  // This was causing errors with data being pulled twice - seeing as
  // we should only have data pull when a pollId is set, I made the above
  // hook use that dependency. 
  // useEffect(() => {
  //   !pollIsLoaded && fetchAndSetPollData();
  // }, [pollId]);

  return {
    //...(condition && { objKey: objValue }), // <- conditionally add an object property
    addGuestAnswerToCurrentQuestion,
    addNewPollGuest,
    calculateAnswerTallyFromAnswerData,
    currentAnswerData,
    currentAnswerTally, 
    currentQuestionData,
    currentQuestionId, 
    currentQuestionIsLoaded,
    createNewPoll,
    pollData,
    pollGuestsData,
    pollIsLoaded,
    pollQuestionsData,
    setCurrentQuestionId,
    togglePollGuestLock,
    updateCurrentQuestionData, 
    updatePollData,
  };
}

export default usePollData;
