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

const GuestVoting = () => {
  const [ pollIsLoading, setPollIsLoading ] = useState(true);

  const navigate = useNavigate();
  const { targetPollId } = useParams();

  // TODO: What do I need to pull out of AppDataContext? 
  // Think about the minimum amount of things the guests need
  const {
    // addNewPollGuest,
    // addGuestAnswerToCurrentQuestion,
    dumpCurrentAppData,
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
      <h1>Guest Voting Page</h1>
      {
        targetPollId && (
          <h1>targetPollId: {targetPollId}</h1>
        )
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
              tempJoinPollCallback={()=>{
                joinPollAsGuest({
                  name: "Test Guest",
                  key: `guest-key-${Date.now()}`,
                })
              }}
            />
          ) : (
            <GuestVotingBallot
              guest={guest}
              dumpAppDataCallback={() => console.log(dumpCurrentAppData())}
            />
          )
        )
      }
    </div>
  );
};

// This is the "Join Poll" form that is displayed with no guest
function GuestVotingCreateGuest ({
  tempJoinPollCallback,
}) {
  return (
    <EpContainer>
      No guest created, we should make one!
      <EpButton
        onClick={tempJoinPollCallback}
      >
        Make &quot;Test Guest&quot;
      </EpButton>
    </EpContainer>
  );
}

// this is the "Ballot" form that is displayed when a guest is in the poll
function GuestVotingBallot ({
  guest, 
  dumpAppDataCallback,
}) {
  return (
    <EpContainer>
      <h1>I will eventually be the question prompt?</h1>
      <p>
        Voting as <EpPill>{guest.name} - {guest.id}</EpPill>
      </p>
      <EpButton
        onClick={dumpAppDataCallback}
      >
        Log dumpCurrentAppData Result
      </EpButton>
    </EpContainer>
  );
}


 
export default GuestVoting;