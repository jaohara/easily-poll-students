import {
  React,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import "./UserDashboard.scss";

import {
  BiChart,
  BiEdit,
} from "react-icons/bi";

import EpButton from '../../UI/EpButton/EpButton';
import EpContainer from "../../UI/EpContainer/EpContainer";
import EpLoading from '../../UI/EpLoading/EpLoading';
import EpPill from "../../UI/EpPill/EpPill";

import { AppDataContext } from '../../../contexts/AppDataContext/AppDataContext';
import { getRoutePathByName } from '../../../routes';

const UserDashboard = () => {
  const [ userPollsLoading, setUserPollsLoading ] = useState(true);

  const navigate = useNavigate();

  const {
    allUserPollsData,
    refreshPollData,
  } = useContext(AppDataContext);

  useEffect(() => {
    refreshPollData();
    setUserPollsLoading(false);
  }, []);

  return ( 
    <div className="user-dashboard">
      <h1>User Dashboard</h1>

      <EpContainer className="user-dashboard-controls">
        <EpButton
          onClick={() => {navigate(getRoutePathByName("Create Poll"))}}
        >
          <BiEdit />&nbsp;
          Create Poll
        </EpButton>
      </EpContainer>

      <EpContainer>
        <h1>Polls</h1>
        {
          userPollsLoading ? (
            <EpLoading 
              message="Loading polls..."
            />
          ): (
            allUserPollsData ? 
              allUserPollsData.map((poll, index) => (
                <UserDashBoardPollItem
                  createdAt={poll.createdAt}
                  key={`poll-${index}`}
                  // TODO: Update route from HooksPreview to CurrentPollSession when page is finished
                  // Is hardcoding this the best approach? Maybe...
                  // navHandler={() => {navigate(`/hooks/${poll.id}`)}}
                  navHandler={() => {navigate(`/poll/${poll.id}`)}}
                  // guestVotingNavHandler={() => navigate(`/vote/${poll.id}`)}
                  pollResultsNavHandler={() => navigate(`/results/${poll.id}`)}
                  isActive={poll.isActive}
                  isLocked={poll.isLocked}
                  votingIsLive={poll.votingIsLive}
                  title={poll.title}
                />)) : 
              (
                <UserDashBoardNoPolls />
              )
            )
        }
      </EpContainer>
    </div>
  );
}

function UserDashBoardNoPolls () {
  return (
    <div className="dashboard-item no-polls">
      Polls you have created will appear here.
    </div>
  )
}

function UserDashBoardPollItem ({ 
  createdAt,
  navHandler,
  // guestVotingNavHandler,
  pollResultsNavHandler,
  isActive,
  isLocked,
  votingIsLive,
  title,
}) {
  return (
    <div 
      className="dashboard-item"
      // onClick={navHandler}
    >
      <h1
        // TODO: Move this back to the above div and have it route
        // conditionally based on whether the poll is active or not
        onClick={navHandler}
      >{title}</h1>
      <div className="dashboard-item-pill-container">
        {
          //TODO: make this date prettier
        }
        <EpPill key="created-at">Created: {createdAt}</EpPill>
        <EpPill key="is-active">
          {
            isActive ? ("Active") : ("Completed")
          }
        </EpPill>
        {
          // TODO: Is this info relevant here?
        }

        {
          isActive && (
            <EpPill key="is-locked">
              {
                isLocked  ? ("Locked") : ("Unlocked")
              }
            </EpPill>
          )
        }

        {
          isActive && votingIsLive && (
            <EpPill key="voting-is-live">
              Voting is Live
            </EpPill>
          )
        }
      </div>
      <div className="dashboard-item-temp-controls-container">
        {/* <EpButton
          key="vote-button"
          onClick={guestVotingNavHandler}
        >
          Guest Voting Page
        </EpButton> */}
        <EpButton 
          // TODO: remove this test buttonwhen conditional nav based on isActive works 
          key="results-button"
          onClick={pollResultsNavHandler}
        >
          <BiChart />&nbsp;
          Poll Results
        </EpButton>
      </div>
    </div>
  )
}
 
export default UserDashboard;