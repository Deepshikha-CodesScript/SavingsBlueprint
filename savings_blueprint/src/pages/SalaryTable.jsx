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
const salaryData = salaryHistory.length > 0 ? salaryHistory : savedSalaryData;
console.log("salaryData =", salaryData);
const columns = React.useMemo(() => {
  if (!salaryData?.length) return [];
  const firstRecord = salaryData[0];
  return [
    ...(firstRecord.earnings || []).map((item) => ({
      key: "earnings",
      label: item.label,
    })),
    ...(firstRecord.deductions || []).map((item) => ({
      key: "deductions",
      label: item.label,
      isDeduction: true,
    })),
  ];
}, [salaryData]); 
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

   const [salaryHistory, setSalaryHistory] =  useState([]);
  

  
  useEffect(() => {fetchSalaryHistory();}, []);
useEffect(() => {console.log("Salary History:", salaryData);}, [salaryData]);
const fetchSalaryHistory = async () => {

  try {
     const token = localStorage.getItem("token");
     console.log("Token:", token);
     const res = await axios.get(
      "http://localhost:5000/api/salaryslip/history",
         {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setSalaryHistory(res.data.data);
  } catch (error) {
    console.log(error);
  }
};

const getMonthData = (monthName) => {
  return salaryData.find(
    (item) => item.month === monthName
  );
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
salaryData.forEach((item) => {console.log("Saved month:", item.month);});
const savedMonth =salaryData.find((item) =>item.month?.trim().toLowerCase() === month?.trim().toLowerCase());
console.log("Current Row Month:", month);
console.log("Found Record:", savedMonth);
if (savedMonth) {console.log("MATCH FOUND:",month,savedMonth.netPay);
}
const rowData = {
  earnings: {},
  deductions: {},
};

savedMonth?.earnings?.forEach((e) => {rowData.earnings[e.label?.trim().toLowerCase()] =Number(e.amount);});

savedMonth?.deductions?.forEach((d) => {
rowData.deductions[d.label] = Number(d.amount);
});

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

                    const value =
  rowData[col.key]?.[col.label] || "";

                    return (
                      <td key={cIdx}>

                        <input
                          type="number"
                          className={`row-style-input ${
                            col.isDeduction
                              ? "text-deduction"
                              : ""
                          } ${
                            col.isIncome
                              ? "text-income"
                              : ""
                          }`}
                          placeholder="- "
                          value={
                            value === 0
                              ? ""
                              : value
                          }
                          onChange={(e) =>
                            handleAnnualDataChange(
                              mIndex,
                              col.key,
                              col.label,
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

                const total =
                  getVerticalColumnTotal(
                    col.key,
                    col.label
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