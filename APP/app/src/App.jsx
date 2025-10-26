import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Screen from "@/components/ui/screen/Screen.jsx";

// 🔹 Páginas principales
import HomePages from "./app/home/pages.jsx";
import ProductPage from "@app/product/pages.jsx";
import BlogPage from "./app/blog/pages.jsx";
import AboutPage from "./app/about/pages.jsx";
import ContactPage from "./app/contact/pages.jsx";
import CartPage from "./app/cart/pages.jsx";
import RegisterPage from "./app/register/pages.jsx";
import LoginPage from "./app/login/pages.jsx";


function App() {
  return (
    <BrowserRouter>
      <Screen>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/aboutUs" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

        </Routes>
      </Screen>
    </BrowserRouter>
  );
}

export default App;
