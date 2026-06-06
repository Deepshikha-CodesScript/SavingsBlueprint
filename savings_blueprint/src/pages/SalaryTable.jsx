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

  const columns = [
    ...earnings.map((item) => ({
      key: "earnings",
      label: item.label,
    })),

    ...mandatoryDeductions.map((label) => ({
      key: "mandatory",
      label,
      isDeduction: true,
    })),

    ...personalDeductions.map((label) => ({
      key: "personal",
      label,
      isDeduction: true,
    })),

    ...otherIncomeHeads.map((label) => ({
      key: "otherIncome",
      label,
      isIncome: true,
    })),

    ...capitalReceiptHeads.map((label) => ({
      key: "capitalReceipt",
      label,
    })),
  ];

 
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

   const [salaryHistory, setSalaryHistory] =
  useState([]);

  
  useEffect(() => {

  fetchSalaryHistory();

}, []);

const fetchSalaryHistory = async () => {

  try {

     const token = localStorage.getItem("token");

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

              const rowData =
                annualIncomeData[mIndex] || {};

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

              const earnTotal = calcSum(
                "earnings",
                earnings
              );

              const deductTotal =
                calcSum(
                  "mandatory",
                  mandatoryDeductions
                ) +
                calcSum(
                  "personal",
                  personalDeductions
                );

              const otherTotal = calcSum(
                "otherIncome",
                otherIncomeHeads
              );

              const capTotal = calcSum(
                "capitalReceipt",
                capitalReceiptHeads
              );

              const netSalary =
                earnTotal -
                deductTotal +
                otherTotal;

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
                      rowData[col.key]?.[
                        col.label
                      ] || "";

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

           {savedSalaryData?.length > 0 ? (
              savedSalaryData.map(
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