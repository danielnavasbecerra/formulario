import React, { useState, useEffect } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  // Guardar en localStorage cada vez que cambia isAuthenticated
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

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
              <HomePage setIsAuthenticated={setIsAuthenticated} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
