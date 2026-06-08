import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/styles.css";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      setDashboardData(res.data);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setDashboardLoading(false);
    }
  };

  if (dashboardLoading) {
    return <div>Loading dashboard...</div>;
  }

  const stats = [
    {
      title: "Total Income",
      amount: `₹${dashboardData?.totalIncome || 0}`,
    },
    {
      title: "Total Savings",
      amount: `₹${dashboardData?.totalSavings || 0}`,
    },
    {
      title: "Monthly Expenses",
      amount: `₹${dashboardData?.totalExpenses || 0}`,
    },
    {
      title: "Future Goal Fund",
      amount: `₹${dashboardData?.goalFund || 0}`,
    },
  ];

  return (
    <div className="sb-container">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1 className="sb-page-title">
          Savings Dashboard
        </h1>

        <div className="dashboard-links">
          <Link
            to="/incomeSource"
            className="dashboard-btn"
          >
            Open Income Page
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
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
              {dashboardData?.recentTransactions?.length > 0 ? (
                dashboardData.recentTransactions.map(
                  (item) => (
                    <tr key={item._id}>
                      <td>
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}
                      </td>

                      {/* <td>
                        {item.category || "Salary"}
                      </td> */}
                      
                     <td>{item.month}</td>
                     <td> ₹{item.netPay || 0}</td>

                      <td>
                        {item.status || "Received"}
                      </td>
                      <td>Processed</td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan="4">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Goal Tracking */}
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

      <div style={{ marginTop: "20px" }}>
        <Link to="/income">
          Go To Income Page
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;