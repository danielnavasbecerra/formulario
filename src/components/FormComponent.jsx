import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../services/api";

const FormComponent = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    documentType: "",
    documentNumber: "",
    cellphone: "",
    email: "",
    birthdate: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validaciones básicas
    if (!formData.documentType)
      validationErrors.documentType = "Tipo de documento es requerido";
    if (!formData.documentNumber)
      validationErrors.documentNumber = "Número de documento es requerido";
    if (!formData.cellphone)
      validationErrors.cellphone = "Número de celular es requerido";
    if (!formData.email) validationErrors.email = "Email es requerido";
    if (!formData.birthdate)
      validationErrors.birthdate = "Fecha de nacimiento es requerida";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Verificar datos con el servidor
    try {
      const serverData = await fetchData();
      const userExists = serverData.some(
        (user) =>
          user.documentType === formData.documentType &&
          user.documentNumber === formData.documentNumber &&
          user.cellphone === formData.cellphone &&
          user.email === formData.email &&
          user.birthdate === formData.birthdate
      );

      if (userExists) {
        setIsAuthenticated(true); // Habilita el acceso a /home
        localStorage.setItem("isAuthenticated", "true"); // Persistencia de autenticación
        console.log("Autenticado, redirigiendo...");
        navigate("/home"); // Redirige al usuario a la página principal
      } else {
        setErrors({
          form: "No se encontraron coincidencias, Verifica si los datos ingresados son correctos.",
        });
      }
    } catch (error) {
      setErrors({ form: "Error al consultar los datos." });
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="documentType">Tipo de documento</label>
      <select
        name="documentType"
        value={formData.documentType}
        onChange={handleChange}
      >
        <option value="">Selecciona ...</option>
        <option value="carnet_diplomatico">Carnet diplomático</option>
        <option value="cc">Cédula de ciudadanía</option>
        <option value="ce">Cédula de extranjería</option>
        <option value="nit">NIT</option>
        <option value="nuip">NUIP</option>
        <option value="pasaporte">Pasaporte</option>
        <option value="permiso_especial">Permiso especial</option>
        <option value="permiso_temporal_proteccion">
          Permiso temporal de protección
        </option>
        <option value="salvoconducto_permanencia">
          Salvo conducto de permanencia
        </option>
      </select>
      {errors.documentType && <p>{errors.documentType}</p>}

      <label htmlFor="documentNumber">Número de documento</label>
      <input
        name="documentNumber"
        placeholder="Número de documento"
        onChange={handleChange}
      />
      {errors.documentNumber && <p>{errors.documentNumber}</p>}

      <label htmlFor="cellphone">Celular</label>
      <input name="cellphone" placeholder="Celular" onChange={handleChange} />
      {errors.cellphone && <p>{errors.cellphone}</p>}

      <label htmlFor="email">Correo electrónico</label>
      <input
        name="email"
        placeholder="Correo electrónico"
        onChange={handleChange}
      />
      {errors.email && <p>{errors.email}</p>}

      <label htmlFor="birthdate">Fecha de nacimiento</label>
      <input name="birthdate" type="date" onChange={handleChange} />
      {errors.birthdate && <p>{errors.birthdate}</p>}

      {errors.form && <p className="error">{errors.form}</p>}

      <button type="submit">Verificar</button>
    </form>
  );
};

export default FormComponent;
