import type { Product } from "../../types/Product";
import "./ProductTable.css";

type ProductTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
};

function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  return (
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

            <td>
              {product.isActive ? "Active" : "Inactive"}
            </td>

            <td>

              <button
                className="edit-btn"
                onClick={() => onEdit(product)}
              >
                ✏️ Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => onDelete(product.id)}
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

export default ProductTable;
