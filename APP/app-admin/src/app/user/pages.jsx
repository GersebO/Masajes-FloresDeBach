// src/app/user/pages.jsx
import React from "react";
import AdminLayout from "../../components/layout/adminlayout/AdminLayout";
import User from "../../components/functional/user/User";

export default function UserPages() {
  return (
    <AdminLayout>
      <User />
    </AdminLayout>
  );
}
