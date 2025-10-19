// src/app/product/pages.jsx
import React from "react";
import Product from "../../components/functional/product/Product";
import AdminLayout from "../../components/layout/adminlayout/AdminLayout";

export default function ProductPages() {
  return (
    <AdminLayout>
      <Product />
    </AdminLayout>
  );
}
