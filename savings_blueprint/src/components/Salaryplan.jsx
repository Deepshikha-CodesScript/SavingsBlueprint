import { useState } from 'react';
import '../styles/styles.css';

function SalaryPlan() {

  const [salary, setSalary] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(30);

  const plans = [
    {
      name: 'Basic Plan',
      percentage: 12
    },
    {
      name: 'Standard Plan',
      percentage: 15
    },
    {
      name: 'Advanced Plan',
      percentage: 30
    }
  ];

  const monthlySavings =
    Number(salary || 0) * (selectedPlan / 100);

  const yearlySavings = monthlySavings * 12;

  return (
    <div className="sb-container">

      {/* Header */}
      <div className="sb-page-header">

        <h1 className="sb-page-title">
          Salary Planning
        </h1>

        <p className="sb-page-subtitle">
          Create smart salary savings plans for your future.
        </p>

      </div>

      <div className="sb-plan-grid">

        {/* Form Section */}
        <div className="sb-form-card">

          <div className="sb-form-group">
            <label className="sb-label">
              Monthly Salary
            </label>

            <input
              type="number"
              className="sb-input"
              placeholder="Enter monthly salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>

          <div className="sb-form-group">
            <label className="sb-label">
              Select Saving Plan
            </label>

            <div className="sb-plan-cards">

              {plans.map((plan, index) => (

                <div
                  key={index}
                  className={
                    selectedPlan === plan.percentage
                      ? 'sb-plan-card active'
                      : 'sb-plan-card'
                  }
                  onClick={() => setSelectedPlan(plan.percentage)}
                >
                  <h3>{plan.name}</h3>

                  <h1>{plan.percentage}%</h1>

                  <p>
                    Savings Percentage
                  </p>
                </div>

              ))}

            </div>
          </div>

        </div>

        {/* Summary */}
        <div className="sb-summary-card">

          <h2 className="sb-summary-title">
            Salary Plan Summary
          </h2>

          <div className="sb-summary-item">
            <span>Monthly Salary</span>
            <strong>₹ {salary || 0}</strong>
          </div>

          <div className="sb-summary-item">
            <span>Selected Plan</span>
            <strong>{selectedPlan}%</strong>
          </div>

          <div className="sb-summary-item">
            <span>Monthly Savings</span>
            <strong>
              ₹ {monthlySavings.toLocaleString()}
            </strong>
          </div>

          <div className="sb-total-income">
            <h3>Yearly Savings</h3>

            <h1>
              ₹ {yearlySavings.toLocaleString()}
            </h1>
          </div>

        </div>

      </div>

    </div>
  );
}

export default SalaryPlan;