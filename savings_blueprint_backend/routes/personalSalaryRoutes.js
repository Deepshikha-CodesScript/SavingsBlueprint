const express = require("express");
const router = express.Router();

const PersonalSalary = require("../models/PersonalSalary");


// SAVE
router.post("/save", async (req, res) => {
  try {
    const salary = new PersonalSalary(req.body);

    await salary.save();

    res.status(201).json({
      success: true,
      message: "Personal Salary Saved Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// UPDATE
router.put("/update", async (req, res) => {
  try {
    const { empName, month } = req.body;

    const updated = await PersonalSalary.findOneAndUpdate(
      { empName, month },
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Personal Salary Updated",
      data: updated,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// DELETE
router.delete("/delete", async (req, res) => {
  try {
    const { empName, month } = req.body;

    await PersonalSalary.findOneAndDelete({
      empName,
      month,
    });

    res.json({
      success: true,
      message: "Personal Salary Deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// GET ALL
router.get("/history", async (req, res) => {
  try {
    const data = await PersonalSalary.find();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;