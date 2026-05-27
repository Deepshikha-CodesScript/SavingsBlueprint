import React from "react";
import "../styles/styles.css";

function Reports() {

  const reports = [
    {
      title: "Monthly Savings Report",
      date: "May 2026",
      amount: "₹48,000",
      status: "Completed",
    },
    {
      title: "Income Analysis",
      date: "April 2026",
      amount: "₹1,25,000",
      status: "Completed",
    },
    {
      title: "Investment Forecast",
      date: "March 2026",
      amount: "₹75,000",
      status: "Pending",
    },
    {
      title: "Expense Breakdown",
      date: "February 2026",
      amount: "₹32,000",
      status: "Completed",
    },
  ];

  return (
    <div className="sb-container">

      <h1 className="sb-page-title">
        Financial Reports
      </h1>

      <div className="sb-reports-grid">

        {reports.map((report, index) => (

          <div className="sb-report-card" key={index}>

            <div className="sb-report-header">

              <h2 className="sb-report-title">
                {report.title}
              </h2>

              <span
                className={
                  report.status === "Completed"
                    ? "sb-report-status completed"
                    : "sb-report-status pending"
                }
              >
                {report.status}
              </span>

            </div>

            <div className="sb-report-body">

              <div className="sb-report-row">
                <span>Report Date</span>
                <strong>{report.date}</strong>
              </div>

              <div className="sb-report-row">
                <span>Amount</span>
                <strong>{report.amount}</strong>
              </div>

            </div>

            <button className="sb-report-btn">
              View Report
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Reports;