// src/components/functional/admin/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/hooks/useAuth";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const { login, isLoading, error, isAuthenticated, clearError } = useAuthStore();

  // Si ya está autenticado, redirigir al home
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  // Limpiar error cuando el usuario empieza a escribir
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Por favor, completa todos los campos");
      return;
    }

    try {
      await login(email, password);
      // La redirección se maneja en el useEffect
    } catch (err) {
      // El error ya está en el estado
      console.error("Error al iniciar sesión:", err);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-icon">
            <i className="bi bi-shield-lock"></i>
          </div>
          <h1>Panel Administrativo</h1>
          <p>Ingresa tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && (
            <div className="admin-login-error">
              <i className="bi bi-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          <div className="admin-form-group">
            <label htmlFor="email">
              <i className="bi bi-envelope"></i>
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">
              <i className="bi bi-lock"></i>
              Contraseña
            </label>
            <div className="admin-password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="admin-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="admin-login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="admin-spinner"></span>
                Iniciando sesión...
              </>
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right"></i>
                Iniciar Sesión
              </>
            )}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>
            <i className="bi bi-info-circle"></i>
            Solo personal autorizado
          </p>
        </div>
      </div>
    </div>
  );
}
