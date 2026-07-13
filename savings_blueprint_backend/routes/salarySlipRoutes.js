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

    console.log("req.user =", req.user);

    const authenticatedUserId =
      req.user?._id ||
      req.user?.id ||
      req.user?.userId;

    if (!authenticatedUserId) {
      return res.status(400).json({
        success: false,
        message: "Authenticated user ID is missing",
      });
    }

    const cleanNumericFields = (obj) => {
      if (!obj || typeof obj !== "object") return obj;

      const cleaned = {};

      for (const [key, value] of Object.entries(obj)) {
        if (value === "") {
          cleaned[key] =  key === "expectedEndDate" ? null : 0;
        } else if (
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value)
        ) {
          cleaned[key] = cleanNumericFields(value);
        } else {
          cleaned[key] = value;
        }
      }

      return cleaned;
    };

    if (data.personalSalary) {
      data.personalSalary =
        cleanNumericFields(data.personalSalary);
    }

    if (data.otherIncome) {
      data.otherIncome =
        cleanNumericFields(data.otherIncome);
    }

    if (data.capitalReceipt) {
      data.capitalReceipt =
        cleanNumericFields(data.capitalReceipt);
    }

    const filterEmptyArrays = (arr) => {
      if (!Array.isArray(arr)) return [];

      return arr
        .map((item) => ({
          label: item?.label || "",
          amount:
            item?.amount === ""
              ? 0
              : Number(item?.amount || 0),
        }))
        .filter((item) => item.label.trim() !== "");
    };

    data.earnings = filterEmptyArrays(data.earnings);
    data.deductions = filterEmptyArrays(data.deductions);
    data.otherEarnings =
      filterEmptyArrays(data.otherEarnings);
    data.otherDeductions =
      filterEmptyArrays(data.otherDeductions);
    data.additionalIncome =
      filterEmptyArrays(data.additionalIncome);
    data.additionalCapitalReceipts =
      filterEmptyArrays(
        data.additionalCapitalReceipts
      );

    console.log(
      "Authenticated User ID:",
      authenticatedUserId
    );

    const salarySlip =
      new SalarySlipMonthWise({
        ...data,
        userId: authenticatedUserId,
      });

    await salarySlip.save();

    res.status(201).json({
      success: true,
      message: "Salary Slip Saved Successfully",
      data: salarySlip,
    });
  } catch (error) {
    console.error(
      "Mongoose Save Error Stack:",
      error
    );

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
      const authenticatedUserId =
        req.user?._id ||
        req.user?.id ||
        req.user?.userId;

      if (!authenticatedUserId) {
        return res.status(400).json({
          success: false,
          message: "Authenticated user ID is missing",
        });
      }

      const history =
        await SalarySlipMonthWise.find({
          userId: authenticatedUserId,
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