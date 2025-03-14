export const validateDocumentType = (type) => {
  return type !== "";
};
export const validateDocumentNumber = (number) => {
  return number.length >= 5 && number.length <= 10; // Ajusta según tus requisitos
};
export const validateCellphone = (cellphone) => {
  const regex = /^[0-9]{10}$/; // Ajusta según el formato de tu país
  return regex.test(cellphone);
};
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
export const validateBirthdate = (birthdate) => {
  // Lógica para validar la fecha de nacimiento (por ejemplo, formato o edad)
  return true; // Placeholder
};
