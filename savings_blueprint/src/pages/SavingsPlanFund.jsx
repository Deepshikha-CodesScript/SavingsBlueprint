// src/pages/SavingsPlanFund.jsx

import { useState } from "react";
import "../styles/styles.css";

const SavingsPlanFund = () => {

  /* =================================
      STATE
  ================================= */

  const [data, setData] = useState({

    monthlyIncome: "",
    previousYearIncome: "",

  });

  const [growthRate, setGrowthRate] = useState(5);

  const [savingPercentage, setSavingPercentage] = useState(30);

  /* =================================
      HANDLE CHANGE
  ================================= */

  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  };

  /* =================================
      CALCULATIONS
  ================================= */

  const monthlyIncome =
    Number(data.monthlyIncome || 0);

  const yearlyIncome =
    monthlyIncome * 12;

  const averageMonthlyIncome =
    yearlyIncome / 12;

  const yoyGrowth =
    data.previousYearIncome > 0
      ? (
          ((yearlyIncome -
            Number(
              data.previousYearIncome
            )) /
            Number(
              data.previousYearIncome
            )) *
          100
        ).toFixed(2)
      : 0;

  /* =================================
      SAVINGS PLANNING
  ================================= */

  const monthlySaving =
    (monthlyIncome *
      savingPercentage) /
    100;

  const yearlySaving =
    monthlySaving * 12;

  /* =================================
      FUTURE SAVINGS TABLE
  ================================= */

  const futureSavingsTable = [];

  for (let i = 1; i <= 5; i++) {

    const projectedYearlyIncome =
      yearlyIncome *
      Math.pow(
        1 + growthRate / 100,
        i
      );

    const projectedMonthlyIncome =
      projectedYearlyIncome / 12;

    const projectedMonthlySaving =
      (projectedMonthlyIncome *
        savingPercentage) /
      100;

    futureSavingsTable.push({

      year: 2025 + i,

      monthlyIncome:
        projectedMonthlyIncome,

      monthlySaving:
        projectedMonthlySaving,

      savingPercent:
        savingPercentage,

    });

  }

  return (

    <div className="income-page">

      {/* =================================
          TITLE
      ================================= */}

      <h1 className="income-main-title">
        Savings Plans & Funds
      </h1>

      {/* =================================
          INPUT SECTION
      ================================= */}

      <div className="future-savings-card">

        <div className="future-savings-top">

          <div className="future-input-box">

            <label>
              Monthly Income
            </label>

            <input
              type="number"
              name="monthlyIncome"
              placeholder="Enter Monthly Income"
              value={data.monthlyIncome}
              onChange={handleChange}
            />

          </div>

          <div className="future-input-box">

            <label>
              Previous Year Income
            </label>

            <input
              type="number"
              name="previousYearIncome"
              placeholder="Enter Previous Year Income"
              value={
                data.previousYearIncome
              }
              onChange={handleChange}
            />

          </div>

          <div className="future-input-box">

            <label>
              Income Growth Rate (%)
            </label>

            <input
              type="number"
              value={growthRate}
              onChange={(e) =>
                setGrowthRate(
                  e.target.value
                )
              }
            />

          </div>

          <div className="future-input-box">

            <label>
              Saving Percentage (%)
            </label>

            <input
              type="number"
              value={savingPercentage}
              onChange={(e) =>
                setSavingPercentage(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        {/* =================================
            SUMMARY CARDS
        ================================= */}

        <div className="future-saving-summary">

          <div className="future-summary-box">

            <span>
              Monthly Saving
            </span>

            <h3>
              ₹
              {monthlySaving.toFixed(
                0
              )}
            </h3>

          </div>

          <div className="future-summary-box">

            <span>
              Yearly Saving
            </span>

            <h3>
              ₹
              {yearlySaving.toFixed(
                0
              )}
            </h3>

          </div>

          <div className="future-summary-box">

            <span>
              Average Monthly Income
            </span>

            <h3>
              ₹
              {averageMonthlyIncome.toFixed(
                0
              )}
            </h3>

          </div>

          <div className="future-summary-box">

            <span>
              YoY Growth
            </span>

            <h3>
              {yoyGrowth}%
            </h3>

          </div>

        </div>

        {/* =================================
            TABLE
        ================================= */}

        <div className="future-table-wrapper">

          <table className="future-table">

            <thead>

              <tr>

                <th>Year</th>

                <th>
                  Monthly Income
                </th>

                <th>
                  Monthly Saving
                </th>

                <th>
                  Saving %
                </th>

              </tr>

            </thead>

            <tbody>

              {futureSavingsTable.map(
                (item, index) => (

                  <tr key={index}>

                    <td>
                      {item.year}
                    </td>

                    <td>
                      ₹
                      {item.monthlyIncome.toFixed(
                        0
                      )}
                    </td>

                    <td>
                      ₹
                      {item.monthlySaving.toFixed(
                        0
                      )}
                    </td>

                    <td>
                      {
                        item.savingPercent
                      }
                      %
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default SavingsPlanFund; 