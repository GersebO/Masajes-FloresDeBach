// src/store/services/auth.service.js
import { API_CONFIG } from "./api.config";

/**
 * Login de usuario administrador
 */
export const loginUser = async (email, password) => {
  try {
    console.log("🔄 Intentando login con:", email);
    
    // Endpoint correcto de autenticación JWT
    const response = await fetch(`${API_CONFIG.BASE_URL_USER_SERVICE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log("📡 Respuesta del servidor:", response.status);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Credenciales incorrectas");
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

    // ⚠️ VALIDACIÓN: Solo permitir usuarios con rol (ADMIN, EMPLOYEE, THERAPIST)
    if (!data.role) {
      throw new Error("Acceso denegado: Esta cuenta no tiene permisos de administrador");
    }

    // Validar roles permitidos
    const allowedRoles = ['ADMIN', 'EMPLOYEE', 'THERAPIST'];
    if (!allowedRoles.includes(data.role)) {
      throw new Error(`Acceso denegado`);
    }

    // Guardar el TOKEN en localStorage
    localStorage.setItem(API_CONFIG.TOKEN_KEY, data.token);
    console.log("🔑 Token guardado:", data.token.substring(0, 20) + "...");

    // Crear objeto de usuario sin el token (para mostrar en UI)
    const user = {
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      type: data.type,
    };

    // Guardar usuario en localStorage
    localStorage.setItem(API_CONFIG.USER_KEY, JSON.stringify(user));
    console.log("✅ Login exitoso. Usuario:", user);
    
    return user;
  } catch (error) {
    console.error("🚨 Error en loginUser:", error);
    
    // Mejorar mensajes de error de red
    if (error.message === "Failed to fetch" || error.name === "TypeError") {
      throw new Error("No se puede conectar al servidor. Verifica que el backend esté corriendo en http://localhost:8081");
    }
    
    throw error;
  }
};

/**
 * Logout de usuario
 */
export const logoutUser = () => {
  localStorage.removeItem(API_CONFIG.TOKEN_KEY);
  localStorage.removeItem(API_CONFIG.USER_KEY);
  console.log("👋 Sesión cerrada - Token y usuario eliminados");
};

/**
 * Obtener usuario actual desde localStorage
 */
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem(API_CONFIG.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
};

/**
 * Verificar si el usuario tiene un token válido
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem(API_CONFIG.TOKEN_KEY);
  const user = getCurrentUser();
  return !!(token && user);
};
