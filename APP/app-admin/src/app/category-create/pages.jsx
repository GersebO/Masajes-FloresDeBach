import React from "react";
import CategoryCreate from "@/components/functional/category/CategoryCreate";
import AdminLayout from "../../components/layout/adminlayout/AdminLayout";

export default function CategoryCreatePages() {
  return (
    <AdminLayout>
      <CategoryCreate />
    </AdminLayout>
  );
}
