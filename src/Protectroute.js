import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login if no token
    return <Navigate to="/" />;
  }

  try {
    const decoded = jwtDecode(token);

    // Check for role-based access if requiredRole is specified
    if (requiredRole && decoded.Admin !== requiredRole) {
      return <Navigate to="/Property" />;
    }

    return children; // Allow access if authorized
  } catch (error) {
    console.error("Token decode error:", error);
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
