import React from "react";
import { Navigate } from "react-router-dom";
import { tokenService } from "../services/tokenService";

/**
 * ProtectedRoute component for member-only routes
 * Redirects to login if user is not authenticated or is not a member
 */
function MemberProtectedRoute({ children }) {
  // Check authorization immediately (synchronously)
  const token = tokenService.getToken();
  const userRole = tokenService.getUserRole();

  // Debug logging
  console.log("MemberProtectedRoute Check:", {
    token: !!token,
    userRole,
    isMember: userRole === "member",
  });

  // Validate token and role
  const hasValidToken =
    token && typeof token === "string" && token.trim() !== "";
  const isMember =
    userRole &&
    typeof userRole === "string" &&
    userRole.trim().toLowerCase() === "member";

  // If user is not authenticated or not a member, redirect immediately
  if (!hasValidToken) {
    console.log("No valid token found - redirecting to home");
    return <Navigate to="/" replace />;
  }

  if (!isMember) {
    console.log(
      "User role is not member - redirecting to home. Role:",
      userRole
    );
    return <Navigate to="/" replace />;
  }

  // If authorized, render the component
  console.log("User is authenticated member - rendering protected content");
  return children;
}

export default MemberProtectedRoute;
