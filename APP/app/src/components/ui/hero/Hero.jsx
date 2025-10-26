import React from "react";
import "./Hero.css";

export default function Hero({ title, subtitle, buttonText, buttonLink }) {
  return (
    <section className="hero-box text-center">
      <h1 className="hero-title">{title}</h1>
      {subtitle && <p className="hero-subtitle">{subtitle}</p>}
      {buttonText && (
        <a href={buttonLink} className="btn-main">
          {buttonText}
        </a>
      )}
    </section>
  );
}
