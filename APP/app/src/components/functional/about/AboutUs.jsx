import React from "react";
import "./AboutUs.css";
import Hero from "../../ui/hero/Hero";
import Button from "../../ui/button/Button";
import Content from "../../ui/content/Content";

export default function AboutUs() {
  const pilares = [
    {
      icon: "💼",
      title: "Profesionalismo",
      desc: "Protocolos claros, higiene y técnicas basadas en evidencia y buenas prácticas.",
    },
    {
      icon: "💖",
      title: "Calidez",
      desc: "Un espacio amable donde puedas relajarte, confiar y ser escuchado/a.",
    },
    {
      icon: "🌿",
      title: "Enfoque integral",
      desc: "Cuerpo y emoción: combinamos masajes y flores de Bach para resultados sostenibles.",
    },
  ];

  const valores = [
    {
      emoji: "🌿",
      text: "Atención personalizada según tus necesidades.",
    },
    {
      emoji: "💮",
      text: "Formación certificada en masoterapia y terapia floral.",
    },
    {
      emoji: "☀️",
      text: "Ambiente seguro, cálido y confidencial.",
    },
  ];

  return (
    <div className="about-container">
      {/* HERO */}
      <div className="about-hero-section">
        <Hero title="✨ Quiénes Somos ✨" />
        
        <div className="about-cta-top">
          <Button as="a" href="/contact" variant="primary" size="lg">
            Agenda una evaluación
          </Button>
        </div>
      </div>

      {/* MISIÓN Y VALORES */}
      <Content>
        <div className="about-mission-section">
          <div className="about-mission-content">
            <div className="about-mission-text">
              <h2 className="about-section-title">Nuestra misión</h2>
              <p className="about-mission-description">
                Acompañarte a recuperar tu equilibrio físico y emocional a través
                de masajes terapéuticos y la vibración sutil de las flores de Bach.
                Trabajamos con un enfoque humano y profesional, priorizando tu
                bienestar integral.
              </p>

              <h3 className="about-subsection-title">Qué nos distingue</h3>
              <div className="about-values-grid">
                {valores.map((valor, index) => (
                  <div key={index} className="about-value-item">
                    <span className="about-value-emoji">{valor.emoji}</span>
                    <p className="about-value-text">{valor.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-mission-image">
              <img
                src="/img/hero.png"
                alt="Nuestro espacio de atención"
                className="about-img"
              />
              <div className="about-img-decoration"></div>
            </div>
          </div>
        </div>
      </Content>

      {/* PILARES */}
      <Content>
        <div className="about-pillars-section">
          <h2 className="about-section-title centered">🌸 Nuestros Pilares 🌸</h2>
          <p className="about-section-subtitle">
            Los valores que guían cada una de nuestras terapias
          </p>
          
          <div className="about-pillars-grid">
            {pilares.map((pilar, index) => (
              <div key={pilar.title} className="about-pillar-card">
                <div className="about-pillar-icon-wrapper">
                  <span className="about-pillar-icon">{pilar.icon}</span>
                </div>
                <h4 className="about-pillar-title">{pilar.title}</h4>
                <p className="about-pillar-desc">{pilar.desc}</p>
                <div className="about-pillar-number">0{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </Content>

      {/* ESTADÍSTICAS (OPCIONAL - añade impacto visual) */}
      <Content>
        <div className="about-stats">
          <div className="about-stat-item">
            <span className="about-stat-number">500+</span>
            <span className="about-stat-label">Clientes Satisfechos</span>
          </div>
          <div className="about-stat-item">
            <span className="about-stat-number">5+</span>
            <span className="about-stat-label">Años de Experiencia</span>
          </div>
          <div className="about-stat-item">
            <span className="about-stat-number">100%</span>
            <span className="about-stat-label">Productos Naturales</span>
          </div>
        </div>
      </Content>

      {/* LLAMADO A LA ACCIÓN */}
      <Content>
        <div className="about-final-cta">
          <h2 className="about-cta-title">¿Lista/o para comenzar tu transformación?</h2>
          <p className="about-cta-text">
            Agenda tu primera sesión y descubre el equilibrio que tu cuerpo y mente necesitan
          </p>
          <div className="about-cta-buttons">
            <Button as="a" href="/product" variant="secondary" size="lg">
              Ver servicios
            </Button>
            <Button as="a" href="/contact" variant="primary" size="lg">
              Reservar hora
            </Button>
          </div>
        </div>
      </Content>
    </div>
  );
}