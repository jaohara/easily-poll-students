import React from 'react';

import "./EpLogo.scss";

import { useNavigate } from 'react-router-dom';

import { 
  MdHowToVote,
} from 'react-icons/md';


const EpLogo = () => {
  const navigate = useNavigate();

  return ( 
    <div 
      className="ep-logo"
      onClick={() => navigate("/")}
    >
      <div className="ep-logo-icon-container">
        <div className="ep-logo-icon-wrapper">
          <MdHowToVote />
        </div>
      </div>
      <div className="ep-logo-header-wrapper">
        <h1>
          Easy Poll
        </h1>
      </div>
    </div>
  );
}
 
export default EpLogo;