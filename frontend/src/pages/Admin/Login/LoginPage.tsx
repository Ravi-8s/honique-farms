import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  loginAdmin,
} from "../../../services/api";

function LoginPage() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  async function handleLogin(
    event: React.FormEvent
  ) {

    event.preventDefault();

    setError("");

    try {

      const result =
        await loginAdmin(
          username,
          password
        );

      localStorage.setItem(
        "token",
        result.token
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(
          result.admin
        )
      );

      navigate("/admin");

    } catch (error: any) {

      setError(error.message);

    }

  }

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f4f4f4",
      }}
    >

      <form
        onSubmit={handleLogin}
        style={{
          background: "#ffffff",
          padding: "40px",
          borderRadius: "10px",
          width: "350px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >

        <h2
          style={{
            textAlign: "center",
            color: "#2e7d32",
          }}
        >
          Honique ERP
        </h2>

        <p
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Admin Login
        </p>

        {error && (

          <p
            style={{
              color: "red",
              textAlign: "center",
            }}
          >
            {error}
          </p>

        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) =>
            setUsername(
              event.target.value
            )
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) =>
            setPassword(
              event.target.value
            )
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#2e7d32",
            color: "#ffffff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Login
        </button>

      </form>

    </div>

  );

}

export default LoginPage;
