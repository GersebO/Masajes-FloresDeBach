import React, { useState } from "react";
import "./CategoryForm.css";
export default function CategoryForm({ onSubmit, mode, disabled }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  console.log(formData)
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="category-form-container" onSubmit={handleSubmit}>
      <div className="titulo-inventario">🗂️ {mode === "create" ? "Crear Categoría" : "Editar Categoría"}</div>

      <div className="category-form-group">
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="category-form-group">
        <label>Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="category-form-checkbox">
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
        />
        <label>Activo</label>
      </div>

      <button
        type="submit"
        className="category-form-submit"
        disabled={disabled}
      >
        {disabled ? "Guardando..." : "💾 Guardar Categoría"}
      </button>
    </form>
  );
}
