import { fetchData, updateUserData } from "../services/api";

export const validateFormData = async (formData) => {
  try {
    console.log("📌 Datos ingresados:", formData); // Ver qué datos está enviando el formulario

    const serverData = await fetchData();
    console.log("📌 Datos del backend:", serverData); // Ver qué datos devuelve el servidor

    const formattedDocumentType = formData.documentType.trim().toLowerCase()
    const formattedDocumentNumber = formData.documentNumber.trim().replace(/\s/g, "").toLowerCase()

    // Verificar si los datos ingresados coinciden con algún registro en el servidor
    const existingUser = serverData.find((user) => {
        const userDocType = user.documentType.trim().toLowerCase()
        const userDocNumber = user.documentNumber.trim().replace(/\s/g, "").toLowerCase()

        return userDocType === formattedDocumentType && userDocNumber === formattedDocumentNumber
  });

    if (!existingUser) {
      console.log("❌ No se encontró un usuario con estos datos.");
      return {
        isValid: false,
        errors: { form: "No se encontró un usuario con estos datos." },
      };
    }

    const addUniqueValue = (existingValue, newValue) => {
      if (!newValue) return existingValue;
      const values = new Set(Array.isArray(existingValue) ? existingValue : [existingValue]);
      values.add(newValue);
      return Array.from(values);
    }

    const updatedData = {
      ...existingUser,
      cellphone: addUniqueValue(existingUser.cellphone, formData.cellphone),
      email: addUniqueValue(existingUser.email, formData.email),
      birthdate: addUniqueValue(existingUser.birthdate, formData.birthdate),
    };

    await updateUserData(updatedData);
    console.log("✅ Datos actualizados correctamente:", updatedData);

    return { isValid: true };

  } catch (error) {
    console.error("Error al obtener datos del servidor:", error);
    return {
      isValid: false,
      errors: { server: "Error en la validación. Intenta más tarde." },
    };
  }
};
