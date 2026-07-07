const express = require("express");
const router = express.Router();
const CapitalReceipt = require("../models/CapitalReceipt");

/* ==========================
   SAVE CAPITAL RECEIPT
========================== */
router.post("/save", async (req, res) => {
  try {
    const { empName, month } = req.body;

    // Validate required fields
    if (!empName || !month) {
      return res.status(400).json({
        success: false,
        message: "Employee Name and Month are required",
      });
    }

    // Check if record already exists for this employee and month
    const existingRecord = await CapitalReceipt.findOne({ empName, month });
    if (existingRecord) {
      return res.status(409).json({
        success: false,
        message: "Capital Receipt already exists for this employee and month",
      });
    }

    const capitalReceipt = new CapitalReceipt(req.body);
    await capitalReceipt.save();

    res.status(201).json({
      success: true,
      message: "Capital Receipt saved successfully",
      data: capitalReceipt,
    });
  } catch (error) {
    console.error("Error saving capital receipt:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save Capital Receipt",
      error: error.message,
    });
  }
});

/* ==========================
   GET CAPITAL RECEIPT BY EMPLOYEE & MONTH
========================== */
router.get("/get", async (req, res) => {
  try {
    const { empName, month } = req.query;

    if (!empName || !month) {
      return res.status(400).json({
        success: false,
        message: "Employee Name and Month are required",
      });
    }

    const receipt = await CapitalReceipt.findOne({ empName, month });

    if (!receipt) {
      return res.status(404).json({
        success: false,
        message: "Capital Receipt not found",
      });
    }

    res.status(200).json({
      success: true,
      data: receipt,
    });
  } catch (error) {
    console.error("Error fetching capital receipt:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch record",
      error: error.message,
    });
  }
});

/* ==========================
   GET ALL CAPITAL RECEIPTS (OPTIONAL)
========================== */
router.get("/all", async (req, res) => {
  try {
    const receipts = await CapitalReceipt.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: receipts.length,
      data: receipts,
    });
  } catch (error) {
    console.error("Error fetching all receipts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch records",
      error: error.message,
    });
  }
});

/* ==========================
   GET CAPITAL RECEIPTS FOR AN EMPLOYEE
========================== */
router.get("/employee", async (req, res) => {
  try {
    const { empName } = req.query;

    if (!empName) {
      return res.status(400).json({
        success: false,
        message: "Employee Name is required",
      });
    }

    const receipts = await CapitalReceipt.find({ empName }).sort({ month: 1 });

    res.status(200).json({
      success: true,
      count: receipts.length,
      data: receipts,
    });
  } catch (error) {
    console.error("Error fetching employee receipts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch employee records",
      error: error.message,
    });
  }
});

/* ==========================
   UPDATE CAPITAL RECEIPT BY EMPLOYEE & MONTH
========================== */
router.put("/update", async (req, res) => {
  try {
    const { empName, month, capitalReceipt, additionalCapitalReceipts } = req.body;

    if (!empName || !month) {
      return res.status(400).json({
        success: false,
        message: "Employee Name and Month are required",
      });
    }

    // Find and update by empName and month
    const updatedReceipt = await CapitalReceipt.findOneAndUpdate(
      { empName, month },
      {
        capitalReceipt: capitalReceipt || {},
        additionalCapitalReceipts: additionalCapitalReceipts || [],
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedReceipt) {
      return res.status(404).json({
        success: false,
        message: "Capital Receipt not found for this employee and month",
      });
    }

    res.status(200).json({
      success: true,
      message: "Capital Receipt updated successfully",
      data: updatedReceipt,
    });
  } catch (error) {
    console.error("Error updating capital receipt:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update record",
      error: error.message,
    });
  }
});

/* ==========================
   DELETE CAPITAL RECEIPT BY EMPLOYEE & MONTH
========================== */
router.delete("/delete", async (req, res) => {
  try {
    const { empName, month } = req.query;

    if (!empName || !month) {
      return res.status(400).json({
        success: false,
        message: "Employee Name and Month are required",
      });
    }

    const deletedReceipt = await CapitalReceipt.findOneAndDelete({ empName, month });

    if (!deletedReceipt) {
      return res.status(404).json({
        success: false,
        message: "Capital Receipt not found for this employee and month",
      });
    }

    res.status(200).json({
      success: true,
      message: "Capital Receipt deleted successfully",
      data: deletedReceipt,
    });
  } catch (error) {
    console.error("Error deleting capital receipt:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete record",
      error: error.message,
    });
  }
});

module.exports = router;