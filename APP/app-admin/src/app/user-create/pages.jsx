import React from "react";
import UserCreate from "@/components/functional/user/UserCreate";
import AdminLayout from "@/components/layout/adminlayout/AdminLayout";


export default function UserCreatePage() {
  return (
    <AdminLayout>
      <UserCreate />
    </AdminLayout>
  );
}
