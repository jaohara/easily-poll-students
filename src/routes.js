import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import MaterialUISwatch from "./components/MaterialUISwatch/MaterialUISwatch";
import ColorSwatchTest from "./components/ColorSwatchTest/ColorSwatchTest";
import Login from "./components/pages/Auth/Login/Login";
import Register from "./components/pages/Auth/Register/Register";
import TestApi from "./components/pages/TestApi/TestApi";

// name is display name on button/link
export const routes = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
  },
  {
    path: "/material-demo",
    name: "Material UI Swatch",
    element: <MaterialUISwatch />,
  },
  {
    path: "/color-swatch-demo",
    name: "Color Swatch Demo",
    element: <ColorSwatchTest />,
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
  },
  {
    path: "/register",
    name: "Register",
    element: <Register />,
  },
  {
    path: "/testapi",
    name: "Test Api",
    element: <TestApi />,
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
