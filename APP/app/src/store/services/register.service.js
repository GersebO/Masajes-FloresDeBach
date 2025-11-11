// src/store/services/registerService.js
import { API_CONFIG } from "./api.config";

// El endpoint público para registrar clientes está en /api/auth/register/customer (no requiere token)
const API_BASE_URL = `${API_CONFIG.BASE_URL_USER_SERVICE}/auth/register/customer`;

const registerService = {
  async createCustomer(data) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Error en el registro" }));
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
