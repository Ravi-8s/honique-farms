import { useEffect, useState } from "react";
import ProductForm from "../../../components/ProductForm/ProductForm";
import ProductTable from "../../../components/ProductTable/ProductTable";
import "./ProductsPage.css";
import { getProducts } from "../../../services/api";
import type { Product } from "../../../types/Product";

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  }

  return (
    <div className="products-page">

      <h1>Product Management</h1>

      <p>Manage all products available in Honique ERP.</p>

      <button onClick={() => setShowForm(true)}>
        Add New Product
      </button>

      <ProductTable products={products} />

      {showForm && (
        <ProductForm
          onClose={() => setShowForm(false)}
        />
      )}

    </div>
  );
}

export default ProductsPage;
