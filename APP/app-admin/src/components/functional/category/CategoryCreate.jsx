import React from "react";
import CategoryForm from "./CategoryForm";
import { useCategoryCreate } from "../../../store/hooks/useCategoryCreate";

const CategoryCreate = () => {
  const { createCategory, loading } = useCategoryCreate();

  const handleCreate = async (categoryData) => {
    await createCategory(categoryData);
  };

  return (
    <CategoryForm onSubmit={handleCreate} mode="create" disabled={loading} />
  );
};

export default CategoryCreate;
