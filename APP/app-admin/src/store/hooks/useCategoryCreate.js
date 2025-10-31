import { useState } from "react";
import { createCategory as createCategoryService } from "../services/category.service";

export const useCategoryCreate = () => {
  const [loading, setLoading] = useState(false);

  const createCategory = async (categoryData) => {
    try {
      setLoading(true);
      const result = await createCategoryService(categoryData);
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
