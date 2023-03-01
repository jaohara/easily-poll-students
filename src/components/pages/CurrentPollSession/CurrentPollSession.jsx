import {
  React,
  // useContext,
  // useEffect,
  // useState,
} from 'react';
import { useParams } from 'react-router-dom';

// import { AppDataContext } from '../../../contexts/AuthContext/AppDataContext';

const CurrentPollSession = () => {
  const { pollId } = useParams();

  return ( 
    <div className="current-poll-session">
      <h1>Current Poll</h1>

      {
        pollId && (
          <h3>pollId: {pollId}</h3>
        )
      }

      <p>
        This is the CurrentPollSession page. It will have the "admin" functionality
        for the current poll, allowing the User (poll creator) to view the current
        poll status, manage guests, lock the room, and end the current poll.
      </p>

      <p>
        If the pollId param is set, it will use this to change the current poll managed
        by the AppDataContext, but this could also be set by the UserDashboard when 
        navi
      </p>
    </div>
  );
}
 
export default CurrentPollSession;