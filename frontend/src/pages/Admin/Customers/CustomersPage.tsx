import { useEffect, useState } from "react";

import CustomerForm from "../../../components/CustomerForm/CustomerForm";
import CustomerTable from "../../../components/CustomerTable/CustomerTable";

import "./CustomersPage.css";

import {
  getCustomers,
  deleteCustomer,
} from "../../../services/api";

import type { Customer } from "../../../types/Customer";

function CustomersPage() {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {

    try {

      const data = await getCustomers();

      setCustomers(data);

    } catch (error) {

      console.error(error);

    }

  }

  async function handleDelete(id: number) {

    const confirmed = window.confirm(
      "Delete this customer?"
    );

    if (!confirmed) return;

    await deleteCustomer(id);

    loadCustomers();

  }

  function handleEdit(customer: Customer) {

    setSelectedCustomer(customer);

    setShowForm(true);

  }

  return (

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

    </div>

  );

}

export default CustomersPage;
