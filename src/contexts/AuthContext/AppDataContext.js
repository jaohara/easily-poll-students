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

// no idea if this is the final shape of the data, but this
// mimics the data for the "001" test user
// const DEFAULT_TEST_USER = {
//   email: "johnoharaa@gmail.com",
//   firstName: "Test",
//   id: "001",
//   lastName: "User",
// };

function AppDataContextProvider(props) {
  const API = useApi();

  const [ allUserPollsData, setAllUserPollsData ] = useState();
  const [ allUserPollsLoading, setAllUserPollsLoading ] = useState(false);
  const [ currentPollId, setCurrentPollId ] = useState();
  const [ guest, setGuest ] = useState();
  const [ guestIsLoaded, setGuestIsLoaded ] = useState(false);


  // TODO: How do I access user auth data in here? props.user?
  //  This probably won't be handled via state here but read from the 
  //  context provided by AuthContext
  // const [ user, ] = useState(DEFAULT_TEST_USER);

  const { user } = useContext(AuthContext)


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
    updateCurrentQuestionData, 
    updatePollData,
  } = usePollData({
    subscribeToChanges: true, 
    pollId: currentPollId,
    user: user ? user : null, 
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
        console.log("generatePollReport: starting getData call...")

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
        // currentPollId,
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