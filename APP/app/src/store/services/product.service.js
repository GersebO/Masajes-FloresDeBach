import { API_CONFIG, getAuthHeaders } from "./api.config";

const API_URL = `${API_CONFIG.BASE_URL_PRODUCT_SERVICE}/products`;

/**
 * Obtiene todos los productos activos del backend.
 * Nota: Para ver productos, podría no requerir autenticación,
 * pero incluimos headers por si el backend lo requiere.
 */
export const getAllProducts = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Error al obtener productos");
    const data = await response.json();
    return data.filter((p) => p.isActive === true);
  } catch (error) {
    console.error("Error en getAllProducts:", error);
    throw error;
  }
};

/**
 * Obtiene los productos filtrados por categoría.
 */
export const getProductsByCategory = async (category) => {
  try {
    const all = await getAllProducts();
    return category === "Todos"
      ? all
      : all.filter((p) => p.categoryName === category);
  } catch (error) {
    console.error("Error en getProductsByCategory:", error);
    throw error;
  }
};
