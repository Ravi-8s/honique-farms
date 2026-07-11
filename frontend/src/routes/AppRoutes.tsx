import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";

import ProductsPage from "../pages/Admin/Products/ProductsPage";
import CategoriesPage from "../pages/Admin/Categories/CategoriesPage";
import InventoryPage from "../pages/Admin/Inventory/InventoryPage";
import CustomersPage from "../pages/Admin/Customers/CustomersPage";
import OrdersPage from "../pages/Admin/Orders/OrdersPage";
import OrderDetailsPage from "../pages/Admin/Orders/OrderDetailsPage";
import ExpensesPage from "../pages/Admin/Expenses/ExpensesPage";
import ReportsPage from "../pages/Admin/Reports/ReportsPage";
import CompanyPage from "../pages/Admin/Company/CompanyPage";

import InvoicesPage from "../pages/Admin/Invoices/InvoicesPage";
import InvoiceDetailsPage from "../pages/Admin/Invoices/InvoiceDetailsPage";

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<App />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/products"
          element={<ProductsPage />}
        />

        <Route
          path="/admin/categories"
          element={<CategoriesPage />}
        />

        <Route
          path="/admin/inventory"
          element={<InventoryPage />}
        />

        <Route
          path="/admin/customers"
          element={<CustomersPage />}
        />

        <Route
          path="/admin/orders"
          element={<OrdersPage />}
        />

        <Route
          path="/admin/orders/:id"
          element={<OrderDetailsPage />}
        />

        <Route
          path="/admin/invoices"
          element={<InvoicesPage />}
        />

        <Route
          path="/admin/invoices/:id"
          element={<InvoiceDetailsPage />}
        />

        <Route
          path="/admin/expenses"
          element={<ExpensesPage />}
        />

        <Route
          path="/admin/reports"
          element={<ReportsPage />}
        />

        <Route
          path="/admin/company"
          element={<CompanyPage />}
        />

      </Routes>

    </BrowserRouter>

  );

}
