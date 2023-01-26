import React from 'react';

// style-related imports
import { ThemeProvider } from '@mui/material';
import './styles/App.scss';
import theme from './styles/theme';


// imported to test Material UI Elements
import MaterialUISwatch from './components/MaterialUISwatch/MaterialUISwatch';

function App() {
  return (
      // TODO: Remove .hello-world 
    <ThemeProvider theme={theme}>
      <div className="App hello-world">
        <h1>Easy Poll App!</h1>

        <p>Hey, you&apos;ve got a local copy running!</p>

        <MaterialUISwatch />
      </div>
    </ThemeProvider>
  );
}

export default App;
