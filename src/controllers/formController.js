import { fetchData } from "../services/api";
import {
  validateDocumentType,
  validateDocumentNumber,
  validateCellphone,
  validateEmail,
  validateBirthdate,
} from "../models/validation";
export const validateFormData = async (formData) => {
  const errors = {};
  if (!validateDocumentType(formData.documentType)) {
    errors.documentType = "Tipo de documento es requerido";
  }
  if (!validateDocumentNumber(formData.documentNumber)) {
    errors.documentNumber = "Número de documento no válido";
  }
  if (!validateCellphone(formData.cellphone)) {
    errors.cellphone = "Número de celular no válido";
  }
  if (!validateEmail(formData.email)) {
    errors.email = "Email no es válido";
  }
  if (!validateBirthdate(formData.birthdate)) {
    errors.birthdate = "Fecha de nacimiento no válida";
  }
  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }
  const serverData = await fetchData();
  // Compara formData con serverData para validar si hay discrepancias
  // Ejemplo simple:
  const exists = serverData.some(
    (item) => item.documentNumber === formData.documentNumber
  );
  if (exists) {
    errors.documentNumber = "El número de documento ya está registrado";
    return { isValid: false, errors };
  }
  return { isValid: true };
};
