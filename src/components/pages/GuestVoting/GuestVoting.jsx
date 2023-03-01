import {
  React,
  // useContext,
  // useEffect,
  // useState,
} from 'react';
import { useParams } from 'react-router-dom';

// import { AppDataContext } from '../../../contexts/AuthContext/AppDataContext';

const GuestVoting = () => {
  const { pollId } = useParams();

  // TODO: What do I need to pull out of AppDataContext? 
  // Think about the minimum amount of things the guests need

  return ( 
    <div className="guest-voting">
      <h1>Guest Voting Page</h1>
  
      {
        pollId && (
          <h3>pollId: {pollId}</h3>
        )
      }

      <p>
        This is the guest voting page. This will pull the poll data and necessary
        functions from the AppDataContext.
      </p>

      <p>
        If the guest hasn't submitted a name, it will render the form for submitting a
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
        How would we check for completion? I'm assuming we'd have a useEffect callback 
        that checks for pollData.isActive, and navigate if the poll is completed.
      </p>
    </div>
  );
}
 
export default GuestVoting;