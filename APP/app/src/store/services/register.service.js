// src/store/services/registerService.js

const API_BASE_URL = "http://localhost:8081/api/customers"; // cambia el puerto según tu backend

const registerService = {
  async createCustomer(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el registro");
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Error al registrar:", error);
      throw error;
    }
  },
};

export default registerService;
