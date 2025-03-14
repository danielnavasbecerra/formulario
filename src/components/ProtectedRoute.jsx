import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/form" replace />;
  }

  return children;
};

export default ProtectedRoute;
