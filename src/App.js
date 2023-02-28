import React from 'react';

import config from "./aws-exports";
import { Amplify } from "aws-amplify";
Amplify.configure(config);


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


import { AuthContextProvider } from "./contexts/AuthContext/AuthContext";
import { AppDataContextProvider } from './contexts/AuthContext/AppDataContext';

import EpNavBar from './components/UI/EpNavBar/EpNavBar';

function App () {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <AppDataContextProvider>
            <div className="App">
              <h1>Easy Poll App!</h1>
              <EpNavBar />

              <Routes>
                {
                  routes.map((route, index) => (
                    <Route path={route.path} element={route.element} key={`route-${index}`}/>
                  ))
                }
              </Routes>
            </div>
          </AppDataContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
