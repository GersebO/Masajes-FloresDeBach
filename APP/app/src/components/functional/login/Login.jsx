import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validators } from "../../../utils/validators";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const MIN_PASSWORD_LENGTH = 4;

  // ✅ Validación en tiempo real
  useEffect(() => {
    const isEmailValid = validators.validarEmail(email);
    const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
    setIsDisabled(!(isEmailValid && isPasswordValid));
  }, [email, password]);

  
  // ✅ Función principal de login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      // 1️⃣ Intentar login como ADMIN
      const userResponse = await fetch("http://localhost:8081/api/users/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (userResponse.ok) {
        const admin = await userResponse.json();
        localStorage.setItem("/", JSON.stringify(admin));
        alert(`Bienvenido administrador, ${admin.firstName}!`);
        window.location.href = "http://localhost:5173/product";
        return;
      }

      // 2️⃣ Intentar login como CUSTOMER
      const customerResponse = await fetch("http://localhost:8081/api/customers/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (customerResponse.ok) {
        const customer = await customerResponse.json();
        localStorage.setItem("customer", JSON.stringify(customer));
        alert(`Bienvenido/a, ${customer.firstName}!`);
        window.location.href = "http://localhost:5174/product";
        return;
      }

      setErrorMessage("Correo o contraseña incorrectos");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMessage("Error de conexión o credenciales inválidas");
    }
  };

  return (
    <div className="login-wrapper">

      {/* Panel derecho - formulario */}
      <div className="login-right">
        <div className="login-card shadow p-4 rounded">
          <h2 className="text-center mb-4">🔑 Iniciar Sesión</h2>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="ejemplo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error */}
            {errorMessage && (
              <div className="alert alert-danger text-center">{errorMessage}</div>
            )}

            {/* Botón */}
            <div className="d-grid mt-3">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={isDisabled}
              >
                Iniciar Sesión 🌿
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="login-footer text-center mt-3">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-decoration-none">
              Regístrate aquí
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
