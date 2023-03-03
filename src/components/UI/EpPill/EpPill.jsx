import React from 'react';

import "./EpPill.scss";

const EpPill = ({children}) => {
  return ( 
    <span className="ep-pill">
      {children}
    </span>
  );
}
 
export default EpPill;