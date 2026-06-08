const SalarySlip = require("../models/SalarySlipMonthWise");

const getDashboardData = async (req, res) => {
  try {
   const salaryData = await SalarySlip
  .find({ userId: req.user.id })
  .sort({ createdAt: -1 });

    const totalIncome = salaryData.reduce(
      (sum, item) => sum + (item.netPay || 0),
      0
    );

    const totalExpenses = salaryData.reduce(
      (sum, item) => sum + (item.totalDeductions || 0),
      0
    );

    const totalSavings = totalIncome - totalExpenses;

    res.status(200).json({
      totalIncome,
      totalSavings,
      totalExpenses,
      goalFund: totalSavings,
      recentTransactions: salaryData.slice(0, 5),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardData,
};