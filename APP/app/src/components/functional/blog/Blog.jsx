import React from 'react';
import './Blog.css';

export default function Blogs() {
  return (
    <div className="container my-5">
      {/* HERO */}
      <section className="hero text-center" aria-labelledby="blogTitle" style={{ marginTop: '25px' }}>
        
          <h1 id="blogTitle" className="hero-title">Nuestro Blog</h1>
          <p className="hero-subtitle">
            Artículos y consejos sobre bienestar, masoterapia y flores de Bach
          </p>
        
      </section>

      {/* BLOG CARDS */}
      <div id="blogs-container" className="container my-5">
        <div className="row g-4">

          {/* BLOG 1 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm rounded-4">
              <img src="/img/blog1.png" className="card-img-top" alt="Masajes relajantes" />
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">Beneficios de los masajes relajantes</h4>
                <p className="text-muted small">Publicado: 05 Septiembre 2025</p>
                <p className="card-text">
                  Descubre cómo un masaje relajante puede ayudarte a reducir el estrés, mejorar tu sueño
                  y equilibrar tu energía después de una semana intensa.
                </p>
                <a href="#" className="category-btn mt-auto">Leer más</a>
              </div>
            </div>
          </div>

          {/* BLOG 2 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm rounded-4">
              <img src="/img/blog2.png" className="card-img-top" alt="Flores de Bach" />
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">Flores de Bach para la ansiedad</h4>
                <p className="text-muted small">Publicado: 28 Agosto 2025</p>
                <p className="card-text">
                  Aprende cómo las esencias florales pueden ser un complemento natural en el
                  manejo de la ansiedad y las emociones intensas.
                </p>
                <a href="#" className="category-btn mt-auto">Leer más</a>
              </div>
            </div>
          </div>

          {/* BLOG 3 */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm rounded-4">
              <img src="/img/blog3.png" className="card-img-top" alt="Masaje deportivo" />
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">Masaje deportivo: prevención y recuperación</h4>
                <p className="text-muted small">Publicado: 15 Agosto 2025</p>
                <p className="card-text">
                  El masaje deportivo no solo alivia dolores, también previene lesiones y mejora tu rendimiento físico.
                </p>
                <a href="#" className="category-btn mt-auto">Leer más</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
