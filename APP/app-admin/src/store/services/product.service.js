// src/store/services/product.service.js
import { API_CONFIG, apiGet, apiPost, apiPut, apiPatch } from "./api.config";

const BASE_URL = `${API_CONFIG.BASE_URL_PRODUCT_SERVICE}/products`;

/**
 * Obtener todos los productos
 */
export const getAllProducts = async () => {
  return apiGet(BASE_URL);
};

/**
 * Obtener un producto por ID
 */
export const getProductById = async (id) => {
  return apiGet(`${BASE_URL}/${id}`);
};

/**
 * Crear un nuevo producto
 */
export const createProduct = async (productData) => {
  return apiPost(BASE_URL, productData);
};

/**
 * Actualizar un producto existente
 */
export const updateProduct = async (id, productData) => {
  return apiPut(`${BASE_URL}/${id}`, productData);
};

/**
 * Activar un producto
 */
export const activateProduct = async (id) => {
  return apiPatch(`${BASE_URL}/${id}/active`);
};

/**
 * Desactivar un producto
 */
export const deactivateProduct = async (id) => {
  return apiPatch(`${BASE_URL}/${id}/inactive`);
};
