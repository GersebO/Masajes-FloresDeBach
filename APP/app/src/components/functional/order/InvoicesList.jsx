import { useEffect, useState } from "react";
import orderService from "../../../store/services/order.service";
import { useCustomerStore } from "../../../store/zustand/user.store";
import { Link } from "react-router-dom";
import "./InvoicesList.css";

export default function InvoicesList() {
  const { customer } = useCustomerStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!customer?.id) return;
    const load = async () => {
      try {
        setLoading(true);
        const res = await orderService.getOrdersByCustomer(customer.id);
        setOrders(res || []);
      } catch (err) {
        setError(err.message || "Error al cargar boletas");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [customer]);

  if (!customer) {
    return (
      <div className="invoices-container">
        <div className="empty-state">
          <div className="empty-icon">🔒</div>
          <h2>Acceso Restringido</h2>
          <p>Debes iniciar sesión para ver tus boletas.</p>
          <Link to="/login" className="btn-primary">Iniciar Sesión</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="invoices-container">
      <div className="invoices-header">
        <h1>📄 Mis Boletas</h1>
        <p className="subtitle">Historial de compras y órdenes realizadas</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando tus boletas...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Error al cargar</h3>
          <p>{error}</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🛍️</div>
          <h2>No tienes boletas aún</h2>
          <p>Cuando realices tu primera compra, aparecerá aquí.</p>
          <Link to="/product" className="btn-primary">Ver Productos</Link>
        </div>
      ) : (
        <div className="invoices-grid">
          {orders.map((o) => (
            <Link to={`/invoices/${o.id}`} key={o.id} className="invoice-card">
              <div className="invoice-card-header">
                <span className="invoice-number">#{o.id}</span>
                <span className="invoice-status">✓ Completada</span>
              </div>
              <div className="invoice-card-body">
                <div className="invoice-date">
                  <span className="label">📅 Fecha</span>
                  <span className="value">{new Date(o.createdAt).toLocaleDateString("es-CL", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}</span>
                </div>
                <div className="invoice-total">
                  <span className="label">💰 Total</span>
                  <span className="value">${Number(o.total).toLocaleString("es-CL")}</span>
                </div>
                <div className="invoice-items">
                  <span className="label">📦 Items</span>
                  <span className="value">{o.items?.length || 0} producto(s)</span>
                </div>
              </div>
              <div className="invoice-card-footer">
                <span className="view-detail">Ver detalle →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
