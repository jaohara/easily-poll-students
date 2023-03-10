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

import { AppDataContext } from '../../../contexts/AuthContext/AppDataContext';

import "./GuestVoting.scss";

import EpButton from '../../UI/EpButton/EpButton';
import EpChart from '../../UI/EpChart/EpChart';
import EpContainer from '../../UI/EpContainer/EpContainer';
import EpLoading from '../../UI/EpLoading/EpLoading';
import EpPill from '../../UI/EpPill/EpPill';
import EpPollQuestionsList from '../../UI/EpPollQuestionsList/EpPollQuestionsList';
import EpTextInput from '../../UI/EpTextInput/EpTextInput';

const GuestVoting = () => {
  const [ answeredQuestions, setAnsweredQuestions ] = useState([]);
  const [ pollIsLoading, setPollIsLoading ] = useState(true);

  const navigate = useNavigate();
  const { targetPollId } = useParams();

  // TODO: What do I need to pull out of AppDataContext? 
  // Think about the minimum amount of things the guests need
  const {
    // addNewPollGuest,
    addGuestAnswerToCurrentQuestion,
    currentAnswerTally,
    currentQuestionData,
    guest,
    guestIsLoaded,
    joinPollAsGuest,
    pollData,
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

  const votingIsReady = pollIsLoaded && !pollIsLoading && pollData 
    && pollData.id === targetPollId && pollQuestionsData;

  // TODO: Add a check that guest.id is in pollGuestsData
  const guestIsReady = guest && guestIsLoaded;

  return ( 
    <div className="guest-voting">
      {
        !votingIsReady ? (
          <EpLoading />
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
  return (
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
          })
        }}
      >
        Join Poll
      </EpButton>
    </EpContainer>
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
                    //TODO: replace temporary voting implementation in final version
                    onClick={() => {
                      addGuestAnswerToCurrentQuestion({guestId: guest.id, answerValue: answer});
                      setAnsweredQuestions(previous => [...previous, currentQuestionData.id]);
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