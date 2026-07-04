import "./CategoryTable.css";

type Category = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
};

type CategoryTableProps = {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
};

function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  return (
    <table>

      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {categories.map((category) => (

          <tr key={category.id}>

            <td>{category.name}</td>

            <td>{category.description}</td>

            <td>
              {category.isActive ? "Active" : "Inactive"}
            </td>

            <td>

              <button
                className="edit-btn"
                onClick={() => onEdit(category)}
              >
                ✏️ Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => onDelete(category.id)}
              >
                🗑 Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default CategoryTable;
