import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ReactNode } from "react";

type ProtectedRoutePropType = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRoutePropType) => {
  const auth = useAuth();
  if (!auth?.user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
