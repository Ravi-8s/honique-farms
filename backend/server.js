const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/database");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);

app.get("/", async (req, res) => {

  try {

    const result = await pool.query("SELECT NOW()");

    res.json({
      application: "Honique ERP Backend",
      database: "Connected",
      serverTime: result.rows[0].now,
    });

  } catch (error) {

    res.status(500).json({
      database: "Connection Failed",
      error: error.message,
    });

  }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
