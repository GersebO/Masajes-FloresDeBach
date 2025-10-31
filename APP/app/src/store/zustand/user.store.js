import { create } from "zustand";
import { loginCustomer, logoutCustomer, getCurrentCustomer } from "../services/user.service";

export const useCustomerStore = create((set) => ({
  customer: getCurrentCustomer(),
  isAuthenticated: !!getCurrentCustomer(),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      const customer = await loginCustomer(email, password);
      set({ 
        customer, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      });
      return customer;
    } catch (error) {
      set({ 
        customer: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: error.message 
      });
      throw error;
    }
  },

  logout: () => {
    logoutCustomer();
    set({ 
      customer: null, 
      isAuthenticated: false,
      error: null 
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));
