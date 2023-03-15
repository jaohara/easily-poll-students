import React from 'react';

import "./EpLoading.scss";

import EpContainer from "../EpContainer/EpContainer";

const EpLoading = ({
  centered = false,
  narrow = false,
  message = null,
}) => {
  return ( 
    <EpContainer
      centered={centered}
      className="ep-loading"
      narrow={narrow}
    >
      <div className="ep-loading-spinner">
        
      </div>

      {
        message && (
          <div className="ep-loading-message">
            {message}
          </div>
        )
      }
    </EpContainer>
  );
}
 
export default EpLoading;
