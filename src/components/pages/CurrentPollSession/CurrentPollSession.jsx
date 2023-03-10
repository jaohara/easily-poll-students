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
  BiCollapseVertical,
  BiExpandVertical,
  BiFilterAlt,
  BiLockAlt,
  BiLockOpenAlt,
  // BiSearchAlt2,
  BiUser,
  BiUserPlus,
  BiUserX,
}  from 'react-icons/bi';

import "./CurrentPollSession.scss";

import { AppDataContext } from '../../../contexts/AuthContext/AppDataContext';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

import EpButton from '../../UI/EpButton/EpButton';
import EpContainer from '../../UI/EpContainer/EpContainer';
import EpChart from '../../UI/EpChart/EpChart';
import EpLoading from '../../UI/EpLoading/EpLoading';
import EpPill from '../../UI/EpPill/EpPill';
import EpTextInput from '../../UI/EpTextInput/EpTextInput';

const CurrentPollSession = () => {
  const [ guestFilter, setGuestFilter ] = useState("")
  const [ guestListIsVisible, setGuestListIsVisible ] = useState(true);
  const [ pollIsLoading, setPollIsLoading ] = useState(true);

  const navigate = useNavigate();
  const { targetPollId } = useParams();

  const { user } = useContext(AuthContext);

  const {
    currentAnswerData,
    currentAnswerTally,
    currentQuestionData,
    pollGuestsData,
    pollData,
    pollIsLoaded,
    // togglePollActive,
    togglePollGuestLock,
    selectPollById,
    setCurrentQuestionId,
    togglePollLock,
  } = useContext(AppDataContext);

  const getFilteredGuests = () => guestFilter !== "" ? 
    pollGuestsData.filter(guest => guest.name.toLowerCase().includes(guestFilter.toLowerCase())) :
    pollGuestsData;

  const excludedGuestCount = !pollGuestsData ? 0 :
    pollGuestsData.length - pollGuestsData.filter(guest => guest.canVote).length;

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
    pollData.id === targetPollId && pollData.userPollsId === user.id &&
    currentQuestionData && currentQuestionData.pollQuestionsId === targetPollId;
  
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
  };

  return ( 
    <div className="current-poll-session">
      {
        !pollIsReady ? (
          <EpLoading />
        ) : (
          <>
            <h1>{pollData.title}</h1>

            <CurrentPollControls 
              copyInviteLinkHandler={copyInviteLinkHandler}
              pollIsLocked={pollData.isLocked}
              togglePollLock={togglePollLock}
            />

            <EpContainer
              className="current-poll-guests-container"
            >
              <h1 className="current-poll-guests-header">Guests</h1>

              <CurrentPollGuestControls
                guestFilter={guestFilter}
                guestListIsVisible={guestListIsVisible}
                setGuestFilter={setGuestFilter}
                setGuestListIsVisible={setGuestListIsVisible}
              />

              <CurrentPollGuestStats
                excludedGuestCount={excludedGuestCount}
                pollGuestsData={pollGuestsData}
              />

              <div className="current-poll-guests-scroll-container">
                {
                  pollGuestsData && pollGuestsData.length > 0 ? (
                    guestListIsVisible ? (
                      getFilteredGuests().map((guest, index) => (
                        <CurrentPollGuest 
                          key={`guest-${index}`}
                          guest={guest}
                          togglePollGuestLock={togglePollGuestLock}
                        />
                      ))
                    ) : (
                      <></>
                    )
                    // pollGuestsData.map((guest, index) => (
                  ) : (
                    <div className="current-poll-no-guests">
                      No guests have joined the current poll. Invite people with the invite link. 
                    </div>
                  )
                }
              </div>
            </EpContainer>

            <EpContainer>
              <div className="current-poll-questions-wrapper">
                <CurrentPollQuestionList
                  currentQuestionId={currentQuestionData.id}
                  setCurrentQuestionId={setCurrentQuestionId}
                  pollQuestions={pollData.questions.items}
                />

                <CurrentPollQuestionAnswers
                  answerData={currentAnswerData}
                  answerTally={currentAnswerTally}
                  guestCount={pollGuestsData.length - excludedGuestCount}
                />
              </div>
            </EpContainer>
          </>
        )
      }
    </div>
  );
};

function CurrentPollQuestionList ({
  currentQuestionId,
  setCurrentQuestionId,
  pollQuestions,
}) {
  return (
    <div className="current-poll-questions-list">
      <h1 className='current-poll-questions-header'>Questions</h1>
      {
        pollQuestions.length > 0 && pollQuestions.map((question, index) => (
          <div 
            className={`
              current-poll-questions-list-item
              ${question.id === currentQuestionId ? "active" : ""}
            `}
            key={`current-poll-questions-list-item-${index}`}
            onClick={e => {
              e.preventDefault();
              setCurrentQuestionId(question.id);
            }}
          >
            {question.prompt}
          </div>
        ))
      }
    </div>
  )
}

function CurrentPollQuestionAnswers ({
  answerData,
  answerTally,
  guestCount,
}) {
  const uniqueAnswers = [...new Set(answerData.map(answer => answer.guestAnswersId))].length;

  return (
    <div className="current-poll-question-answers">
      <h1>Guest Responses</h1>
      <div className="current-poll-question-answers-stats">
        <EpPill>
          {uniqueAnswers} / {guestCount} Guest Votes Recorded
        </EpPill>
      </div>
      <EpChart
        data={answerTally.data}
        labels={answerTally.labels}
      />
    </div>
  )
}

function CurrentPollControls ({
  copyInviteLinkHandler,
  togglePollLock,
  pollIsLocked
}) {
  return (
    <EpContainer className="current-poll-controls">
      <EpButton
        onClick={(copyInviteLinkHandler)}
      >
        <BiClipboard />&nbsp;
        Copy Invite Link
      </EpButton>
      <PollControlsLock
        onClick={togglePollLock}
        isLocked={pollIsLocked}
      />
      <EpButton
        key="poll-controls-finish"
      >
        <BiCheckCircle />&nbsp;
        Finish Poll
      </EpButton>
    </EpContainer>
  );
}

function CurrentPollGuestControls ({
  guestFilter,
  guestListIsVisible,
  setGuestFilter,
  setGuestListIsVisible,
}) {
  return (
    <div className="current-poll-guests-controls">
      <EpButton
        key={`current-poll-guest-controls-toggle-list-visible`}
        onClick={() => setGuestListIsVisible(!guestListIsVisible)}
      >
        { 
          guestListIsVisible ? (
            <>
              <BiCollapseVertical />&nbsp;Collapse
            </>
          ) : (
            <>
              <BiExpandVertical />&nbsp;Expand
            </>
          ) 
        }
        &nbsp;Guest List
      </EpButton>

      {/* <BiSearchAlt2  */}
      <BiFilterAlt
        className='current-poll-guests-filter-icon'
      />
      <EpTextInput
        className=""
        InputProps={{ sx: { height: 36 } }}
        onChange={e => setGuestFilter(e.target.value)}
        value={guestFilter}
      />
    </div>
  )
}

function CurrentPollGuestStats ({
  excludedGuestCount,
  pollGuestsData,
}) {
  return (
    <div className="current-poll-guets-stats">

    <EpPill
      key="poll-guests-count"
    >
      {pollGuestsData.length} guest{`${pollGuestsData.length !== 1 ? "s" : ""}`} in Poll
    </EpPill>
    <EpPill
      key="poll-guests-ban-count"
    >
      {excludedGuestCount} guest{`${excludedGuestCount !== 1 ? "s" : ""}`} banned
    </EpPill>

    </div>
  );
}

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