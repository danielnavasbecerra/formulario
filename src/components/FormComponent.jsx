import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateFormData } from "../controllers/formController";
import {
  validateDocumentType,
  validateDocumentNumber,
  validateCellphone,
  validateEmail,
  validateBirthdate,
} from "../models/validation";

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

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case "documentType":
        if (!validateDocumentType(value))
          error = "Debe seleccionar un tipo de documento.";
        break;
      case "documentNumber":
        if (!validateDocumentNumber(value, formData.documentType))
          error = "Número de Documento inválido.";
        break;
      case "cellphone":
        if (!validateCellphone(value)) error = "Número de Celular inválido.";
        break;
      case "email":
        if (!validateEmail(value)) error = "Correo electrónico inválido.";
        break;
      case "birthdate":
        if (!validateBirthdate(value)) error = "Debe ser mayor de 18 años.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error || undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const result = await validateFormData(formData);
    if (!result.isValid) {
      setErrors(result.errors);
    } else {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      navigate("/home");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="documentType">Tipo de documento</label>
      <select
        name="documentType"
        value={formData.documentType}
        onChange={handleChange}
        onBlur={handleBlur}
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
        onBlur={handleBlur}
      />
      {errors.documentNumber && <p>{errors.documentNumber}</p>}

      <label htmlFor="cellphone">Celular</label>
      <input
        name="cellphone"
        placeholder="Celular"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.cellphone && <p>{errors.cellphone}</p>}

      <label htmlFor="email">Correo electrónico</label>
      <input
        name="email"
        placeholder="Correo electrónico"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.email && <p>{errors.email}</p>}

      <label htmlFor="birthdate">Fecha de nacimiento</label>
      <input
        name="birthdate"
        type="date"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.birthdate && <p>{errors.birthdate}</p>}

      {errors.form && <p className="error">{errors.form}</p>}

      <button type="submit">Verificar</button>
    </form>
  );
};

export default FormComponent;
