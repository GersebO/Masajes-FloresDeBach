import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomerStore } from "../../../store/zustand/user.store";
import { validators } from "../../../utils/validators";
import "./Login.css";
import Button from "../../ui/button/Button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  const { login, isLoading, error, isAuthenticated, clearError } = useCustomerStore();
  const MIN_PASSWORD_LENGTH = 8;

  // Si ya está autenticado, redirigir
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/product");
    }
  }, [isAuthenticated, navigate]);

  // Limpiar error cuando el usuario empieza a escribir
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [email, password]);

  // Validación en tiempo real
  useEffect(() => {
    const isEmailValid = validators.validarEmail(email);
    const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
    setIsDisabled(!(isEmailValid && isPasswordValid));
  }, [email, password]);

  // Enviar login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const customer = await login(email, password);
      // La redirección se maneja en el useEffect de arriba
    } catch (err) {
      // El error ya está en el estado del store
      console.error("Error al iniciar sesión:", err);
    }
  };

  return (
    <div className="login-form-wrapper">
      <form onSubmit={handleLogin} className="login-form">
        <div className="login-form-header">
          <div className="login-form-icon">
            <i className="bi bi-person-circle"></i>
          </div>
          <h2 className="login-form-title">Iniciar Sesión</h2>
          <p className="login-form-subtitle">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="login-error-message">
            <i className="bi bi-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}

        {/* EMAIL */}
        <div className="login-form-group">
          <label htmlFor="email" className="login-label">
            <i className="bi bi-envelope"></i> Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            className="login-input"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="login-form-group">
          <label htmlFor="password" className="login-label">
            <i className="bi bi-lock"></i> Contraseña
          </label>
          <div className="login-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="login-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
            <button
              type="button"
              className="login-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
            </button>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="login-submit-wrapper">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isDisabled || isLoading}
          >
            {isLoading ? (
              <>
                <span className="login-spinner"></span>
                Iniciando sesión...
              </>
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right"></i>
                Iniciar sesión
              </>
            )}
          </Button>
        </div>

        {/* DIVIDER */}
        <div className="login-divider">
          <span>¿No tienes cuenta?</span>
        </div>

        {/* REGISTER LINK */}
        <div className="login-register-link">
          <Button
            as="a"
            href="/register"
            variant="secondary"
            size="md"
          >
            Crear cuenta nueva
          </Button>
        </div>
      </form>
    </div>
  );
}