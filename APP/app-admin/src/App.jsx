import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminHome from "./app/admin/pages.jsx";
import ProductPages from "./app/product/pages.jsx";
import UserPages from "./app/user/pages.jsx";
import ProductCreatePage from "./app/product-create/pages.jsx";
import CustomerPages from "./app/customer/pages.jsx";
import UserCreate from "./app/user-create/pages.jsx";
import CustomerCreate from "./app/customer-create/pages.jsx";
import HomePages from "./app/home/pages.jsx";
import CategoryPages from "./app/category/pages.jsx";
import CategoryCreatePages from "./app/category-create/pages.jsx";
import ProductEditPages from "./app/product-edit/pages.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/home" element={<HomePages />} />

        <Route path="/product" element={<ProductPages />} />
        <Route path="/product/create" element={<ProductCreatePage />} />

        <Route path="/user" element={<UserPages />} />
        <Route path="/user/create" element={<UserCreate />} />
        <Route path="/product/edit/:id" element={<ProductEditPages />} />

        <Route path="/categories" element={<CategoryPages />} />
        <Route path="/categories/create" element={<CategoryCreatePages />} />
        
        <Route path="/customer" element={<CustomerPages />} />
        <Route path="/customer/create" element={<CustomerCreate />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
