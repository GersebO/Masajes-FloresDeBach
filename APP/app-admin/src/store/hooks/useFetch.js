import { useState, useEffect } from "react";
import { getAuthHeaders } from "../services/api.config";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(url, {
          headers: getAuthHeaders(),
        });
        
        if (res.status === 401) {
          // Token inválido o expirado
          console.warn("🔒 Token inválido. Redirigiendo al login...");
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
          window.location.href = "/login";
          return;
        }
        
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
};
