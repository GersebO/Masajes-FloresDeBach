// src/app/user/pages.jsx
import React from "react";
import AdminLayout from "../../components/layout/adminlayout/AdminLayout";
import Home from "../../components/functional/home/Home";

export default function HomePages() {
  return (
    <AdminLayout>
      <Home />
    </AdminLayout>
  );
}
