import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import MaterialUISwatch from "./components/Demo/MaterialUISwatch/MaterialUISwatch";
import ColorSwatchTest from "./components/Demo/ColorSwatchTest/ColorSwatchTest";

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
    path: "/color-swatch-demo",
    name: "Color Swatch Demo",
    element: <ColorSwatchTest />
  }
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
