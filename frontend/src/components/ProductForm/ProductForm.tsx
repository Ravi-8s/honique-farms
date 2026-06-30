import "./ProductForm.css";

type ProductFormProps = {
  onClose: () => void;
};

function ProductForm({ onClose }: ProductFormProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Add Product</h2>

        <input type="text" placeholder="Product Name" />
        <input type="text" placeholder="Category" />
        <input type="text" placeholder="Weight" />
        <input type="number" placeholder="Price" />
        <input type="number" placeholder="Stock" />

        <textarea
          placeholder="Description"
          rows={4}
        ></textarea>

        <div className="button-group">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="save-btn">
            Save Product
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductForm;
