// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import customerService from "../../../store/services/customerService";
import { validators } from "../../../utils/validators";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const MIN_PASSWORD_LENGTH = 4;

  useEffect(() => {
    const isEmailValid = validators.validarEmail(email);
    const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
    setIsDisabled(!(isEmailValid && isPasswordValid));
  }, [email, password]);

  const handleLogin = async () => {
    try {
      await customerService.login({ email, password });
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🔑 Iniciar Sesión</h2>

        <form>
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            placeholder="ejemplo@gmail.com"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="form-label mt-3">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="********"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMessage && (
            <div className="alert-danger mt-3">{errorMessage}</div>
          )}

          <div className="btn-box">
            <button
              type="button"
              className="btn-primary"
              disabled={isDisabled}
              onClick={handleLogin}
            >
              Iniciar Sesión 🌿
            </button>
          </div>
        </form>

        <div className="login-footer">
          <p>
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-decoration-none">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
