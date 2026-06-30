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
          </tr>
        ))}

      </tbody>

    </table>
  );
}

export default ProductTable;
