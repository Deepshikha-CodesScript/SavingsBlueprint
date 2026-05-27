import { useState } from "react";
import "../styles/styles.css";

const Income = () => {
  const initialState = {
    /* =========================
       EMPLOYEE DETAILS
    ========================= */
    employeeName: "",
    employeeId: "",
    companyName: "",
    designation: "",
    month: "",
    year: "",

    /* =========================
       EARNINGS
    ========================= */
    basicPay: "",
    hra: "",
    conveyance: "",
    medicalAllowance: "",
    specialAllowance: "",
    bonus: "",
    incentives: "",

    /* =========================
       DEDUCTIONS
    ========================= */
    professionalTax: "",
    withholdingTax: "",
    pf: "",
    advance: "",
    esi: "",
    loan: "",
    otherDeductions: "",

    /* =========================
       OTHER INCOME
    ========================= */
    businessIncome: "",
    rentalIncome: "",
    freelancingIncome: "",
    dividendIncome: "",
    interestIncome: "",
    sideIncome: "",
    agricultureIncome: "",
    otherSources: "",

    /* =========================
       GROWTH
    ========================= */
    previousYearIncome: "",
  };

  const [income, setIncome] = useState(initialState);

  /* =========================
      HANDLE CHANGE
  ========================= */
  const handleChange = (e) => {
    setIncome({
      ...income,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
      ACTION HANDLERS
  ========================= */
  const handleSave = () => {
    alert("Income Details Saved Successfully");
  };

  const handleEdit = () => {
    alert("You Can Now Edit Income Details");
  };

  const handleUpdate = () => {
    alert("Income Details Updated Successfully");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this income record?"
    );
    if (confirmDelete) {
      setIncome(initialState);
      alert("Income Record Deleted");
    }
  };

  /* =========================
      CALCULATIONS
  ========================= */
  const grossSalary =
    Number(income.basicPay || 0) +
    Number(income.hra || 0) +
    Number(income.conveyance || 0) +
    Number(income.medicalAllowance || 0) +
    Number(income.specialAllowance || 0) +
    Number(income.bonus || 0) +
    Number(income.incentives || 0);

  const totalDeductions =
    Number(income.professionalTax || 0) +
    Number(income.withholdingTax || 0) +
    Number(income.pf || 0) +
    Number(income.advance || 0) +
    Number(income.esi || 0) +
    Number(income.loan || 0) +
    Number(income.otherDeductions || 0);

  const netSalary = grossSalary - totalDeductions;

  const otherIncomeTotal =
    Number(income.businessIncome || 0) +
    Number(income.rentalIncome || 0) +
    Number(income.freelancingIncome || 0) +
    Number(income.dividendIncome || 0) +
    Number(income.interestIncome || 0) +
    Number(income.sideIncome || 0) +
    Number(income.agricultureIncome || 0) +
    Number(income.otherSources || 0);

  const monthlyIncome = netSalary + otherIncomeTotal;
  const yearlyIncome = monthlyIncome * 12;
  const [growthRate, setGrowthRate] = useState(5);

const projectedIncome5Years =
  yearlyIncome *
  Math.pow(1 + growthRate / 100, 5);
  const averageMonthlyIncome = yearlyIncome / 12;

  const yoyGrowth =
    income.previousYearIncome > 0
      ? (
          ((yearlyIncome - Number(income.previousYearIncome)) /
            Number(income.previousYearIncome)) *
          100
        ).toFixed(2)
      : 0;



  return (
    <div className="salary-slip-page">
      {/* INPUT FORM CONTAINER */}
      <div className="salary-form-container">
        <h2>Income & Salary Details Input</h2>
        <div className="salary-grid">
          {/* Employee Info Inputs */}
          <input type="text" name="employeeId" placeholder="Employee UID" value={income.employeeId} onChange={handleChange} />
          <input type="text" name="employeeName" placeholder="Employee Name" value={income.employeeName} onChange={handleChange} />
          <input type="text" name="designation" placeholder="Designation" value={income.designation} onChange={handleChange} />
          <input type="text" name="companyName" placeholder="Company Name" value={income.companyName} onChange={handleChange} />
          <input type="text" name="month" placeholder="Month" value={income.month} onChange={handleChange} />
          <input type="text" name="year" placeholder="Year" value={income.year} onChange={handleChange} />

          {/* Earnings Inputs */}
          <input type="number" name="basicPay" placeholder="Basic Pay" value={income.basicPay} onChange={handleChange} />
          <input type="number" name="hra" placeholder="House Rent Allowance" value={income.hra} onChange={handleChange} />
          <input type="number" name="conveyance" placeholder="Conveyance Allowance" value={income.conveyance} onChange={handleChange} />
          <input type="number" name="medicalAllowance" placeholder="Medical Allowance" value={income.medicalAllowance} onChange={handleChange} />
          <input type="number" name="specialAllowance" placeholder="Special Allowance" value={income.specialAllowance} onChange={handleChange} />
          <input type="number" name="bonus" placeholder="Bonus" value={income.bonus} onChange={handleChange} />
          <input type="number" name="incentives" placeholder="Incentives" value={income.incentives} onChange={handleChange} />

          {/* Deductions Inputs */}
          <input type="number" name="professionalTax" placeholder="Professional Tax" value={income.professionalTax} onChange={handleChange} />
          <input type="number" name="withholdingTax" placeholder="Withholding Tax" value={income.withholdingTax} onChange={handleChange} />
          <input type="number" name="pf" placeholder="Provident Fund" value={income.pf} onChange={handleChange} />
          <input type="number" name="advance" placeholder="Advance" value={income.advance} onChange={handleChange} />
          <input type="number" name="esi" placeholder="ESI" value={income.esi} onChange={handleChange} />
          <input type="number" name="loan" placeholder="Loan" value={income.loan} onChange={handleChange} />
          <input type="number" name="otherDeductions" placeholder="Other Deductions" value={income.otherDeductions} onChange={handleChange} />
        </div>

        {/* INTERACTION BUTTONS CONTAINER */}
        <div style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap" }}>
          <button onClick={handleSave} className="salary-slip-btn">Save</button>
          <button onClick={handleEdit} className="salary-slip-btn" style={{ backgroundColor: "#ef4444" }}>Edit</button>
          <button onClick={handleUpdate} className="salary-slip-btn" style={{ backgroundColor: "#10b981" }}>Update</button>
          <button onClick={handleDelete} className="salary-slip-btn" style={{ backgroundColor: "#6b7280" }}>Delete</button>
        </div>
      </div>

      {/* MODERN DISPLAY SALARY SLIP */}
      <div className="salary-slip-container">
        <div className="salary-slip-title">
          EMPLOYEE SALARY SLIP
          <div style={{ fontSize: "16px", marginTop: "5px", fontWeight: "400", letterSpacing: "1px" }}>
            Salary Statement For {income.month || "Month"} {income.year || "2025"}
          </div>
        </div>

        {/* EMPLOYEE DETAILS GRID */}
        <div className="employee-info">
          <div className="info-row">
            <div className="info-label">Employee No.</div>
            <div className="info-value">{income.employeeId || "-"}</div>
            <div className="info-label">Employee Name</div>
            <div className="info-value">{income.employeeName || "-"}</div>
          </div>
          <div className="info-row">
            <div className="info-label">Designation</div>
            <div className="info-value">{income.designation || "-"}</div>
            <div className="info-label">Company Name</div>
            <div className="info-value">{income.companyName || "-"}</div>
          </div>
          <div className="info-row">
            <div className="info-label">Month</div>
            <div className="info-value">{income.month || "-"}</div>
            <div className="info-label">Year</div>
            <div className="info-value">{income.year || "-"}</div>
          </div>
        </div>

        {/* ITEM DETAILS TABLE */}
        <div className="salary-table-main">
          <div className="table-header">
            <div>EARNINGS</div>
            <div>AMOUNT</div>
            <div>DEDUCTIONS</div>
            <div>AMOUNT</div>
          </div>

          <div className="table-body">
            {/* Earnings Item Labels */}
            <div className="table-column">
              <p>Basic Pay</p>
              <p>House Rent Allowance</p>
              <p>Conveyance Allowance</p>
              <p>Medical Allowance</p>
              <p>Special Allowance</p>
              <p>Bonus</p>
              <p>Incentives</p>
            </div>

            {/* Earnings Item Amounts */}
            <div className="table-column amount-column">
              <p>₹{income.basicPay || 0}</p>
              <p>₹{income.hra || 0}</p>
              <p>₹{income.conveyance || 0}</p>
              <p>₹{income.medicalAllowance || 0}</p>
              <p>₹{income.specialAllowance || 0}</p>
              <p>₹{income.bonus || 0}</p>
              <p>₹{income.incentives || 0}</p>
            </div>

            {/* Deductions Item Labels */}
            <div className="table-column">
              <p>Professional Tax</p>
              <p>Withholding Tax</p>
              <p>Provident Fund</p>
              <p>Advance</p>
              <p>ESI</p>
              <p>Loan</p>
              <p>Other Deductions</p>
            </div>

            {/* Deductions Item Amounts */}
            <div className="table-column amount-column">
              <p>₹{income.professionalTax || 0}</p>
              <p>₹{income.withholdingTax || 0}</p>
              <p>₹{income.pf || 0}</p>
              <p>₹{income.advance || 0}</p>
              <p>₹{income.esi || 0}</p>
              <p>₹{income.loan || 0}</p>
              <p>₹{income.otherDeductions || 0}</p>
            </div>
          </div>
        </div>

        {/* FINANCIAL SUMMARY TOTALS */}
        <div className="salary-footer">
          <div className="gross-box">
            <span>GROSS SALARY</span>
            <span>₹{grossSalary}</span>
          </div>
          <div className="net-box">
            <span>NET PAY</span>
            <span>₹{netSalary}</span>
          </div>
        </div>
      </div>

      {/* =========================
          OTHER INCOME & SUMMARY SECTION
      ========================= */}
      <div className="sb-income-grid" style={{ marginTop: "30px" }}>
        
        {/* OTHER INCOME INPUTS CARD */}
        <div className="sb-form-card">
          <h2 className="sb-summary-title" style={{ color: "#03045e", borderBottom: "2px solid #90e0ef", paddingBottom: "10px" }}>
            Other Income Sources
          </h2>
          <div className="salary-grid" style={{ marginTop: "15px" }}>
            <input type="number" name="businessIncome" placeholder="Business Income" value={income.businessIncome} onChange={handleChange} />
            <input type="number" name="rentalIncome" placeholder="Rental Income" value={income.rentalIncome} onChange={handleChange} />
            <input type="number" name="freelancingIncome" placeholder="Freelancing Income" value={income.freelancingIncome} onChange={handleChange} />
            <input type="number" name="dividendIncome" placeholder="Dividend Income" value={income.dividendIncome} onChange={handleChange} />
            <input type="number" name="interestIncome" placeholder="Interest Income" value={income.interestIncome} onChange={handleChange} />
            <input type="number" name="sideIncome" placeholder="Side Income" value={income.sideIncome} onChange={handleChange} />
            <input type="number" name="agricultureIncome" placeholder="Agriculture Income" value={income.agricultureIncome} onChange={handleChange} />
            <input type="number" name="otherSources" placeholder="Other Sources" value={income.otherSources} onChange={handleChange} />
          </div>
        </div>

        {/* METRICS & YOY SUMMARY CARD */}

<div className="sb-summary-card">

  <h2 className="sb-summary-title">
    Income Summary
  </h2>

  {/* INPUTS */}

  <div
    className="salary-grid"
    style={{
      gridTemplateColumns: "1fr",
      marginBottom: "15px",
    }}
  >

    <input
      type="number"
      name="previousYearIncome"
      placeholder="Previous Year Income"
      value={income.previousYearIncome}
      onChange={handleChange}
    />

    {/* NEW GROWTH RATE FIELD */}

    <input
      type="number"
      placeholder="Rate of Increase (%)"
      value={growthRate}
      onChange={(e) =>
        setGrowthRate(e.target.value)
      }
    />

  </div>

  {/* SUMMARY ITEMS */}

  <div className="sb-summary-item">
    <span>Net Monthly Salary</span>
    <strong>₹{netSalary}</strong>
  </div>

  <div className="sb-summary-item">
    <span>Other Income Sources Total</span>
    <strong>₹{otherIncomeTotal}</strong>
  </div>

  <div className="sb-summary-item">
    <span>Monthly Total Income</span>
    <strong>₹{monthlyIncome}</strong>
  </div>

  <div className="sb-summary-item">
    <span>Average Monthly Income</span>
    <strong>₹{averageMonthlyIncome}</strong>
  </div>

  <div className="sb-summary-item">
    <span>Yearly Projected Income</span>
    <strong>₹{yearlyIncome}</strong>
  </div>

  <div className="sb-summary-item">
    <span>Income After 5 Years</span>

    <strong style={{ color: "#0077b6" }}>
      ₹{projectedIncome5Years.toFixed(0)}
    </strong>
  </div>

  <div
    className="sb-summary-item"
    style={{ borderBottom: "none" }}
  >

    <span>YoY Growth Percentage</span>

    <strong
      style={{
        color:
          Number(yoyGrowth) >= 0
            ? "#0077b6"
            : "#d90429",
      }}
    >
      {yoyGrowth}%
    </strong>

  </div>

  {/* FINAL BANNER */}

  <div
    className="sb-total-income"
    style={{
      background:
        "linear-gradient(135deg, #023e8a, #03045e)",
    }}
  >

    <h3>
      TOTAL PROSPECTIVE INCOME
    </h3>

    <h1>
      ₹{projectedIncome5Years.toFixed(0)}
    </h1>

  </div>

</div>

      </div>
    </div>
  );
};

export default Income;