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
  BiCheckCircle,
  BiClipboard,
  BiLockAlt,
  BiLockOpenAlt,
  BiUser,
  BiUserPlus,
  BiUserX,
}  from 'react-icons/bi';

import "./CurrentPollSession.scss";

import { AppDataContext } from '../../../contexts/AuthContext/AppDataContext';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

import EpButton from '../../UI/EpButton/EpButton';
import EpContainer from '../../UI/EpContainer/EpContainer';
import EpLoading from '../../UI/EpLoading/EpLoading';
// import EpPill from '../../UI/EpPill/EpPill';

const CurrentPollSession = () => {
  const [ pollIsLoading, setPollIsLoading ] = useState(true);

  const navigate = useNavigate();
  const { targetPollId } = useParams();

  const { user } = useContext(AuthContext);

  const {
    pollGuestsData,
    pollData,
    pollIsLoaded,
    // togglePollActive,
    togglePollGuestLock,
    selectPollById,
    togglePollLock,
  } = useContext(AppDataContext);

  // page load effects
  useEffect(() => {
    if (!user) {
      console.error("CurrentPollSession: user must be authenticated to view page");
      navigate("/");
    }

    if (!targetPollId) {
      console.error("CurrentPollSession: no targetPollId set, redirecting to home...");
      navigate("/")
    }

    selectPollById(targetPollId);
  }, []);

  useEffect(() => {
    setPollIsLoading(false);
  }, [pollIsLoaded]);

  // TODO: navigate away if user doesn't own this poll
  // useEffect(() => {
    
  // }, [pollData]);

  const pollIsReady = !pollIsLoading && pollIsLoaded && pollData && user &&
    pollData.id === targetPollId && pollData.userPollsId === user.id;
  
  const copyInviteLinkHandler = () => {
    const addToClipboard = async () => {
      try {
        // TODO: make sure this works properly when deployed
        await navigator.clipboard.writeText(location.href.replace("/poll/", "/vote/"));
      }
      catch (err) {
        console.error("copyInviteLinkHandler: failed to copy:", err)
      }
    };

    addToClipboard();
  }


  return ( 
    <div className="current-poll-session">
      {
        !pollIsReady ? (
          <EpLoading />
        ) : (
          <>
            <h1>{pollData.title}</h1>

            <EpContainer className="current-poll-controls">
              <EpButton
                onClick={(copyInviteLinkHandler)}
              >
                <BiClipboard />&nbsp;
                Copy Invite Link
              </EpButton>
              <PollControlsLock
                onClick={togglePollLock}
                isLocked={pollData.isLocked}
              />
              <EpButton
                key="poll-controls-finish"
              >
                <BiCheckCircle />&nbsp;
                Finish Poll
              </EpButton>
            </EpContainer>

            <EpContainer>
              <h1>Guests</h1>

              {
                pollGuestsData && pollGuestsData.length > 0 ? (
                  pollGuestsData.map((guest, index) => (
                    <CurrentPollGuest 
                      key={`guest-${index}`}
                      guest={guest}
                      togglePollGuestLock={togglePollGuestLock}
                    />
                  ))
                ) : (
                  <div className="current-poll-no-guests">
                    No guests have joined the current poll. Invite people with the invite link. 
                  </div>
                )
              }
            </EpContainer>
          </>
        )
      }
    </div>
  );
};

function CurrentPollGuest ({guest, togglePollGuestLock}) {
  return (
    <div 
      className={`
        current-poll-guest
        ${guest.canVote ? "" : "banned"}
      `}
    >
      <div className="guest-icon-wrapper">
        <div className="guest-icon">
          <BiUser />
        </div>
      </div>
      <div className="guest-info">
        {guest.name}
      </div>
      <div className="guest-lock-wrapper">
        <EpButton
          className="guest-lock-button"
          onClick={() => togglePollGuestLock(guest.id)}
        >
          {
            guest.canVote ? (
              <BiUserX />
            ) : (
              <BiUserPlus />
            )
          }
        </EpButton>
      </div>
    </div>
  )
}

function PollControlsLock ({onClick, isLocked}) {
  return (
    <EpButton
      key="poll-controls-lock"
      onClick={onClick}
    >
      {
        isLocked ? (
          <>
            <BiLockOpenAlt />&nbsp;Unl
          </>
        ) : (
          <>
            <BiLockAlt />&nbsp;L
          </>
        )
      }
      ock Poll
    </EpButton>
  );
} 
 
export default CurrentPollSession;