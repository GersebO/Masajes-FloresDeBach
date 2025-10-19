import React from "react";
import AdminLayout from "../../components/layout/adminlayout/AdminLayout";
import CustomerCreate from "../../components/functional/customer/CustomerCreate";

export default function CustomerCreatePage() {
  return (
    <AdminLayout>
      <CustomerCreate />
    </AdminLayout>
  );
}
