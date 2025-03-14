import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormComponent from "./components/FormComponent";
import HomePage from "./views/HomePage.jsx";
import "./styles/styles.css"; // Asegúrate de agregar estilos
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormComponent />} />
      </Routes>
    </Router>
  );
};
export default App;
