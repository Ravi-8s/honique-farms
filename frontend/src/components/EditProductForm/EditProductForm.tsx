import { useState } from "react";
import "./EditProductForm.css";
import { updateProduct } from "../../services/api";
import type { Product } from "../../types/Product";

type EditProductFormProps = {
  product: Product;
  onClose: () => void;
  onProductUpdated: () => void;
};

function EditProductForm({
  product,
  onClose,
  onProductUpdated,
}: EditProductFormProps) {

  const [formData, setFormData] = useState({
    name: product.name,
    category: product.category,
    weight: product.weight,
    price: product.price.toString(),
    stock: product.stock.toString(),
    description: product.description,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit() {
    try {

      await updateProduct(product.id, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });

      onProductUpdated();

      onClose();

    } catch (error: any) {

      console.error(error);

      alert(error.message);

    }
  }

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Edit Product</h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          name="weight"
          value={formData.weight}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <textarea
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <div className="button-group">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSubmit}
          >
            Update Product
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditProductForm;
