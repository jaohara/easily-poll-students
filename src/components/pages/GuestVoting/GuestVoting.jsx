import {
  React,
  useContext,
  useEffect,
  useState,
} from 'react';
import { 
  useNavigate,
  useParams,
} from 'react-router-dom';

import {
  BiLock
} from "react-icons/bi";

import { AppDataContext } from '../../../contexts/AppDataContext/AppDataContext';

import "./GuestVoting.scss";

import EpButton from '../../UI/EpButton/EpButton';
import EpChart from '../../UI/EpChart/EpChart';
import EpContainer from '../../UI/EpContainer/EpContainer';
import EpLoading from '../../UI/EpLoading/EpLoading';
import EpPill from '../../UI/EpPill/EpPill';
import EpPollDoesNotExist from "../../UI/EpPollDoesNotExist/EpPollDoesNotExist";
import EpPollQuestionsList from '../../UI/EpPollQuestionsList/EpPollQuestionsList';
import EpPollVotingIsNotLive from "../../UI/EpPollVotingIsNotLive/EpPollVotingIsNotLive";
import EpTextInput from '../../UI/EpTextInput/EpTextInput';

const GuestVoting = () => {
  const [ answeredQuestions, setAnsweredQuestions ] = useState([]);
  const [ pollIsLoading, setPollIsLoading ] = useState(true);

  const navigate = useNavigate();
  const { targetPollId } = useParams();

  // TODO: What do I need to pull out of AppDataContext? 
  // Think about the minimum amount of things the guests need
  const {
    addGuestAnswerToCurrentQuestion,
    currentAnswerTally,
    currentQuestionData,
    guest,
    guestIsLoaded,
    joinPollAsGuest,
    pollData,
    pollDoesNotExist,
    pollGuestsData,
    pollQuestionsData,
    pollIsLoaded,
    selectPollById,
    setCurrentQuestionId,
  } = useContext(AppDataContext);


  // set poll to targetPollId, or redirect to home if null
  useEffect(() => {
    if (!targetPollId) {
      console.log("GuestVoting: No targetPollId set, redirecting to home...");
      navigate("/");
    }

    console.log(`GuestVoting: selecting poll: ${targetPollId}...`);
    selectPollById(targetPollId);
  }, []);

  // might not work right now - setPollIsLoading to false when we know the poll is loaded
  useEffect(() => {
    setPollIsLoading(false);
  }, [pollIsLoaded]);

  useEffect(() => {
    if (!pollData) {
      return;
    }
    
    if (!pollData.isActive) {
      navigate(`/results/${pollData.id}`)
    }
  }, [pollData]);

  
  // TODO: Add a check that guest.id is in pollGuestsData
  // const guestIsReady = guest && guestIsLoaded;
  const guestIsReady = guest && guestIsLoaded;
  
  const pollIsReady = pollIsLoaded && !pollIsLoading && pollData 
    && pollData.id === targetPollId && pollQuestionsData;

  return ( 
    <div className="guest-voting">
      {
        !pollIsReady ? (
          pollDoesNotExist ? (
            <EpPollDoesNotExist />
          ): (
            <EpLoading
              centered
              narrow 
              message={"Loading Poll..."}
            />
          )
        ) : (
          !guestIsReady ? (
            pollData.isLocked ? (
              <GuestVotingPollIsLocked />
            ) : (
              <GuestVotingCreateGuest
                joinPollAsGuest={joinPollAsGuest}
                pollData={pollData}
                pollGuestsData={pollGuestsData}
              />
            )
          ) : (
            !pollData.votingIsLive ? (
              <EpPollVotingIsNotLive 
                guest={guest}
                pollTitle={pollData.title}
              />
            ) : (
              <GuestVotingBallot
                addGuestAnswerToCurrentQuestion={addGuestAnswerToCurrentQuestion}
                answeredQuestions={answeredQuestions}
                currentAnswerTally={currentAnswerTally}
                currentQuestionData={currentQuestionData}
                guest={guest}
                pollData={pollData}
                pollQuestionsData={pollQuestionsData}
                setAnsweredQuestions={setAnsweredQuestions}
                setCurrentQuestionId={setCurrentQuestionId}
              />
            )
          )
        )
      }
    </div>
  );
};

function GuestVotingPollIsLocked () {
  return (
    <EpContainer
      centered
      className="guest-voting-poll-is-locked"
      narrow
    >
      <div className="guest-voting-poll-is-locked-icon-wrapper">
        <BiLock />
      </div>
      <p>
        Poll is locked and not accepting new guests.
      </p>
    </EpContainer>
  )
}

