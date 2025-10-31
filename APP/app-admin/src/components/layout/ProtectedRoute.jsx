// src/components/layout/ProtectedRoute.jsx
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // Log para debugging (puedes removerlo en producción)
  useEffect(() => {
    console.log("🔒 ProtectedRoute - Autenticado:", isAuthenticated, "Usuario:", user);
  }, [isAuthenticated, user]);

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    console.log("⛔ Acceso denegado - Redirigiendo a login desde:", location.pathname);
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Si está autenticado, renderizar el contenido protegido
  return children;
}
