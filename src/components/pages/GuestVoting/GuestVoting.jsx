import {
  React,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import { AppDataContext } from '../../../contexts/AuthContext/AppDataContext';

import "./GuestVoting.scss";

import EpButton from '../../UI/EpButton/EpButton';
import EpContainer from '../../UI/EpContainer/EpContainer';
import EpPill from '../../UI/EpPill/EpPill';
import EpLoading from '../../UI/EpLoading/EpLoading';

import EpChart from '../../UI/EpChart/EpChart';
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
    pollIsLoaded,
    selectPollById,
    // pollGuestsData,
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
        // targetPollId && (
        //   <h1>targetPollId: {targetPollId}</h1>
        // )
      }

      <div className="implementation-details">
        <p>
          This is the guest voting page. This will pull the poll data and necessary
          functions from the AppDataContext.
        </p>

        <p>
          If the guest hasn&apos;t submitted a name, it will render the form for submitting a
          name. If they have, it will display the interface for voting.
        </p>

        <p>
          We will probably need <strong>a component for creating a new guest</strong> (probably 
          using addNewPollGuest from the context/hook) and <strong>a component for the voting
          interface</strong> that uses EpChart.
        </p>

        <p>
          Upon completion, this page will forward the user to the PollReport.
        </p>

        <p>
          How would we check for completion? I&apos;m assuming we&apos;d have a useEffect callback 
          that checks for pollData.isActive, and navigate if the poll is completed.
        </p>
      </div>

      {
        !votingIsReady ? (
          <EpLoading />
        ) : (
          !guestIsReady ? (
            <GuestVotingCreateGuest
              joinPollAsGuest={joinPollAsGuest}
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
}) {
  const [ newGuestName, setNewGuestName ] = useState("");
  return (
    <EpContainer narrow centered>
      <EpTextInput 
        fullWidth
        label="New guest name"
        onChange={e => setNewGuestName(e.target.value)}
        value={newGuestName}
      />
      <EpButton
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
  pollData,
  currentAnswerTally,
  guest, 
  currentQuestionData
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