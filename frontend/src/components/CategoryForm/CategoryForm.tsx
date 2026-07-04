import { useEffect, useState } from "react";
import "./CategoryForm.css";

import {
  addCategory,
  updateCategory,
} from "../../services/api";

type Category = {
  id: number;
  name: string;
  description: string;
};

type CategoryFormProps = {
  onClose: () => void;
  onCategoryAdded: () => void;
  category?: Category | null;
};

function CategoryForm({
  onClose,
  onCategoryAdded,
  category,
}: CategoryFormProps) {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {

    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
      });
    }

  }, [category]);

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

      if (category) {

        await updateCategory(category.id, formData);

      } else {

        await addCategory(formData);

      }

      onCategoryAdded();
      onClose();

    } catch (error: any) {

      alert(error.message);

    }

  }

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>
          {category ? "Edit Category" : "Add Category"}
        </h2>

        <input
          name="name"
          placeholder="Category Name"
          value={formData.name}
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
            {category ? "Update Category" : "Save Category"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default CategoryForm;
