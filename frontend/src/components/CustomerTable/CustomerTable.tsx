import "./CustomerTable.css";
import type { Customer } from "../../types/Customer";

type CustomerTableProps = {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: number) => void;
};

function CustomerTable({
  customers,
  onEdit,
  onDelete,
}: CustomerTableProps) {
  return (
    <table>

      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>City</th>
          <th>State</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {customers.map((customer) => (

          <tr key={customer.id}>

            <td>{customer.name}</td>

            <td>{customer.phone}</td>

            <td>{customer.email}</td>

            <td>{customer.city}</td>

            <td>{customer.state}</td>

            <td>
              {customer.isActive ? "Active" : "Inactive"}
            </td>

            <td>

              <button
                className="edit-btn"
                onClick={() => onEdit(customer)}
              >
                ✏️ Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => onDelete(customer.id)}
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

export default CustomerTable;
