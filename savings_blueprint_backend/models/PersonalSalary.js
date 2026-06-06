const mongoose = require("mongoose");

const PersonalSalarySchema = new mongoose.Schema(
  {
    empName: {
      type: String,
      required: true,
    },

    month: {
      type: String,
      required: true,
    },

    personalSalary: {
      overtimeAllowance: Number,
      holidayAllowance: Number,
      leaveEncashment: Number,
      taAllowance: Number,
      bonus: Number,
      exgratia: Number,
      arrears: Number,
      loanTaken: Number,

      loanRepayment: Number,
      licPremium: Number,
      houseLoanEMI: Number,
      vehicleLoanEMI: Number,
      otherDeduction: Number,

      expectedEndDate: Date,
      annualGrowthRate: Number,
    },

    otherEarnings: [
      {
        label: String,
        amount: Number,
      },
    ],

    otherDeductions: [
      {
        label: String,
        amount: Number,
      },
    ],
  },
  {
    timestamps: true,
    collection: "personalsalary",
  }
);

module.exports = mongoose.model(
  "PersonalSalary",
  PersonalSalarySchema
);