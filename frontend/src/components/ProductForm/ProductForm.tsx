import { useState } from "react";
import "./ProductForm.css";
import { addProduct } from "../../services/api";

type ProductFormProps = {
  onClose: () => void;
  onProductAdded: () => void;
};

function ProductForm({
  onClose,
  onProductAdded,
}: ProductFormProps) {

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    weight: "",
    price: "",
    stock: "",
    description: "",
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
      await addProduct({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });

      onProductAdded();
      onClose();

    } catch (error) {
      console.error(error);
      alert("Failed to save product");
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Add Product</h2>

        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          name="weight"
          placeholder="Weight"
          value={formData.weight}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          rows={4}
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
            Save Product
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductForm;
