// src/app/product-create/pages.jsx
import React from "react";
import AdminLayout from "../../components/layout/adminlayout/AdminLayout";
import ProductEdit from "../../components/functional/product/ProductEdit";

export default function ProductEditPage() {
  return (
    <AdminLayout>
      <ProductEdit />
    </AdminLayout>
  );
}
