import React from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

export function AuthRequired({ children }) {
  const location = useLocation();
  const { route } = useAuthenticator((context) => [context.route]);
  if (route !== "authenticated") {
    return <Navigate to="/amplify_login" state={{ from: location }} replace />;
  }
  return children;
}