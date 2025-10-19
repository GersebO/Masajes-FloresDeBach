// src/app/product-create/pages.jsx
import React from "react";
import AdminLayout from "../../components/layout/adminlayout/AdminLayout";
import ProductCreate from "../../components/functional/product/ProductCreate";

export default function ProductCreatePage() {
  return (
    <AdminLayout>
      <ProductCreate />
    </AdminLayout>
  );
}
