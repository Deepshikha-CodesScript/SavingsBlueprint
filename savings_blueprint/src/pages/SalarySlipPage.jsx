// src/pages/SalarySlipPage.jsx

import React, { useState, useEffect } from "react";


import SalarySlip from "./SalarySlip";
import SalaryTable from "./SalaryTable";

import axios from "axios";

import "../styles/styles.css";

const SalarySlipPage = () => {


  const [savedSalaryData, setSavedSalaryData] = useState([]);

  /* =========================================
     EMPLOYEE DETAILS (Shared across all components)
  ========================================= */

  const [employeeDetails, setEmployeeDetails] = React.useState({
    empCode: "00020602",
    empName: "Chiluveru Sinu Jangaonkar",
    designation: "",
    department: "",
    financialYear: "2025-2026",
    month: "Apr",
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
        personalSalary: {},
        taxExemption: {},
      }))
    );

  /* =========================================
     EMPLOYEE DETAILS CHANGE
  ========================================= */

  const handleEmployeeDetailsChange = (e) => {

    const { name, value } = e.target;

    setEmployeeDetails({
      ...employeeDetails,
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

// Fetch PersonalSalary, OtherIncome, CapitalReceipt data for all months
useEffect(() => {
  console.log("Data fetching useEffect triggered, employeeDetails.empName:", employeeDetails.empName);

  const fetchAllMonthlyData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("Fetching monthly data for employee:", employeeDetails.empName);

    try {
      // Fetch data for each month
      const monthlyDataPromises = months.map(async (month) => {
        try {
          // Fetch Personal Salary
          const personalRes = await axios.get(
            `http://localhost:5000/api/personalsalary/get?empName=${encodeURIComponent(employeeDetails.empName)}&month=${encodeURIComponent(month)}`,
            config
          );
          console.log(`Personal Salary for ${month}:`, personalRes.data);

          // Fetch Other Income
          const otherIncomeRes = await axios.get(
            `http://localhost:5000/api/otherincome/get?empName=${encodeURIComponent(employeeDetails.empName)}&month=${encodeURIComponent(month)}`,
            config
          );
          console.log(`Other Income for ${month}:`, otherIncomeRes.data);

          // Fetch Capital Receipt
          const capitalRes = await axios.get(
            `http://localhost:5000/api/capitalreceipt/get?empName=${encodeURIComponent(employeeDetails.empName)}&month=${encodeURIComponent(month)}`,
            config
          );
          console.log(`Capital Receipt for ${month}:`, capitalRes.data);

          return {
            month,
            personalSalary: personalRes.data.success ? personalRes.data.data.personalSalary : {},
            otherEarnings: personalRes.data.success ? personalRes.data.data.otherEarnings : [],
            otherDeductions: personalRes.data.success ? personalRes.data.data.otherDeductions : [],
            otherIncome: otherIncomeRes.data.success ? otherIncomeRes.data.data.otherIncome : {},
            additionalIncome: otherIncomeRes.data.success ? otherIncomeRes.data.data.additionalIncome : [],
            capitalReceipt: capitalRes.data.success ? capitalRes.data.data.capitalReceipt : {},
            additionalCapitalReceipts: capitalRes.data.success ? capitalRes.data.data.additionalCapitalReceipts : [],
          };
        } catch (error) {
          console.log(`Error fetching data for ${month}:`, error);
          return {
            month,
            personalSalary: {},
            otherEarnings: [],
            otherDeductions: [],
            otherIncome: {},
            additionalIncome: [],
            capitalReceipt: {},
            additionalCapitalReceipts: [],
          };
        }
      });

      const monthlyData = await Promise.all(monthlyDataPromises);
      console.log("All monthly data:", monthlyData);

      // Update annualIncomeData with fetched data
      setAnnualIncomeData(prev => {
        const updated = [...prev];
        monthlyData.forEach((data, index) => {
          updated[index] = {
            ...updated[index],
            personalSalary: data.personalSalary,
            otherIncome: data.otherIncome,
            capitalReceipt: data.capitalReceipt,
          };
        });
        console.log("Updated annualIncomeData:", updated);
        return updated;
      });

    } catch (error) {
      console.error("Error fetching monthly data:", error);
    }
  };

  if (employeeDetails.empName) {
    fetchAllMonthlyData();
  }
}, [employeeDetails.empName]);

useEffect(() => {
  console.log("Saved Salary Data:", savedSalaryData);
}, [savedSalaryData]);

useEffect(() => {
  console.log("Annual Income Data:", annualIncomeData);
}, [annualIncomeData]);
console.log(savedSalaryData)

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

          employeeDetails={employeeDetails}
          handleEmployeeDetailsChange={handleEmployeeDetailsChange}


          annualIncomeData={annualIncomeData}
          setAnnualIncomeData={setAnnualIncomeData}

          earnings={earnings}
          deductions={deductions}

          setEmployeeDetails={setEmployeeDetails}
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
          mandatoryDeductions={mandatoryDeductions}

          personalDeductions={personalDeductions}

          otherIncomeHeads={otherIncomeHeads}

          capitalReceiptHeads={capitalReceiptHeads}

          annualIncomeData={annualIncomeData}

          handleAnnualDataChange={handleAnnualDataChange
          }
           savedSalaryData={savedSalaryData}
           

        />
        

      )}
      console.log("Saved Salary Data:", savedSalaryData);

    </div>

  );
};

export default SalarySlipPage;