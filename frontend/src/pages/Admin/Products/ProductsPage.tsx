import { useEffect, useState } from "react";

import ProductForm from "../../../components/ProductForm/ProductForm";
import ProductTable from "../../../components/ProductTable/ProductTable";

import "./ProductsPage.css";

import {
  getProducts,
  deleteProduct,
} from "../../../services/api";

import type { Product } from "../../../types/Product";

function ProductsPage() {

  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

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

  async function handleDelete(id: number) {

    const confirmed = window.confirm(
      "Delete this product?"
    );

    if (!confirmed) return;

    await deleteProduct(id);

    loadProducts();

  }

  function handleEdit(product: Product) {

    setSelectedProduct(product);

    setShowForm(true);

  }

  return (

    <div className="products-page">

      <h1>Product Management</h1>

      <p>
        Manage all products available in Honique ERP.
      </p>

      <button
        onClick={() => {
          setSelectedProduct(null);
          setShowForm(true);
        }}
      >
        Add New Product
      </button>

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (

        <ProductForm
          product={selectedProduct}
          onClose={() => {
            setShowForm(false);
            setSelectedProduct(null);
          }}
          onProductAdded={loadProducts}
        />

      )}

    </div>

  );

}

export default ProductsPage;
