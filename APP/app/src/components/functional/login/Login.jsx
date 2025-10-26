import React from "react";
import Content from '../../ui/content/Content';
import Hero from '../../ui/hero/Hero';
import LoginForm from './LoginForm';
import "./Login.css";

export default function Login() {
  return (
    <div className="login-container">

      <Content>
              {/* HERO */}
      <div className="login-hero-section">
        <Hero
          title="🌿 De vuelta a casa. Tus terapias y bienestar te esperan. 🏠"
          subtitle=""
        />
      </div>

        <div className="login-content-wrapper">
          <LoginForm />
          
          <div className="login-features">
            <div className="login-feature-item">
              <i className="bi bi-calendar-check"></i>
              <span>Reserva tus citas</span>
            </div>
            <div className="login-feature-item">
              <i className="bi bi-heart"></i>
              <span>Guarda tus favoritos</span>
            </div>
            <div className="login-feature-item">
              <i className="bi bi-gift"></i>
              <span>Ofertas exclusivas</span>
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
}