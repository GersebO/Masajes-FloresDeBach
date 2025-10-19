import { useState } from "react";

export const useUserCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:8081/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Respuesta del servidor:", errorText);
        throw new Error("Error al crear el usuario");
      }

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
