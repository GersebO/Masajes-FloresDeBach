// src/services/user.service.js
import { API_CONFIG } from "./api.config";

/**
 * Autentica un cliente (customer) en el sistema.
 * @param {string} email - Correo electrónico del cliente.
 * @param {string} password - Contraseña del cliente.
 * @returns {Promise<object>} - Retorna los datos del cliente autenticado o lanza un error.
 */
export const loginCustomer = async (email, password) => {
  try {
    console.log("🔄 Intentando login de cliente con:", email);
    
    // Endpoint unificado de autenticación JWT (mismo para usuarios y clientes)
    const response = await fetch(`${API_CONFIG.BASE_URL_USER_SERVICE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log("📡 Respuesta del servidor:", response.status);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Correo o contraseña incorrectos");
      }
      if (response.status === 404) {
        throw new Error("Servicio no disponible. Verifica que el backend esté corriendo.");
      }
      throw new Error(`Error al iniciar sesión (${response.status})`);
    }

    const data = await response.json();
    console.log("👤 Respuesta completa del backend:", data);

    // Validar que el token exista
    if (!data.token) {
      throw new Error("El servidor no devolvió un token válido");
    }

    // ⚠️ VALIDACIÓN: Solo permitir clientes (sin rol)
    if (data.role) {
      throw new Error("Acceso denegado: Esta cuenta es administrativa. Por favor, usa el panel de administración.");
    }

    // Guardar el TOKEN en localStorage
    localStorage.setItem(API_CONFIG.TOKEN_KEY, data.token);
    console.log("🔑 Token guardado:", data.token.substring(0, 20) + "...");

    // Crear objeto de cliente sin el token (para mostrar en UI)
    const customer = {
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      run: data.run,
      type: data.type,
    };

    // Guardar cliente en localStorage
    localStorage.setItem(API_CONFIG.USER_KEY, JSON.stringify(customer));
    console.log("✅ Login exitoso. Cliente:", customer);
    
    return customer;
  } catch (error) {
    console.error("🚨 Error en loginCustomer:", error);
    
    // Mejorar mensajes de error de red
    if (error.message === "Failed to fetch" || error.name === "TypeError") {
      throw new Error("No se puede conectar al servidor. Por favor, intenta más tarde.");
    }
    
    throw error;
  }
};

/**
 * Obtiene el cliente almacenado en localStorage (si existe).
 * @returns {object|null} - Retorna el cliente almacenado o null si no hay sesión.
 */
export const getCurrentCustomer = () => {
  const stored = localStorage.getItem(API_CONFIG.USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

/**
 * Cierra sesión del cliente eliminando su información del localStorage.
 */
export const logoutCustomer = () => {
  localStorage.removeItem(API_CONFIG.TOKEN_KEY);
  localStorage.removeItem(API_CONFIG.USER_KEY);
  console.log("👋 Sesión cerrada - Token y cliente eliminados");
};

/**
 * Verificar si el cliente tiene un token válido
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem(API_CONFIG.TOKEN_KEY);
  const customer = getCurrentCustomer();
  return !!(token && customer);
};
