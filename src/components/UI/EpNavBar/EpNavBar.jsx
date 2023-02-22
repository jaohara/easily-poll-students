import React from 'react';
import './EpNavBar.scss';

/*
  John, 2/2/23:

  This is a very basic stub to demonstrate routing functionality, layout and behavior
  are not yet finalized.
*/

import Button from '@mui/material/Button';

import { routes } from '../../../routes';
import { useNavigate } from "react-router-dom";
// import { redirect } from "react-router-dom";

const EpNavButton = ({route, navHandler}) => (
  <Button
    onClick={() => navHandler()}
  >
    {route.name}
  </Button>
);

const EpNavBar = () => {
  const navigate = useNavigate();

  return (
    <div className='ep-nav-bar'>
      {
        routes.map((route, index) => !route.hideInNavBar && (
          <EpNavButton 
            key={`button-${index}`} 
            navHandler={() => {
              console.log(`route.path: ${route.path}`);
              navigate(route.path);
            }}
            route={route}
          />))
      }
    </div>
  );
}
 
export default EpNavBar;