import { useState } from "react";
import { createProduct as createProductService } from "../services/product.service";

export const useProductCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProduct = async (productData) => {
    try {
      setLoading(true);
      setError(null);

      await createProductService(productData);

      alert("✅ Producto creado exitosamente");
      window.location.href = "/product";
    } catch (err) {
      console.error("Error al crear producto:", err);
      setError(err.message);
      alert(`❌ Error al crear producto: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { createProduct, loading, error };
};
