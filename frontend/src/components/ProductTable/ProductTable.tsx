import { useState } from "react";
import type { Product } from "../../types/Product";
import EditProductForm from "../EditProductForm/EditProductForm";
import { deleteProduct } from "../../services/api";
import "./ProductTable.css";

type ProductTableProps = {
  products: Product[];
  onProductUpdated: () => void;
};

function ProductTable({
  products,
  onProductUpdated,
}: ProductTableProps) {
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(id);

      onProductUpdated();

      alert("Product deleted successfully.");

    } catch (error: any) {
      console.error(error);

      alert(error.message);
    }
  }

  return (
    <>
      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {products.map((product) => (
            <tr key={product.id}>

              <td>{product.name}</td>
              <td>{product.weight}</td>
              <td>₹{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.isActive ? "Active" : "Inactive"}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() => setSelectedProduct(product)}
                >
                  ✏️ Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product.id)}
                >
                  🗑 Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

      {selectedProduct && (
        <EditProductForm
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onProductUpdated={onProductUpdated}
        />
      )}
    </>
  );
}

export default ProductTable;
