import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import CreatePoll from './components/pages/CreatePoll/CreatePoll';
import Dashboard from './components/pages/Dashboard/Dashboard';

// demo-related pages
import EpChartDemo from './components/Demo/EpChartDemo/EpChartDemo';


// testing login stuff
import Login from "./components/pages/Login/Login";
import AmplifyLogin from "./components/pages/Login/AmplifyLogin";
import Register from "./components/pages/Register/Register";

// testing hook stuff
import HooksPreview from './components/pages/HooksPreview/HooksPreview';

import { AuthRequired } from "./AuthRequired";

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
    element: <AuthRequired> <CreatePoll /> </AuthRequired>
  },
  {
    path: "/epchart-demo",
    name: "Chart Demo",
    element: <AuthRequired> <EpChartDemo /> </AuthRequired>
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />
  },
  {
    path: "/amplify_login",
    name: "Amplify Login",
    element: <AmplifyLogin />
  },
  {
    path: "/register",
    name: "Register",
    element: <Register />
  },
  {
    path: "/hooks",
    name: "Hooks Preview",
    element: <HooksPreview />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/hooks/:targetPollId",
    name: "Hooks Preview",
    element: <HooksPreview />,
    hideInNavBar: true,
  },
];

// create router, filtering out names
// export const router = createBrowserRouter(routes.map(route => {route.path, route.element}));
export const router = createBrowserRouter(routes);

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />
//   },
//   {
//     path: "/material-demo",
//     element: <MaterialUISwatch />
//   },
//   {
//     path: "/color-swatch-demo",
//     element: <ColorSwatchTest />
//   }
// ]);
