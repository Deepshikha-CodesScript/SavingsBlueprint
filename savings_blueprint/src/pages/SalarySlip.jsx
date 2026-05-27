const SalarySlip = ({
  formData,
  handleChange,
  earnings,
  deductions,
  handleEarningChange,
  handleDeductionChange,
  addEarningField,
  removeEarningField,
  addDeductionField,
  removeDeductionField,
  grossEarnings,
  totalDeductions,
  netPay,
  handleSave,
  handleEdit,
  handleUpdate,
  handleDelete
}) => {
  return (
    <div className="salary-slip-container">
      
      {/* 1. COMPANY HEADER */}
      <div className="salary-slip-header">
        <h2>THE SINGARENI COLLIERIES COMPANY LIMITED</h2>
        <p className="subtitle">(A Government Company)</p>
        <h3>EMPLOYEE SALARY DETAILS (PROVISIONAL)</h3>
      </div>

      <hr className="divider" />

      {/* 2. EMPLOYEE & TIME PERIOD METADATA */}
      <div className="employee-info-grid">
        <div className="info-column">
          <p>
            <strong>Emp Code:</strong>
            <input
              type="text"
              name="empCode"
              value={formData.empCode}
              onChange={handleChange}
              placeholder="e.g. 123456"
            />
          </p>
          <p>
            <strong>Emp Name:</strong>
            <input
              type="text"
              name="empName"
              value={formData.empName}
              onChange={handleChange}
              placeholder="Employee Name"
            />
          </p>
        </div>
        <div className="info-column">
          <p>
            <strong>Month:</strong>
            <input
              type="text"
              name="month"
              value={formData.month}
              onChange={handleChange}
              placeholder="e.g. May"
            />
          </p>
          <p>
            <strong>Financial Year:</strong>
            <input
              type="text"
              name="financialYear"
              value={formData.financialYear}
              onChange={handleChange}
              placeholder="e.g. 2026-27"
            />
          </p>
        </div>
      </div>

      <hr className="divider" />

      {/* 3. CORE SALARY STRUCTURE BLOCK */}
      <div className="salary-breakdown-wrapper">
        
        {/* EARNINGS COLUMN */}
        <div className="breakdown-column earnings-side">
          <h4>Earnings</h4>
          <div className="dynamic-rows">
            {earnings.map((item, index) => (
              <div className="dynamic-row-item" key={`earn-${index}`}>
                <input
                  type="text"
                  className="input-label"
                  value={item.label}
                  onChange={(e) => handleEarningChange(index, "label", e.target.value)}
                  placeholder="Earning Head"
                />
                <input
                  type="number"
                  className="input-amount"
                  value={item.amount || ""}
                  onChange={(e) => handleEarningChange(index, "amount", Number(e.target.value))}
                  placeholder="₹ 0.00"
                />
                <button className="delete-row-btn" onClick={() => removeEarningField(index)} title="Remove">
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button className="add-row-btn" onClick={addEarningField}>
            + Add Earning Head
          </button>
        </div>

        {/* DEDUCTIONS COLUMN */}
        <div className="breakdown-column deductions-side">
          <h4>Deductions</h4>
          <div className="dynamic-rows">
            {deductions.map((item, index) => (
              <div className="dynamic-row-item" key={`deduct-${index}`}>
                <input
                  type="text"
                  className="input-label"
                  value={item.label}
                  onChange={(e) => handleDeductionChange(index, "label", e.target.value)}
                  placeholder="Deduction Head"
                />
                <input
                  type="number"
                  className="input-amount"
                  value={item.amount || ""}
                  onChange={(e) => handleDeductionChange(index, "amount", Number(e.target.value))}
                  placeholder="₹ 0.00"
                />
                <button className="delete-row-btn" onClick={() => removeDeductionField(index)} title="Remove">
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button className="add-row-btn" onClick={addDeductionField}>
            + Add Deduction Head
          </button>
        </div>

      </div>

      <hr className="divider" />

      {/* 4. NET CALCULATION SUMMARY SUMMARY BOX */}
      <div className="salary-totals-summary">
        <div className="total-block">
          <span>Gross Earnings:</span>
          <strong>₹ {grossEarnings.toFixed(2)}</strong>
        </div>
        <div className="total-block">
          <span>Total Deductions:</span>
          <strong>₹ {totalDeductions.toFixed(2)}</strong>
        </div>
        <div className="total-block net-pay-block">
          <span>Net Take-Home Pay:</span>
          <strong>₹ {netPay.toFixed(2)}</strong>
        </div>
      </div>

      {/* 5. ACTION CONTROLS */}
      <div className="salary-actions-footer">
        <button className="action-btn save" onClick={handleSave}>Save Slip</button>
        <button className="action-btn edit" onClick={handleEdit}>Edit</button>
        <button className="action-btn update" onClick={handleUpdate}>Update</button>
        <button className="action-btn delete" onClick={handleDelete}>Delete</button>
      </div>

    </div>
  );
};

export default SalarySlip;