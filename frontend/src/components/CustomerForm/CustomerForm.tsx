import { useEffect, useState } from "react";
import "./CustomerForm.css";

import {
  addCustomer,
  updateCustomer,
} from "../../services/api";

import { notify } from "../../utils/notify";

import type { Customer } from "../../types/Customer";

type CustomerFormProps = {
  onClose: () => void;
  onCustomerAdded: () => void;
  customer?: Customer | null;
};

function CustomerForm({
  onClose,
  onCustomerAdded,
  customer,
}: CustomerFormProps) {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {

    if (customer) {

      setFormData({
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode,
      });

    }

  }, [customer]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  }

  async function handleSubmit() {

    try {

      if (customer) {

        await updateCustomer(customer.id, formData);
        notify.success("Customer updated successfully");

      } else {

        await addCustomer(formData);
        notify.success("Customer added successfully");

      }

      onCustomerAdded();
      onClose();

    } catch (error: any) {

      console.error(error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      notify.error(message);

    }

  }

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>
          {customer ? "Edit Customer" : "Add Customer"}
        </h2>

        <input
          name="name"
          placeholder="Customer Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          rows={3}
          value={formData.address}
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />

        <input
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
        />

        <div className="button-group">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSubmit}
          >
            {customer ? "Update Customer" : "Save Customer"}
          </button>

        </div>

      </div>

    </div>

  );

}

export default CustomerForm;
