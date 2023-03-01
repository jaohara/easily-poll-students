import React, { createContext, useState } from "react";

import { listPolls } from "../../graphql/queries";

import usePollData from "../../hooks/usePollData";
import useApi from "../../hooks/useApi";
import { useEffect } from "react";

const AppDataContext = createContext(undefined);

// no idea if this is the final shape of the data, but this
// mimics the data for the "001" test user
const DEFAULT_TEST_USER = {
  email: "johnoharaa@gmail.com",
  firstName: "Test",
  id: "001",
  lastName: "User",
};

function AppDataContextProvider(props) {
  const API = useApi();

  const [ allUserPollsData, setAllUserPollsData ] = useState();
  const [ allUserPollsLoading, setAllUserPollsLoading ] = useState(false);
  const [ currentPollId, setCurrentPollId ] = useState();
  // TODO: How do I access user auth data in here? props.user?
  //  This probably won't be handled via state here but read from the 
  //  context provided by AuthContext
  const [ user, ] = useState(DEFAULT_TEST_USER);

  // TODO: REMOVE THIS DEFAULT - this is the pollId of the test poll
  // const TEST_POLL_ID = "76854b69-9bf1-409c-88bf-e20192d62111";


  // TODO : needs to check if poll is a valid poll by the user - 
  //    probably whether or not it exists in "allUserPollsData" 
  const selectPollById = (pollId) => {
    setCurrentPollId(pollId);
  };

  const {
    addGuestAnswerToCurrentQuestion,
    addNewPollGuest,
    createNewPoll, 
    currentAnswerData,
    currentAnswerTally, 
    currentQuestionData,
    currentQuestionId, 
    currentQuestionIsLoaded,
    pollData,
    pollGuestsData,
    pollIsLoaded,
    pollQuestionsData,
    setCurrentQuestionId,
    updateCurrentQuestionData, 
    updatePollData,
  } = usePollData({
    subscribeToChanges: true, 
    pollId: currentPollId,
    userId: user ? user.id : null, 
  });

  // TODO: This needs to run when a new poll is created
  const fetchAndSetAllUserPollsData = async () => {
    if (!user) {
      console.error("fetchAndSetAllUserPollsData: Cannot fetch user polls, user is not logged in");
      return;
    }

    if (allUserPollsLoading) {
      return;
    }

    setAllUserPollsLoading(true);

    try {
      const pollsResponse = await API.graphql({
        query: listPolls,
        variables: {
          filter: {
            userPollsId: {
              eq: user.id,
            }
          }
        },
      });

      console.log("All user polls: ", pollsResponse.data.listPolls.items);
      setAllUserPollsData(pollsResponse.data.listPolls.items);
    }
    catch (err) {
      console.error("fetchAndSetAllUserPollsData: ", err);
    }

    setAllUserPollsLoading(false);
  }

  // wraps createNewPoll from usePollData so that the list of polls is updated when
  const addPoll = (paramsObject) => {
    return createNewPoll(paramsObject, async () => {
      await fetchAndSetAllUserPollsData();
    });
  }

  useEffect(() => {
    fetchAndSetAllUserPollsData();
  }, [user]);

  return (
    <AppDataContext.Provider
      value={{
        addGuestAnswerToCurrentQuestion,
        addNewPollGuest,
        addPoll,
        allUserPollsData,
        currentAnswerData,
        currentAnswerTally, 
        // currentPollId,
        currentQuestionData,
        currentQuestionId, 
        currentQuestionIsLoaded, 
        pollData,
        pollGuestsData,
        pollIsLoaded,
        pollQuestionsData,
        selectPollById,
        // setCurrentPollId,
        setCurrentQuestionId, // Do I need this?
        updateCurrentQuestionData, 
        updatePollData,
      }}
    >
      {props.children}
    </AppDataContext.Provider>
  )
}

export { AppDataContext, AppDataContextProvider };