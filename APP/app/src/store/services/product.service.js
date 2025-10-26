const API_URL = "http://localhost:8082/api/products";

/**
 * Obtiene todos los productos activos del backend.
 */
export const getAllProducts = async () => {
  try {
    const response = await fetch(API_URL);
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
