import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";

import AdminDashboard from "../components/AdminDashboard/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

import LoginPage from "../pages/Admin/Login/LoginPage";
import RegisterPage from "../pages/Customer/Register/RegisterPage";

import ProductsPage from "../pages/Admin/Products/ProductsPage";
import CategoriesPage from "../pages/Admin/Categories/CategoriesPage";
import InventoryPage from "../pages/Admin/Inventory/InventoryPage";
import CustomersPage from "../pages/Admin/Customers/CustomersPage";

import OrdersPage from "../pages/Admin/Orders/OrdersPage";
import OrderDetailsPage from "../pages/Admin/Orders/OrderDetailsPage";

import InvoicesPage from "../pages/Admin/Invoices/InvoicesPage";
import InvoiceDetailsPage from "../pages/Admin/Invoices/InvoiceDetailsPage";

import ExpensesPage from "../pages/Admin/Expenses/ExpensesPage";
import ReportsPage from "../pages/Admin/Reports/ReportsPage";
import CompanyPage from "../pages/Admin/Company/CompanyPage";

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Website */}

        <Route
          path="/"
          element={<App />}
        />

        {/* Customer */}

        <Route
          path="/customer/register"
          element={<RegisterPage />}
        />

        {/* Admin */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/inventory"
          element={
            <ProtectedRoute>
              <InventoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/customers"
          element={
            <ProtectedRoute>
              <CustomersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/invoices"
          element={
            <ProtectedRoute>
              <InvoicesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/invoices/:id"
          element={
            <ProtectedRoute>
              <InvoiceDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/expenses"
          element={
            <ProtectedRoute>
              <ExpensesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/company"
          element={
            <ProtectedRoute>
              <CompanyPage />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}
