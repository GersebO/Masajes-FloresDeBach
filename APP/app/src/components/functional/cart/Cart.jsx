import { useEffect, useState } from "react";
import "./Cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🧩 Cargar carrito del cliente
  useEffect(() => {
    const fetchCart = async () => {
      if (!user || !user.id) {
        alert("Debes iniciar sesión para ver tu carrito ❗");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8082/api/cart/${user.id}`);
        if (!response.ok) throw new Error("Error al obtener el carrito");
        const data = await response.json();

        setCartItems(data);
        // Calcular total
        const totalSum = data.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(totalSum);
      } catch (error) {
        console.error("Error al cargar carrito:", error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="cart-container container my-5">
      <h1 className="cart-title text-center mb-4">🛒 Tu Carrito</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-muted">Tu carrito está vacío 🌸</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item shadow-sm rounded-3">
              <img
                src={item.imageUrl || "/img/default.jpg"}
                alt={item.name}
                className="cart-item-img"
              />
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
