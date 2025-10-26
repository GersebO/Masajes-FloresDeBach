import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getCartByCustomerId,
  addToCart,
  removeFromCart,
  clearCart,
} from "../services/cart.service";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      isLoading: false,
      
      // =====================================================
      // 🧾 CARGAR CARRITO DEL CLIENTE
      // =====================================================
      fetchCart: async (customerId) => {
        
        try {
          console.log("📦 Respuesta del backend:", data);
          if (!customerId) {
            console.warn("⚠️ fetchCart llamado sin customerId");
            set({ items: [], total: 0 });
            return;
          }

          set({ isLoading: true });
          const data = await getCartByCustomerId(customerId);

          // 🔒 Validamos que el backend devuelva un array
          if (!Array.isArray(data)) {
            console.warn("⚠️ La API no devolvió un array:", data);
            set({ items: [], total: 0 });
            return;
          }

          // 🧮 Calculamos el total de forma segura
          const total = data.reduce(
            (acc, item) =>
              acc +
              (Number(item?.price) || 0) * (Number(item?.quantity) || 0),
            0
          );

          console.log("🧾 Carrito cargado correctamente:", data);

          set({ items: data, total });
        } catch (error) {
          console.error("❌ Error al cargar carrito:", error);
          set({ items: [], total: 0 });
        } finally {
          set({ isLoading: false });
        }
      },

      // =====================================================
      // ➕ AGREGAR PRODUCTO
      // =====================================================
      addItem: async (customerId, productId, quantity = 1) => {
        try {
          await addToCart(customerId, productId, quantity);
          await get().fetchCart(customerId);
        } catch (error) {
          console.error("❌ Error al agregar producto:", error);
        }
      },

      // =====================================================
      // ❌ ELIMINAR PRODUCTO
      // =====================================================
      removeItem: async (customerId, productId) => {
        try {
          await removeFromCart(customerId, productId);
          await get().fetchCart(customerId);
        } catch (error) {
          console.error("❌ Error al eliminar producto:", error);
        }
      },

      // =====================================================
      // 🧹 VACIAR CARRITO
      // =====================================================
      clear: async (customerId) => {
        try {
          await clearCart(customerId);
          set({ items: [], total: 0 });
        } catch (error) {
          console.error("❌ Error al vaciar carrito:", error);
          set({ items: [], total: 0 });
        }
      },
    }),
    { name: "cart-storage" } // persistencia en localStorage
  )
);
