// src/components/layout/ProtectedRoute.jsx
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // Log para debugging (puedes removerlo en producción)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Si está autenticado, renderizar el contenido protegido
  return children;
}
