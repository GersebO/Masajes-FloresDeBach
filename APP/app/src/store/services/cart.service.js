// src/services/cart.service.js
const API_URL = "http://localhost:8082/api/cart";

/**
 * Obtiene el carrito del cliente.
 * @param {string} customerId - ID del cliente autenticado.
 * @returns {Promise<Array>} - Lista de productos del carrito.
 */
export const getCartByCustomerId = async (customerId) => {
  try {
    const response = await fetch(`${API_URL}/${customerId}`);

    if (!response.ok) {
      console.error("❌ Error al obtener el carrito:", response.status);
      return [];
    }

    const data = await response.json();

    // 💡 Aseguramos que siempre devuelva un array
    if (!Array.isArray(data)) {
      console.warn("⚠️ La API no devolvió un array. Retornando []");
      return [];
    }

    console.log("✅ Carrito recibido:", data);
    return data;
  } catch (error) {
    console.error("🚨 Error en getCartByCustomerId:", error);
    return [];
  }
};

/**
 * Agrega un producto al carrito.
 */
export const addToCart = async (customerId, productId, quantity = 1) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId, productId, quantity }),
    });

    if (!response.ok) throw new Error("Error al agregar producto al carrito");

    const data = await response.json();
    console.log("🟢 Producto agregado al carrito:", data);
    return data;
  } catch (error) {
    console.error("🚨 Error en addToCart:", error);
    return null;
  }
};

/**
 * Elimina un producto del carrito.
 */
export const removeFromCart = async (customerId, productId) => {
  try {
    const response = await fetch(`${API_URL}/remove`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId, productId }),
    });

    if (!response.ok) throw new Error("Error al eliminar producto del carrito");

    console.log(`🗑️ Producto ${productId} eliminado del carrito`);
    return true;
  } catch (error) {
    console.error("🚨 Error en removeFromCart:", error);
    return false;
  }
};

/**
 * Vacía completamente el carrito del cliente.
 */
export const clearCart = async (customerId) => {
  try {
    const response = await fetch(`${API_URL}/clear/${customerId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Error al vaciar el carrito");

    console.log(`🧹 Carrito del cliente ${customerId} vaciado correctamente`);
    return true;
  } catch (error) {
    console.error("🚨 Error en clearCart:", error);
    return false;
  }
};
