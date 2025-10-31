// src/store/services/category.service.js
import { API_CONFIG, apiGet, apiPost, apiPut, apiPatch } from "./api.config";

const BASE_URL = `${API_CONFIG.BASE_URL_PRODUCT_SERVICE}/categories`;

/**
 * Obtener todas las categorías
 */
export const getAllCategories = async () => {
  return apiGet(BASE_URL);
};

/**
 * Obtener una categoría por ID
 */
export const getCategoryById = async (id) => {
  return apiGet(`${BASE_URL}/${id}`);
};

/**
 * Crear una nueva categoría
 */
export const createCategory = async (categoryData) => {
  return apiPost(BASE_URL, categoryData);
};

/**
 * Actualizar una categoría existente
 */
export const updateCategory = async (id, categoryData) => {
  return apiPut(`${BASE_URL}/${id}`, categoryData);
};

/**
 * Activar una categoría
 */
export const activateCategory = async (id) => {
  return apiPatch(`${BASE_URL}/${id}/active`);
};

/**
 * Desactivar una categoría
 */
export const deactivateCategory = async (id) => {
  return apiPatch(`${BASE_URL}/${id}/inactive`);
};
