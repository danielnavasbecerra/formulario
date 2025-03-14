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
    errors.documentType = "Debe seleccionar un tipo de documento.";
  }

  if (!validateDocumentNumber(formData.documentNumber, formData.documentType)) {
    errors.documentNumber = "Número de documento inválido para el tipo seleccionado.";
  }

  if (!validateCellphone(formData.cellphone)) {
    errors.cellphone = "Número de celular inválido. Debe ser un número de 10 dígitos.";
  }

  if (!validateEmail(formData.email)) {
    errors.email = "Formato de email incorrecto.";
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  try {
    const serverData = await fetchData();

    // Verificar si los datos ingresados coinciden con algún registro en el servidor
    const match = serverData.find(
      (item) =>
        item.documentType === formData.documentType &&
        item.documentNumber === formData.documentNumber &&
        item.cellphone === formData.cellphone &&
        item.email === formData.email &&
        item.birthdate === formData.birthdate
    );

    if (!match) {
      return {
        isValid: false,
        errors: { general: "Los datos no coinciden con ningún registro." },
      };
    }
  } catch (error) {
    console.error("Error al obtener datos del servidor:", error);
    return {
      isValid: false,
      errors: { server: "Error en la validación. Intenta más tarde." },
    };
  }

  return { isValid: true };
};
