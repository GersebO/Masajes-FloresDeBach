import { useState } from "react";
import "./ProductForm.css";

export function ProductForm({ initialData = {}, onSubmit, mode = "create" }) {
  const [form, setForm] = useState({
    name: initialData.name ?? "",
    description: initialData.description ?? "",
    price: initialData.price ?? "",
    stock: initialData.stock ?? "",
    categoryId: initialData.categoryId ?? "",
    imageUrl: initialData.imageUrl ?? "",
    sku: initialData.sku ?? "",
    status: initialData.status ?? "AVAILABLE",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.description || !form.price || !form.sku) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    // Normaliza tipos
    const formatted = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price),
      stock: parseInt(form.stock || 0),
      categoryId: parseInt(form.categoryId),
      imageUrl: form.imageUrl.trim(),
      sku: form.sku.trim(),
      status: form.status,
    };

    onSubmit(formatted);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h3 className="titulo-inventario">
        {mode === "create" ? "Crear Producto" : "Editar Producto"}
      </h3>

      <div className="form-group">
        <label>Nombre *</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ej: Rosa Roja Premium"
          required
        />
      </div>

      <div className="form-group">
        <label>Descripción *</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Ej: Rosa roja importada de Ecuador"
          required
        />
      </div>

      <div className="form-group">
        <label>Precio *</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Ej: 2500"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Ej: 100"
          min="0"
        />
      </div>

      <div className="form-group">
        <label>ID de Categoría *</label>
        <input
          type="number"
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          placeholder="Ej: 1"
          required
        />
      </div>

      <div className="form-group">
        <label>URL de Imagen</label>
        <input
          type="text"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="https://ejemplo.com/rosa.jpg"
        />
      </div>

      <div className="form-group">
        <label>SKU *</label>
        <input
          type="text"
          name="sku"
          value={form.sku}
          onChange={handleChange}
          placeholder="Ej: RP-001"
          required
        />
      </div>

      <div className="form-group">
        <label>Estado</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="AVAILABLE">Disponible</option>
          <option value="OUT_OF_STOCK">Sin stock</option>
          <option value="DISCONTINUED">Descontinuado</option>
        </select>
      </div>

      <button type="submit" className="form-btn">
        {mode === "create" ? "Guardar Producto" : "Actualizar Producto"}
      </button>
    </form>
  );
}

export default ProductForm;
