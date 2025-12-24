import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const login = async (payload) => {
  if (!payload) {
    throw new Error("Invalid payload");
  }

  try {
    const result = await axios.post(`${BASE_URL}/api/auth/login`, payload);
    return result.data;
  } catch (error) {
    // Throw the error message from the server if available, otherwise the error object
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong during login";
    throw new Error(errorMessage);
  }
};
