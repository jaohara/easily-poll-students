import React from 'react'
import { createBrowserRouter } from 'react-router-dom';

import CreatePoll from './components/pages/CreatePoll/CreatePoll';
import CurrentPollSession from './components/pages/CurrentPollSession/CurrentPollSession';
import GuestVoting from './components/pages/GuestVoting/GuestVoting';
import Home from './components/pages/Home/Home';
import UserDashboard from './components/pages/UserDashboard/UserDashboard';

// demo-related pages
import EpChartDemo from './components/Demo/EpChartDemo/EpChartDemo';
import LoadingTest from './components/Demo/LoadingTest';

// testing login stuff
import Login from './components/pages/Auth/Login/Login';
import Register from './components/pages/Auth/Register/Register';

// testing hook stuff
import HooksPreview from './components/pages/HooksPreview/HooksPreview';

// can be removed in the future
import VerifyEmail from './components/pages/Auth/VerifyEmail/VerifyEmail';

//poll result test
import PollResult from './components/pages/PollResult/PollResult';

import { AuthRequired } from "./AuthRequired";

// name is display name on button/link
export const routes = [
  {
    path: '/',
    name: 'Home',
    element: <Home />,
    hideInNavBar: true,
  },
  {
    // TODO: Make this redirected from "Home" on auth, hide in navbar when auth on home page works
    path: '/polls',
    name: 'User Dashboard',
    disableWhenUnauthorized: true,
    element: <AuthRequired> <UserDashboard /> </AuthRequired>,
    // hideInNavBar: true,
  },
  {
    // TODO: Make this go to "GuestVoting", which forwards to
    //  "PollReport" if the poll is not active (or the room is locked?)
    // TODO: This should also forward to "CurrentPollSession" if User is authorized
    //  - should this all be conditional rendering within the overall poll page?
    path: '/vote/:targetPollId',
    name: 'Poll Voting',
    element: <GuestVoting />,
    hideInNavBar: true,
  },
  {
    path: '/poll/:targetPollId',
    name: 'Manage Poll',
    element: <CurrentPollSession />,
    hideInNavBar: true,
  },
  {
    path: '/create-poll',
    name: 'Create Poll',
    element: <AuthRequired> <CreatePoll /> </AuthRequired>,
    // TODO: Hide when app workflow is finalized (only available if logged in)
    hideInNavBar: true,
  },
  {
    // TODO: Remove this when gutting demo code
    path: '/epchart-demo',
    name: 'Chart Demo',
    element: <EpChartDemo />,
    hideInNavBar: true,
  },
  {
    path: '/login',
    name: 'Login/Register',
    hideWhenAuthorized: true,
    element: <Login />,
  },
  {
    path: '/register',
    name: 'Register',
    // maybe just hide this route altogether?
    hideInNavBar: true,
    hideWhenAuthorized: true,
    element: <Register />,
  },
  {
    // TODO: ultimately remove this when gutting demo code
    path: '/hooks',
    name: 'Hooks Preview',
    element: <HooksPreview />,
    hideInNavBar: true,
  },
  {
    // and this, I suppose
    path: '/hooks/:targetPollId',
    name: 'Hooks Preview',
    element: <HooksPreview />,
    hideInNavBar: true,
  },
  {
    path: '/verify',
    name: 'verify',
    element: <VerifyEmail />,
    hideInNavBar: true,
  },
  {
    path: '/results/:targetPollId',
    name: 'Poll Result',
    element: <PollResult />,
    hideInNavBar: true,
  },
  //TODO: Remove this temp test route
  {
    path: '/loading-test',
    name: 'Loading Test',
    element: <LoadingTest />,
    hideInNavBar: true,
  },
];

// gets the route path by filtering the routes array. Returns null if name isn't
//  present.
export const getRoutePathByName = (name) => {
  let routePath = null

  for (let i = 0; i < routes.length; i++) {
    if (routes[i].name === name) {
      routePath = routes[i].path
    }
  }

  if (routePath === null) {
    console.error(
      `getRoutePathByName: route name '${name}' not present in routes.`
    )
  }

  return routePath
};

export const router = createBrowserRouter(routes);
