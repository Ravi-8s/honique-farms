import "./InventoryTable.css";
import type { Inventory } from "../../types/Inventory";

type InventoryTableProps = {
  inventory: Inventory[];
  onEdit: (inventory: Inventory) => void;
  onDelete: (id: number) => void;
};

function InventoryTable({
  inventory,
  onEdit,
  onDelete,
}: InventoryTableProps) {
  return (
    <table>

      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Minimum Stock</th>
          <th>Location</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {inventory.map((item) => (

          <tr key={item.id}>

            <td>{item.productName}</td>

            <td>{item.quantity}</td>

            <td>{item.minimumStock}</td>

            <td>{item.location}</td>

            <td>
              {item.quantity <= item.minimumStock
                ? "🔴 Low Stock"
                : "🟢 In Stock"}
            </td>

            <td>

              <button
                className="edit-btn"
                onClick={() => onEdit(item)}
              >
                ✏️ Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => onDelete(item.id)}
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

export default InventoryTable;
