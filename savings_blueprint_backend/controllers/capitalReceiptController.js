const CapitalReceipt = require('../models/CapitalReceipt');

// Save Capital Receipt
exports.saveCapitalReceipt = async (req, res) => {
  try {
    const { empName, month, capitalReceipt, additionalCapitalReceipts } = req.body;

    // Validate required fields
    if (!empName || !month) {
      return res.status(400).json({
        success: false,
        message: 'Employee Name and Month are required'
      });
    }

    // Check if record already exists
    const existingRecord = await CapitalReceipt.findOne({ empName, month });
    if (existingRecord) {
      return res.status(409).json({
        success: false,
        message: 'Capital Receipt already exists for this employee and month'
      });
    }

    // Create new record
    const newCapitalReceipt = new CapitalReceipt({
      empName,
      month,
      capitalReceipt: capitalReceipt || {},
      additionalCapitalReceipts: additionalCapitalReceipts || []
    });

    await newCapitalReceipt.save();

    res.status(201).json({
      success: true,
      message: 'Capital Receipt saved successfully',
      data: newCapitalReceipt
    });

  } catch (error) {
    console.error('Error saving capital receipt:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save capital receipt',
      error: error.message
    });
  }
};

// Get Capital Receipt by empName and month
exports.getCapitalReceipt = async (req, res) => {
  try {
    const { empName, month } = req.query;

    if (!empName || !month) {
      return res.status(400).json({
        success: false,
        message: 'Employee Name and Month are required'
      });
    }

    const capitalReceipt = await CapitalReceipt.findOne({ empName, month });

    if (!capitalReceipt) {
      return res.status(404).json({
        success: false,
        message: 'Capital Receipt not found'
      });
    }

    res.status(200).json({
      success: true,
      data: capitalReceipt
    });

  } catch (error) {
    console.error('Error fetching capital receipt:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch capital receipt',
      error: error.message
    });
  }
};

// Update Capital Receipt
exports.updateCapitalReceipt = async (req, res) => {
  try {
    const { empName, month, capitalReceipt, additionalCapitalReceipts } = req.body;

    if (!empName || !month) {
      return res.status(400).json({
        success: false,
        message: 'Employee Name and Month are required'
      });
    }

    const updatedRecord = await CapitalReceipt.findOneAndUpdate(
      { empName, month },
      {
        capitalReceipt: capitalReceipt || {},
        additionalCapitalReceipts: additionalCapitalReceipts || [],
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Capital Receipt not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Capital Receipt updated successfully',
      data: updatedRecord
    });

  } catch (error) {
    console.error('Error updating capital receipt:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update capital receipt',
      error: error.message
    });
  }
};

// Delete Capital Receipt
exports.deleteCapitalReceipt = async (req, res) => {
  try {
    const { empName, month } = req.query;

    if (!empName || !month) {
      return res.status(400).json({
        success: false,
        message: 'Employee Name and Month are required'
      });
    }

    const deletedRecord = await CapitalReceipt.findOneAndDelete({ empName, month });

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Capital Receipt not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Capital Receipt deleted successfully',
      data: deletedRecord
    });

  } catch (error) {
    console.error('Error deleting capital receipt:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete capital receipt',
      error: error.message
    });
  }
};

// Get all Capital Receipts for an employee
exports.getEmployeeCapitalReceipts = async (req, res) => {
  try {
    const { empName } = req.query;

    if (!empName) {
      return res.status(400).json({
        success: false,
        message: 'Employee Name is required'
      });
    }

    const capitalReceipts = await CapitalReceipt.find({ empName })
      .sort({ month: 1 });

    res.status(200).json({
      success: true,
      count: capitalReceipts.length,
      data: capitalReceipts
    });

  } catch (error) {
    console.error('Error fetching employee capital receipts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch capital receipts',
      error: error.message
    });
  }
};