import { useNavigate } from "react-router-dom";

function Topbar() {

  const navigate = useNavigate();

  const admin =
    JSON.parse(localStorage.getItem("admin") || "{}");

  function handleLogout() {

    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate("/login");

  }

  return (

    <header className="topbar">

      <div>

        <h2>Honique ERP</h2>

        <p>Business Management System</p>

      </div>

      <div className="topbar-right">

        <span className="admin-name">
          👤 {admin.username || "Admin"}
        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </header>

  );

}

export default Topbar;
