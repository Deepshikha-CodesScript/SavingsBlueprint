const mongoose = require('mongoose');

const capitalReceiptSchema = new mongoose.Schema({
  empName: {
    type: String,
    required: true,
    trim: true
  },
  month: {
    type: String,
    required: true,
    trim: true
  },
  capitalReceipt: {
    saleOfHouseProperty: { type: Number, default: 0 },
    saleOfLandPlot: { type: Number, default: 0 },
    saleOfBusinessProperty: { type: Number, default: 0 },
    lumpSumReceiptChitFund: { type: Number, default: 0 },
    lumpSumReceiptDeposits: { type: Number, default: 0 },
    saleOfSharesDebentures: { type: Number, default: 0 },
    expectedEndDate: { type: String, default: '' },
    annualGrowthRate: { type: Number, default: 0 }
  },
  additionalCapitalReceipts: [{
    label: { type: String, trim: true },
    amount: { type: Number, default: 0 }
  }]
}, {
  timestamps: true  // This automatically adds createdAt and updatedAt
});

// Optional: Add unique index
capitalReceiptSchema.index({ empName: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('CapitalReceipt', capitalReceiptSchema);