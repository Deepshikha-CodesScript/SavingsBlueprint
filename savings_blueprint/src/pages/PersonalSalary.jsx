import React, { useState } from "react";
const PersonalSalary = ({
employeeDetails,
personalSalary,
setPersonalSalary,
otherEarnings,
setOtherEarnings,
otherDeductions,
setOtherDeductions,
}) => {

  
// Fixed Fields Change
const handleFixedChange = ({ target: { name, value } }) => {
  console.log("Typing:", name, value);
  setPersonalSalary((prev) => ({...prev,[name]: value,}));};
React.useEffect(() => {
  console.log("personalSalary =", personalSalary);
}, [personalSalary]);

// Other Earnings

const handleEarningChange = (index, field, value) => {
  setOtherEarnings((prev) =>
    prev.map((item, i) =>
      i === index
        ? { ...item, [field]: value }
        : item
    )
  );
};

const addEarningField = () => {
  setOtherEarnings((prev) => [
    ...prev,
    { label: "", amount: "" },
  ]);
};

const removeEarningField = (index) => {
  setOtherEarnings((prev) =>
    prev.filter((_, i) => i !== index)
  );
};

// Other Deductions

const handleDeductionChange = (index, field, value) => {
  setOtherDeductions((prev) =>
    prev.map((item, i) =>
      i === index
        ? { ...item, [field]: value }
        : item
    )
  );
};

const addDeductionField = () => {
  setOtherDeductions((prev) => [
    ...prev,
    { label: "", amount: "" },
  ]);
};

const removeDeductionField = (index) => {
  setOtherDeductions((prev) =>
    prev.filter((_, i) => i !== index)
  );
};

// Totals

const fixedEarnings =
Number(personalSalary.overtimeAllowance || 0) +
Number(personalSalary.holidayAllowance || 0) +
Number(personalSalary.leaveEncashment || 0) +
Number(personalSalary.taAllowance || 0) +
Number(personalSalary.bonus || 0) +
Number(personalSalary.exgratia || 0) +
Number(personalSalary.arrears || 0) +
Number(personalSalary.loanTaken || 0);

const additionalEarnings = otherEarnings.reduce(
(sum, item) => sum + Number(item.amount || 0),
0
);

const totalPersonalEarnings =
fixedEarnings + additionalEarnings;

const fixedDeductions =
Number(personalSalary.loanRepayment || 0) +
Number(personalSalary.licPremium || 0) +
Number(personalSalary.houseLoanEMI || 0) +
Number(personalSalary.vehicleLoanEMI || 0) +
Number(personalSalary.otherDeduction || 0);

const additionalDeductions = otherDeductions.reduce(
(sum, item) => sum + Number(item.amount || 0),
0
);

const totalPersonalDeductions =
fixedDeductions + additionalDeductions;

const netPersonal =
totalPersonalEarnings - totalPersonalDeductions;

return ( <div className="personal-salary-container">


  <h3>Personal Salary Details</h3>

  <div className="salary-breakdown-wrapper">

    {/* Earnings Section */}

    <div className="breakdown-column earnings-side">

      <h4>Salary (Personal) Earnings + OT</h4>

      <input
        type="number"
        name="overtimeAllowance"
       value={personalSalary.overtimeAllowance || ""}
        onChange={handleFixedChange}
        placeholder="Overtime Allowance"
      />

      <input
        type="number"
        name="holidayAllowance"
        value={personalSalary.holidayAllowance || ""}
        onChange={handleFixedChange}
        placeholder="Holiday Allowance"
      />

      <input
        type="number"
        name="leaveEncashment"
        value={personalSalary.leaveEncashment || ""}
        onChange={handleFixedChange}
        placeholder="Leave Encashment"
      />

      <input
        type="number"
        name="taAllowance"
        value={personalSalary.taAllowance || ""}
        onChange={handleFixedChange}
        placeholder="TA Allowance"
      />

      <input
        type="number"
        name="bonus"
        value={personalSalary.bonus || ""}
        onChange={handleFixedChange}
        placeholder="Bonus"
      />

      <input
        type="number"
        name="exgratia"
        value={personalSalary.exgratia || ""}
        onChange={handleFixedChange}
        placeholder="Exgratia"
      />

      <input
        type="number"
        name="arrears"
        value={personalSalary.arrears || ""}
        onChange={handleFixedChange}
        placeholder="Arrears"
      />

      <input
        type="number"
        name="loanTaken"
        value={personalSalary.loanTaken || ""}
        onChange={handleFixedChange}
        placeholder="Loan Taken"
      />

      <h5>Other Earnings</h5>

      {otherEarnings.map((item, index) => (
        <div className="dynamic-row-item" key={index}>
          <input
            type="text"
            className="input-label"
            value={item.label}
            placeholder="Head Name"
            onChange={(e) =>
              handleEarningChange(
                index,
                "label",
                e.target.value
              )
            }
          />

          <input
            type="number"
            className="input-amount"
            value={item.amount}
            placeholder="₹ 0.00"
            onChange={(e) =>
              handleEarningChange(
                index,
                "amount",
                e.target.value
              )
            }
          />

          <button
            type="button"
            className="delete-row-btn"
            onClick={() => removeEarningField(index)}
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        className="add-row-btn"
        onClick={addEarningField}
      >
        + Add Other Earning
      </button>

    </div>

    {/* Deduction Section */}

    <div className="breakdown-column deductions-side">

      <h4>Salary (Personal) Deductions</h4>

      <input
        type="number"
        name="loanRepayment"
        value={personalSalary.loanRepayment || ""}
        onChange={handleFixedChange}
        placeholder="Loan Repayment / EMI"
      />

      <input
        type="number"
        name="licPremium"
        value={personalSalary.licPremium || ""}
        onChange={handleFixedChange}
        placeholder="LIC Premium"
      />

      <input
        type="number"
        name="houseLoanEMI"
        value={personalSalary.houseLoanEMI || ""}
        onChange={handleFixedChange}
        placeholder="House Loan EMI"
      />

      <input
        type="number"
        name="vehicleLoanEMI"
        value={personalSalary.vehicleLoanEMI || ""}
        onChange={handleFixedChange}
        placeholder="Vehicle Loan EMI"
      />

      <input
        type="number"
        name="otherDeduction"
        value={personalSalary.otherDeduction || ""}
        onChange={handleFixedChange}
        placeholder="Other Deduction"
      />

      <h5>Additional Deductions</h5>

      {otherDeductions.map((item, index) => (
        <div className="dynamic-row-item" key={index}>
          <input
            type="text"
            className="input-label"
            value={item.label}
            placeholder="Head Name"
            onChange={(e) =>
              handleDeductionChange(
                index,
                "label",
                e.target.value
              )
            }
          />

          <input
            type="number"
            className="input-amount"
            value={item.amount}
            placeholder="₹ 0.00"
            onChange={(e) =>
              handleDeductionChange(
                index,
                "amount",
                e.target.value
              )
            }
          />

          <button
            type="button"
            className="delete-row-btn"
            onClick={() => removeDeductionField(index)}
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        className="add-row-btn"
        onClick={addDeductionField}
      >
        + Add Other Deduction
      </button>

    </div>

  </div>

  <div className="salary-totals-summary">

    <div className="total-block">
      <span>Salary (Personal) Earnings:</span>
      <strong>₹ {totalPersonalEarnings.toFixed(2)}</strong>
    </div>

    <div className="total-block">
      <span>Salary (Personal) Deductions:</span>
      <strong>₹ {totalPersonalDeductions.toFixed(2)}</strong>
    </div>

    <div className="total-block net-pay-block">
      <span>Net (Personal):</span>
      <strong>₹ {netPersonal.toFixed(2)}</strong>
    </div>

  </div>
  <h4>Personal Projection</h4>
  <div className="forecast-section">

  <input
    type="date"
    name="expectedEndDate"
    value={personalSalary.expectedEndDate || ""}
    onChange={(e) =>
      setPersonalSalary({
        ...personalSalary,
        expectedEndDate: e.target.value,
      })
    }
  />

  <input
    type="number"
    name="annualGrowthRate"
    placeholder="Annual Growth Rate (%)"
    value={personalSalary.annualGrowthRate || ""}
    onChange={(e) =>
      setPersonalSalary({
        ...personalSalary,
        annualGrowthRate: e.target.value,
      })
    }
  />

</div>

</div>


);
};

export default PersonalSalary;
