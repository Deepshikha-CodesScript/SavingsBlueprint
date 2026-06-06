import React from "react";

const OtherIncome = ({
  otherIncome,
  setOtherIncome,
  additionalIncome,
  setAdditionalIncome,
}) => {

  const handleFixedChange = (e) => {
    const { name, value } = e.target;

    setOtherIncome((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdditionalChange = (index, field, value) => {
    const updated = [...additionalIncome];
    updated[index][field] = value;
    setAdditionalIncome(updated);
  };

  const addIncomeField = () => {
    setAdditionalIncome([
      ...additionalIncome,
      { label: "", amount: "" },
    ]);
  };

  const removeIncomeField = (index) => {
    setAdditionalIncome(
      additionalIncome.filter((_, i) => i !== index)
    );
  };

  const fixedIncomeTotal =
    Number(otherIncome.partTimeSalary || 0) +
    Number(otherIncome.partTimeBusinessIncome || 0) +
    Number(otherIncome.tuitionAmount || 0) +
    Number(otherIncome.agriculturalIncome || 0) +
    Number(otherIncome.extraOccupationalIncome || 0) +
    Number(otherIncome.chitFundDividend || 0) +
    Number(otherIncome.licCommission || 0) +
    Number(otherIncome.shareTradingIncome || 0) +
    Number(otherIncome.stockDividend || 0);

  const additionalIncomeTotal = additionalIncome.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const totalOtherIncome =
    fixedIncomeTotal + additionalIncomeTotal;

  return (
    <div className="personal-salary-container">

      <h3>Other Income Details</h3>

      <div className="salary-breakdown-wrapper">

        <div className="breakdown-column earnings-side">

          <h4>Other Income Sources</h4>

          <input
            type="number"
            name="partTimeSalary"
            value={otherIncome.partTimeSalary}
            onChange={handleFixedChange}
            placeholder="Part Time Job Salary"
          />

          <input
            type="number"
            name="partTimeBusinessIncome"
            value={otherIncome.partTimeBusinessIncome}
            onChange={handleFixedChange}
            placeholder="Part Time Business Income"
          />

          <input
            type="number"
            name="tuitionAmount"
            value={otherIncome.tuitionAmount}
            onChange={handleFixedChange}
            placeholder="Tuition Amount"
          />

          <input
            type="number"
            name="agriculturalIncome"
            value={otherIncome.agriculturalIncome}
            onChange={handleFixedChange}
            placeholder="Agricultural Income"
          />

          <input
            type="number"
            name="extraOccupationalIncome"
            value={otherIncome.extraOccupationalIncome}
            onChange={handleFixedChange}
            placeholder="Extra Occupational Income"
          />

          <input
            type="number"
            name="chitFundDividend"
            value={otherIncome.chitFundDividend}
            onChange={handleFixedChange}
            placeholder="Chit Fund Dividend"
          />

          <input
            type="number"
            name="licCommission"
            value={otherIncome.licCommission}
            onChange={handleFixedChange}
            placeholder="LIC / Other Commission"
          />

          <input
            type="number"
            name="shareTradingIncome"
            value={otherIncome.shareTradingIncome}
            onChange={handleFixedChange}
            placeholder="Share Trading Income"
          />

          <input
            type="number"
            name="stockDividend"
            value={otherIncome.stockDividend}
            onChange={handleFixedChange}
            placeholder="Stock Dividend"
          />

        </div>

        <div className="breakdown-column deductions-side">

          <h4>Additional Income Sources</h4>

          {additionalIncome.map((item, index) => (
            <div className="dynamic-row-item" key={index}>

              <input
                type="text"
                className="input-label"
                value={item.label}
                placeholder="Income Head"
                onChange={(e) =>
                  handleAdditionalChange(
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
                  handleAdditionalChange(
                    index,
                    "amount",
                    e.target.value
                  )
                }
              />

              <button
                className="delete-row-btn"
                onClick={() => removeIncomeField(index)}
              >
                ✕
              </button>

            </div>
          ))}

          <button
            className="add-row-btn"
            onClick={addIncomeField}
          >
            + Add Income Head
          </button>

        </div>

      </div>

      <div className="salary-totals-summary">

        <div className="total-block">
          <span>Total Other Income:</span>
          <strong>₹ {totalOtherIncome.toFixed(2)}</strong>
        </div>

      </div>
      <h4>Other Income Projection</h4>

<div className="forecast-section">

  <input
    type="date"
    value={otherIncome.expectedEndDate}
    onChange={(e) =>
      setOtherIncome({
        ...otherIncome,
        expectedEndDate: e.target.value,
      })
    }
  />

  <input
    type="number"
    placeholder="Annual Growth Rate (%)"
    value={otherIncome.annualGrowthRate}
    onChange={(e) =>
      setOtherIncome({
        ...otherIncome,
        annualGrowthRate: e.target.value,
      })
    }
  />

</div>

    </div>
  );
};

export default OtherIncome;