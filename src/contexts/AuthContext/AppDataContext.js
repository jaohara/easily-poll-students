import React, { 
  createContext,
  useContext, 
  useEffect, 
  useState 
} from "react";

import { 
  listAnswers,
  listPolls, 
} from "../../graphql/queries";

import usePollData from "../../hooks/usePollData";
import useApi from "../../hooks/useApi";
import { AuthContext } from "./AuthContext";

const AppDataContext = createContext(undefined);

function AppDataContextProvider(props) {
  const API = useApi();

  const [ allUserPollsData, setAllUserPollsData ] = useState();
  const [ allUserPollsLoading, setAllUserPollsLoading ] = useState(false);
  const [ currentPollId, setCurrentPollId ] = useState();
  const [ guest, setGuest ] = useState();
  const [ guestIsLoaded, setGuestIsLoaded ] = useState(false);

  const { user } = useContext(AuthContext);

  const selectPollById = (pollId) => {
    setCurrentPollId(pollId);
    setGuest(null);
    setGuestIsLoaded(false);
  };

  const {
    addGuestAnswerToCurrentQuestion,
    addNewPollGuest,
    calculateAnswerTallyFromAnswerData,
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
    togglePollActive,
    togglePollGuestLock,
    togglePollLock,
    updateCurrentQuestionData, 
    updatePollData,
  } = usePollData({
    subscribeToChanges: true, 
    pollId: currentPollId,
    user: user ? user : null, 
  });

  // gets a list of all polls for the given user
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
      //sort by date
      setAllUserPollsData(pollsResponse.data.listPolls.items);
    }
    catch (err) {
      console.error("fetchAndSetAllUserPollsData: ", err);
    }

    setAllUserPollsLoading(false);
  }

  // wraps createNewPoll from usePollData so that the list of polls is updated when
  const addPoll = (paramsObject) => {
    if (!user) {
      console.error("AppDataContext: addPoll: cannot create poll, user is not logged in.");
      return
    }

    return createNewPoll(paramsObject, async () => {
      await fetchAndSetAllUserPollsData();
    });
  };

  // TODO: We'll need to reimplement how this works when the actual guest creation stuff
  //  is finished
  // wraps addNewPollGuest from usePollData so that the new guest becomes the current guest
  const joinPollAsGuest = (paramsObject) => {
    const submitData = async () => {
      const newGuestResponse = await addNewPollGuest(paramsObject);
      const newGuest = newGuestResponse.data.createGuest;
      setGuest(newGuest);
      setGuestIsLoaded(true);
    };

    submitData();
  }

  // generates and returns a pollReport
  const generatePollReport = async () => {
    if (!pollData) {
      console.error("generatePollReport: Cannot generate pollReport, pollData isn't set.");
      return;
    }

    if (!pollQuestionsData) {
      console.error("generatePollReport: Cannot generate pollReport, pollQuestionsData isn't set.");
      return;
    }

    // TODO: uncomment so generatePollReport can't be called on an active poll
    // if (pollData.isActive) {
      //   console.error("generatePollReport: Cannot create pollReport on an active poll.");
      //   return;
    // }

    console.log("generatePollReport: pollData looks good, generating report...")
    
    const getData = async () => {
      const result = [];
      
      // iterate through each question, using listAnswers to get an array of answerData,
      //  and then using calculateAnswerTallyFromAnswerData to generate a 
      for (let i = 0; i < pollQuestionsData.length; i++) {
        const question = pollQuestionsData[i];
        console.log("generatePollReport: starting getData call...");

        try {
          const answersResponse = await API.graphql({
            query: listAnswers,
            variables: {
              filter: {
                questionAnswersId: {
                  eq: question.id,
                }
              }
            }
          });

          const questionObject = {
            answerTally: calculateAnswerTallyFromAnswerData(answersResponse.data.listAnswers.items),
            id: question.id,
            prompt: question.prompt,
          };

          console.log("generatePollReport: getData: created questionObject: ", questionObject);

          result.push(questionObject);
        }
        catch (err) {
          console.error("Error listing answers for question: ", err);
        }
      }

      return result;
    };
    
    const questions = await getData();
    
    const pollReport = {
      createdAt: pollData.createdAt,
      id: pollData.id,
      title: pollData.title,
      questions: questions,
    };

    console.log("generatePollReport: generated poll report: ", pollReport);

    return pollReport;
  };

  // updates the userPollsData when the user changes
  useEffect(() => {
    fetchAndSetAllUserPollsData();
  }, [user]);

  // Debug function to dump all app state values
  const dumpCurrentAppData = () => ({
    allUserPollsData: allUserPollsData,
    currentAnswerData: currentAnswerData,
    currentAnswerTally: currentAnswerTally,
    currentQuestionData: currentQuestionData,
    currentQuestionIsLoaded: currentQuestionIsLoaded,
    guest,
    guestIsLoaded,
    pollData: pollData,
    pollGuestsData: pollGuestsData,
    pollIsLoaded: pollIsLoaded,
    pollQuestionsData: pollQuestionsData,
  }); 

  return (
    <AppDataContext.Provider
      value={{
        addGuestAnswerToCurrentQuestion,
        addNewPollGuest,
        addPoll,
        allUserPollsData,
        currentAnswerData,
        currentAnswerTally, 
        currentQuestionData,
        currentQuestionId, 
        currentQuestionIsLoaded,
        dumpCurrentAppData,
        generatePollReport, 
        guest,
        guestIsLoaded,
        joinPollAsGuest,
        pollData,
        pollGuestsData,
        pollIsLoaded,
        pollQuestionsData,
        selectPollById,
        setCurrentQuestionId, // Do I need this?
        togglePollActive,
        togglePollGuestLock,
        togglePollLock,
        updateCurrentQuestionData, 
        updatePollData,
      }}
    >
      {props.children}
    </AppDataContext.Provider>
  )
}

export { AppDataContext, AppDataContextProvider };
