import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, role }) => {
  const token = Cookies.get("token");
  const adminToken = Cookies.get("adminToken");
  const superToken = Cookies.get("superToken");

  if (role === "user" && token) {
    return children;
  }

  if (role === "admin" && adminToken) {
    return children;
  }

  if (role === "superadmin" && superToken) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
