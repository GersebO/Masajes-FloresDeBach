import React, { useState } from "react";
import "./UserForm.css";

const UserForm = ({ onSubmit, mode = "create", disabled = false }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    region: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h3>{mode === "create" ? "Crear Usuario" : "Editar Usuario"}</h3>

      <input
        type="text"
        name="firstName"
        placeholder="Nombre"
        value={form.firstName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Apellido"
        value={form.lastName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Teléfono"
        value={form.phone}
        onChange={handleChange}
      />
      <input
        type="text"
        name="region"
        placeholder="Región"
        value={form.region}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="btn btn-primary"
        disabled={disabled}
      >
        {disabled ? "Guardando..." : "Guardar Usuario"}
      </button>
    </form>
  );
};

export default UserForm;
