import { useEffect, useState } from "react";

import CategoryForm from "../../../components/CategoryForm/CategoryForm";
import CategoryTable from "../../../components/CategoryTable/CategoryTable";

import "./CategoriesPage.css";

import {
  getCategories,
  deleteCategory,
} from "../../../services/api";

function CategoriesPage() {

  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: number) {

    const confirmed = window.confirm(
      "Delete this category?"
    );

    if (!confirmed) return;

    await deleteCategory(id);

    loadCategories();
  }

  function handleEdit(category: any) {

    setSelectedCategory(category);

    setShowForm(true);

  }

  return (
    <div className="categories-page">

      <h1>Category Management</h1>

      <p>
        Manage all product categories available in Honique ERP.
      </p>

      <button
        onClick={() => {
          setSelectedCategory(null);
          setShowForm(true);
        }}
      >
        Add New Category
      </button>

      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <CategoryForm
          category={selectedCategory}
          onClose={() => {
            setShowForm(false);
            setSelectedCategory(null);
          }}
          onCategoryAdded={loadCategories}
        />
      )}

    </div>
  );
}

export default CategoriesPage;
