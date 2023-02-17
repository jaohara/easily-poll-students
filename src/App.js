import React from 'react';

// style-related imports
import { ThemeProvider } from '@mui/material';
import './styles/App.scss';
import theme from './styles/theme';

// router-related imports
import { 
  BrowserRouter, 
  Route,
  Routes 
} from "react-router-dom";
import { 
  routes
} from './routes';

import EpNavBar from './components/UI/EpNavBar/EpNavBar';

function App () {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <h1>Easy Poll App!</h1>
          <EpNavBar />

          <p>This is <strong>another test</strong> of the new CI/CD approach.</p>

          <Routes>
            {
              routes.map((route, index) => (
                <Route path={route.path} element={route.element} key={`route-${index}`}/>
              ))
            }
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
