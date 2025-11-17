import { API_CONFIG, fetchWithAuth } from "./api.config";

const BASE = `${API_CONFIG.BASE_URL_PRODUCT_SERVICE}/orders`;

const orderService = {
  async createOrder(payload) {
    const response = await fetchWithAuth(`${BASE}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "Error al crear la orden");
      throw new Error(text || `Error ${response.status}`);
    }

    return response.json();
  },

  async getOrdersByCustomer(customerId) {
    const response = await fetchWithAuth(`${BASE}/customer/${customerId}`);
    if (!response.ok) throw new Error("Error al obtener boletas");
    return response.json();
  },

  async getOrderById(orderId) {
    const response = await fetchWithAuth(`${BASE}/${orderId}`);
    if (!response.ok) throw new Error("Error al obtener detalle de boleta");
    return response.json();
  },

  async getOrderByIdAndCustomer(orderId, customerId) {
    const response = await fetchWithAuth(`${BASE}/${orderId}/customer/${customerId}`);
    
    if (response.status === 403) {
      throw new Error("No tienes permiso para ver esta boleta");
    }
    if (!response.ok) {
      throw new Error("Error al obtener detalle de boleta");
    }
    
    return response.json();
  },
};

export default orderService;
