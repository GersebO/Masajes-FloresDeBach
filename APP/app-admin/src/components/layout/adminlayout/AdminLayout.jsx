import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../../ui/footer/Footer";
import "./AdminLayout.css";

export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />

      <div className="admin-main">
        <main className="admin-content">{children}</main>
      </div>

      <Footer />
    </>
  );
}
