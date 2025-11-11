import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import orderService from "../../../store/services/order.service";
import "./InvoiceDetail.css";

export default function InvoiceDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await orderService.getOrderById(id);
        setOrder(res);
      } catch (err) {
        setError(err.message || "Error al obtener boleta");
      } finally {
        setLoading(false);
      }
    };

    if (id) load();
  }, [id]);

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
          <div className="error-icon">⚠️</div>
          <h3>Error al cargar</h3>
          <p>{error}</p>
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
                <th>Precio Unit.</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items && order.items.map((it, idx) => (
                <tr key={it.id || idx}>
                  <td className="item-name">{it.name || it.productName || `Producto #${it.productId}`}</td>
                  <td className="item-qty">{it.quantity}</td>
                  <td className="item-price">${Number(it.unitPrice || it.price || 0).toLocaleString("es-CL")}</td>
                  <td className="item-subtotal">${Number((it.unitPrice || it.price || 0) * it.quantity).toLocaleString("es-CL")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="invoice-divider"></div>

        {/* Total */}
        <div className="invoice-total-section">
          <div className="total-row">
            <span className="total-label">TOTAL</span>
            <span className="total-amount">${Number(order.total).toLocaleString("es-CL")}</span>
          </div>
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
