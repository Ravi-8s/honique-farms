import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  function handleLogout() {

    localStorage.removeItem("token");

    localStorage.removeItem("admin");

    navigate("/login");

  }

  return (

    <div className="admin">

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >

        <div>

          <h1>Honique ERP</h1>

          <p className="subtitle">
            Business Management Dashboard
          </p>

        </div>

        <button
          onClick={handleLogout}
          style={{
            background: "#d32f2f",
            color: "#ffffff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>

      </div>

      <div className="dashboard-grid">

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/products")}
        >
          <h2>📦</h2>
          <h3>Products</h3>
          <p>Manage Products</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/categories")}
        >
          <h2>📂</h2>
          <h3>Categories</h3>
          <p>Manage Categories</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/inventory")}
        >
          <h2>📋</h2>
          <h3>Inventory</h3>
          <p>Manage Stock</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/customers")}
        >
          <h2>👥</h2>
          <h3>Customers</h3>
          <p>Manage Customers</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/orders")}
        >
          <h2>🛒</h2>
          <h3>Orders</h3>
          <p>Manage Orders</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/invoices")}
        >
          <h2>🧾</h2>
          <h3>Invoices</h3>
          <p>Manage Invoices</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/expenses")}
        >
          <h2>💸</h2>
          <h3>Expenses</h3>
          <p>Manage Expenses</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/reports")}
        >
          <h2>📊</h2>
          <h3>Reports</h3>
          <p>Business Reports</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/company")}
        >
          <h2>🏢</h2>
          <h3>Company</h3>
          <p>Company Settings</p>
        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;
