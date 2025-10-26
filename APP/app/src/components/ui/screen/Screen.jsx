import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./Screen.css";

export default function Screen({ children }) {
  return (
    <div className="screen-layout">
      <Navbar />
      <main className="screen-content">{children}</main>
      <Footer />
    </div>
  );
}
