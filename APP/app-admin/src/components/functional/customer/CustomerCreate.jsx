import React from "react";
import { useState } from "react";
import { createCustomer } from "../../../store/services/customer.service";
import "./CustomerCreate.css";

export default function CustomerCreate() {
  const [formData, setFormData] = useState({
    run: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    region: "",
    commune: "",
    birthDate: "",
  });

  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      await createCustomer(formData);

      setMessage({ type: "success", text: "Cliente creado exitosamente 💜" });
      setFormData({
        run: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        region: "",
        commune: "",
        birthDate: "",
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="customer-create-container">
      <div className="customer-card shadow-lg">
        <div className="titulo-inventario">🪷 Crear Cliente</div>

        <form onSubmit={handleSubmit}>
          <div className="grid-container">
            <div>
              <label>RUN</label>
              <input
                type="text"
                name="run"
                value={formData.run}
                onChange={handleChange}
                placeholder="Ej: 19011022-K"
                required
              />
            </div>

            <div>
              <label>Nombre</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Apellidos</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="cliente@gmail.com"
                required
              />
            </div>

            <div>
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+56912345678"
              />
            </div>

            <div>
              <label>Dirección</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Región</label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Comuna</label>
              <input
                type="text"
                name="commune"
                value={formData.commune}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Fecha de nacimiento</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="btn-container">
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? "Creando..." : "Crear Cliente"}
            </button>
          </div>
        </form>

        {message && (
          <p
            className={`alert ${
              message.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}
