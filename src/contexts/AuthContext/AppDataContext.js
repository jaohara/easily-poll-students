import React, { createContext, useState } from "react";

import usePollData from "../../hooks/usePollData";

const AppDataContext = createContext(undefined);

function AppDataContextProvider(props) {
  // TODO: How do I access user auth data in here? props.user?



  // TODO: REMOVE THIS DEFAULT - this is the pollId of the test poll
  // const TEST_POLL_ID = "76854b69-9bf1-409c-88bf-e20192d62111";

  const [ pollId, setPollId ] = useState();
  // const [ pollId, setPollId ] = useState(TEST_POLL_ID);

  const {
    addGuestAnswerToCurrentQuestion,
    addNewPollGuest,
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
    // pollId: targetPollId === undefined ? DEFAULT_POLL_ID : targetPollId, 
    pollId: pollId, 
    // commented out for use in context
    // questionId: currentQuestionId,
  });

  return (
    <AppDataContext.Provider
      value={{
        addGuestAnswerToCurrentQuestion,
        addNewPollGuest,
        currentAnswerData,
        currentAnswerTally, 
        currentQuestionData,
        currentQuestionId, 
        currentQuestionIsLoaded, 
        pollData,
        pollGuestsData,
        pollId,
        pollIsLoaded,
        pollQuestionsData,
        setCurrentQuestionId, // Do I need this?
        setPollId,
        updateCurrentQuestionData, 
        updatePollData,
      }}
    >
      {props.children}
    </AppDataContext.Provider>
  )
}

export { AppDataContext, AppDataContextProvider };