import { useEffect } from "react";
import "./Product.css";
import { useProductStore } from '../../../store/zustand/product.store';
import { useCustomerStore } from "../../../store/zustand/user.store";
import { useCartStore } from "../../../store/zustand/cart.store";
import { useNavigate } from "react-router-dom";
import Hero from "../../ui/hero/Hero";
import Content from "../../ui/content/Content";
import Button from "../../ui/button/Button";

export default function Product() {
  const {
    products,
    category,
    selectedProduct,
    isLoading,
    fetchProducts,
    selectProduct,
    clearSelectedProduct,
    setCategory,
  } = useProductStore();

  const { customer, isAuthenticated } = useCustomerStore();
  const { addItem } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts =
    category === "Todos"
      ? products
      : products.filter((p) => p.categoryName === category);

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated || !customer?.id) {
      alert("Debes iniciar sesión para agregar al carrito ❗");
      navigate("/login");
      return;
    }
    await addItem(customer.id, productId, 1);
    alert("Producto añadido al carrito ✅");
  };

  return (
    <div className="product-container">
      {/* HERO */}
      <div className="product-hero-section">
        <Hero title="🌿 Equilibrio para tu Día a Día 🌿" />
      </div>


        <div className="category-buttons">
          {["Todos", "Masajes", "Flores de Bach"].map((cat) => (
            <button
              key={cat}
              className={`category-btn ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

      {/* PRODUCTOS */}
      <Content>
        {isLoading ? (
          <p className="loading-text">Cargando productos...</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((p) => (
              <div key={p.id} className="product-card">
                <div className="product-image-wrapper">
                  <img
                    src={p.imageUrl || "/img/default.jpg"}
                    alt={p.name}
                    className="product-image"
                  />
                </div>
                
                <div className="product-content">
                  <h3 className="product-title">{p.name}</h3>
                  <p className="product-description">{p.description}</p>
                  
                  <div className="product-footer">
                    <Button
                      variant="price"
                      size="md"
                      onClick={() => selectProduct(p)}
                      className="product-price-btn"
                    >
                      ${p.price.toLocaleString("es-CL")}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Content>

      {/* MODAL */}
      {selectedProduct && (
        <>
          <div className="modal-overlay" onClick={clearSelectedProduct}></div>
          <div className="modal-modern">
            <div className="modal-modern-content">
              <button
                className="modal-close"
                onClick={clearSelectedProduct}
              >
                ✕
              </button>

              <div className="modal-image-section">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="modal-image"
                />
              </div>

              <div className="modal-info-section">
                <h2 className="modal-title">{selectedProduct.name}</h2>
                <p className="modal-description">{selectedProduct.description}</p>

                <div className="modal-details">
                  <div className="modal-detail-item">
                    <span className="detail-label">Precio:</span>
                    <span className="detail-value price">
                      ${selectedProduct.price.toLocaleString("es-CL")}
                    </span>
                  </div>
                  <div className="modal-detail-item">
                    <span className="detail-label">Stock disponible:</span>
                    <span className="detail-value stock">
                      {selectedProduct.stock} unidades
                    </span>
                  </div>
                </div>

                <div className="modal-actions">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleAddToCart(selectedProduct.id)}
                  >
                    🛒 Añadir al carrito
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}