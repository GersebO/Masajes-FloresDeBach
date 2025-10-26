import { useState } from "react";
import Content from "../../ui/content/Content";
import * as validators from "../../../utils/validators";
import "./Contact.css";
import Hero from "../../ui/hero/Hero";
import Button from "../../ui/button/Button";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const { name, email, message } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validators.validarNombre(name))
      newErrors.name = "El nombre es requerido (2–50 letras).";

    if (!validators.validarEmail(email))
      newErrors.email =
        "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";

    if (message.trim().length === 0 || message.trim().length > 500)
      newErrors.message = "El comentario es requerido (máx. 500 caracteres).";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Mensaje enviado:", { name, email, message });
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <div className="contact-container">
      {/* HERO */}
      <div className="contact-hero-section">
        <Hero
          title="💬 Contáctanos 💬"
          subtitle="Estamos aquí para ayudarte. No dudes en escribirnos."
        />

        <div className="contact-cta-top">
          <Button as="a" href="/product" variant="primary" size="lg">
            Ver nuestros servicios
          </Button>
        </div>
      </div>

      {/* INFORMACIÓN Y MAPA */}
      <Content>
        <div className="contact-info-section">
          <div className="contact-info-card">
            <h2 className="contact-section-title">📍 Encuéntranos</h2>

            <div className="contact-info-items">
              {/* UBICACIÓN */}
              <div className="contact-info-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h4>Ubicación</h4>
                  <p>
                    Cuadro Verde 143, Torre 6, Dpto 6
                    <br />
                    Santiago, Chile
                  </p>
                </div>
              </div>

              {/* CORREO */}
              <div className="contact-info-item">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h4>Correo Electrónico</h4>
                  <a href="mailto:info@marafloresdebach.cl">
                    info@marafloresdebach.cl
                  </a>
                </div>
              </div>

              {/* WHATSAPP */}
              <div className="contact-info-item">
                <div className="contact-icon">📱</div>
                <div className="contact-details">
                  <h4>WhatsApp</h4>
                  <a
                    href="https://wa.me/56976094543"
                    target="_blank"
                    rel="noreferrer"
                  >
                    +56 9 7609 4543
                  </a>
                </div>
              </div>

              {/* REDES SOCIALES */}
              <div className="contact-info-item">
                <div className="contact-icon">🌐</div>
                <div className="contact-details">
                  <h4>Síguenos</h4>
                  <div className="contact-social-links">
                    <a
                      href="https://www.instagram.com/marafloresdebach/"
                      target="_blank"
                      rel="noreferrer"
                      className="social-link instagram"
                    >
                      <i className="bi bi-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAPA */}
          <div className="contact-map-card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.718016462947!2d-70.62637202347206!3d-33.454215273357596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d04a69c0d957%3A0xc6c7b952a22904c6!2sCuadro%20Verde%20143%2C%20Santiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1716944696010!5m2!1ses-419!2scl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Mapa de ubicación"
            ></iframe>
          </div>
        </div>
      </Content>

      {/* FORMULARIO */}
      <Content>
        <div className="contact-form-section">
          <div className="contact-form-header">
            <h2 className="contact-section-title centered">
              ✉️ Envíanos un Mensaje
            </h2>
            <p className="contact-form-subtitle">
              Déjanos tu consulta y te responderemos lo antes posible
            </p>
          </div>

          <form className="contact-form-modern" onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <div className="contact-form-group">
                <label htmlFor="name" className="contact-label">
                  <i className="bi bi-person-circle"></i> Nombre completo *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className={`contact-input ${
                    errors.name ? "error" : ""
                  }`}
                  placeholder="Ej: María González"
                  maxLength="100"
                />
                {errors.name && (
                  <span className="contact-error">{errors.name}</span>
                )}
              </div>

              <div className="contact-form-group">
                <label htmlFor="email" className="contact-label">
                  <i className="bi bi-envelope"></i> Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className={`contact-input ${
                    errors.email ? "error" : ""
                  }`}
                  placeholder="tu@email.com"
                  maxLength="100"
                />
                {errors.email && (
                  <span className="contact-error">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="contact-form-group">
              <label htmlFor="message" className="contact-label">
                <i className="bi bi-chat-left-dots"></i> Tu mensaje *
              </label>
              <textarea
                id="message"
                rows="6"
                value={message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className={`contact-input contact-textarea ${
                  errors.message ? "error" : ""
                }`}
                placeholder="Cuéntanos cómo podemos ayudarte..."
                maxLength="500"
              ></textarea>
              <div className="contact-char-count">
                {message.length}/500 caracteres
              </div>
              {errors.message && (
                <span className="contact-error">{errors.message}</span>
              )}
            </div>

            <div className="contact-form-submit">
              <Button type="submit" variant="primary" size="lg">
                Enviar mensaje
              </Button>
            </div>

            {success && (
              <div className="contact-success-message">
                ¡Mensaje enviado con éxito! Te contactaremos pronto.
              </div>
            )}
          </form>
        </div>
      </Content>

      {/* HORARIO DE ATENCIÓN */}
      <Content>
        <div className="contact-hours-section">
          <h2 className="contact-section-title centered">
            🕐 Horario de Atención
          </h2>
          <div className="contact-hours-grid">
            <div className="contact-hours-item">
              <span className="hours-day">Lunes - Viernes</span>
              <span className="hours-time">9:00 - 19:00</span>
            </div>
            <div className="contact-hours-item">
              <span className="hours-day">Sábado</span>
              <span className="hours-time">10:00 - 14:00</span>
            </div>
            <div className="contact-hours-item">
              <span className="hours-day">Domingo</span>
              <span className="hours-time">Cerrado</span>
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
}
