import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../../store/hooks/useFetch";
import "./Product.css";

export function Product() {
  const productos = useFetch("http://localhost:8082/api/products");
  const [filter, setFilter] = useState("ALL");

  if (!productos) {
    return (
      <p style={{ textAlign: "center", color: "#6a1b9a" }}>
        Cargando productos...
      </p>
    );
  }

  // === Normalizar datos del backend (añadimos stock) ===
  const productosNormalizados = productos.map((p) => ({
    id: p.id,
    nombre: p.name,
    descripcion: p.description,
    precio: p.price,
    activo: p.isActive === true || p.isActive === "true",
    imageUrl: p.imageUrl,
    stock: p.stock ?? 0, // aseguramos que siempre tenga valor numérico
  }));

  // === Filtro dinámico ===
  const productosFiltrados =
    filter === "ALL"
      ? productosNormalizados
      : productosNormalizados.filter((p) =>
          filter === "ACTIVE" ? p.activo : !p.activo
        );

  // === Totales ===
  const total = productosNormalizados.length;
  const activos = productosNormalizados.filter((p) => p.activo).length;
  const inactivos = total - activos;

  // === Función para desactivar ===
  const handleDesactivar = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de desactivar el producto "${nombre}"?`)) {
      try {
        const response = await fetch(
          `http://localhost:8082/api/products/${id}/deactivate`,
          { method: "PATCH" }
        );
        if (!response.ok) throw new Error("Error al desactivar el producto");

        alert("Producto desactivado exitosamente ✅");
        window.location.reload();
      } catch (error) {
        console.error("Error al desactivar:", error);
        alert("Error al desactivar el producto ❌");
      }
    }
  };

  // === Función para activar ===
  const handleActivar = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de activar el producto "${nombre}"?`)) {
      try {
        const response = await fetch(
          `http://localhost:8082/api/products/${id}/activate`,
          { method: "PATCH" }
        );
        if (!response.ok) throw new Error("Error al activar el producto");

        alert("Producto activado exitosamente ✅");
        window.location.reload();
      } catch (error) {
        console.error("Error al activar:", error);
        alert("Error al activar el producto ❌");
      }
    }
  };

  // === Determinar estado visual del stock ===
  const getStockStatus = (stock) => {
    if (stock === 0) return <span className="stock-badge sin-stock">Sin stock</span>;
    if (stock <= 5)
      return <span className="stock-badge bajo-stock">Pocas unidades ({stock})</span>;
    return <span className="stock-badge ok-stock">En stock ({stock})</span>;
  };

  return (
    <div className="container mi-tabla">
      <h3 className="titulo-inventario">🧴 Inventario de productos</h3>

      {/* === Resumen de productos === */}
      <div className="inventory-summary">
        <div className="summary-card">
          <h4>Total productos</h4>
          <p>{total}</p>
        </div>
        <div className="summary-card">
          <h4>Activos</h4>
          <p>{activos}</p>
        </div>
        <div className="summary-card">
          <h4>Inactivos</h4>
          <p>{inactivos}</p>
        </div>
        <div className="summary-card create-product-card">
          <Link to="/product/create" className="btn-create-product">
            + Crear Producto
          </Link>
        </div>
      </div>

      {/* === Filtro === */}
      <div className="filter-container">
        <label htmlFor="filter">Filtrar por estado: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="ALL">Todos</option>
          <option value="ACTIVE">Activos</option>
          <option value="INACTIVE">Inactivos</option>
        </select>
      </div>

      {/* === Tabla === */}
      <div className="table-container">
        <div className="row">
          <div className="col-md">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.length > 0 ? (
                  productosFiltrados.map((prod) => (
                    <tr
                      key={prod.id}
                      style={{
                        opacity: prod.activo ? 1 : 0.6,
                        backgroundColor: prod.activo ? "white" : "#f8f8f8",
                      }}
                    >
                      <td>
                        {prod.imageUrl ? (
                          <img
                            src={prod.imageUrl}
                            alt={prod.nombre}
                            className="product-thumb"
                          />
                        ) : (
                          <span className="no-image">Sin imagen</span>
                        )}
                      </td>
                      <td>{prod.id}</td>
                      <td>{prod.nombre}</td>
                      <td>{prod.descripcion}</td>
                      <td>${prod.precio.toLocaleString()}</td>
                      <td>{getStockStatus(prod.stock)}</td>
                      <td>
                        {prod.activo ? (
                          <span className="badge badge-success">Activo</span>
                        ) : (
                          <span className="badge badge-inactive">Inactivo</span>
                        )}
                      </td>
                      <td>
                        {/* Botón de editar */}
                        <Link
                          to={`/product/edit/${prod.id}`}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          Editar
                        </Link>

                        {/* Activar / Desactivar */}
                        {prod.activo ? (
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDesactivar(prod.id, prod.nombre)}
                          >
                            Desactivar
                          </button>
                        ) : (
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => handleActivar(prod.id, prod.nombre)}
                          >
                            Activar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="alert text-center">
                      No hay productos que coincidan con el filtro seleccionado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
