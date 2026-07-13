import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/styles.css";
const SalaryTable = ({
  months,
  earnings,
  mandatoryDeductions,
  personalDeductions,
  otherIncomeHeads,
  capitalReceiptHeads,
  annualIncomeData,
  handleAnnualDataChange,
  savedSalaryData,
}) => {
  console.log("SalaryTable Props:", {
    months,
    earnings,
    mandatoryDeductions,
    personalDeductions,
    otherIncomeHeads,
    capitalReceiptHeads,
    annualIncomeData,
    savedSalaryData
  });

  const [salaryHistory, setSalaryHistory] = useState([]);
  const salaryData = salaryHistory.length > 0 ? salaryHistory : (savedSalaryData || []);
  console.log("salaryData =", salaryData);
const columns = React.useMemo(() => {
  const earningMap = new Map();
  const deductionMap = new Map();
  // Fixed Personal Salary Earnings
  const personalEarningFields = [
    { key: "overtimeAllowance", label: "Overtime Allowance" },
    { key: "holidayAllowance", label: "Holiday Allowance" },
    { key: "leaveEncashment", label: "Leave Encashment" },
    { key: "taAllowance", label: "TA Allowance" },
    { key: "bonus", label: "Bonus" },
    { key: "exgratia", label: "Exgratia" },
    { key: "arrears", label: "Arrears" },
    { key: "loanTaken", label: "Loan Taken" }
  ];

  // Fixed Personal Salary Deductions
  const personalDeductionFields = [
    { key: "loanRepayment", label: "Loan Repayment / EMI" },
    { key: "licPremium", label: "LIC Premium" },
    { key: "houseLoanEMI", label: "House Loan EMI" },
    { key: "vehicleLoanEMI", label: "Vehicle Loan EMI" },
    { key: "otherDeduction", label: "Other Deduction" }
  ];

  // Generate columns from props (earnings, deductions, etc.)
  (earnings || []).forEach(item => {
    const label = typeof item === 'string' ? item : (item.label || (typeof item === 'object' ? 'Unnamed' : item));
    if (label && typeof label === 'string') {
      earningMap.set(label, {
        key: "earnings",
        label: label,
        isIncome: true
      });
    }
  });

  (mandatoryDeductions || []).forEach(item => {
    const label = typeof item === 'string' ? item : (item.label || (typeof item === 'object' ? 'Unnamed' : item));
    if (label && typeof label === 'string') {
      deductionMap.set(label, {
        key: "deductions",
        label: label,
        isDeduction: true
      });
    }
  });

  (personalDeductions || []).forEach(item => {
    const label = typeof item === 'string' ? item : (item.label || (typeof item === 'object' ? 'Unnamed' : item));
    if (label && typeof label === 'string') {
      deductionMap.set(label, {
        key: "deductions",
        label: label,
        isDeduction: true
      });
    }
  });

  (otherIncomeHeads || []).forEach(item => {
    const label = typeof item === 'string' ? item : (item.label || (typeof item === 'object' ? 'Unnamed' : item));
    if (label && typeof label === 'string') {
      earningMap.set(label, {
        key: "otherIncome",
        label: label,
        isIncome: true
      });
    }
  });

  (capitalReceiptHeads || []).forEach(item => {
    const label = typeof item === 'string' ? item : (item.label || (typeof item === 'object' ? 'Unnamed' : item));
    if (label && typeof label === 'string') {
      earningMap.set(label, {
        key: "capitalReceipt",
        label: label,
        isIncome: true
      });
    }
  });

  console.log("Columns generated:", Array.from(earningMap.values()), Array.from(deductionMap.values()));

  // Salary Slip Earnings from saved data
  salaryData.forEach(record => {
    (record.earnings || []).forEach(item => {
      const label = typeof item === 'string' ? item : (item.label || (typeof item === 'object' ? 'Unnamed' : item));
      if (label && typeof label === 'string') {
        earningMap.set(label, {
          key: "earnings",
          label: label,
          isIncome: true
        });
      }
    });

    (record.deductions || []).forEach(item => {
      const label = typeof item === 'string' ? item : (item.label || (typeof item === 'object' ? 'Unnamed' : item));
      if (label && typeof label === 'string') {
        deductionMap.set(label, {
          key: "deductions",
          label: label,
          isDeduction: true
        });
      }
    });

    // Dynamic Personal Other Earnings
    (record.otherEarnings || []).forEach(item => {
      const label = typeof item === 'string' ? item : (item.label || (typeof item === 'object' ? 'Unnamed' : item));
      if (label && typeof label === 'string') {
        earningMap.set(label, {
          key: "otherEarnings",
          label: label,
          isIncome: true
        });
      }
    });

    // Dynamic Personal Other Deductions
    (record.otherDeductions || []).forEach(item => {
      const label = typeof item === 'string' ? item : (item.label || (typeof item === 'object' ? 'Unnamed' : item));
      if (label && typeof label === 'string') {
        deductionMap.set(label, {
          key: "otherDeductions",
          label: label,
          isDeduction: true
        });
      }
    });
Object.keys(record.otherIncome || {}).forEach(key => {
    earningMap.set(key, {
        key: "otherIncome",
        label: key,
        isIncome: true,
    });
});

   Object.keys(record.capitalReceipt || {}).forEach(key => {
    earningMap.set(key, {
        key: "capitalReceipt",
        label: key,
        isIncome: true,
    });
});
  });

  return [
    ...Array.from(earningMap.values()),
  ...personalEarningFields.map(f => ({
    category: "personalSalary",
    key: f.key,
    label: f.label,
    isIncome: true
})),
...personalDeductionFields.map(f => ({
    category: "personalSalary",
    key: f.key,
    label: f.label,
    isDeduction: true
})),

    ...Array.from(deductionMap.values()),

    ];
}, [salaryData, earnings, mandatoryDeductions, personalDeductions, otherIncomeHeads, capitalReceiptHeads]);

useEffect(() => {
  console.log("Generated columns:", columns);
  console.log("Props - earnings:", earnings);
  console.log("Props - mandatoryDeductions:", mandatoryDeductions);
  console.log("Props - personalDeductions:", personalDeductions);
  console.log("Props - otherIncomeHeads:", otherIncomeHeads);
  console.log("Props - capitalReceiptHeads:", capitalReceiptHeads);
  console.log("Total columns count:", columns.length);
}, [columns]);


const getVerticalColumnTotal = (category, subField) => {
    return months.reduce((totalSum, _, mIndex) => {
      return (
        totalSum +
        Number(
          annualIncomeData[mIndex]?.[category]?.[subField] || 0
        )
      );
    }, 0);
  };

  const calcSumAllMonths = (cat, items) =>
    items.reduce(
      (s, i) =>
        s + getVerticalColumnTotal(cat, i.label || i),
      0
    );

  const grandEarnTotal = calcSumAllMonths(
    "earnings",
    earnings
  );

  const grandDeductTotal =
    calcSumAllMonths(
      "mandatory",
      mandatoryDeductions
    ) +
    calcSumAllMonths(
      "personal",
      personalDeductions
    );

  const grandOtherTotal = calcSumAllMonths(
    "otherIncome",
    otherIncomeHeads
  );

  const grandCapTotal = calcSumAllMonths(
    "capitalReceipt",
    capitalReceiptHeads
  );

  const grandNetSalary =
    grandEarnTotal -
    grandDeductTotal +
    grandOtherTotal;

  const grandTaxExemption =
    getVerticalColumnTotal(
      "taxExemption",
      "value"
    );

  useEffect(() => {fetchSalaryHistory();}, []);
useEffect(() => {console.log("Salary History:", salaryData);}, [salaryData]);
const fetchSalaryHistory = async () => {
  try {
     const token = localStorage.getItem("token");
     console.log("Token:", token);
     const res = await axios.get(
      "http://localhost:5000/api/salaryslip/history",{headers: {Authorization: `Bearer ${token}`,},});
    setSalaryHistory(res.data?.data || []);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="advanced-income-section">
      <h2>Actual Salary And Income</h2>
      <div className="advanced-table-wrapper">
        <table className="advanced-income-table">
          <thead>
            <tr>
              <th>Month</th>
              {columns.map((col, idx) => (
                <th key={idx}>{col.label}</th>
              ))}
              <th>Tax Exemption</th>
              <th>Total Earnings</th>
              <th>Total Deductions</th>
              <th>Other Income</th>
              <th>Capital Receipt</th>
              <th>Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {months.map((month, mIndex) => {
console.log("Table month:", month);
salaryData?.forEach((item) => {
  console.log("Saved month:", item.month);
});
const savedMonth = salaryData?.find((item) =>
    item.month?.trim().toLowerCase() ===
    month?.trim().toLowerCase()
);
console.log("Current Row Month:", month);
console.log("Found Record:", savedMonth);
if (savedMonth) {console.log("MATCH FOUND:",month,savedMonth.netPay);
}

const rowData = {earnings: {}, deductions: {}, otherEarnings: {}, otherDeductions: {}, otherIncome: {}, capitalReceipt: {}, personalSalary: {}, taxExemption: {}};

// Populate from saved salary data
savedMonth?.earnings?.forEach((e) => {    rowData.earnings[e.label] = Number(e.amount);    });
savedMonth?.deductions?.forEach((d) => {       rowData.deductions[d.label] = Number(d.amount);    });
savedMonth?.otherEarnings?.forEach((e) => {         rowData.otherEarnings[e.label] = Number(e.amount);   });
savedMonth?.otherDeductions?.forEach((d) => {rowData.otherDeductions[d.label] = Number(d.amount);});
Object.entries(savedMonth?.otherIncome || {}).forEach(([key, value]) => {
    rowData.otherIncome[key] = Number(value);});

Object.entries(savedMonth?.capitalReceipt || {}).forEach(([key, value]) => {
    rowData.capitalReceipt[key] = Number(value);});

rowData.taxExemption = savedMonth?.taxExemption || {};    
rowData.personalSalary = savedMonth?.personalSalary || {};

// Populate from annualIncomeData (props-based data)
const monthData = annualIncomeData[mIndex] || {};
console.log("Month Data for", month, ":", monthData);

if (monthData.earnings) {
  Object.keys(monthData.earnings).forEach(key => {
    rowData.earnings[key] = monthData.earnings[key];
  });
}
if (monthData.mandatory || monthData.personal) {
  const deductionsData = { ...monthData.mandatory, ...monthData.personal };
  Object.keys(deductionsData).forEach(key => {
    rowData.deductions[key] = deductionsData[key];
  });
}
if (monthData.otherIncome) {
  // Map component data keys to table column labels
  const otherIncomeMapping = {
    partTimeSalary: "Part Time Job",
    partTimeBusinessIncome: "Business Income",
    agriculturalIncome: "Agriculture Income",
    licCommission: "LIC Commission",
    shareTradingIncome: "Dividend",
    stockDividend: "Dividend",
    extraOccupationalIncome: "Freelancing",
    chitFundDividend: "Freelancing",
    tuitionAmount: "Freelancing"
  };

  Object.keys(monthData.otherIncome).forEach(key => {
    const label = otherIncomeMapping[key] || key;
    rowData.otherIncome[label] = monthData.otherIncome[key];
  });
}
if (monthData.capitalReceipt) {
  // Map component data keys to table column labels
  const capitalReceiptMapping = {
    saleOfHouseProperty: "Sale Of Property",
    saleOfLandPlot: "Sale Of Land",
    saleOfBusinessProperty: "Sale Of Property",
    saleOfSharesDebentures: "Capital Gain",
    lumpSumReceiptChitFund: "Capital Gain",
    lumpSumReceiptDeposits: "Capital Gain"
  };

  Object.keys(monthData.capitalReceipt).forEach(key => {
    const label = capitalReceiptMapping[key] || key;
    rowData.capitalReceipt[label] = monthData.capitalReceipt[key];
  });
}
if (monthData.personalSalary) {
  Object.keys(monthData.personalSalary).forEach(key => {
    rowData.personalSalary[key] = monthData.personalSalary[key];
  });
}
if (monthData.taxExemption) {
  rowData.taxExemption = monthData.taxExemption;
}

console.log("Row Data for", month, ":", rowData);

console.log("Table Month:", month);
console.log("Saved Data:", salaryData);



              const calcSum = (cat, items) =>
                items.reduce(
                  (s, i) =>
                    s +
                    Number(
                      rowData[cat]?.[
                        i.label || i
                      ] || 0
                    ),
                  0
                );



                const earnTotal = savedMonth?.grossEarnings || 0;
                const deductTotal = savedMonth?.totalDeductions || 0;
                const netSalary = savedMonth?.netPay || 0;

              

              const otherTotal = calcSum(
                "otherIncome",
                otherIncomeHeads
              );

              const capTotal = calcSum(
                "capitalReceipt",
                capitalReceiptHeads
              );


     


              // const netSalary =
              //   earnTotal -
              //   deductTotal +
              //   otherTotal;

              return (
                <tr
                  key={mIndex}
                  className="table-row-strip"
                >

                  <td className="month-label-cell">
                    <strong>{month}</strong>
                  </td>

                 {columns.map((col, cIdx) => {
  let value = "";

  if (col.category === "personalSalary") {
    value = rowData.personalSalary?.[col.key] ?? "";
  } else if (col.key === "earnings") {
    value = rowData.earnings?.[col.label] ?? "";
  } else if (col.key === "deductions") {
    value = rowData.deductions?.[col.label] ?? "";
  } else if (col.key === "otherEarnings") {
    value = rowData.otherEarnings?.[col.label] ?? "";
  } else if (col.key === "otherDeductions") {
    value = rowData.otherDeductions?.[col.label] ?? "";
  } else if (col.key === "otherIncome") {
    value = rowData.otherIncome?.[col.label] ?? "";
  } else if (col.key === "capitalReceipt") {
    value = rowData.capitalReceipt?.[col.label] ?? "";
  }

  return (
    <td key={cIdx}>
      <input
        type="number"
        className={`row-style-input ${
          col.isDeduction ? "text-deduction" : ""
        } ${col.isIncome ? "text-income" : ""}`}
        placeholder="-"
        value={value}
        onChange={(e) =>
          handleAnnualDataChange(
            mIndex,
            col.category || col.key,
            col.category ? col.key : col.label,
            e.target.value
          )
        }
      />
    </td>
  );
})}
                  <td>

                    <input
                      type="number"
                      className="row-style-input"
                      placeholder="- "
                      value={
                        rowData.taxExemption
                          ?.value || ""
                      }
                      onChange={(e) =>
                        handleAnnualDataChange(
                          mIndex,
                          "taxExemption",
                          "value",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  <td className="calculated-val">
                    {earnTotal
                      ? `₹${earnTotal.toFixed(2)}`
                      : "-"}
                  </td>

                  <td className="calculated-val text-deduction">
                    {deductTotal
                      ? `₹${deductTotal.toFixed(2)}`
                      : "-"}
                  </td>

                  <td className="calculated-val text-income">
                    {otherTotal
                      ? `₹${otherTotal.toFixed(2)}`
                      : "-"}
                  </td>

                  <td className="calculated-val">
                    {capTotal
                      ? `₹${capTotal.toFixed(2)}`
                      : "-"}
                  </td>

                  <td className="calculated-val final-net-total">
                    {netSalary
                      ? `₹${netSalary.toFixed(2)}`
                      : "-"}
                  </td>

                </tr>
              );
            })}

          </tbody>

          <tfoot>
            <tr className="table-total-row-strip">
              <td className="month-label-cell">
                <strong>Yearly Total</strong>
              </td>

              {columns.map((col, idx) => {
                const total = getVerticalColumnTotal(
    col.category || col.key,
    col.category ? col.key : col.label
);

                return (
                  <td
                    key={`total-${idx}`}
                    className={`calculated-val font-bold ${
                      col.isDeduction
                        ? "text-deduction"
                        : ""
                    } ${
                      col.isIncome
                        ? "text-income"
                        : ""
                    }`}
                  >
                    {total
                      ? `₹${total.toFixed(2)}`
                      : "-"}
                  </td>
                );
              })}

              <td className="calculated-val font-bold">
                {grandTaxExemption
                  ? `₹${grandTaxExemption.toFixed(
                      2
                    )}`
                  : "-"}
              </td>

              <td className="calculated-val font-bold">
                ₹{grandEarnTotal.toFixed(2)}
              </td>

              <td className="calculated-val text-deduction font-bold">
                ₹{grandDeductTotal.toFixed(2)}
              </td>

              <td className="calculated-val text-income font-bold">
                ₹{grandOtherTotal.toFixed(2)}
              </td>

              <td className="calculated-val font-bold">
                ₹{grandCapTotal.toFixed(2)}
              </td>

              <td className="calculated-val final-net-total grand-total-highlight">
                ₹{grandNetSalary.toFixed(2)}
              </td>

            </tr>

          </tfoot>

        </table>

      </div>

      {/* =========================================
          SAVED SALARY SLIPS TABLE
      ========================================= */}

      <div className="saved-salary-table-wrapper">

        <h2>Saved Salary Slips</h2>

        <table
          border="1"
          className="saved-salary-table"
        >

          <thead>

            <tr>
              <th>Month</th>
              <th>Gross Earnings</th>
              <th>Total Deductions</th>
              <th>Net Pay</th>
            </tr>

          </thead>

          <tbody>

           {salaryData?.length > 0 ? (
              salaryData.map(
                (item, index) => (
                  <tr key={index}>
                    <td>{item.month}</td>
                    <td>₹ {item.grossEarnings}</td>
                    <td>₹ {item.totalDeductions}</td>
                    <td>₹ {item.netPay}</td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan="4">
                  No Salary Slips Saved
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryTable;