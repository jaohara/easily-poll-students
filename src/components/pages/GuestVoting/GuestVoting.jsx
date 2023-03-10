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

import { AppDataContext } from '../../../contexts/AuthContext/AppDataContext';

import "./GuestVoting.scss";

import EpButton from '../../UI/EpButton/EpButton';
import EpChart from '../../UI/EpChart/EpChart';
import EpContainer from '../../UI/EpContainer/EpContainer';
import EpLoading from '../../UI/EpLoading/EpLoading';
import EpPill from '../../UI/EpPill/EpPill';
import EpTextInput from '../../UI/EpTextInput/EpTextInput';

const GuestVoting = () => {
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
    pollIsLoaded,
    selectPollById,
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
    && pollData.id === targetPollId;

  // TODO: Add a check that guest.id is in pollGuestsData
  const guestIsReady = guest && guestIsLoaded;

  return ( 
    <div className="guest-voting">
      {
        !votingIsReady ? (
          <EpLoading />
        ) : (
          !guestIsReady ? (
            <GuestVotingCreateGuest
              joinPollAsGuest={joinPollAsGuest}
              pollData={pollData}
              pollGuestsData={pollGuestsData}
            />
          ) : (
            <GuestVotingBallot
              pollData={pollData}
              currentAnswerTally={currentAnswerTally}
              currentQuestionData={currentQuestionData}
              guest={guest}
              addGuestAnswerToCurrentQuestion={addGuestAnswerToCurrentQuestion}
            />
          )
        )
      }
    </div>
  );
};

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
  currentAnswerTally,
  currentQuestionData,
  guest, 
  pollData,
}) {
  return (
    <>
      <h1>{pollData.title}</h1>
      <EpContainer>
        <h1>{currentQuestionData.prompt}</h1>
        <EpChart 
          chartType="pie"
          data={currentAnswerTally.data}
          labels={currentAnswerTally.labels}
        />
        <p>
          Voting as <EpPill>{guest.name} - {guest.id}</EpPill>
        </p>
        {
          //TODO: we should check to see if answerOptions exists and is not empty
          currentQuestionData.answerOptions.map((answer, index) => (
            <EpButton
              key={`answerOption-${index}`}
              //TODO: replace temporary voting implementation in final version
              onClick={() => 
                addGuestAnswerToCurrentQuestion({guestId: guest.id, answerValue: answer})
              }
            >
              {answer}
            </EpButton>
          )
          )
        }
      </EpContainer>
    </>
  );
}


 
export default GuestVoting;