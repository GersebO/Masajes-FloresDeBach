// src/components/functional/appointment/Appointment.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomerStore } from "../../../store/zustand/user.store";
import { useProductStore } from "../../../store/zustand/product.store";
import Hero from "../../ui/hero/Hero";
import Content from "../../ui/content/Content";
import Button from "../../ui/button/Button";
import "./Appointment.css";

export default function Appointment() {
  const navigate = useNavigate();
  const { customer, isAuthenticated } = useCustomerStore();
  const { products, fetchProducts } = useProductStore();

  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableTimes = [
    "09:00", "10:00", "11:00", "12:00",
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para agendar una cita");
      navigate("/login");
      return;
    }
    fetchProducts();
  }, [isAuthenticated, navigate, fetchProducts]);

  const getMinDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  const isDateValid = (dateString) => {
    const selectedDateObj = new Date(dateString + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDateObj >= today;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedService || !selectedDate || !selectedTime) {
      alert("Por favor, completa todos los campos obligatorios");
      return;
    }

    if (!isDateValid(selectedDate)) {
      alert("❌ No puedes agendar una cita en una fecha pasada. Por favor, selecciona una fecha actual o futura.");
      return;
    }

    setIsSubmitting(true);

    try {
      const appointment = {
        customerId: customer.id,
        serviceId: selectedService,
        date: selectedDate,
        time: selectedTime,
        notes: notes,
        status: "PENDIENTE"
      };

      await new Promise(resolve => setTimeout(resolve, 1500));

      alert("✅ ¡Cita agendada exitosamente! Te enviaremos una confirmación.");
      
      // Limpiar formulario
      setSelectedService("");
      setSelectedDate("");
      setSelectedTime("");
      setNotes("");
      
      // Redirigir a home
      navigate("/");
    } catch (error) {
      console.error("Error al agendar cita:", error);
      alert("❌ Error al agendar la cita. Por favor, intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) return null;

  // Filtrar solo servicios de masajes
  const services = products.filter(p => 
    p.categoryName === "Masajes" && p.stock > 0
  );

  return (
    <div className="appointment-container">



        <Content>
        <div className="appointment-content">
          {/* INFO DEL CLIENTE */}
          <div className="appointment-customer-info">
            <div className="customer-info-card">
              <div className="customer-info-icon">
                <i className="bi bi-person-circle"></i>
              </div>
              <div className="customer-info-details">
                <h3>Información del Cliente</h3>
                <p><strong>Nombre:</strong> {customer?.firstName} {customer?.lastName}</p>
                <p><strong>Email:</strong> {customer?.email}</p>
                <p><strong>Teléfono:</strong> {customer?.phone || "No registrado"}</p>
              </div>
            </div>
          </div>

          {/* FORMULARIO DE AGENDAMIENTO */}
          <form onSubmit={handleSubmit} className="appointment-form">
            <h2 className="appointment-form-title">Datos de la Cita</h2>

            {/* SELECCIÓN DE SERVICIO */}
            <div className="appointment-form-group">
              <label htmlFor="service" className="appointment-label">
                <i className="bi bi-spa"></i>
                Servicio / Masaje *
              </label>
              <select
                id="service"
                className="appointment-select"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                required
                disabled={isSubmitting}
              >
                <option value="">Selecciona un servicio</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - ${service.price.toLocaleString("es-CL")}
                  </option>
                ))}
              </select>
            </div>

            {/* SELECCIÓN DE FECHA */}
            <div className="appointment-form-group">
              <label htmlFor="date" className="appointment-label">
                <i className="bi bi-calendar-event"></i>
                Fecha de la Cita *
              </label>
              <input
                type="date"
                id="date"
                className="appointment-input"
                value={selectedDate}
                onChange={(e) => {
                  const newDate = e.target.value;
                  if (isDateValid(newDate)) {
                    setSelectedDate(newDate);
                  } else {
                    alert("❌ No puedes seleccionar una fecha pasada");
                    setSelectedDate("");
                  }
                }}
                min={getMinDate()}
                max={getMaxDate()}
                required
                disabled={isSubmitting}
              />
              <small className="appointment-help-text">
                📅 Solo puedes agendar desde hoy hasta 3 meses por adelantado
              </small>
            </div>

            {/* SELECCIÓN DE HORA */}
            <div className="appointment-form-group">
              <label className="appointment-label">
                <i className="bi bi-clock"></i>
                Hora de la Cita *
              </label>
              <div className="appointment-time-grid">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                    onClick={() => setSelectedTime(time)}
                    disabled={isSubmitting}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* NOTAS ADICIONALES */}
            <div className="appointment-form-group">
              <label htmlFor="notes" className="appointment-label">
                <i className="bi bi-chat-left-text"></i>
                Notas Adicionales (Opcional)
              </label>
              <textarea
                id="notes"
                className="appointment-textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="¿Alguna preferencia o consideración especial?"
                rows="4"
                disabled={isSubmitting}
              />
            </div>

            {/* RESUMEN */}
            {selectedService && selectedDate && selectedTime && (
              <div className="appointment-summary">
                <h3>
                  <i className="bi bi-check-circle"></i>
                  Resumen de tu Cita
                </h3>
                <div className="summary-details">
                  <div className="summary-item">
                    <span className="summary-label">Servicio:</span>
                    <span className="summary-value">
                      {services.find(s => s.id === parseInt(selectedService))?.name}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Fecha:</span>
                    <span className="summary-value">
                      {new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-CL', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Hora:</span>
                    <span className="summary-value">{selectedTime}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Precio:</span>
                    <span className="summary-value summary-price">
                      ${services.find(s => s.id === parseInt(selectedService))?.price.toLocaleString("es-CL")}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* BOTONES */}
            <div className="appointment-actions">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => navigate("/")}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting || !selectedService || !selectedDate || !selectedTime}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Agendando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-calendar-check"></i>
                    Confirmar Cita
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Content>
    </div>
  );
}
