// src/store/services/customer.service.js
import { API_CONFIG, apiGet, apiPost, apiPut, apiPatch } from "./api.config";

const BASE_URL = `${API_CONFIG.BASE_URL_USER_SERVICE}/customers`;

/**
 * Obtener todos los clientes
 */
export const getAllCustomers = async () => {
  return apiGet(BASE_URL);
};

/**
 * Obtener un cliente por ID
 */
export const getCustomerById = async (id) => {
  return apiGet(`${BASE_URL}/${id}`);
};

/**
 * Crear un nuevo cliente
 */
export const createCustomer = async (customerData) => {
  return apiPost(BASE_URL, customerData);
};

/**
 * Actualizar un cliente existente
 */
export const updateCustomer = async (id, customerData) => {
  return apiPut(`${BASE_URL}/${id}`, customerData);
};

/**
 * Activar un cliente
 */
export const activateCustomer = async (id) => {
  return apiPatch(`${BASE_URL}/${id}/activate`);
};

/**
 * Desactivar un cliente
 */
export const deactivateCustomer = async (id) => {
  return apiPatch(`${BASE_URL}/${id}/deactivate`);
};
