const express = require("express");
const router = express.Router();

router.post("/save", async (req, res) => {
  res.json({
    success: true,
    message: "Other Income Saved",
  });
});

router.get("/history", async (req, res) => {
  res.json({
    success: true,
    data: [],
  });
});


module.exports = router;