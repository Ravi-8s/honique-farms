import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./RegisterPage.css";

import {
  registerCustomer,
} from "../../../services/CustomerAuthService";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const result =
        await registerCustomer(form);

      localStorage.setItem(
        "customerToken",
        result.token
      );

      toast.success(
        "Registration Successful!"
      );

      navigate("/");

    } catch (error) {

      if (error instanceof Error) {

        toast.error(error.message);

      } else {

        toast.error(
          "Registration failed."
        );

      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="register-page">

      <form
        className="register-card"
        onSubmit={handleSubmit}
      >

        <h1>Create Account</h1>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />

        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Registering..."
            : "Register"}

        </button>

      </form>

    </div>

  );

}
