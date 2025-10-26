import React from "react";
import Content from '../../ui/content/Content';
import Hero from '../../ui/hero/Hero';
import RegisterForm from './RegisterForm';
import "./Register.css";

export default function Register() {
  return (
    <div className="register-container">
      {/* HERO */}
      <div className="register-hero-section">
        <Hero
          title="✨ Crea tu Cuenta ✨"
          subtitle="Únete a nuestra comunidad y accede a terapias personalizadas para tu bienestar"
        />
      </div>

      {/* FORMULARIO */}



        <RegisterForm />

        <div className="register-login-link">
          <p>¿Ya tienes una cuenta?</p>
          <a href="/login">Inicia sesión aquí</a>
        </div>

    </div>
  );
}