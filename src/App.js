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
import { AppDataContextProvider } from './contexts/AppDataContext/AppDataContext';
// import { GuestContextProvider } from './contexts/GuestContext/GuestContext';

import EpCopyright from './components/UI/EpCopyright/EpCopyright';
import EpNavBar from './components/UI/EpNavBar/EpNavBar';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <AppDataContextProvider>
            {/* <GuestContextProvider> */}
              <div className="App">
                <div className="app-wrapper">
                  <div className="content-wrapper">
                    <EpNavBar />
                    <Routes>
                      {
                        routes.map((route, index) => (
                          <Route
                            path={route.path}
                            element={route.element}
                            key={`route-${index}`}
                          />
                        ))
                      }
                    </Routes>
                  </div>
                  <EpCopyright />
                </div>
              </div>
            {/* </GuestContextProvider> */}
          </AppDataContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
