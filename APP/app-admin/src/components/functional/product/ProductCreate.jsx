import ProductForm from "./ProductForm";
import { useProductCreate } from "../../../store/hooks/useProductCreate";

const ProductCreate = () => {
  const { createProduct, loading } = useProductCreate();

  const handleCreate = async (productData) => {
    await createProduct(productData);
  };

  return (
    <ProductForm
      onSubmit={handleCreate}
      mode="create"
      disabled={loading}
    />
  );
};

export default ProductCreate;
