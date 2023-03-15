import React from 'react';

import "./EpPollVotingIsNotLive.scss";

import { 
  BiCoffee,
} from "react-icons/bi";

import EpContainer from "../EpContainer/EpContainer";
import EpPill from "../EpPill/EpPill";

const EpPollVotingIsNotLive = ({ guest, pollTitle }) => {
  return ( 
    <EpContainer
      centered
      className="ep-poll-voting-is-not-live"
      narrow
    >
      <h1>{pollTitle}</h1>
      <p>
        <EpPill>{guest.name}</EpPill> 
      </p>
      <div className="ep-poll-voting-is-not-live-icon-wrapper">
        <BiCoffee />
      </div>
      <p className='ep-poll-voting-is-not-live-message'>
        Waiting for poll to start...
      </p>
    </EpContainer>
  );
}
 
export default EpPollVotingIsNotLive;
