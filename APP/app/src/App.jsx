import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarPages from "./app/navbar/pages.jsx";
import FooterPages from "./app/footer/pages.jsx";
import AboutPage from "./app/about/pages.jsx";
import ContactPage from "./app/contact/pages.jsx";
import LoginPages from "./app/login/pages.jsx";
import RegisterPages from "./app/register/pages.jsx";
import BlogPages from "./app/blog/pages.jsx";

function App() {
  return (
    <BrowserRouter>
      <NavbarPages />

      <div style={{ marginTop: "100px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <main className="container text-center mt-5">
                <h1>🌸 Maraflores de Bach 🌸</h1>
                <p>Bienvenido a nuestra tienda de flores de Bach.</p>
              </main>
            }
          />
          <Route path="/AboutUs" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPages />} />
          <Route path="/register" element={<RegisterPages />} />
          <Route path="/blogs" element={<BlogPages />} />
        </Routes>

        <FooterPages />
      </div>
    </BrowserRouter>
  );
}

export default App;
