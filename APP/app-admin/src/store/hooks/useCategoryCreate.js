import { useState } from "react";

export const useCategoryCreate = () => {
  const [loading, setLoading] = useState(false);

  const createCategory = async (categoryData) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8082/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData), // 👈 asegura que isActive es booleano
      });

      if (!response.ok) throw new Error("Error al crear categoría");

      const result = await response.json();
      alert("✅ Categoría creada exitosamente");
      console.log("Resultado:", result);
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Error al crear categoría");
    } finally {
      setLoading(false);
    }
  };

  return { createCategory, loading };
};
