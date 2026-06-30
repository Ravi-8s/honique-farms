import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";
import ProductsPage from "../pages/Admin/Products/ProductsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
