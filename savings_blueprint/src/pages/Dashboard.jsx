import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";
// src/pages/DashboardManager.jsx
import { useIncomeHistory } from '../hooks/useIncomeHistory';
import FutureSavingsForecast from './FutureSavingsForecast';

function Dashboard() {
  const { historicalData, loading } = useIncomeHistory();

  if (loading) return <div>Loading records and analyzing trends...</div>;

  const stats = [
    {
      title: "Total Income",
      amount: "₹1,25,000",
    },
    {
      title: "Total Savings",
      amount: "₹48,000",
    },
    {
      title: "Monthly Expenses",
      amount: "₹32,000",
    },
    {
      title: "Future Goal Fund",
      amount: "₹75,000",
    },
  ];

  return (
    <div className="sb-container">

      {/* Dashboard Header */}
      <div className="dashboard-header">

        <h1 className="sb-page-title">
          Savings Dashboard
        </h1>

        {/* Navigation Button */}
        <div className="dashboard-links">
          <Link to="/incomeSource" className="dashboard-btn">
            Open Income Page
          </Link>
        </div>

      </div>

      {/* Top Cards */}
      <div className="sb-dashboard-grid">
        {stats.map((item, index) => (
          <div className="sb-card" key={index}>
            <h3 className="sb-card-title">
              {item.title}
            </h3>

            <h2 className="sb-card-amount">
              {item.amount}
            </h2>
          </div>
        ))}
      </div>

      {/* Dashboard Content */}
      <div className="sb-dashboard-content">

        {/* Recent Transactions */}
        <div className="sb-card">
          <h2 className="sb-section-title">
            Recent Transactions
          </h2>

          <table className="sb-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>16 May 2026</td>
                <td>Salary</td>
                <td>₹85,000</td>
                <td>Received</td>
              </tr>

              <tr>
                <td>15 May 2026</td>
                <td>Rent</td>
                <td>₹15,000</td>
                <td>Paid</td>
              </tr>

              <tr>
                <td>14 May 2026</td>
                <td>Investments</td>
                <td>₹10,000</td>
                <td>Saved</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Goal Tracker */}
        <div className="sb-card">
          <h2 className="sb-section-title">
            Goal Tracking
          </h2>

          <div className="sb-goal-box">
            <div className="sb-goal-header">
              <span>Emergency Fund</span>
              <span>75%</span>
            </div>

            <div className="sb-progress-bar">
              <div
                className="sb-progress-fill"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>

          <div className="sb-goal-box">
            <div className="sb-goal-header">
              <span>Car Purchase</span>
              <span>45%</span>
            </div>

            <div className="sb-progress-bar">
              <div
                className="sb-progress-fill"
                style={{ width: "45%" }}
              ></div>
            </div>
          </div>

          <div className="sb-goal-box">
            <div className="sb-goal-header">
              <span>Home Down Payment</span>
              <span>60%</span>
            </div>

            <div className="sb-progress-bar">
              <div
                className="sb-progress-fill"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>

        </div>
      </div>
      <Link to="/income">Income</Link>
        return <FutureSavingsForecast historicalData={historicalData} />;
    </div>
  );
}

export default Dashboard;