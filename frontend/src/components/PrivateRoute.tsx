import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
  // TODO: Implement authentication logic
  const isAuthenticated = true; 

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}