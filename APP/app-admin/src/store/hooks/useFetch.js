import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error en la solicitud");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [url]);

  return data;
};
