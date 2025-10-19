import "./Home.css";

export default function Home() {
  return (
    <div className="container my-5">
      {/* HERO */}
      <section className="product-hero-box">
        <div className="hero-text">
          <h1>🌸 Bienvenido a Maraflores de Bach 🌸</h1>
          <p>
            Armoniza cuerpo y mente con nuestras terapias naturales. Descubre la
            serenidad interior que mereces.
          </p>
          <a href="/product" className="btn-main">
            Ver Productos
          </a>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="services">
        <div className="services-header">
          <h2>🌿 Nuestros Servicios 🌿</h2>
          <div className="underline"></div>
        </div>

        <div className="service-cards">
          <div className="service-item">
            <h3>💆‍♀️ Masajes Terapéuticos</h3>
            <p>
              Relaja tu cuerpo y libera tensiones con nuestras terapias
              especializadas.
            </p>
          </div>

          <div className="service-item">
            <h3>🌸 Flores de Bach</h3>
            <p>
              Equilibra tus emociones con esencias naturales personalizadas para
              ti.
            </p>
          </div>

          <div className="service-item">
            <h3>✨ Atención Personalizada</h3>
            <p>
              Cada tratamiento se adapta a tus necesidades y bienestar general.
            </p>
          </div>
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section className="about">
        <div className="about-wrapper">
          <div className="about-text">
            <h2>✨ Sobre Nosotros ✨</h2>
            <p>
              En <strong>Maraflores de Bach</strong> creemos en una salud
              integral: cuerpo, mente y espíritu. Nuestras terapias combinan
              técnicas ancestrales con un enfoque moderno para ofrecerte
              armonía, relajación y energía positiva.
            </p>
            <a href="/aboutUs" className="btn-secondary">
              Conócenos más
            </a>
          </div>

          <img
            src="/img/about-us.png"
            alt="Flores de Bach"
            className="about-img"
          />
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="testimonials">
        <h2>💖 Lo que dicen nuestros clientes 💖</h2>
        <div className="testimonial-list">
          <div className="testimonial">
            <p>
              “Los masajes me cambiaron la semana. ¡Excelente atención y
              energía!”
            </p>
            <span>- Constanza R.</span>
          </div>
          <div className="testimonial">
            <p>
              “Las Flores de Bach me ayudaron a manejar mi ansiedad. ¡Recomendado
              100%!”
            </p>
            <span>- Ignacio F.</span>
          </div>
          <div className="testimonial">
            <p>
              “Se nota el profesionalismo y la dedicación. Es un espacio de paz
              total.”
            </p>
            <span>- Fernanda G.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
