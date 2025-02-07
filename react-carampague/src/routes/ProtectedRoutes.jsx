import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  const { token, user } = useSelector((state) => state.auth);
  
  if (!token || !user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <Outlet />;
};
