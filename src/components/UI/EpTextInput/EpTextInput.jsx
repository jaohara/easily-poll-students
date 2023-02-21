import React from 'react';

// Commented as file doesn't exist yet
// import './EpTextInput.scss';

import TextField from '@mui/material/TextField';

/*
  This is a stub for our wrapped version of the Material UI TextField.
*/

const EpTextInput = (props) => {
  return (
    <TextField {...props} />
  );
}

EpTextInput.muiName = TextField.muiName;
 
export default EpTextInput;