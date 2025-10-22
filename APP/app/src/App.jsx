import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarPages from "./app/navbar/pages.jsx";
import FooterPages from "./app/footer/pages.jsx";
import AboutPage from "./app/about/pages.jsx";
import ContactPage from "./app/contact/pages.jsx";
import LoginPages from "./app/login/pages.jsx";
import RegisterPages from "./app/register/pages.jsx";
import BlogPages from "./app/blog/pages.jsx";
import ProductPage from "./app/product/pages.jsx";
import HomePages from "./app/home/pages.jsx";
import CartPage from "./app/cart/page.jsx";

function App() {
  return (
    <BrowserRouter>
      <NavbarPages />

      <div style={{ marginTop: "100px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePages />
            }
          />
          <Route path="/AboutUs" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPages />} />
          <Route path="/register" element={<RegisterPages />} />
          <Route path="/blogs" element={<BlogPages />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>

        <FooterPages />
      </div>
    </BrowserRouter>
  );
}

export default App;
