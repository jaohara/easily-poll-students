import {
  React,
  useContext,
  // useEffect,
  // useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import "./UserDashboard.scss";

import EpButton from '../../UI/EpButton/EpButton';
import EpContainer from "../../UI/EpContainer/EpContainer";
import EpPill from "../../UI/EpPill/EpPill";

import { AppDataContext } from '../../../contexts/AuthContext/AppDataContext';
import { getRoutePathByName } from '../../../routes';

const UserDashboard = () => {
  const navigate = useNavigate();

  const {
    // what do we need to take from the context?
    allUserPollsData,
  } = useContext(AppDataContext);

  return ( 
    <div className="user-dashboard">
      <h1>User Dashboard</h1>

      <div className="user-dashboard-description">
        <p>
          This is the page that will be displayed in place of the home page when
          the user is authorized.
        </p>

        <p>
          It will display a list of all of the polls that the user has created,
          and allow for them to be clicked to navigate to either a poll report 
          if they are complete (isActive is false), or the CurrentPollSession 
          for the given poll if they are in progress (isActive is true). 
        </p>

        <p>
          When a user clicks it a link, it will set the current pollId via the 
          function exported from the AppDataContext and use the navigate function 
          to handle the redirect.
        </p>

        <p>
          <strong>This is also where the &quot;Create Poll&quot; button will be displayed.</strong>
        </p>

        <p>
          The list of polls can be accessed from <strong>allUserPollsData</strong> from the 
          AppDataContext.
        </p>
      </div>

      <div className="user-dashboard-controls">
        <EpButton
          onClick={() => {navigate(getRoutePathByName("Create Poll"))}}
        >
          Create Poll
        </EpButton>
      </div>

      <EpContainer>
        <h1>Polls</h1>
        {
          allUserPollsData ? 
            allUserPollsData.map((poll, index) => (
              <UserDashBoardPollItem
                createdAt={poll.createdAt}
                key={`poll-${index}`}
                // TODO: Update route from HooksPreview to CurrentPollSession when page is finished
                // Is hardcoding this the best approach? Maybe...
                navHandler={() => {navigate(`/hooks/${poll.id}`)}}
                guestVotingNavHandler={() => navigate(`/poll/${poll.id}`)}
                pollResultsNavHandler={() => navigate(`/results/${poll.id}`)}
                isActive={poll.isActive}
                isLocked={poll.isLocked}
                title={poll.title}
              />
            ))
           : (
            <UserDashBoardNoPolls />
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
  guestVotingNavHandler,
  pollResultsNavHandler,
  isActive,
  isLocked,
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
        <EpPill key="is-locked">
          {
            isLocked ? ("Locked") : ("Unlocked")
          }
        </EpPill>
      </div>
      <div className="dashboard-item-temp-controls-container">
        <EpButton
          key="vote-button"
          onClick={guestVotingNavHandler}
        >
          Guest Voting Page
        </EpButton>
        <EpButton 
          // TODO: remove this test buttonwhen conditional nav based on isActive works 
          key="results-button"
          onClick={pollResultsNavHandler}
        >
          Poll Results
        </EpButton>
      </div>
    </div>
  )
}
 
export default UserDashboard;