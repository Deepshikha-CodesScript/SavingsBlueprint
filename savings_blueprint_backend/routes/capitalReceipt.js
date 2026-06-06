const express = require("express");
const router = express.Router();

const CapitalReceipt = require("../models/CapitalReceipt");

/* ==========================
   SAVE CAPITAL RECEIPT
========================== */
router.post("/save", async (req, res) => {
  try {
    const capitalReceipt = new CapitalReceipt(req.body);

    await capitalReceipt.save();

    res.status(201).json({
      success: true,
      message: "Capital Receipt saved successfully",
      data: capitalReceipt,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to save Capital Receipt",
    });
  }
});

/* ==========================
   GET ALL CAPITAL RECEIPTS
========================== */
router.get("/", async (req, res) => {
  try {
    const receipts = await CapitalReceipt.find();

    res.status(200).json({
      success: true,
      data: receipts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch records",
    });
  }
});

/* ==========================
   GET SINGLE RECEIPT
========================== */
router.get("/:id", async (req, res) => {
  try {
    const receipt = await CapitalReceipt.findById(req.params.id);

    if (!receipt) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: receipt,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch record",
    });
  }
});

/* ==========================
   UPDATE CAPITAL RECEIPT
========================== */
router.put("/update/:id", async (req, res) => {
  try {
    const updatedReceipt = await CapitalReceipt.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedReceipt) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Capital Receipt updated successfully",
      data: updatedReceipt,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update record",
    });
  }
});

/* ==========================
   DELETE CAPITAL RECEIPT
========================== */
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedReceipt = await CapitalReceipt.findByIdAndDelete(
      req.params.id
    );

    if (!deletedReceipt) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Capital Receipt deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete record",
    });
  }
});

module.exports = router;