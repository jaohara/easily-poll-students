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
    element: <CreatePoll />
  },
  {
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
    path: "/hooks",
    name: "Hooks Preview",
    element: <HooksPreview />
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
