import { NavLink } from "react-router-dom";

function Sidebar() {

  return (

    <aside className="sidebar">

      <h2 className="logo">
        🐝 Honique ERP
      </h2>

      <nav>

        <NavLink
          to="/admin"
          end
        >
          🏠 Dashboard
        </NavLink>

        <NavLink to="/admin/products">
          📦 Products
        </NavLink>

        <NavLink to="/admin/categories">
          📂 Categories
        </NavLink>

        <NavLink to="/admin/inventory">
          📋 Inventory
        </NavLink>

        <NavLink to="/admin/customers">
          👥 Customers
        </NavLink>

        <NavLink to="/admin/orders">
          🛒 Orders
        </NavLink>

        <NavLink to="/admin/invoices">
          🧾 Invoices
        </NavLink>

        <NavLink to="/admin/expenses">
          💸 Expenses
        </NavLink>

        <NavLink to="/admin/reports">
          📊 Reports
        </NavLink>

        <NavLink to="/admin/company">
          🏢 Company
        </NavLink>

      </nav>

    </aside>

  );

}

export default Sidebar;
