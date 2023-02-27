import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import CreatePoll from './components/pages/CreatePoll/CreatePoll';

// demo-related pages
import EpChartDemo from './components/Demo/EpChartDemo/EpChartDemo';


// testing login stuff
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";

// testing hook stuff
import HooksPreview from './components/pages/HooksPreview/HooksPreview';

// name is display name on button/link
export const routes = [
  {
    path: "/",
    name: "Home",
    element: <Home />
  },
  {
    path: "/create-poll",
    name: "Create Poll",
    element: <CreatePoll />,
    // TODO: Hide when app workflow is finalized (only available if logged in)
    // hideInNavBar: true,
  },
  {
    // TODO: Remove this when gutting demo code
    path: "/epchart-demo",
    name: "Chart Demo",
    element: <EpChartDemo />
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />
  },
  {
    path: "/register",
    name: "Register",
    element: <Register />
  },
  {
    // TODO: ultimately remove this when gutting demo code
    path: "/hooks",
    name: "Hooks Preview",
    element: <HooksPreview />,
    hideInNavBar: true,
  },
  {
    // and this, I suppose
    path: "/hooks/:targetPollId",
    name: "Hooks Preview",
    element: <HooksPreview />,
    hideInNavBar: true,
  },
];

export const router = createBrowserRouter(routes);
