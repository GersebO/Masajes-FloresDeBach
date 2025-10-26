// src/services/user.service.js
const API_URL = "http://localhost:8081/api/customers";

/**
 * Autentica un cliente (customer) en el sistema.
 * @param {string} email - Correo electrónico del cliente.
 * @param {string} password - Contraseña del cliente.
 * @returns {Promise<object>} - Retorna los datos del cliente autenticado o lanza un error.
 */
export const loginCustomer = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/authenticate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Correo o contraseña incorrectos");
    }

    const customer = await response.json();
    localStorage.setItem("customer", JSON.stringify(customer));
    return customer;
  } catch (error) {
    console.error("Error en loginCustomer:", error);
    throw error;
  }
};

/**
 * Obtiene el cliente almacenado en localStorage (si existe).
 * @returns {object|null} - Retorna el cliente almacenado o null si no hay sesión.
 */
export const getCurrentCustomer = () => {
  const stored = localStorage.getItem("customer");
  return stored ? JSON.parse(stored) : null;
};

/**
 * Cierra sesión del cliente eliminando su información del localStorage.
 */
export const logoutCustomer = () => {
  localStorage.removeItem("customer");
};
