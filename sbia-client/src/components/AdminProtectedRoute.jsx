import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { tokenService } from "../services/tokenService";

/**
 * ProtectedRoute component for admin-only routes
 * Redirects to login if user is not authenticated or doesn't have admin role
 */
function AdminProtectedRoute({ children }) {
  // Check authorization immediately (synchronously)
  const token = tokenService.getToken();
  const userRole = tokenService.getUserRole();

  // Debug logging
  console.log("AdminProtectedRoute Check:", {
    token: !!token,
    userRole,
    isAdmin: userRole === "admin",
  });

  // Validate token and role
  const hasValidToken =
    token && typeof token === "string" && token.trim() !== "";
  const isAdmin =
    userRole &&
    typeof userRole === "string" &&
    userRole.trim().toLowerCase() === "admin";

  // If user is not authenticated or not admin, redirect immediately
  if (!hasValidToken) {
    console.log("No valid token found - redirecting to home");
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    console.log(
      "User role is not admin - redirecting to home. Role:",
      userRole
    );
    return <Navigate to="/" replace />;
  }

  // If authorized, render the component
  console.log("User is authenticated admin - rendering protected content");
  return children;
}

export default AdminProtectedRoute;
