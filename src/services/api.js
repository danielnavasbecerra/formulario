import axios from "axios";
const API_URL = "http://localhost:3000/users"; // Cambiar esto segun el endpoint;

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updateUserData = async (userData) => {
  try {
    const response = await axios.put(`${API_URL}/${userData.id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};
