const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    application: "Honique ERP Backend",
    version: "1.0.0",
    status: "Running",
  });
});

app.use("/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Honique ERP Backend running on port ${PORT}`);
});
