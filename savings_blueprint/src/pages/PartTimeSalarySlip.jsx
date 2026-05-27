import React from "react";
import "../styles/styles.css";

const PartTimeSalarySlip = ({
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
}) => {

  return (

    <>
    
      {/* HEADER */}

      <div className="header">

        <h2>
          THE SINGARENI COLLIERIES
          COMPANY LIMITED
        </h2>

        <p>
          EMPLOYEE SALARY DETAILS
          (PROVISIONAL)
        </p>

      </div>

      {/* TOP INFO */}

      <div className="top-info">

        <div>

          <p>

            <strong>EmpCode:</strong>

            <input
              type="text"
              name="empCode"
              value={formData.empCode}
              onChange={handleChange}
            />

          </p>

          <p>

            <strong>EmpName:</strong>

            <input
              type="text"
              name="empName"
              value={formData.empName}
              onChange={handleChange}
            />

          </p>

        </div>

        <div>

          <p>

            <strong>Month:</strong>

            <input
              type="text"
              name="month"
              value={formData.month}
              onChange={handleChange}
            />

          </p>

          <p>

            <strong>Financial Year:</strong>

            <input
              type="text"
              name="financialYear"
              value={formData.financialYear}
              onChange={handleChange}
            />

          </p>

        </div>

      </div>

      {/* MAIN BODY */}

      <div className="salary-body">

        {/* EARNINGS */}

        <div className="section earnings">

          <h3>Earnings</h3>

          <table>

            <tbody>

              {earnings.map(
                (item, index) => (

                  <tr key={index}>

                    <td>

                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) =>
                          handleEarningChange(
                            index,
                            "label",
                            e.target.value
                          )
                        }
                      />

                    </td>

                    <td>

                      <input
                        type="number"
                        value={item.amount}
                        onChange={(e) =>
                          handleEarningChange(
                            index,
                            "amount",
                            Number(
                              e.target.value
                            )
                          )
                        }
                      />

                    </td>

                    <td>

                      <button
                        onClick={() =>
                          removeEarningField(
                            index
                          )
                        }
                      >
                        ❌
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

          <button
            className="add-btn"
            onClick={addEarningField}
          >
            + Add Earning
          </button>

        </div>

        {/* DEDUCTIONS */}

        <div className="section deductions">

          <h3>Deductions</h3>

          <table>

            <tbody>

              {deductions.map(
                (item, index) => (

                  <tr key={index}>

                    <td>

                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) =>
                          handleDeductionChange(
                            index,
                            "label",
                            e.target.value
                          )
                        }
                      />

                    </td>

                    <td>

                      <input
                        type="number"
                        value={item.amount}
                        onChange={(e) =>
                          handleDeductionChange(
                            index,
                            "amount",
                            Number(
                              e.target.value
                            )
                          )
                        }
                      />

                    </td>

                    <td>

                      <button
                        onClick={() =>
                          removeDeductionField(
                            index
                          )
                        }
                      >
                        ❌
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

          <button
            className="add-btn"
            onClick={addDeductionField}
          >
            + Add Deduction
          </button>

        </div>

        {/* SUMMARY */}

        <div className="section summary">

          <h3>Summary</h3>

          <table>

            <tbody>

              <tr>

                <td>Gross Earnings</td>

                <td>
                  {grossEarnings.toFixed(2)}
                </td>

              </tr>

              <tr>

                <td>
                  Total Deductions
                </td>

                <td>
                  {totalDeductions.toFixed(
                    2
                  )}
                </td>

              </tr>

              <tr>

                <td>Net Pay</td>

                <td>
                  {netPay.toFixed(2)}
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </>

  );
};

export default PartTimeSalarySlip;