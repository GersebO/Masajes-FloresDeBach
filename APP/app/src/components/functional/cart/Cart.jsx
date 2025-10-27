import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { useCustomerStore } from "../../../store/zustand/user.store";
import { useCartStore } from "../../../store/zustand/cart.store";
import { useProductStore } from "../../../store/zustand/product.store";
import Hero from "../../ui/hero/Hero";
import Content from "../../ui/content/Content";
import Button from "../../ui/button/Button";

export default function Cart() {
  const { customer, isAuthenticated } = useCustomerStore();
  const { items, total, fetchCart, isLoading, removeItem, updateQuantity } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !customer?.id) {
      alert("Debes iniciar sesión para ver tu carrito ❗");
      navigate("/login");
      return;
    }

    console.log("🔍 Cargando carrito para customer:", customer.id);
    // Ensure products are loaded so we can enrich cart items (name/description/image)
    const load = async () => {
      try {
        const prodState = useProductStore.getState();
        if (!prodState.products || prodState.products.length === 0) {
          await prodState.fetchProducts();
        }
      } catch (e) {
        console.warn("No se pudieron cargar productos para enriquecer el carrito:", e);
      } finally {
        fetchCart(customer.id);
      }
    };
    load();
  }, [isAuthenticated, customer, fetchCart, navigate]);

  // Debug: Ver qué hay en items
  useEffect(() => {
    console.log("🛒 Cart items:", items);
    console.log("💰 Total:", total);
  }, [items, total]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(customer.id, itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      removeItem(customer.id, itemId);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (!isAuthenticated || !customer?.id) return null;

  return (
    <div className="cart-container">
      {/* HERO */}
      <div className="cart-hero-section">
        <Hero
          title="🛒 Tu Carrito de Compras"
          subtitle="Revisa tus productos seleccionados antes de finalizar tu compra"
        />
      </div>

      <Content>
        {isLoading ? (
          <div className="cart-loading">
            <div className="cart-loading-spinner"></div>
            <p>Cargando tu carrito...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛍️</div>
            <h2>Tu carrito está vacío</h2>
            <p>¡Explora nuestros productos y encuentra lo que necesitas!</p>
            <Button as="a" href="/product" variant="primary" size="lg">
              Ir a productos
            </Button>
          </div>
        ) : (
          <div className="cart-content">
            {/* LISTA DE PRODUCTOS */}
            <div className="cart-items-section">
              <h2 className="cart-section-title">
                Productos ({items.length} {items.length === 1 ? "artículo" : "artículos"})
              </h2>

              <div className="cart-items-list">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.imageUrl || "/img/default.jpg"} alt={item.name} />
                    </div>

                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-description">{item.description}</p>
                      
                      <div className="cart-item-price">
                        <span className="cart-item-price-label">Precio unitario:</span>
                         <span className="cart-item-price-value">
                           {/* Defensive formatting: use 0 if price is missing or not a number */}
                           {(() => {
                             const priceNum = Number(item.price) || 0;
                             return `$${priceNum.toLocaleString("es-CL")}`;
                           })()}
                         </span>
                      </div>
                    </div>

                    <div className="cart-item-actions">
                      <div className="cart-item-quantity">
                        <button
                          className="cart-quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="cart-quantity-value">{item.quantity}</span>
                        <button
                          className="cart-quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-item-subtotal">
                        <span className="cart-subtotal-label">Subtotal:</span>
                         <span className="cart-subtotal-value">
                           {(() => {
                             const priceNum = Number(item.price) || 0;
                             const qty = Number(item.quantity) || 0;
                             return `${(priceNum * qty).toLocaleString("es-CL")}`;
                           })()}
                         </span>
                      </div>

                      <button
                        className="cart-item-remove"
                        onClick={() => handleRemoveItem(item.id)}
                        title="Eliminar producto"
                      >
                        <i className="bi bi-trash" aria-hidden="true"></i>
                        {/* fallback visible label in case icons aren't loaded */}
                        <span className="cart-remove-label">Eliminar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RESUMEN DEL PEDIDO */}
            <div className="cart-summary">
              <h2 className="cart-summary-title">Resumen del pedido</h2>

              <div className="cart-summary-details">
                <div className="cart-summary-row">
                  <span>Subtotal ({items.length} productos)</span>
                  <span>${total.toLocaleString("es-CL")}</span>
                </div>
                
                <div className="cart-summary-row">
                  <span>Envío</span>
                  <span className="cart-summary-free">Gratis</span>
                </div>

                <div className="cart-summary-divider"></div>

                <div className="cart-summary-total">
                  <span>Total</span>
                  <span className="cart-summary-total-value">
                    ${total.toLocaleString("es-CL")}
                  </span>
                </div>
              </div>

              <div className="cart-summary-actions">
                <Button variant="primary" size="lg" onClick={handleCheckout}>
                  Proceder al pago
                </Button>
                
                <Button 
                  as="a" 
                  href="/product" 
                  variant="secondary" 
                  size="md"
                >
                  Seguir comprando
                </Button>
              </div>

              <div className="cart-summary-benefits">
                <div className="cart-benefit-item">
                  <i className="bi bi-shield-check"></i>
                  <span>Compra segura</span>
                </div>
                <div className="cart-benefit-item">
                  <i className="bi bi-truck"></i>
                  <span>Envío gratis</span>
                </div>
                <div className="cart-benefit-item">
                  <i className="bi bi-arrow-clockwise"></i>
                  <span>Devolución fácil</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Content>
    </div>
  );
}