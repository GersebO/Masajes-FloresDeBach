import React from 'react';
import './Blog.css';
import Hero from '../../ui/hero/Hero.jsx';
import Content from '../../ui/content/Content';
import Button from '../../ui/button/Button';

export default function Blogs() {
  const blogPosts = [
    {
      id: 1,
      image: "/img/blog1.png",
      category: "Masoterapia",
      title: "Beneficios de los masajes relajantes",
      date: "05 Septiembre 2025",
      excerpt: "Descubre cómo un masaje relajante puede ayudarte a reducir el estrés, mejorar tu sueño y equilibrar tu energía después de una semana intensa.",
      readTime: "5 min",
      author: "Maraflores Team"
    },
    {
      id: 2,
      image: "/img/blog2.png",
      category: "Flores de Bach",
      title: "Flores de Bach para la ansiedad",
      date: "28 Agosto 2025",
      excerpt: "Aprende cómo las esencias florales pueden ser un complemento natural en el manejo de la ansiedad y las emociones intensas.",
      readTime: "4 min",
      author: "Maraflores Team"
    },
    {
      id: 3,
      image: "/img/blog3.png",
      category: "Deportivo",
      title: "Masaje deportivo: prevención y recuperación",
      date: "15 Agosto 2025",
      excerpt: "El masaje deportivo no solo alivia dolores, también previene lesiones y mejora tu rendimiento físico.",
      readTime: "6 min",
      author: "Maraflores Team"
    }
  ];

  return (
    <div className="blog-container">
      {/* HERO */}
      <div className="blog-hero-section">
        <Hero
          title="📚 Nuestro Blog 📚"
          subtitle="Artículos y consejos sobre bienestar, masoterapia y flores de Bach"
        />
      </div>

      {/* DESTACADO */}
      <Content>
        <div className="blog-featured">
          <div className="blog-featured-content">
            <span className="blog-featured-badge">✨ Artículo Destacado</span>
            <h2 className="blog-featured-title">
              Guía completa: Cómo elegir la terapia ideal para ti
            </h2>
            <p className="blog-featured-excerpt">
              Descubre qué terapia se adapta mejor a tus necesidades específicas y 
              aprende a identificar las señales que tu cuerpo te envía.
            </p>
            <div className="blog-featured-meta">
              <span className="blog-meta-item">
                <i className="bi bi-calendar3"></i> 15 Octubre 2025
              </span>
              <span className="blog-meta-item">
                <i className="bi bi-clock"></i> 8 min lectura
              </span>
            </div>
            <Button variant="primary" size="md">
              Leer artículo completo
            </Button>
          </div>
          <div className="blog-featured-image">
            <img src="/img/hero.png" alt="Artículo destacado" />
          </div>
        </div>
      </Content>

      {/* ARTÍCULOS */}
      <Content>
        <div className="blog-articles-section">
          <h2 className="blog-section-title">🌿 Últimos Artículos</h2>
          
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-card-image">
                  <img src={post.image} alt={post.title} />
                  <span className="blog-card-category">{post.category}</span>
                </div>
                
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-meta-date">
                      <i className="bi bi-calendar3"></i> {post.date}
                    </span>
                    <span className="blog-meta-time">
                      <i className="bi bi-clock"></i> {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  
                  <div className="blog-card-footer">
                    <div className="blog-card-author">
                      <div className="blog-author-avatar">
                        <i className="bi bi-person-circle"></i>
                      </div>
                      <span className="blog-author-name">{post.author}</span>
                    </div>
                    <Button variant="secondary" size="sm">
                      Leer más
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Content>

      {/* NEWSLETTER */}
      <Content>
        <div className="blog-newsletter">
          <div className="blog-newsletter-icon">📧</div>
          <h2 className="blog-newsletter-title">
            Suscríbete a nuestro newsletter
          </h2>
          <p className="blog-newsletter-text">
            Recibe consejos exclusivos, novedades y promociones especiales directamente en tu correo
          </p>
          <form className="blog-newsletter-form">
            <input
              type="email"
              placeholder="tu@email.com"
              className="blog-newsletter-input"
            />
            <Button variant="primary" size="md">
              Suscribirme
            </Button>
          </form>
        </div>
      </Content>

      {/* CATEGORÍAS */}
      <Content>
        <div className="blog-categories-section">
          <h2 className="blog-section-title">Explora por categoría</h2>
          <div className="blog-categories-grid">
            <div className="blog-category-card">
              <div className="blog-category-icon">💆‍♀️</div>
              <h4>Masoterapia</h4>
              <p>Técnicas y beneficios</p>
            </div>
            <div className="blog-category-card">
              <div className="blog-category-icon">🌸</div>
              <h4>Flores de Bach</h4>
              <p>Equilibrio emocional</p>
            </div>
            <div className="blog-category-card">
              <div className="blog-category-icon">🏃‍♂️</div>
              <h4>Deportivo</h4>
              <p>Rendimiento físico</p>
            </div>
            <div className="blog-category-card">
              <div className="blog-category-icon">🧘‍♀️</div>
              <h4>Bienestar</h4>
              <p>Vida saludable</p>
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
}