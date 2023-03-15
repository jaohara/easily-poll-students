import React from "react";

import "./EpPollDoesNotExist.scss";

import { 
  BiBomb
} from "react-icons/bi"

import EpContainer from "../EpContainer/EpContainer";

const EpPollDoesNotExist = () => {
  return ( 
    <EpContainer 
      centered
      className="ep-poll-does-not-exist"
      narrow
    >
      <div className="ep-poll-does-not-exist-icon-wrapper">
        <BiBomb />
      </div>
      Selected poll does not exist. Did you follow the proper URL?
    </EpContainer>
  );
}
 
export default EpPollDoesNotExist;
