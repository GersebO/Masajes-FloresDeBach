import { useEffect, useState } from "react";
import "./Product.css";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState(null);

  //  Cargar productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/products");
        if (!response.ok) throw new Error("Error al obtener productos");
        const data = await response.json();

        // Mostrar solo productos activos
        const activos = data.filter((p) => p.isActive === true);
        setProducts(activos);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchProducts();
  }, []);

  // 🧮 Filtro por categoría
  const filteredProducts =
    category === "Todos"
      ? products
      : products.filter((p) => p.categoryName === category);

  return (
    <div className="container my-5">


      {/* Encabezado estilo Hero */}
      <section className="product-hero-box">
        <h1>🌿 Nuestros Productos 🌿</h1>
        <p>
          Explora nuestras terapias para encontrar la armonía perfecta entre tu cuerpo y tu mente.
        </p>
      </section>

      {/* Botones de categoría */}
      <div className="text-center mb-4">
        <button
          className={`btn-category ${category === "Todos" ? "active" : ""}`}
          onClick={() => setCategory("Todos")}
        >Todos
        </button>

        <button
          className={`btn-category ${category === "Masajes" ? "active" : ""}`}
          onClick={() => setCategory("Masajes")}
        >Masajes
        </button>

        <button
          className={`btn-category ${category === "Flores de Bach" ? "active" : ""}`}
          onClick={() => setCategory("Flores de Bach")}
        >Flores de Bach
        </button>
      </div>

      {/* Lista de productos */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {filteredProducts.map((p) => (
          <div key={p.id} className="col">
            <div
              className="card h-100 shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedProduct(p)}
            >
              <img
                src={p.imageUrl || "/img/default.jpg"}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{p.name}</h5>
                <p className="text-muted">{p.description}</p>
                <p className="fw-bold">${p.price.toLocaleString("es-CL")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de producto */}
      {selectedProduct && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">  
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedProduct(null)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="img-fluid rounded mb-3"
                />
                <p>{selectedProduct.description}</p>
                <p className="fw-bold text-success">
                  Precio: ${selectedProduct.price.toLocaleString("es-CL")}
                  {/**Añade el stock */}
                  <p className="fw-bold text-success">Stock: {selectedProduct.stock}</p>
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success">
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
