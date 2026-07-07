const mongoose = require("mongoose");
const SalarySlipSchema = new mongoose.Schema(
  {
     userId: {
      type: mongoose.Schema.Types.ObjectId, ref: "User", required: true,},
    empName: String,
    designation: String,
    department: String,
    month: String,
    financialYear: String,
    retirementDate: Date,

    earnings: [{label: String, amount: Number,},],
    deductions: [{label: String,amount: Number,},
    ],

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
otherIncome: {
  partTimeSalary: {
    type: Number,
    default: 0,
  },

  partTimeBusinessIncome: {
    type: Number,
    default: 0,
  },

  tuitionAmount: {
    type: Number,
    default: 0,
  },

  agriculturalIncome: {
    type: Number,
    default: 0,
  },

  extraOccupationalIncome: {
    type: Number,
    default: 0,
  },

  chitFundDividend: {
    type: Number,
    default: 0,
  },

  licCommission: {
    type: Number,
    default: 0,
  },

  shareTradingIncome: {
    type: Number,
    default: 0,
  },

  stockDividend: {
    type: Number,
    default: 0,
  },

  expectedEndDate: {
    type: Date,
  },

  annualGrowthRate: {
    type: Number,
    default: 0,
  },
},

    additionalIncome: [
      {
        label: String,
        amount: Number,
      },
    ],

    capitalReceipt: {
      saleOfHouseProperty: Number,
      saleOfLandPlot: Number,
      saleOfBusinessProperty: Number,
      lumpSumReceiptChitFund: Number,
      lumpSumReceiptDeposits: Number,
      saleOfSharesDebentures: Number,

      expectedEndDate: Date,
      annualGrowthRate: Number,    },

    additionalCapitalReceipts: [
      {
        label: String,
        amount: Number,
      },
    ],

    annualIncomeData: [
  {
    earnings: {
      type: Object,
      default: {},
    },

    mandatory: {
      type: Object,
      default: {},
    },

    personal: {
      type: Object,
      default: {},
    },

    otherIncome: {
      type: Object,
      default: {},
    },

    capitalReceipt: {
      type: Object,
      default: {},
    },

    taxExemption: {
      type: Object,
      default: {},
    },
  },
],

    grossEarnings: Number,
    totalDeductions: Number,
    netPay: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SalarySlipMonthWise",
  SalarySlipSchema
);