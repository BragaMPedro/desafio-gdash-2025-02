import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function PrivateRoute() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const origin = useLocation();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: origin }} replace />
  );
}