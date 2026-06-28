import "./Navbar.css";
import logo from "../../assets/images/logo.png";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">

        <img src={logo} alt="Honique Farms Logo" />

        <span>Honique Farms</span>

      </div>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

    </nav>
  );
}

export default Navbar;
