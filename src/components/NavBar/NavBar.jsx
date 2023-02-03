import React from 'react';
import './NavBar.scss';

/*
  John, 2/2/23:

  This is a very basic stub to demonstrate routing functionality, layout and behavior
  are not yet finalized.
*/

import Button from '@mui/material/Button';

import { routes } from '../../routes';
import { useNavigate } from "react-router-dom";
// import { redirect } from "react-router-dom";

const NavButton = ({route, navHandler}) => (
  <Button
    onClick={() => navHandler()}
  >
    {route.name}
  </Button>
);

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className='nav-bar'>
      {
        routes.map((route, index) => (
          <NavButton 
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
 
export default NavBar;