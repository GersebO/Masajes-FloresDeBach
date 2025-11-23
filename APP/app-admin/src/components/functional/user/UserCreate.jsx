import React, { useState } from "react";
import { useUserCreate } from "../../../store/hooks/useUserCreate";
import "./UserCreate.css";

const UserCreate = () => {
  const { createUser, loading } = useUserCreate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    region: "",
    commune: "",
    birthDate: "",
    run: "",
    role: "ADMIN",
    status: "ACTIVE",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser(formData);
      // Limpiar formulario después de crear exitosamente
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        region: "",
        commune: "",
        birthDate: "",
        run: "",
        role: "ADMIN",
        status: "ACTIVE",
      });
    } catch (error) {
      console.error("❌ Error al crear usuario:", error);
      // El hook ya muestra el alert, aquí solo capturamos el error
    }
  };

  return (
    <div className="user-create-container">
      <div className="titulo-inventario">👤 Crear nuevo usuario</div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Ingresa el nombre"
            required
          />
        </div>

        <div className="form-group">
          <label>Apellido:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Ingresa el apellido"
            required
          />
        </div>

        <div className="form-group">
          <label>Correo electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            required
          />
        </div>

        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Ej: 987654321"
          />
        </div>

        <div className="form-group">
          <label>Dirección:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Ingresa dirección"
          />
        </div>

        <div className="form-group">
          <label>Región:</label>
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
            placeholder="Ej: Metropolitana"
          />
        </div>

        <div className="form-group">
          <label>Comuna:</label>
          <input
            type="text"
            name="commune"
            value={formData.commune}
            onChange={handleChange}
            placeholder="Ej: Santiago Centro"
          />
        </div>

        <div className="form-group">
          <label>Fecha de nacimiento:</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>RUN:</label>
          <input
            type="text"
            name="run"
            value={formData.run}
            onChange={handleChange}
            placeholder="Ej: 12345678-9"
          />
        </div>

        <div className="form-group">
          <label>Rol:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="USER">Usuario</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>

        <button type="submit" className="btn-save">
          Guardar usuario
        </button>
      </form>
    </div>
  );
};

export default UserCreate;
