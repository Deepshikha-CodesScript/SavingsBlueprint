const express = require("express");

const router = express.Router();

const SalarySlipMonthWise = require("../models/SalarySlipMonthWise");
const authMiddleware =
  require("../middleware/authMiddleware");
/* =========================================
   SAVE SALARY SLIP
========================================= */

router.post("/save", authMiddleware ,async (req, res) => {

  try {

    console.log(req.body);

const salarySlip =
  new SalarySlipMonthWise({
    ...req.body,
    userId: req.user.userId,
  });

    await salarySlip.save();

    res.status(201).json({
      success: true,
      message: "Salary Slip Saved Successfully",
      data: salarySlip,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error Saving Salary Slip",
      error: error.message,
    });

  }

});

/* =========================================
   GET HISTORY
========================================= */

router.get("/history",  authMiddleware, async (req, res) => {

  try {

    const slips =
  await SalarySlipMonthWise.find({
    userId: req.user.userId,
  }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: slips,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

/* =========================================
   GET ALL SALARY SLIPS
========================================= */

router.get("/", async (req, res) => {

  try {

    const slips = await SalarySlipMonthWise.find();

    res.status(200).json(slips);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

/* =========================================
   DELETE SALARY SLIP
========================================= */

router.delete("/:id", async (req, res) => {

  try {

    await SalarySlipMonthWise.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Salary Slip Deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

});

module.exports = router;