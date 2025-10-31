import { useState } from "react";
import { createUser as createUserService } from "../services/user.service";

export const useUserCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      await createUserService(userData);

      alert("✅ Usuario creado exitosamente");
      window.location.href = "/user";
    } catch (err) {
      console.error("Error al crear usuario:", err);
      setError(err.message);
      alert(`❌ Error al crear usuario: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
};
