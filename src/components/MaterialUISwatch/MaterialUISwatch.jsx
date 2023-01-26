import React from 'react';

/*
  Which will I want?

  - Button
  - Card
  - List?

  What do I want to mess around with?
  - Material Icons

*/
import {
  Button,
  Card,
} from '@mui/material';

const MaterialUISwatch = () => {
  return ( 
    <div className="material-ui-swatch">
      <h1>Material UI Swatch</h1>
      <p>Do you know where I got this swatch?</p>

      <Card>
        <h1>Buttons</h1>
        <Button>Choice 1</Button>
        <Button>Choice 2</Button>
        <Button>Choice 3</Button>
      </Card>

      <Card>
        <h1>List with Dividers</h1>
        <Button>Choice 1</Button>
        <Button>Choice 2</Button>
        <Button>Choice 3</Button>
      </Card>

      <Card>
        <h1>Text Entry</h1>
        <Button>Choice 1</Button>
        <Button>Choice 2</Button>
        <Button>Choice 3</Button>
      </Card>
    </div>
  );
}
 
export default MaterialUISwatch;