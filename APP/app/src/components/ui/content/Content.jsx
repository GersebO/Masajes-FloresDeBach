import React from "react";
import "./Content.css";

export default function Content({ title, subtitle, children }) {
  return (
    <section className="content-container">
      {(title || subtitle) && (
        <header className="content-header text-center mb-4">
          {title && <h1 className="content-title">{title}</h1>}
          {subtitle && <p className="content-subtitle">{subtitle}</p>}
        </header>
      )}

      <div className="content-body">{children}</div>
    </section>
  );
}
