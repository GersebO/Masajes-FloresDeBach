import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import orderService from "../../../store/services/order.service";
import { useCustomerStore } from "../../../store/zustand/user.store";
import "./InvoiceDetail.css";

export default function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customer, isAuthenticated } = useCustomerStore();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    // Verificar autenticación
    if (!isAuthenticated || !customer?.id) {
      navigate("/login");
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        const res = await orderService.getOrderByIdAndCustomer(id, customer.id);
        setOrder(res);
      } catch (err) {
        console.error("❌ Error al obtener boleta:", err.message);
        if (err.message === "No tienes permiso para ver esta boleta") {
          setIsUnauthorized(true);
        }
        setError(err.message || "Error al obtener boleta");
      } finally {
        setLoading(false);
      }
    };

    if (id) load();
  }, [id, customer, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="invoice-detail-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando boleta...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="invoice-detail-container">
        <div className="error-state">
          <div className="error-icon">
            {isUnauthorized ? "🔒" : "⚠️"}
          </div>
          <h3>
            {isUnauthorized ? "Acceso Denegado" : "Error al cargar"}
          </h3>
          <p>{error}</p>
          {isUnauthorized && (
            <p className="error-note">No tienes permiso para ver esta boleta.</p>
          )}
          <Link to="/invoices" className="btn-back">← Volver a Mis Boletas</Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="invoice-detail-container">
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <h2>No se encontró la boleta</h2>
          <Link to="/invoices" className="btn-back">← Volver a Mis Boletas</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="invoice-detail-container">
      <div className="invoice-actions">
        <Link to="/invoices" className="btn-back">← Volver</Link>
        <button className="btn-print" onClick={() => window.print()}>🖨️ Imprimir</button>
      </div>

      <div className="invoice-paper">
        {/* Header de la boleta */}
        <div className="invoice-header">
          <div className="invoice-logo">
            <img src="/img/logo.png" alt="Logo" />
            <h1>MarafloresdeBach</h1>
          </div>
          <div className="invoice-info">
            <h2>BOLETA DE VENTA</h2>
            <p className="invoice-number">Nº {order.id}</p>
            <p className="invoice-date">📅 {new Date(order.createdAt).toLocaleDateString("es-CL", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}</p>
          </div>
        </div>

        <div className="invoice-divider"></div>

        {/* Info del cliente */}
        <div className="invoice-customer">
          <h3>👤 Información del Cliente</h3>
          <p><strong>ID Cliente:</strong> {order.customerId}</p>
          <p><strong>Estado:</strong> <span className="status-badge">{order.status || "COMPLETADA"}</span></p>
        </div>

        <div className="invoice-divider"></div>

        {/* Tabla de items */}
        <div className="invoice-items">
          <h3>📦 Detalle de Productos</h3>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unit</th>
                <th >IVA</th>
              </tr>
            </thead>
            <tbody>
              {order.items && order.items.map((it, idx) => {
                const IVA_RATE = 0.19;
                const basePrice = Number(it.unitPrice || it.price || 0);
                const ivaAmount = Math.round(basePrice * IVA_RATE);
                const priceWithIVA = basePrice + ivaAmount;
                const totalItem = priceWithIVA * it.quantity;

                return (
                  <tr key={it.id || idx}>
                    <td className="item-name">{it.name || it.productName || `Producto #${it.productId}`}</td>
                    <td className="item-qty">{it.quantity}</td>
                    <td className="item-price">${basePrice.toLocaleString("es-CL")}</td>
                    <td className="item-subtotal">${ivaAmount.toLocaleString("es-CL")}</td>
                  </tr>
                );
              })}
              {(() => {
                // Calcular total sumando todos los precios con IVA de cada item
                const IVA_RATE = 0.19;
                const totalWithIVA = order.items.reduce((sum, it) => {
                  const basePrice = Number(it.unitPrice || it.price || 0);
                  const ivaAmount = Math.round(basePrice * IVA_RATE);
                  const priceWithIVA = basePrice + ivaAmount;
                  return sum + (priceWithIVA * it.quantity);
                }, 0);

                return (
                  <>
                    <tr className="invoice-summary-row total-row">
                      <td colSpan="3" className="summary-label">TOTAL</td>
                      <td className="summary-amount">${totalWithIVA.toLocaleString("es-CL")}</td>
                    </tr>
                  </>
                );
              })()}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="invoice-footer">
          <p>✨ Gracias por tu compra en MarafloresdeBach</p>
          <p className="footer-note">Esta boleta es un comprobante de tu orden.</p>
        </div>
      </div>
    </div>
  );
}
