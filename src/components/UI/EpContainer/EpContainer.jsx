import React from 'react';

import "./EpContainer.scss";

const EpContainer = ({
  centered = false, // centers container in containing div
  children,
  className, 
  narrow = false, // sets width to 66%
}) => {
  return ( 
    <div 
      className={`
        ep-container 
        ${narrow ? "narrow" : ""}
        ${centered ? "centered" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
 
export default EpContainer;