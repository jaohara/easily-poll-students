import React from 'react';

// Commented as file doesn't exist yet
// import './EpButton.scss';

import Button from '@mui/material/Button';

/*
  This is a stub for our wrapped version of the Material UI button.
*/

const EpButton = (props) => {
  return (
    <Button {...props} />
  );
}

EpButton.muiName = Button.muiName;
 
export default EpButton;