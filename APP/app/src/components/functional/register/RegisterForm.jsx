import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterStore } from "../../../store/zustand/register.store";
import { validators } from "../../../utils/validators";
import { regiones } from "../../../utils/regionesData";
import "./Register.css";
import Button from "../../ui/button/Button";

const initialFormData = {
  run: "",
  firstName: "",
  lastName: "",
  email: "",
  birthDate: "",
  address: "",
  region: "",
  commune: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const { registerUser, isLoading, errorMessage, isSuccess, resetRegisterState } =
    useRegisterStore();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [comunasDisponibles, setComunasDisponibles] = useState([]);

  useEffect(() => {
    if (!formData.region) return setComunasDisponibles([]);
    const regionIdx = Number(formData.region);
    setComunasDisponibles(regiones[regionIdx]?.comunas || []);
    setFormData((prev) => ({ ...prev, commune: "" }));
  }, [formData.region]);

  const rules = {
    run: (v) => validators.validarRUN(v) || "RUN inválido",
    birthDate: (v) => v !== "" || "La fecha de nacimiento es obligatoria",
    firstName: (v) => validators.validarNombre(v) || "Nombre inválido",
    lastName: (v) => validators.validarApellidos(v) || "Apellidos inválidos",
    email: (v) => validators.validarEmail(v) || "Correo inválido",
    address: (v) => validators.validarDireccion(v) || "Dirección obligatoria",
    region: (v) => v !== "" || "Selecciona una región",
    commune: (v) => v !== "" || "Selecciona una comuna",
    password: (v) => validators.validarPassword(v) || "Contraseña inválida",
    confirmPassword: (v) =>
      validators.validarPasswordsCoinciden(formData.password, v) ||
      "Las contraseñas no coinciden",
  };

  const validateField = (field, value) => {
    const rule = rules[field];
    if (!rule) return true;
    const result = rule(value);
    const msg = result === true ? "" : result;
    setErrors((prev) => ({ ...prev, [field]: msg }));
    return !msg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (!touched[name]) setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateForm = () => {
    let valid = true;
    for (const field in rules) {
      const ok = validateField(field, formData[field]);
      if (!ok) valid = false;
    }
    setTouched(
      Object.keys(rules).reduce((acc, f) => ({ ...acc, [f]: true }), {})
    );
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const regionIdx = Number(formData.region);
      const data = {
        ...formData,
        run: validators.normalizaRun(formData.run),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        region: regiones[regionIdx]?.nombre,
        commune: formData.commune,
        status: "ACTIVE",
      };

      await registerUser(data);

      alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
      resetRegisterState();
      navigate("/login");
    } catch (err) {
      alert("❌ Error al registrar: " + err.message);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setTouched({});
    setComunasDisponibles([]);
  };

  const getInputClass = (field) =>
    !touched[field]
      ? "register-input"
      : errors[field]
      ? "register-input error"
      : "register-input valid";

  return (
    <form onSubmit={handleSubmit} className="register-form" noValidate>
      {/* DATOS PERSONALES */}
      <div className="register-section">
        <h2 className="register-section-title">
          <i className="bi bi-person-fill"></i> Datos Personales
        </h2>

        <div className="register-form-row">
          <div className="register-form-group">
            <label htmlFor="run" className="register-label">
              RUN (sin puntos ni guion) *
            </label>
            <input
              type="text"
              id="run"
              name="run"
              className={getInputClass("run")}
              placeholder="19011022K"
              value={formData.run}
              onChange={handleChange}
              required
            />
            {touched.run && errors.run && (
              <span className="register-error">{errors.run}</span>
            )}
          </div>

          <div className="register-form-group">
            <label htmlFor="birthDate" className="register-label">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              className="register-input"
              min="1940-01-01"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="register-form-row">
          <div className="register-form-group">
            <label htmlFor="firstName" className="register-label">
              Nombre *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className={getInputClass("firstName")}
              placeholder="Ej: Camila"
              maxLength="50"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {touched.firstName && errors.firstName && (
              <span className="register-error">{errors.firstName}</span>
            )}
          </div>

          <div className="register-form-group">
            <label htmlFor="lastName" className="register-label">
              Apellidos *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className={getInputClass("lastName")}
              placeholder="Ej: Díaz Pérez"
              maxLength="100"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {touched.lastName && errors.lastName && (
              <span className="register-error">{errors.lastName}</span>
            )}
          </div>
        </div>
      </div>

      {/* DATOS DE CONTACTO */}
      <div className="register-section">
        <h2 className="register-section-title">
          <i className="bi bi-envelope-fill"></i> Datos de Contacto
        </h2>

        <div className="register-form-group">
          <label htmlFor="email" className="register-label">
            Correo Electrónico *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={getInputClass("email")}
            placeholder="tu@email.com"
            maxLength="100"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {touched.email && errors.email && (
            <span className="register-error">{errors.email}</span>
          )}
        </div>

        <div className="register-form-group">
          <label htmlFor="phone" className="register-label">
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="register-input"
            placeholder="+56912345678"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="register-form-group">
          <label htmlFor="address" className="register-label">
            Dirección *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className={getInputClass("address")}
            placeholder="Calle, número, depto"
            maxLength="300"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {touched.address && errors.address && (
            <span className="register-error">{errors.address}</span>
          )}
        </div>

        <div className="register-form-row">
          <div className="register-form-group">
            <label htmlFor="region" className="register-label">
              Región *
            </label>
            <select
              id="region"
              name="region"
              className={getInputClass("region")}
              value={formData.region}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione región</option>
              {regiones.map((region, idx) => (
                <option key={idx} value={idx}>
                  {region.nombre}
                </option>
              ))}
            </select>
            {touched.region && errors.region && (
              <span className="register-error">{errors.region}</span>
            )}
          </div>

          <div className="register-form-group">
            <label htmlFor="commune" className="register-label">
              Comuna *
            </label>
            <select
              id="commune"
              name="commune"
              className={getInputClass("commune")}
              value={formData.commune}
              onChange={handleChange}
              disabled={comunasDisponibles.length === 0}
              required
            >
              <option value="">Seleccione comuna</option>
              {comunasDisponibles.map((comuna, idx) => (
                <option key={idx} value={comuna}>
                  {comuna}
                </option>
              ))}
            </select>
            {touched.commune && errors.commune && (
              <span className="register-error">{errors.commune}</span>
            )}
          </div>
        </div>
      </div>

      {/* CONTRASEÑA */}
      <div className="register-section">
        <h2 className="register-section-title">
          <i className="bi bi-lock-fill"></i> Contraseña
        </h2>

        <div className="register-form-row">
          <div className="register-form-group">
            <label htmlFor="password" className="register-label">
              Contraseña *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={getInputClass("password")}
              placeholder="4 a 10 caracteres"
              minLength="4"
              maxLength="10"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            {touched.password && errors.password && (
              <span className="register-error">{errors.password}</span>
            )}
          </div>

          <div className="register-form-group">
            <label htmlFor="confirmPassword" className="register-label">
              Confirmar Contraseña *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={getInputClass("confirmPassword")}
              placeholder="Repite tu contraseña"
              minLength="4"
              maxLength="10"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <span className="register-error">{errors.confirmPassword}</span>
            )}
          </div>
        </div>
      </div>

      {/* BOTONES */}
      <div className="register-actions">
        <Button type="submit" variant="primary" size="lg" disabled={isLoading}>
          {isLoading ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
        <Button
          type="button"
          onClick={handleReset}
          variant="secondary"
          size="lg"
          disabled={isLoading}
        >
          Limpiar formulario
        </Button>
      </div>

      {/* MENSAJES */}
      {errorMessage && (
        <div className="register-message error">
          <i className="bi bi-exclamation-circle-fill"></i>
          {errorMessage}
        </div>
      )}
      {isSuccess && (
        <div className="register-message success">
          <i className="bi bi-check-circle-fill"></i>
          ¡Registro exitoso! Redirigiendo...
        </div>
      )}
    </form>
  );
}