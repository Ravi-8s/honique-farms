import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  return (

    <div className="admin">

      <h1>Honique ERP</h1>

      <p className="subtitle">
        Business Management Dashboard
      </p>

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

        <div className="dashboard-card">
          <h2>🛒</h2>
          <h3>Orders</h3>
          <p>Coming Soon</p>
        </div>

        <div className="dashboard-card">
          <h2>📈</h2>
          <h3>Revenue</h3>
          <p>Coming Soon</p>
        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;
