// src/store/register.store.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import registerService from "@store/services/register.service";

export const useRegisterStore = create(
  devtools((set) => ({
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
    lastCreatedUser: null,

    // Acción principal: crear usuario
    async registerUser(formData) {
      try {
        set({ isLoading: true, errorMessage: "", isSuccess: false });

        const data = await registerService.createCustomer(formData);

        set({
          isLoading: false,
          isSuccess: true,
          lastCreatedUser: data,
        });

        return data;
      } catch (error) {
        console.error("❌ Error en register.store:", error);
        set({
          isLoading: false,
          isSuccess: false,
          errorMessage: error.message || "Error desconocido",
        });
        throw error;
      }
    },

    // Resetea el estado (por ejemplo, después de navegar)
    resetRegisterState() {
      set({
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
        lastCreatedUser: null,
      });
    },
  }))
);
