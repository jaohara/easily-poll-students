import React from 'react';

import "./EpLoading.scss";

import EpContainer from "../EpContainer/EpContainer";

const EpLoading = ({
  centered = false,
  narrow = false,
}) => {
  return ( 
    <EpContainer
      centered={centered}
      className="ep-loading"
      narrow={narrow}
    >
      <div className="ep-loading-spinner">
        
      </div>
    </EpContainer>
  );
}
 
export default EpLoading;
