// src/store/services/user.service.js
import { API_CONFIG, apiGet, apiPost, apiPut, apiPatch } from "./api.config";

const BASE_URL = `${API_CONFIG.BASE_URL_USER_SERVICE}/users`;

/**
 * Obtener todos los usuarios
 */
export const getAllUsers = async () => {
  return apiGet(BASE_URL);
};

/**
 * Obtener un usuario por ID
 */
export const getUserById = async (id) => {
  return apiGet(`${BASE_URL}/${id}`);
};

/**
 * Crear un nuevo usuario
 */
export const createUser = async (userData) => {
  return apiPost(BASE_URL, userData);
};

/**
 * Actualizar un usuario existente
 */
export const updateUser = async (id, userData) => {
  return apiPut(`${BASE_URL}/${id}`, userData);
};

/**
 * Activar un usuario
 */
export const activateUser = async (id) => {
  return apiPatch(`${BASE_URL}/${id}/activate`);
};

/**
 * Desactivar un usuario
 */
export const deactivateUser = async (id) => {
  return apiPatch(`${BASE_URL}/${id}/deactivate`);
};
