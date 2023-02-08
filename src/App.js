import React from 'react';

// style-related imports
import { ThemeProvider } from '@mui/material';
import './styles/App.scss';
import theme from './styles/theme';

// router-related imports
import { 
  BrowserRouter, 
  // RouterProvider
  Route,
  Routes 
} from "react-router-dom";
import { 
  // router,
  routes
} from './routes';

import NavBar from './components/NavBar/NavBar';

function App () {
  return (
    // <RouterProvider router={router}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <h1>Easy Poll App!</h1>
          <NavBar />

          <p>This is <strong>another test</strong> of the new CI/CD approach.</p>

          <Routes>
            {
              routes.map((route, index) => (
                <Route path={route.path} element={route.element} key={`route-${index}`}/>
              ))
            }
          </Routes>
          {/* <RouterProvider router={router} /> */}
        </div>
      </ThemeProvider>
    </BrowserRouter>
    // </RouterProvider>
  );
}

export default App;
