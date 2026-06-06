
import axios from "axios";
import React, { useState } from "react";
import PersonalSalary from "./PersonalSalary";
import OtherIncome from "./OtherIncome";
import CapitalReceipt from "./CapitalReceipt";


const SalarySlip = ({
  formData,
  handleChange,

  annualIncomeData,

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
  handleEdit,
  handleUpdate,
  handleDelete,
  setFormData,
setEarnings,
setSavedSalaryData,
setDeductions


}) => {
  const [personalSalary, setPersonalSalary] = useState({
  overtimeAllowance: "",
  holidayAllowance: "",
  leaveEncashment: "",
  taAllowance: "",
  bonus: "",
  exgratia: "",
  arrears: "",
  loanTaken: "",

  loanRepayment: "",
  licPremium: "",
  houseLoanEMI: "",
  vehicleLoanEMI: "",
  otherDeduction: "",

  expectedEndDate: "",
  annualGrowthRate: "",
});

const [otherEarnings, setOtherEarnings] = useState([
  { label: "", amount: "" }
]);

const [otherDeductions, setOtherDeductions] = useState([
  { label: "", amount: "" }
]);


const [otherIncome, setOtherIncome] = useState({
  partTimeSalary: "",
  partTimeBusinessIncome: "",
  tuitionAmount: "",
  agriculturalIncome: "",
  extraOccupationalIncome: "",
  chitFundDividend: "",
  licCommission: "",
  shareTradingIncome: "",
  stockDividend: "",

  expectedEndDate: "",
  annualGrowthRate: "",
});

const [additionalIncome, setAdditionalIncome] = useState([
  {
    label: "",
    amount: "",
  },
]);


const [capitalReceipt, setCapitalReceipt] = useState({
  saleOfHouseProperty: "",
  saleOfLandPlot: "",
  saleOfBusinessProperty: "",
  lumpSumReceiptChitFund: "",
  lumpSumReceiptDeposits: "",
  saleOfSharesDebentures: "",

  expectedEndDate: "",
  annualGrowthRate: "",
});

const [additionalCapitalReceipts, setAdditionalCapitalReceipts] =
  useState([
    {
      label: "",
      amount: "",
    },
  ]);


// ==========================
// PERSONAL SALARY ACTIONS
// ==========================

const handlePersonalSave = async () => {
  try {
    await axios.post(
      "http://localhost:5000/api/personalsalary/save",
      {
        empName: formData.empName,
        month: formData.month,
        personalSalary,
        otherEarnings,
        otherDeductions,
      }
    );

    alert("Personal Salary Saved Successfully");
  } catch (error) {
    console.log(error);
    alert("Error Saving Personal Salary");
  }
};

const handlePersonalEdit = () => {
  alert("Personal Salary Edit Mode");
};

const handlePersonalUpdate = async () => {
  try {
    await axios.put(
      "http://localhost:5000/api/personalsalary/update",
      {
        empName: formData.empName,
        month: formData.month,
        personalSalary,
        otherEarnings,
        otherDeductions,
      }
    );

    alert("Personal Salary Updated");
  } catch (error) {
    console.log(error);
  }
};

const handlePersonalDelete = async () => {
  try {
    await axios.delete(
      "http://localhost:5000/api/personalsalary/delete",
      {
        data: {
          empName: formData.empName,
          month: formData.month,
        },
      }
    );

    alert("Personal Salary Deleted");
  } catch (error) {
    console.log(error);
  }
};

// ==========================
// OTHER INCOME ACTIONS
// ==========================

const handleOtherIncomeSave = async () => {
  try {
    await axios.post(
      "http://localhost:5000/api/otherincome/save",
      {
        empName: formData.empName,
        month: formData.month,
        otherIncome,
        additionalIncome,
      }
    );

    alert("Other Income Saved Successfully");
  } catch (error) {
    console.log(error);
  }
};

const handleOtherIncomeEdit = () => {
  alert("Other Income Edit Mode");
};

const handleOtherIncomeUpdate = async () => {
  try {
    await axios.put(
      "http://localhost:5000/api/otherincome/update",
      {
        empName: formData.empName,
        month: formData.month,
        otherIncome,
        additionalIncome,
      }
    );

    alert("Other Income Updated");
  } catch (error) {
    console.log(error);
  }
};

const handleOtherIncomeDelete = async () => {
  try {
    await axios.delete(
      "http://localhost:5000/api/otherincome/delete",
      {
        data: {
          empName: formData.empName,
          month: formData.month,
        },
      }
    );

    alert("Other Income Deleted");
  } catch (error) {
    console.log(error);
  }
};



const handleSave = async () => {

  try {

    // const payload = {
    //   formData,
    //   earnings,
    //   deductions,
    //   grossEarnings,
    //   totalDeductions,
    //   netPay,
    // };
    if (!formData.empName || !formData.month) {

  alert("Employee Name and Month are required");

  return;
}
    
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:5000/api/salaryslip/save",
      {
        empName: formData.empName,
        designation: formData.designation,
        department: formData.department,
        month: formData.month,

        annualIncomeData,

        financialYear: formData.financialYear,
        retirementDate: formData.retirementDate,
        earnings,
        deductions,

        personalSalary, // save personal salary section
        otherEarnings,
        otherDeductions,

        capitalReceipt,
        additionalCapitalReceipts,

        otherIncome,
        additionalIncome,

        grossEarnings,
        totalDeductions,
        netPay,
      },
       {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
    );

    console.log(res.data);

    alert(res.data.message);
//     const savedData = {
//   month: formData.month,
//   earnings,
//   deductions,
//   grossEarnings,
//   totalDeductions,
//   netPay,
// };

const historyRes = await axios.get(
  "http://localhost:5000/api/salaryslip/history"
);

setSavedSalaryData(historyRes.data.data);
    setFormData({
  empName: "",
  designation: "",
  department: "",
  month: "",
  financialYear: "",
  retirementDate: "",
});

setEarnings([
  {
    label: "",
    amount: "",
  },
]);

setDeductions([
  {
    label: "",
    amount: "",
  },
]);


setPersonalSalary({
  overtimeAllowance: "",
  holidayAllowance: "",
  leaveEncashment: "",
  taAllowance: "",
  bonus: "",
  exgratia: "",
  arrears: "",
  loanTaken: "",
  loanRepayment: "",
  licPremium: "",
  houseLoanEMI: "",
  vehicleLoanEMI: "",
  otherDeduction: "",
  expectedEndDate: "",
  annualGrowthRate: "",
});

setOtherEarnings([
  { label: "", amount: "" }
]);

setOtherDeductions([
  { label: "", amount: "" }
]);

setOtherIncome({
  partTimeSalary: "",
  partTimeBusinessIncome: "",
  tuitionAmount: "",
  agriculturalIncome: "",
  extraOccupationalIncome: "",
  chitFundDividend: "",
  licCommission: "",
  shareTradingIncome: "",
  stockDividend: "",
  expectedEndDate: "",
  annualGrowthRate: "",
});

setAdditionalIncome([
  {
    label: "",
    amount: "",
  },
]);

setCapitalReceipt({
  saleOfHouseProperty: "",
  saleOfLandPlot: "",
  saleOfBusinessProperty: "",
  lumpSumReceiptChitFund: "",
  lumpSumReceiptDeposits: "",
  saleOfSharesDebentures: "",
  expectedEndDate: "",
  annualGrowthRate: "",
});

setAdditionalCapitalReceipts([
  {
    label: "",
    amount: "",
  },
]);

  } catch (error) {

    console.log(error);

    alert("Error Saving Salary Slip");

  }


 
};
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

  {/* LEFT COLUMN */}
  <div className="info-column">


    <p><strong>Emp Name:</strong><input type="text" name="empName"     value={formData.empName}
        onChange={handleChange}
        placeholder="Employee Name"
      />
    </p>

    <p>
      <strong>Designation:</strong>
      <input
        type="text"
        name="designation"
        value={formData.designation}
        onChange={handleChange}
        placeholder="e.g. Manager"
      />
    </p>

    <p>
      <strong>Department / Company:</strong>
      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="e.g. SCCL"
      />
    </p>

  </div>

  {/* RIGHT COLUMN */}
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

    <p>
      <strong>Retirement Date:</strong>
      <input
        type="date"
        name="retirementDate"
        value={formData.retirementDate}
        onChange={handleChange}
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



<hr className="section-divider" />
<div className="section-card">
  <h3 className="section-title">Personal Salary</h3>

  <PersonalSalary
    personalSalary={personalSalary}
    setPersonalSalary={setPersonalSalary}
    otherEarnings={otherEarnings}
    setOtherEarnings={setOtherEarnings}
    otherDeductions={otherDeductions}
    setOtherDeductions={setOtherDeductions}
  />

  {/* <div className="salary-actions-footer">
    ...
  </div>
</div> */}

<div className="salary-actions-footer">
  <button
    className="action-btn save"
    onClick={handlePersonalSave}
  >
    Save Personal Salary
  </button>

  <button
    className="action-btn edit"
    onClick={handlePersonalEdit}
  >
    Edit
  </button>

  <button
    className="action-btn update"
    onClick={handlePersonalUpdate}
  >
    Update
  </button>

  <button
    className="action-btn delete"
    onClick={handlePersonalDelete}
  >
    Delete
  </button>
</div>
</div>
<hr className="section-divider" />

<div className="section-card">
  <h3 className="section-title">Other Income</h3>

  <OtherIncome
    otherIncome={otherIncome}
    setOtherIncome={setOtherIncome}
    additionalIncome={additionalIncome}
    setAdditionalIncome={setAdditionalIncome}
  />

  {/* <div className="salary-actions-footer">
    ...
  </div>
</div> */}

<div className="salary-actions-footer">
  <button
    className="action-btn save"
    onClick={handleOtherIncomeSave}
  >
    Save Other Income
  </button>

  <button
    className="action-btn edit"
    onClick={handleOtherIncomeEdit}
  >
    Edit
  </button>

  <button
    className="action-btn update"
    onClick={handleOtherIncomeUpdate}
  >
    Update
  </button>

  <button
    className="action-btn delete"
    onClick={handleOtherIncomeDelete}
  >
    Delete
  </button>
</div>
</div>

<hr className="section-divider" />





<div className="section-card">
  <h3 className="section-title">Capital Receipt</h3>

  <CapitalReceipt
    capitalReceipt={capitalReceipt}
    setCapitalReceipt={setCapitalReceipt}
    additionalCapitalReceipts={additionalCapitalReceipts}
    setAdditionalCapitalReceipts={setAdditionalCapitalReceipts}
  />

  <div className="salary-actions-footer">
    <button className="action-btn save">Save Capital Receipt</button>

    <button className="action-btn edit">Edit</button>

    <button className="action-btn update">Update</button>

    <button className="action-btn delete">Delete</button>
  </div>
</div>

<hr className="section-divider" />
      

    </div>
  );
};

export default SalarySlip;