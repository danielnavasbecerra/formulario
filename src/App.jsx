import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FormComponent from "./components/FormComponent";
import HomePage from "./views/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar autenticación

  return (
    <Router>
      <Routes>
        {/* Redirigir la ruta raíz "/" a "/form" */}
        <Route path="/" element={<Navigate to="/form" />} />

        {/* Ruta para el formulario (pasa la función setIsAuthenticated como prop) */}
        <Route
          path="/form"
          element={<FormComponent setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Ruta protegida para /home */}
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
