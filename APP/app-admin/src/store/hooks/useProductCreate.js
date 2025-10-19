import { useState } from "react";

export const useProductCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProduct = async (productData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:8082/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Respuesta del servidor:", errorText);
        throw new Error("Error al crear el producto");
      }

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
