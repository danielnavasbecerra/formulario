import { Navigate } from "react-router-dom";

// Componente que protege rutas
const ProtectedRoute = ({ isVerified, children }) => {
  if (!isVerified) {
    return <Navigate to="/form" />; // Si no está vrificado, redirige a /form
  }
  return children; // Si está verificado, muestra el contenido
};

export default ProtectedRoute;
