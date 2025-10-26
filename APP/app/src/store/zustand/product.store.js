import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAllProducts } from "@/store/services/product.service";

export const useProductStore = create(
  persist(
    (set) => ({
      products: [],
      selectedProduct: null,
      category: "Todos",
      isLoading: false,

      // Cargar todos los productos
      fetchProducts: async () => {
        try {
          set({ isLoading: true });
          const data = await getAllProducts();
          set({ products: data });
        } catch (error) {
          console.error("Error al cargar productos:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      // Seleccionar un producto para mostrar en modal
      selectProduct: (product) => set({ selectedProduct: product }),

      // Cerrar modal
      clearSelectedProduct: () => set({ selectedProduct: null }),

      // Cambiar categoría
      setCategory: (category) => set({ category }),
    }),
    { name: "product-storage" } // persistencia local
  )
);
