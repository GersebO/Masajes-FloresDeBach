import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../../store/services/product.service";
import { getAllCategories } from "../../../store/services/category.service";
import "./ProductEdit.css";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id);

  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    category: { id: "", name: "" },
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // === LOAD PRODUCT AND CATEGORIES ===
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // --- Fetch Product usando servicio
        const data = await getProductById(productId);
        console.log("Loaded product:", data);

        setProduct({
          id: data.id,
          name: data.name || "",
          description: data.description || "",
          price: data.price || 0,
          stock: data.stock || 0,
          category: {
            id: data.categoryId || "",
            name: data.categoryName || "",
          },
        });

        // --- Fetch Categories usando servicio
        const categoryData = await getAllCategories();
        setCategories(categoryData);

        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) loadData();
  }, [productId]);

  // === HANDLE INPUT CHANGES ===
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "categoryId") {
      const selectedCategory = categories.find(
        (c) => c.id === parseInt(value)
      );
      setProduct((prev) => ({
        ...prev,
        category: selectedCategory || { id: value, name: "" },
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // === SUBMIT UPDATE ===
  const handleSubmit = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const updatedData = {
        sku: product.sku || "",
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        stock: product.stock,
        imageUrl: product.imageUrl,
        status: product.status || "AVAILABLE",
        categoryId: product.category?.id,
      };

      console.log("Sending data:", updatedData);

      // Usar servicio con autenticación
      const updatedProduct = await updateProduct(productId, updatedData);
      console.log("Product updated successfully:", updatedProduct);
      setSuccess(true);

      setTimeout(() => navigate("/product"), 1500);
    } catch (err) {
      console.error("Full error:", err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => navigate("/product");

  // === LOADING STATE ===
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading product...</p>
      </div>
    );
  }

  // === RENDER ===
  return (
    <div className="product-edit-container">
      <div className="product-edit-card">
        <div className="product-edit-header">
          <h6>Edit Product</h6>
          <button
            onClick={handleBack}
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>

        <div className="product-edit-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && (
            <div className="alert alert-success">
              Product updated successfully ✅
            </div>
          )}

          <div className="mb-3">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter product name"
            />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={4}
              className="form-control"
              placeholder="Product description"
              style={{
                width: "100%",
                minHeight: "100px",
                resize: "vertical",
              }}
            />
          </div>

          <div className="mb-3">
            <label>Price ($)</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                min="0"
                className="form-control"
                placeholder="0"
              />
            </div>
          </div>

          <div className="mb-3">
            <label>Category</label>
            <select
              name="categoryId"
              value={product.category?.id || ""}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="product-edit-actions">
            <button
              onClick={handleBack}
              type="button"
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              type="button"
              className="btn btn-primary flex-grow-1"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
