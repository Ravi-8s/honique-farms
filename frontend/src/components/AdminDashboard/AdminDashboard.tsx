import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin">

      <h1>Honique ERP</h1>

      <p className="subtitle">
        Business Management Dashboard
      </p>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h2>📦</h2>
          <h3>Products</h3>
          <p>2 Products</p>
        </div>

        <div className="dashboard-card">
          <h2>🛒</h2>
          <h3>Orders</h3>
          <p>0 Orders</p>
        </div>

        <div className="dashboard-card">
          <h2>👥</h2>
          <h3>Customers</h3>
          <p>0 Customers</p>
        </div>

        <div className="dashboard-card">
          <h2>📈</h2>
          <h3>Revenue</h3>
          <p>₹0</p>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
