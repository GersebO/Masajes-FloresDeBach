import { useState } from 'react';
import * as validators from '../../../utils/validators.js';

export default function Contact() {
  // 🧠 Estados controlados
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // 🧮 Validar antes de enviar
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validators.validarNombre(name)) {
      newErrors.name = 'El nombre es requerido (2–50 letras).';
    }

    if (!validators.validarEmail(email)) {
      newErrors.email = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
    }

    if (message.trim().length === 0 || message.trim().length > 500) {
      newErrors.message = 'El comentario es requerido (máx. 500 caracteres).';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // 💌 Aquí podrías hacer el envío a backend o API
      console.log('Mensaje enviado:', { name, email, message });
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');

      // Oculta el mensaje después de 5 segundos
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <div className="container mt-4">
      <section className="product-hero-box" aria-labelledby="nosTitle">
        <h1 id="nosTitle" className="hero-title">
          Contacto
        </h1>
        <p className="hero-subtitle">
          Estamos aquí para ayudarte. No dudes en contactarnos.
        </p>
        <a href="/contact" className="btn-cta">
          Agenda una evaluación
        </a>
      </section>

      <main className="my-5">
        <div className="row g-4 justify-content-center">
          {/* Información de contacto */}
          <div className="col-md-5">
            <div className="card shadow-sm p-4 h-100">
              <h3 className="mb-3">Información de Contacto</h3>
              <p><i className="bi bi-geo-alt-fill me-2 fs-5"></i> Cuadro verde 143, torre 6, dpto 6. Santiago, Chile.</p>
              <p><i className="bi bi-envelope-fill me-2 fs-5"></i> info@marafloresdebach.cl</p>
              <p>
                <a href="https://wa.me/56976094543" className="text-decoration-none text-dark">
                  <i className="bi bi-whatsapp me-2 fs-5"></i> +56 9 7609 4543
                </a>
              </p>

              <h4 className="mt-4 mb-3">Nuestras Redes Sociales</h4>
              <div className="d-flex gap-3">
                <a href="https://www.instagram.com/marafloresdebach/" className="fs-4 text-dark" target="_blank" rel="noreferrer"><i className="bi bi-instagram"></i></a>
                <a href="#" className="fs-4 text-dark"><i className="bi bi-facebook"></i></a>
                <a href="#" className="fs-4 text-dark"><i className="bi bi-linkedin"></i></a>
              </div>

              <h4 className="mb-3 mt-5">¿Dónde nos encontramos?</h4>
              <div className="map-container rounded shadow">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.718016462947!2d-70.62637202347206!3d-33.454215273357596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d04a69c0d957%3A0xc6c7b952a22904c6!2sCuadro%20Verde%20143%2C%20Santiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1716944696010!5m2!1ses-419!2scl"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de ubicación"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="col-md-7">
            <div className="card shadow-sm formulario-fondo p-4 h-100">
              <div className="card-body">
                <h3 className="card-title text-center fw-semibold">FORMULARIO DE CONTACTO</h3>
                <h4 className="text-center text-muted mb-4">¡Déjanos tu mensaje!</h4>

                <form onSubmit={handleSubmit}>
                  {/* Nombre */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label d-flex align-items-center">
                      <i className="bi bi-person-circle me-2"></i> Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength="100"
                      required
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  {/* Correo */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label d-flex align-items-center">
                      <i className="bi bi-envelope me-2"></i> Correo *
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      maxLength="100"
                      required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  {/* Comentario */}
                  <div className="mb-4">
                    <label htmlFor="message" className="form-label d-flex align-items-center">
                      <i className="bi bi-chat-left-dots me-2"></i> Comentario *
                    </label>
                    <textarea
                      id="message"
                      className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                      rows="4"
                      maxLength="500"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                  </div>

                  {/* Botón */}
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-lg">
                      ENVIAR MENSAJE
                    </button>
                  </div>
                </form>

                {/* Mensaje de éxito */}
                {success && (
                  <div className="alert alert-success mt-3 text-center">
                    ¡Mensaje enviado con éxito!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
