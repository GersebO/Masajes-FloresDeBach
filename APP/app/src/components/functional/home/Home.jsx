import React from "react";
import Content from "../../ui/content/Content";
import "./Home.css";
import Hero from "../../ui/hero/Hero";
import Button from "../../ui/button/Button";

export default function Home() {
  return (

      <div>
        {/* SERVICIOS */}
                {/* HERO */}
        <Content>
          <Hero
            title="🌸Bienvenido a Maraflores de Bach🌸"
            subtitle="Armoniza cuerpo y mente con nuestras terapias naturales.Descubre la serenidad interior que mereces."
          />
        </Content>
        
        <Content title="🌿 Nuestros Servicios 🌿">
          <div className="service-cards">
            <div className="service-item">
              <h3>💆‍♀️ Masajes Terapéuticos</h3>
              <p>Relaja tu cuerpo y libera tensiones con nuestras terapias especializadas.</p>
            </div>
            <div className="service-item">
              <h3>🌸 Flores de Bach</h3>
              <p>Equilibra tus emociones con esencias naturales personalizadas para ti.</p>
            </div>
            <div className="service-item">
              <h3>✨ Atención Personalizada</h3>
              <p>Cada tratamiento se adapta a tus necesidades y bienestar general.</p>
            </div>
          </div>
        </Content>

        {/* SOBRE NOSOTROS */}
        <Content title="✨ Sobre Nosotros ✨">
          <div className="about-wrapper">
            <div className="about-text">
              <p>
                En <strong>Maraflores de Bach</strong> creemos en una salud integral: cuerpo, mente y espíritu.
                Nuestras terapias combinan técnicas ancestrales con un enfoque moderno para ofrecerte armonía y energía positiva.
              </p>
              <div className="home-button-center">
                <Button as="a" href="/aboutUs" className="btn-secondary">
                  Conócenos más
                </Button>
              </div>

            </div>
            <img src="/img/about-us.png" alt="Flores de Bach" className="about-img" />
          </div>
        </Content>

        {/* TESTIMONIOS */}
        <Content title="💖 Lo que dicen nuestros clientes 💖">
          <div className="testimonial-list">
            <div className="testimonial">
              <p>“Los masajes me cambiaron la semana. ¡Excelente atención y energía!”</p>
              <span>- Constanza R.</span>
            </div>
            <div className="testimonial">
              <p>“Las Flores de Bach me ayudaron a manejar mi ansiedad. ¡Recomendado 100%!”</p>
              <span>- Ignacio F.</span>
            </div>
            <div className="testimonial">
              <p>“Se nota el profesionalismo y la dedicación. Es un espacio de paz total.”</p>
              <span>- Fernanda G.</span>
            </div>
          </div>
        </Content>
      </div>

  );
}
