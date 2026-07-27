import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./LoginPage.css";

import {
  loginCustomer,
} from "../../../services/CustomerAuthService";

export default function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const result = await loginCustomer({
        email,
        password,
      });

      localStorage.setItem(
        "customerToken",
        result.token
      );

      toast.success(
        "Login Successful!"
      );

      navigate("/");

    } catch (error) {

      if (error instanceof Error) {

        toast.error(error.message);

      } else {

        toast.error("Login failed.");

      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="login-page">

      <form
        className="login-card"
        onSubmit={handleSubmit}
      >

        <h1>Customer Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Logging in..."
            : "Login"}

        </button>

      </form>

    </div>

  );

}
