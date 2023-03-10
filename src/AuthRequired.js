import React, {
  useContext, useEffect,
} from 'react';
import { useLocation, Navigate } from "react-router-dom";
// import { useAuthenticator } from "@aws-amplify/ui-react";

import { AuthContext } from './contexts/AuthContext/AuthContext';

export function AuthRequired({ children }) {
  const location = useLocation();
  // const { route } = useAuthenticator((context) => [context.route]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("location: ", location);
  }, []);

  // if (route !== "authenticated") {
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}