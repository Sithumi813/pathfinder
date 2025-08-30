// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";

export default function PrivateRoute({ children }) {
  const { user, loadingAuth } = useAuth();
  if (loadingAuth) return <div className="p-8">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
