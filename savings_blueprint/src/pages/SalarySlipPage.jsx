// src/pages/SalarySlipPage.jsx

import React, { useState, useEffect } from "react";


import SalarySlip from "./SalarySlip";
import SalaryTable from "./SalaryTable";

import axios from "axios";

import "../styles/styles.css";

const SalarySlipPage = () => {


  const [savedSalaryData, setSavedSalaryData] = useState([]);

  /* =========================================
     FORM DATA
  ========================================= */


  const [formData, setFormData] = React.useState({
    empCode: "00020602",
    empName: "Chiluveru Sinu Jangaonkar",
    designation: "",
    department: "",
    financialYear: "2025-2026",
    month: "03/2017",
    retirementDate: "",
  });

  /* =========================================
     TOGGLE VIEW STATE
  ========================================= */

  const [showTable, setShowTable] =
    React.useState(false);

  /* =========================================
     MONTHS
  ========================================= */

  const months = [
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
  ];

  /* =========================================
     EARNINGS
  ========================================= */

  const [earnings, setEarnings] =
    React.useState([
      { label: "Basic", amount: 58870.0 },
      { label: "TG Incr", amount: 1570.0 },
      { label: "VDA", amount: 70349.65 },
      { label: "CCA", amount: 4120.9 },
      { label: "Perks", amount: 25608.45 },
      { label: "LPGVTAS", amount: 18.31 },
      { label: "LPG Reim", amount: 471.5 },
      { label: "iRRBPS I", amount: 187.0 },
    ]);

  /* =========================================
     DEDUCTIONS
  ========================================= */

  const [deductions, setDeductions] =
    React.useState([
      { label: "CMPF", amount: 14445.0 },
      { label: "Ee FPS", amount: 1556.0 },
      { label: "RBPS-2%", amount: 2584.0 },
      { label: "Income Tax", amount: 48390.0 },
    ]);

  /* =========================================
     DEDUCTION TYPES
  ========================================= */

  const mandatoryDeductions = [
    "PF",
    "Professional Tax",
    "Income Tax",
  ];

  const personalDeductions = [
    "LIC",
    "Loan",
    "Union Fee",
  ];

  /* =========================================
     OTHER INCOME
  ========================================= */

  const otherIncomeHeads = [
    "Part Time Job",
    "Agriculture Income",
    "LIC Commission",
    "Business Income",
    "Dividend",
    "Rental Income",
    "Freelancing",
  ];

  /* =========================================
     CAPITAL RECEIPTS
  ========================================= */

  const capitalReceiptHeads = [
    "Sale Of Property",
    "Sale Of Land",
    "Capital Gain",
  ];

  /* =========================================
     ANNUAL DATA
  ========================================= */

  const [annualIncomeData,
    setAnnualIncomeData] =
    React.useState(
      months.map(() => ({
        earnings: {},
        mandatory: {},
        personal: {},
        otherIncome: {},
        capitalReceipt: {},
        taxExemption: {},
      }))
    );

  /* =========================================
     FORM CHANGE
  ========================================= */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /* =========================================
     EARNINGS
  ========================================= */

  const handleEarningChange = (
    index,
    key,
    value
  ) => {

    const updated = [...earnings];

    updated[index][key] = value;

    setEarnings(updated);
  };

  const addEarningField = () => {

    setEarnings([
      ...earnings,
      { label: "", amount: 0 },
    ]);
  };

  const removeEarningField = (index) => {

    const updated = earnings.filter(
      (_, i) => i !== index
    );

    setEarnings(updated);
  };

  /* =========================================
     DEDUCTIONS
  ========================================= */

  const handleDeductionChange = (
    index,
    key,
    value
  ) => {

    const updated = [...deductions];

    updated[index][key] = value;

    setDeductions(updated);
  };

  const addDeductionField = () => {

    setDeductions([
      ...deductions,
      { label: "", amount: 0 },
    ]);
  };

  const removeDeductionField = (index) => {

    const updated = deductions.filter(
      (_, i) => i !== index
    );

    setDeductions(updated);
  };

  /* =========================================
     TABLE CHANGE
  ========================================= */

  const handleAnnualDataChange = (
    monthIndex,
    category,
    field,
    value
  ) => {

    const updated = [...annualIncomeData];

    updated[monthIndex][category][field] =
      Number(value);

    setAnnualIncomeData(updated);
  };

  /* =========================================
     TOTALS
  ========================================= */

  const grossEarnings = earnings.reduce(
    (total, item) =>
      total + Number(item.amount || 0),
    0
  );

  const totalDeductions = deductions.reduce(
    (total, item) =>
      total + Number(item.amount || 0),
    0
  );

  const netPay =
    grossEarnings - totalDeductions;

  /* =========================================
     CRUD HANDLERS
  ========================================= */

  const handleEdit = () => {

    alert("Edit Function");
  };

  const handleUpdate = () => {

    alert("Update Function");
  };

  const handleDelete = () => {

    alert("Delete Function");
  };

  useEffect(() => {

  const fetchData = async () => {

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

      setSavedSalaryData(res.data.data);

    } catch (error) {

      console.log(error);

    }

  };

  fetchData();

}, []);

  return (

    <div className="salary-slip-page-container">

      {/* TOGGLE BUTTON */}

      <div
        className="toggle-button-container"
        style={{
          margin: "20px 0",
          textAlign: "right",
        }}
      >

        <button
          className="toggle-view-btn"
          onClick={() =>
            setShowTable(!showTable)
          }
          style={{
            padding: "10px 20px",
            backgroundColor: showTable
              ? "#4B5563"
              : "#2563EB",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition:
              "background-color 0.2s",
          }}
        >

          {showTable
            ? "← Show Salary Slip"
            : "View Annual Salary Table →"}

        </button>

      </div>

      {/* CONDITIONAL RENDER */}

      {!showTable ? (

        <SalarySlip

          formData={formData}
          handleChange={handleChange}


          annualIncomeData={annualIncomeData}

          earnings={earnings}
          deductions={deductions}

          setFormData={setFormData}
          setEarnings={setEarnings}
          setDeductions={setDeductions}

          handleEarningChange={
            handleEarningChange
          }

          handleDeductionChange={
            handleDeductionChange
          }

          addEarningField={
            addEarningField
          }

          removeEarningField={
            removeEarningField
          }

          addDeductionField={
            addDeductionField
          }

          removeDeductionField={
            removeDeductionField
          }

          grossEarnings={grossEarnings}

          totalDeductions={
            totalDeductions
          }

          netPay={netPay}

          handleEdit={handleEdit}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}

            setSavedSalaryData={setSavedSalaryData}

        />

      ) : (

        <SalaryTable

          months={months}

          earnings={earnings}

          mandatoryDeductions={
            mandatoryDeductions
          }

          personalDeductions={
            personalDeductions
          }

          otherIncomeHeads={
            otherIncomeHeads
          }

          capitalReceiptHeads={
            capitalReceiptHeads
          }

          annualIncomeData={
            annualIncomeData
          }

          handleAnnualDataChange={
            handleAnnualDataChange
          }
           savedSalaryData={savedSalaryData}

        />

      )}

    </div>

  );
};

export default SalarySlipPage;