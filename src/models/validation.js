export const validateDocumentType = (type) => {
  return type && type.trim() !== "";
};

export const validateDocumentNumber = (number, documentType) => {
  if (!number) return false;

  // Reglas de validación según el tipo de documento
  const numericOnlyTypes = ["cc", "ce", "nit", "nuip"];
  const lengthRules = {
    cc: { min: 6, max: 10 }, // Cédula de Ciudadanía
    ce: { min: 6, max: 10 }, // Cédula de Extranjería
    nit: { min: 9, max: 10 }, // NIT
    nuip: { min: 10, max: 10 }, // NUIP (siempre 10 dígitos)
    pasaporte: { min: 5, max: 15 }, // Pasaporte (puede tener letras)
  };

  const rule = lengthRules[documentType] || { min: 5, max: 15 };

  // Si el documento debe ser solo numérico, validar que no tenga letras
  if (numericOnlyTypes.includes(documentType) && !/^\d+$/.test(number)) {
    return false; // Si contiene letras, es inválido
  }

  return number.length >= rule.min && number.length <= rule.max;
};

export const validateCellphone = (cellphone) => {
  const regex = /^3[0-9]{9}$/; // Debe empezar con 3 y tener 10 dígitos en total
  return regex.test(cellphone);
};

export const validateEmail = (email) => {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
};

export const validateBirthdate = (birthdate) => {

  if (!birthdate) return false;

  const birthDate = new Date(birthdate);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();

  // Validar que la persona sea mayor de 18 años
  return age >= 18;
};
