import React from 'react';

import "./EpContainer.scss";

const EpContainer = ({
  centered = false, // centers container in containing div
  children, 
  narrow = false, // sets width to 66%
}) => {
  return ( 
    <div 
      className={`
        ep-container 
        ${narrow ? "narrow" : ""}
        ${centered ? "centered" : ""}
      `}
    >
      {children}
    </div>
  );
}
 
export default EpContainer;