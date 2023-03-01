import React from 'react';

import "./EpContainer.scss";

const EpContainer = ({children}) => {
  return ( 
    <div className="ep-container">
      {children}
    </div>
  );
}
 
export default EpContainer;