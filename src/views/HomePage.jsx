import { useNavigate } from "react-router-dom";

const HomePage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false); // Cerrar sesión
    navigate("/form", { replace: true }); // Redirigir al formulario y eliminar /home del historial
  };

  return (
    <div>
      <h1>Bienvenido a Home</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default HomePage;
