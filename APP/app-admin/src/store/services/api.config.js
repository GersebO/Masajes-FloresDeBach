// src/store/services/api.config.js

/**
 * Configuración centralizada de la API
 */
export const API_CONFIG = {
  BASE_URL_USER_SERVICE: "http://localhost:8081/api",
  BASE_URL_PRODUCT_SERVICE: "http://localhost:8082/api",
  TOKEN_KEY: "adminToken",
  USER_KEY: "adminUser",
};

/**
 * Obtener el token JWT almacenado en localStorage
 */
export const getAuthToken = () => {
  return localStorage.getItem(API_CONFIG.TOKEN_KEY);
};

/**
 * Obtener headers comunes para peticiones autenticadas
 */
export const getAuthHeaders = () => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Helper para hacer peticiones GET autenticadas
 */
export const fetchWithAuth = async (url, options = {}) => {
  const headers = {
    ...getAuthHeaders(),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Si el token expiró o es inválido (401), cerrar sesión
  if (response.status === 401) {
    console.warn("🔒 Token inválido o expirado. Cerrando sesión...");
    localStorage.removeItem(API_CONFIG.TOKEN_KEY);
    localStorage.removeItem(API_CONFIG.USER_KEY);
    window.location.href = "/login";
    throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.");
  }

  return response;
};

/**
 * Helper para peticiones GET
 */
export const apiGet = async (url) => {
  const response = await fetchWithAuth(url, { method: "GET" });
  
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * Helper para peticiones POST
 */
export const apiPost = async (url, data) => {
  const response = await fetchWithAuth(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Error ${response.status}`);
  }
  
  return response.json();
};

/**
 * Helper para peticiones PUT
 */
export const apiPut = async (url, data) => {
  const response = await fetchWithAuth(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Error ${response.status}`);
  }
  
  return response.json();
};

/**
 * Helper para peticiones PATCH
 */
export const apiPatch = async (url, data = null) => {
  const options = {
    method: "PATCH",
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetchWithAuth(url, options);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Error ${response.status}`);
  }
  
  // Algunas peticiones PATCH no devuelven contenido
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  
  return { success: true };
};

/**
 * Helper para peticiones DELETE
 */
export const apiDelete = async (url) => {
  const response = await fetchWithAuth(url, {
    method: "DELETE",
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Error ${response.status}`);
  }
  
  return { success: true };
};
