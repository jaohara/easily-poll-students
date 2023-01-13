import React from 'react';
import './SASSTestSpan.scss';

const SASSTestSpan = ({ children }) => {
  return ( 
    <span className="sass-test-span">{children}</span>
  );
};
 
export default SASSTestSpan;