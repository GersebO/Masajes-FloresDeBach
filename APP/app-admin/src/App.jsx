import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { useAuthStore } from "./store/hooks/useAuth";
import LoginPage from "./app/login/pages.jsx";
import AdminHome from "./app/admin/pages.jsx";
import ProductPages from "./app/product/pages.jsx";
import UserPages from "./app/user/pages.jsx";
import ProductCreatePage from "./app/product-create/pages.jsx";
import CustomerPages from "./app/customer/pages.jsx";
import UserCreate from "./app/user-create/pages.jsx";
import CustomerCreate from "./app/customer-create/pages.jsx";
import HomePages from "./app/home/pages.jsx";
import CategoryPages from "./app/category/pages.jsx";
import CategoryCreatePages from "./app/category-create/pages.jsx";
import ProductEditPages from "./app/product-edit/pages.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública de login - SIEMPRE ACCESIBLE */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Redirigir la raíz al login - PUNTO DE ENTRADA OBLIGATORIO */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rutas protegidas */}
        <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><HomePages /></ProtectedRoute>} />

        <Route path="/product" element={<ProtectedRoute><ProductPages /></ProtectedRoute>} />
        <Route path="/product/create" element={<ProtectedRoute><ProductCreatePage /></ProtectedRoute>} />
        <Route path="/product/edit/:id" element={<ProtectedRoute><ProductEditPages /></ProtectedRoute>} />

        <Route path="/user" element={<ProtectedRoute><UserPages /></ProtectedRoute>} />
        <Route path="/user/create" element={<ProtectedRoute><UserCreate /></ProtectedRoute>} />

        <Route path="/categories" element={<ProtectedRoute><CategoryPages /></ProtectedRoute>} />
        <Route path="/categories/create" element={<ProtectedRoute><CategoryCreatePages /></ProtectedRoute>} />
        
        <Route path="/customer" element={<ProtectedRoute><CustomerPages /></ProtectedRoute>} />
        <Route path="/customer/create" element={<ProtectedRoute><CustomerCreate /></ProtectedRoute>} />

        {/* Ruta catch-all: cualquier ruta no definida redirige al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
