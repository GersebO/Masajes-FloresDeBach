import React from "react";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="container about-page my-5">
      {/* HERO */}
      <section className="product-hero-box " aria-labelledby="nosTitle">
        <h1 id="nosTitle" className="hero-title">
          Quiénes somos
        </h1>
        <p className="hero-subtitle">
          Bienestar integral: masoterapia profesional y terapia floral de Bach
        </p>
        <a href="/contacto" className="btn-cta">
          Agenda una evaluación
        </a>
      </section>

      {/* SECCIÓN PRINCIPAL */}
      <div className="row g-4 align-items-center mt-5">
        <div className="col-md-6">
          <img
            src="/img/hero.png"
            alt="Nuestro espacio de atención"
            className="img-fluid rounded-4 shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <div className="about-box p-4 rounded-4 shadow-sm h-100">
            <h2>Nuestra misión</h2>
            <p>
              Acompañarte a recuperar tu equilibrio físico y emocional a través
              de masajes terapéuticos y la vibración sutil de las flores de Bach.
              Trabajamos con un enfoque humano y profesional, priorizando tu
              bienestar integral.
            </p>
            <h3 className="mt-4">Qué nos distingue</h3>
            <ul className="list-unstyled">
              <li>🌿 Atención personalizada según tus necesidades.</li>
              <li>💮 Formación certificada en masoterapia y terapia floral.</li>
              <li>☀️ Ambiente seguro, cálido y confidencial.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* PILARES */}
      <div className="row g-4 my-5">
        {[
          {
            title: "Profesionalismo",
            desc: "Protocolos claros, higiene y técnicas basadas en evidencia y buenas prácticas.",
          },
          {
            title: "Calidez",
            desc: "Un espacio amable donde puedas relajarte, confiar y ser escuchado/a.",
          },
          {
            title: "Enfoque integral",
            desc: "Cuerpo y emoción: combinamos masajes y flores de Bach para resultados sostenibles.",
          },
        ].map((pilar) => (
          <div className="col-md-4" key={pilar.title}>
            <div className="about-pill p-4 h-100 rounded-4 text-center shadow-sm">
              <h4>{pilar.title}</h4>
              <p>{pilar.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* BOTONES FINALES */}
      <div className="text-center my-5">
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <a href="/productos" className="btn-cta" role="button">
            Ver servicios
          </a>
          <a href="/contacto" className="btn-cta" role="button">
            Reservar hora
          </a>
        </div>
      </div>
    </div>
  );
}
