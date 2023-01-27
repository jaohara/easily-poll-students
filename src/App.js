import React from 'react';

// style-related imports
import { ThemeProvider } from '@mui/material';
import './styles/App.scss';
import theme from './styles/theme';


// imported to test Material UI Elements
import MaterialUISwatch from './components/MaterialUISwatch/MaterialUISwatch';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h1>Easy Poll App!</h1>

        <MaterialUISwatch />
      </div>
    </ThemeProvider>
  );
}

export default App;
