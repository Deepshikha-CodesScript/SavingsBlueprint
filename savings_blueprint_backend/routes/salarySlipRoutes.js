const express = require("express");
const router = express.Router();
const SalarySlipMonthWise = require("../models/SalarySlipMonthWise");
const authMiddleware =
  require("../middleware/authMiddleware");
/* =========================================
   SAVE SALARY SLIP
========================================= */



router.post("/save", authMiddleware, async (req, res) => {
  try {
    const data = { ...req.body };

    // 1. Helper function to deep convert empty strings "" to 0 or null for numeric objects
    const cleanNumericFields = (obj) => {
      if (!obj || typeof obj !== "object") return obj;
      const cleaned = {};
      for (const [key, value] of Object.entries(obj)) {
        // If it's an empty string, turn it into 0 so your Number schema accepts it
        if (value === "") {
          cleaned[key] = 0; 
        } else if (typeof value === "object" && !Array.isArray(value)) {
          cleaned[key] = cleanNumericFields(value);
        } else {
          cleaned[key] = value;
        }
      }
      return cleaned;
    };

    // 2. Clean parent categories
    if (data.personalSalary) data.personalSalary = cleanNumericFields(data.personalSalary);
    if (data.otherIncome) data.otherIncome = cleanNumericFields(data.otherIncome);
    if (data.capitalReceipt) data.capitalReceipt = cleanNumericFields(data.capitalReceipt);

    // 3. Clean dynamic array heads (Filter out empty custom inputs)
    const filterEmptyArrays = (arr) => {
      if (!Array.isArray(arr)) return arr;
      return arr
        .map(item => ({
          label: item.label || "",
          amount: item.amount === "" ? 0 : Number(item.amount || 0)
        }))
        .filter(item => item.label.trim() !== ""); // don't save blank rows
    };

    if (data.earnings) data.earnings = filterEmptyArrays(data.earnings);
    if (data.deductions) data.deductions = filterEmptyArrays(data.deductions);
    if (data.otherEarnings) data.otherEarnings = filterEmptyArrays(data.otherEarnings);
    if (data.otherDeductions) data.otherDeductions = filterEmptyArrays(data.otherDeductions);
    if (data.additionalIncome) data.additionalIncome = filterEmptyArrays(data.additionalIncome);
    if (data.additionalCapitalReceipts) data.additionalCapitalReceipts = filterEmptyArrays(data.additionalCapitalReceipts);

    console.log("req.user =>", req.user);
console.log("userId =>", req.user?.userId);
console.log("Decoded User:", req.user);


    // Create document with cleaned data
    const salarySlip = new SalarySlipMonthWise({
      ...data,
      userId: req.user.id,
    });

    await salarySlip.save();

    res.status(201).json({
      success: true,
      message: "Salary Slip Saved Successfully",
      data: salarySlip,
    });

  } catch (error) {
    console.error("Mongoose Save Error Stack:", error); // Check your terminal to see this format
    res.status(500).json({
      success: false,
      message: "Error Saving Salary Slip",
      error: error.message,
    });
  }
});
router.get(
  "/history",
  authMiddleware,
  async (req, res) => {
    try {

      const history =
        await SalarySlipMonthWise.find({
          userId: req.user.id,
        }).sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: history,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message,
      });

    }
  }
);  

module.exports = router;