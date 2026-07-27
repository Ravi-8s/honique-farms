import { useEffect, useState } from "react";

import AdminLayout from "../../../components/AdminLayout/AdminLayout";

import CustomerForm from "../../../components/CustomerForm/CustomerForm";
import CustomerTable from "../../../components/CustomerTable/CustomerTable";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";

import "./CustomersPage.css";

import {
  getCustomers,
  deleteCustomer,
} from "../../../services/api";

import type { Customer } from "../../../types/Customer";

import { notify } from "../../../utils/notify";

function CustomersPage() {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [customerToDelete, setCustomerToDelete] =
    useState<number | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {

    try {

      const data = await getCustomers();

      setCustomers(data);

    } catch (error) {

      console.error(error);

      notify.error("Failed to load customers");

    }

  }

  function handleDelete(id: number) {

    setCustomerToDelete(id);

    setShowConfirm(true);

  }

  async function confirmDelete() {

    if (customerToDelete === null)
      return;

    try {

      const result =
        await deleteCustomer(customerToDelete);

      notify.success(result.message);

      loadCustomers();

    } catch (error: any) {

      notify.error(
        error.message ||
        "Failed to delete customer"
      );

    }

    setShowConfirm(false);

    setCustomerToDelete(null);

  }

  function handleEdit(customer: Customer) {

    setSelectedCustomer(customer);

    setShowForm(true);

  }

  return (

    <AdminLayout>

      <div className="customers-page">

        <h1>Customer Management</h1>

        <p>
          Manage all customers in Honique ERP.
        </p>

        <button
          onClick={() => {

            setSelectedCustomer(null);

            setShowForm(true);

          }}
        >
          Add New Customer
        </button>

        <CustomerTable
          customers={customers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {showForm && (

          <CustomerForm
            customer={selectedCustomer}
            onClose={() => {

              setShowForm(false);

              setSelectedCustomer(null);

            }}
            onCustomerAdded={loadCustomers}
          />

        )}

        {showConfirm && (

          <ConfirmDialog
            title="Delete Customer"
            message="Are you sure you want to delete this customer? This action cannot be undone."
            onCancel={() => {

              setShowConfirm(false);

              setCustomerToDelete(null);

            }}
            onConfirm={confirmDelete}
          />

        )}

      </div>

    </AdminLayout>

  );

}

export default CustomersPage;
