import type { Product } from "../../types/Product";
import "./ProductTable.css";

type ProductTableProps = {
  products: Product[];
};

function ProductTable({ products }: ProductTableProps) {
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
            <td>{product.isActive ? "Active" : "Inactive"}</td>

            <td>

              <button className="edit-btn">
                ✏️ Edit
              </button>

              <button className="delete-btn">
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
