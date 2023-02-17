import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import CreatePoll from './components/pages/CreatePoll/CreatePoll';

// demo-related pages
import MaterialUISwatch from "./components/Demo/MaterialUISwatch/MaterialUISwatch";
import EpChartDemo from './components/Demo/EpChartDemo/EpChartDemo';


// testing login stuff
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";

// name is display name on button/link
export const routes = [
  {
    path: "/",
    name: "Home",
    element: <Home />
  },
  {
    path: "/material-demo",
    name: "Material UI Swatch",
    element: <MaterialUISwatch />
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
