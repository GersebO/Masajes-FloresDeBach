import { create } from "zustand";
import { loginCustomer, logoutCustomer, getCurrentCustomer } from "../services/user.service";

export const useCustomerStore = create((set) => ({
  customer: getCurrentCustomer(),
  isAuthenticated: !!getCurrentCustomer(),

  login: async (email, password) => {
    try {
      const customer = await loginCustomer(email, password);
      set({ customer, isAuthenticated: true });
      return customer;
    } catch (error) {
      set({ customer: null, isAuthenticated: false });
      throw error;
    }
  },

  logout: () => {
    logoutCustomer();
    set({ customer: null, isAuthenticated: false });
  },
}));
