import React, { 
  createContext,
  useContext, 
  useEffect, 
  useState 
} from "react";

import { 
  listPolls, 
} from "../../graphql/queries";
import { 
  onUpdateGuest
} from "../../graphql/subscriptions";

import usePollData from "../../hooks/usePollData";
import useApi from "../../hooks/useApi";
import { AuthContext } from "../AuthContext/AuthContext";

const AppDataContext = createContext(undefined);

export const listAnswersWithOwner = /* GraphQL */ `
  query ListAnswers(
    $filter: ModelAnswerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        answer
        id
        createdAt
        updatedAt
        questionAnswersId
        guestAnswersId
        owner {
          canVote
        }
      }
      nextToken
    }
  }
`;

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
    // JAO - here we want to check to see if the guest in the sessionStorage 
    //  belongs to this poll, and conditionally set the guest object to that 
    //  guest or do what we already do here if they don't 

    // TODO: Build out this pseudocode 
    // if (checkIfGuestIsInSessionStorage) {
    //   setGuest(guestFromStorage);
    //   setGuestIsLoaded(true);
    // }

    // TODO: Hide this behind an else statement
    setGuest(null);
    setGuestIsLoaded(false);
  };

  const {
    addAnswerToCurrentQuestion,
    addNewPollGuest,
    // calculateAnswerTallyFromAnswerData,
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
  };

  const addGuestAnswerToCurrentQuestion = (answerValue) => {
    console.log("addGuestAnswerToCurrentQuestion: attemping to add answer");
    addAnswerToCurrentQuestion({ guest, answerValue });
  }; 

  const subscribeToGuest = () => {
    if (!guest) {
      console.error("AppDataContext: subscribeToGuest: no guest loaded");
      return;
    }

    // const guestVariablesObject = {
    //   variables: {
    //     id: guest.id,
    //   }
    // }

    const guestVariablesObject = {
      variables: {
        filter: {
          id: {
            eq: guest.id,
          }
        }
      }
    };

    console.log("subscribeToGuest with id: ", guest.id);

    return API.graphql({
      query: onUpdateGuest,
      ...guestVariablesObject,
    }).subscribe({
      next: (response) => {
        const newGuestData = response.value.data.onUpdateGuest;
        console.log("guestData received from subscription:", newGuestData);

        if (newGuestData !== null) {
          setGuest(newGuestData);
        }
        else {
          const responseErrors = response.value.errors;
          console.error("Error with data received from subscription:", responseErrors);
        }
      },
      error: (err) => console.warn(err),
    });
  };

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

    // custom query for getting data for pollreport
    const listQuestionsWithAllAnswers = /* GraphQL */ `
      query ListQuestions(
        $filter: ModelQuestionFilterInput
        $limit: Int
        $nextToken: String
      ) {
        listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
          items {
            id
            prompt
            answerOptions
            questionType
            createdAt
            updatedAt
            pollQuestionsId
            answers {
              items {
                answer
                createdAt
                guestAnswersId
                id
                questionAnswersId
                updatedAt
                owner {
                  canVote
                }
              }
            }
          }
          nextToken
        }
      }
    `;
    
    const getData = async () => {
      const result = [];

      try {
        const answersResponse = await API.graphql({
          query: listQuestionsWithAllAnswers,
          variables: {
            filter: {
              pollQuestionsId: {
                eq: pollData.id
              }
            }
          }
        });

        const questionData = answersResponse.data.listQuestions.items;
        
        questionData.forEach(question => {
          const answerCount = {};

          question.answers.items.forEach(answerObject => {
            if (answerObject.owner.canVote) {
              // getting a little gross here, but this is how we account multiple-answer
              //  q's
              answerObject.answer.forEach(answer => {
                answerCount[answer] = !answerCount[answer] ? 1 : answerCount[answer] + 1;
              });
            }
          });

          const questionObject = {
            answerTally: {
              data: Object.values(answerCount),
              labels: Object.keys(answerCount),
            },
            id: question.id,
            prompt: question.prompt,
          };

          result.push(questionObject);
        });

      }
      catch(err) {
        console.error("Error fetching all questions with answers: ", err);
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

    return pollReport;
  };

  // updates the userPollsData when the user changes
  useEffect(() => {
    fetchAndSetAllUserPollsData();
  }, [user]);

  // set subscription for a new guest 
  useEffect(() => {
    if (guest) {
      const pollGuestSubscription = subscribeToGuest();
      return () => pollGuestSubscription.unsubscribe();
    }
  }, [guestIsLoaded])

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
