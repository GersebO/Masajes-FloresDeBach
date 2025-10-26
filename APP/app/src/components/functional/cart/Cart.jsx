import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Cart.css";

import { useCustomerStore } from "../../../store/zustand/user.store";
import { useCartStore } from "../../../store/zustand/cart.store";

export default function Cart() {
  const { customer, isAuthenticated } = useCustomerStore();
  const { items, total, fetchCart, isLoading } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !customer?.id) {
      alert("Debes iniciar sesión para ver tu carrito ❗");
      navigate("/login");
      return;
    }

    fetchCart(customer.id);
  }, [isAuthenticated, customer, fetchCart, navigate]);

  if (!isAuthenticated || !customer?.id) return null;
  console.log("cartItems:", items);
  return (
    <div className="cart-container container my-5">
      
      <h1 className="cart-title text-center mb-4">🛒 Tu Carrito</h1>

      {isLoading ? (
        <p className="text-center text-muted">Cargando carrito...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-muted">Tu carrito está vacío 🌸</p>
      ) : (
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item shadow-sm rounded-3">
              <img src={item.imageUrl || "/img/default.jpg"} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <h5>{item.name}</h5>
                <p className="text-muted">{item.description}</p>
                <p>Cantidad: {item.quantity}</p>
                <p className="fw-bold">Precio: ${item.price.toLocaleString("es-CL")}</p>
                <p className="fw-bold text-success">
                  Subtotal: ${(item.price * item.quantity).toLocaleString("es-CL")}
                </p>
              </div>
            </div>
          ))}

          <div className="cart-total mt-4">
            <h4>Total a pagar: 💰 ${total.toLocaleString("es-CL")}</h4>
            <button className="btn btn-success mt-3">Proceder al pago</button>
          </div>
        </div>
      )}
    </div>
  );
}