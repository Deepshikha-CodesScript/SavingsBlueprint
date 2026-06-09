const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const salarySlipRoutes = require("./routes/salarySlipRoutes");
const personalSalaryRoutes = require("./routes/personalSalaryRoutes");
const otherIncomeRoutes = require("./routes/otherIncomeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const googleAuthRoutes =
  require("./routes/googleAuthRoutes");
const fbauthRoutes =
  require("./routes/fbauthRoutes");


  const app = express();
app.use(
  "/api/authrf",
  fbauthRoutes
);



// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/salaryslip", salarySlipRoutes);
app.use("/api/personalsalary", personalSalaryRoutes);
app.use("/api/otherincome", otherIncomeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(
  "/api/authr",
  googleAuthRoutes
);


// Server
app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});