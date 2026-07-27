const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/database");

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const reportRoutes = require("./routes/reportRoutes");
const companyRoutes = require("./routes/companyRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const authRoutes = require("./routes/authRoutes");
const customerAuthRoutes = require("./routes/customerAuthRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// =====================================================
// API Routes
// =====================================================

app.use("/auth", authRoutes);

app.use("/customer-auth", customerAuthRoutes);

app.use("/products", productRoutes);

app.use("/categories", categoryRoutes);

app.use("/inventory", inventoryRoutes);

app.use("/customers", customerRoutes);

app.use("/orders", orderRoutes);

app.use("/expenses", expenseRoutes);

app.use("/reports", reportRoutes);

app.use("/company", companyRoutes);

app.use("/invoices", invoiceRoutes);

// =====================================================
// Health Check
// =====================================================

app.get("/", async (req, res) => {

  try {

    const result = await pool.query(
      "SELECT NOW()"
    );

    res.json({

      application:
        "Honique ERP Backend",

      database:
        "Connected",

      serverTime:
        result.rows[0].now,

    });

  } catch (error) {

    res.status(500).json({

      database:
        "Connection Failed",

      error:
        error.message,

    });

  }

});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `🚀 Backend running on port ${PORT}`
  );

});