// This is the "Join Poll" form that is displayed with no guest
function GuestVotingCreateGuest ({
  joinPollAsGuest,
  pollData,
  pollGuestsData,
}) {
  const [ newGuestName, setNewGuestName ] = useState("");
  const [ formSubmitted, setFormSubmitted ] = useState(false);

  return (
    <>
      {
        formSubmitted ? (
          <EpLoading
            centered
            narrow
            message={`Joining as ${newGuestName}...`}
          />
        ) : (
          <EpContainer 
            centered
            className="guest-voting-create-guest-container"
            narrow 
          >
            <div className="guest-voting-create-guest-metadata">
              <h1>{pollData.title}</h1>
              <h2>Shared by {`${pollData.user.firstName} ${pollData.user.lastName}`}</h2>
              <EpPill>
                {pollGuestsData.length} guest{pollGuestsData.length !== 1 ? "s" : ""} in poll
              </EpPill>
            </div>
            <div className="guest-voting-create-guest-input-wrapper">
              <EpTextInput
                fullWidth
                label="New guest name"
                onChange={e => setNewGuestName(e.target.value)}
                value={newGuestName}
              />
            </div>
            <EpButton
              fullWidth
              onClick={()=>{
                joinPollAsGuest({
                  name: newGuestName,
                  key: `guest-key-${Date.now()}`,
                });
                setFormSubmitted(true);
              }}
            >
              Join Poll
            </EpButton>
          </EpContainer>
        )
      }
    </>
  );
}

// this is the "Ballot" form that is displayed when a guest is in the poll
function GuestVotingBallot ({
  addGuestAnswerToCurrentQuestion,
  answeredQuestions,
  currentAnswerTally,
  currentQuestionData,
  guest, 
  pollData,
  pollQuestionsData,
  setAnsweredQuestions,
  setCurrentQuestionId,
}) {
  // TODO: we need to implement some sort of "increment question" function
  const ballotActive = guest.canVote && pollData.isActive;

  const questionIds = pollQuestionsData.map(question => question.id);

  const goToNextQuestion = () => {
    const currentIdIndex = questionIds.indexOf(currentQuestionData.id);

    if (currentIdIndex === -1 || currentIdIndex === pollQuestionsData.length - 1) {
      return;
    }

    setCurrentQuestionId(questionIds[currentIdIndex + 1]);
  };

  return (
    <>
      <h1>{pollData.title}</h1>
      <EpContainer>
        <div className="guest-poll-info">
          {/* TODO: remove the id from this when we're done debugging */}
          <EpPill
            key="guest-name"
          >
            {guest.name} - {guest.id}
          </EpPill>
          {
            !guest.canVote && (
              <EpPill
                key="guest-voting-status"
              >
                Guest Cannot Vote
              </EpPill>
            )
          }
          {
            pollData.isLocked && (
              <EpPill
                key="guest-voting-status"
              >
                Poll Is Locked
              </EpPill>
            )
          }
        </div>
        <div className="guest-voting-ballot-questions-wrapper">
          <EpPollQuestionsList
            answeredQuestions={answeredQuestions}
            className="guest-voting-ballot-questions-list"
            currentQuestionId={currentQuestionData.id}
            pollQuestions={pollQuestionsData}
            setCurrentQuestionId={setCurrentQuestionId}
          />
          <div className="guest-voting-ballot-question">
            <h1>{currentQuestionData.prompt}</h1>
            <EpChart 
              chartType="pie"
              data={currentAnswerTally.data}
              labels={currentAnswerTally.labels}
            />
            {
              //TODO: we should check to see if answerOptions exists and is not empty
              currentQuestionData.answerOptions.map((answer, index) => (
                <div 
                  className="guest-voting-ballot-answer-button-wrapper"
                  key={`answer-button-wrapper-${index}`}
                >
                  <EpButton
                    disabled={!ballotActive}
                    fullWidth
                    key={`answerOption-${index}`}
                    onClick={() => {
                      console.log("GuestVoting: in click handler");
                      const answerSubmitted = addGuestAnswerToCurrentQuestion(answer);

                      if (answerSubmitted) {
                        setAnsweredQuestions(previous => [...previous, currentQuestionData.id]);
                        goToNextQuestion();
                      }
                    }}
                    >
                    {answer}
                  </EpButton>
                </div>
              )
              )
            }
          </div>
        </div>
      </EpContainer>
    </>
  );
}


 
export default GuestVoting;