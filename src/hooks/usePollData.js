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
  onUpdateGuestForPoll,
  onUpdatePoll,
} from "../graphql/subscriptions";

import useApi from "./useApi";
import useQuestionData from "./useQuestionData";

// 3/5/23 - commented out LinkName stuff for updated schema
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
    # linkName {
    #   name
    #   id
    #   createdAt
    #   updatedAt
    #   linkNamePollId
    # }
    id
    title
    isActive
    isLocked
    roomSize
    createdAt
    updatedAt
    userPollsId
    # pollLinkNameId
  }
}
`;

function usePollData({
  pollId = null, // null before poll has been created
  questionId = null,
  subscribeToChanges = false,
  user = null,
}) {
  const [ currentQuestionId, setCurrentQuestionId ] = useState();
  const [ pollIsLoaded, setPollIsLoaded ] = useState(false);
  const [ pollIsLoading, setPollIsLoading ] = useState(false);
  const [ pollData, setPollData ] = useState();
  const [ pollQuestionsData, setPollQuestionsData ] = useState();
  const [ pollGuestsData, setPollGuestsData ] = useState();

  const {
    // addGuestAnswer: addGuestAnswerToCurrentQuestion,
    addGuestAnswer,
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
  // const questionsVariablesObject = {
  //   variables: {
  //     pollQuestionsId: pollId, 
  //   }
  // };

  // gets poll data for 
  const fetchAndSetPollData = async () => {
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

  // creates a new poll based on options passed in by default
  // optionally takes an async callback to be run after the poll is created
  const createNewPoll = ({ roomSize = 10, title, questions }, callback = async () => {}) => {
    if (!user.id) {
      console.error("createNewPoll: Cannot create poll - user isn't logged in");
      return;
    }

    const newPollDataObject = {
      input: {
        isActive: true,
        isLocked: false,
        roomSize: roomSize,
        title: title,
        userPollsId: user.id,
      }
    };

    // console.log("addNewPoll with newPollDataObject:", newPollDataObject);

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
    if (!user.id) {
      console.error("updatePollData: Cannot update poll data, user is not logged in");
    }

    if (pollId === null) {
      console.warn("updatePollData: Cannot update poll data, no poll selected.");
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
      console.log("usePollData: addNewPollGuest: pollId is null, cannot create guest.");
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

    // console.log("addNewPollGuest with newGuestDataObject:", newGuestDataObject);

    const submitData = async () => {
      return await API.graphql(graphqlOperation(createGuest, newGuestDataObject));
    };

    return submitData();
  };

  // TODO: Test
  const togglePollGuestLock = (guestId) => {
    if (!user.id) {
      console.error("togglePollGuestLock: Cannot toggle guest, user is not logged in.");
      return;
    }

    // first ensure guest exists
    let guestData = null;

    for (let i = 0; i < pollGuestsData.length; i++){
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

  // I mean, I'm Polish, but this name seems racist
  const togglePollLock = () => {
    if (!pollData) {
      console.error("usePollData: togglePollLock: cannot change lock status, no poll selected");
      return;
    }

    updatePollData({isLocked: !pollData.isLocked});
  };

  const togglePollActive = () => {
    if (!pollData) {
      console.error("usePollData: togglePollActive: cannot change active status, no poll selected");
      return
    }

    updatePollData({isActive: !pollData.isActive});
  }

  // wraps "addGuestAnswer" and checks if guest is in current poll
  const addGuestAnswerToCurrentQuestion = ({ guestId, answerValue }) => {
    const signature = "usePollData: addGuestAnswerToCurrentQuestion:";

    if (!pollData) {
      console.error(`${signature} cannot add answer, no poll selected`);
      return;
    }

    if (!pollData.isActive) {
      console.error(`${signature} cannot add answer, poll is not active`);
      return;
    }


    addGuestAnswer({ guestId, answerValue });
  };

  // =============
  // subscriptions
  // =============

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

        if (updatedGuestData !== null) {
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

    setPollData(null);
    setPollIsLoaded(false);
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
    togglePollActive,
    togglePollGuestLock,
    togglePollLock,
    updateCurrentQuestionData, 
    updatePollData,
  };
}

export default usePollData;
