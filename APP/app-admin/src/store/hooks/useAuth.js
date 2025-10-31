// src/store/hooks/useAuth.js
import { create } from "zustand";
import { loginUser, logoutUser, getCurrentUser } from "../services/auth.service";

export const useAuthStore = create((set) => ({
  user: getCurrentUser(),
  isAuthenticated: !!getCurrentUser(),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      const user = await loginUser(email, password);
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      });
      return user;
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: error.message 
      });
      throw error;
    }
  },

  logout: () => {
    logoutUser();
    set({ 
      user: null, 
      isAuthenticated: false,
      error: null 
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));
