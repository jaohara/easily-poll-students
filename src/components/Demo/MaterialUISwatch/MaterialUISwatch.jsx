import React from 'react';

// TODO: use full path imports for this
import {
  Button,
  Card,
} from '@mui/material';


import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';


const SmallBox = ({children}) => (
  <Box width="500px">{children}</Box>
);

const InputWrapper = ({children}) => (
  <Box sx={{marginBottom: "1rem"}}>{children}</Box>
);

const MaterialUISwatch = () => {
  return ( 
    <div className="material-ui-swatch">
      <h1>Material UI Swatch</h1>
      <p>Here are a few example components that we would want to use.</p>
      
      <h1>Buttons</h1>
      <Button>Choice 1</Button>
      <Button>Choice 2</Button>
      <Button>Choice 3</Button>

      <h1>List with Dividers</h1>
      <SmallBox>
        <Card>
          <List>
            <ListItemText>List item 1</ListItemText>
            <Divider />
            <ListItemText>List item 2</ListItemText>
            <Divider />
            <ListItemText>List item 3</ListItemText>
            <Divider />
            <ListItemText>List item 4</ListItemText>
            <Divider />
            <ListItemText>List item 5</ListItemText>
          </List>
        </Card>
      </SmallBox>

      <h1>Text Entry</h1>
      {
        // TODO: There needs to be a defined system for reusable MUI classes
        // TODO: How do I handle responsive breakpoints here?
      }
      <Box width="500px">
        {
          // TODO: Make things like these components, and use sizes from themes.js
        }
        <InputWrapper>
          <TextField id="name-input" label="name" variant="outlined" fullWidth />
        </InputWrapper>
        <InputWrapper>
          <TextField id="email-input" label="email" variant="outlined" fullWidth />
        </InputWrapper>
        <Button>Submit</Button>
      </Box>
    </div>
  );
}
 
export default MaterialUISwatch;