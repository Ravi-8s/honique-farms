import React from "react";
import ReactDOM from "react-dom/client";

import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/AppRoutes";

import { CustomerProvider } from "./context/CustomerContext";

import "./styles/global.css";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(

  <React.StrictMode>

    <CustomerProvider>

      <Toaster
        position="top-right"
      />

      <AppRoutes />

    </CustomerProvider>

  </React.StrictMode>

);
