import axios from "axios";
import React, { useState, useEffect } from "react";  // ← Add useEffect
import PersonalSalary from "./PersonalSalary";
import OtherIncome from "./OtherIncome";
import CapitalReceipt from "./CapitalReceipt";
const SalarySlip = ({
  employeeDetails,
  handleEmployeeDetailsChange,
  annualIncomeData,
  setAnnualIncomeData,
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
  handleEdit,
  handleUpdate,
  handleDelete,
  setEmployeeDetails,
  setEarnings,
  setSavedSalaryData,
  setDeductions
}) => {
  const [personalSalary, setPersonalSalary] = useState({
    overtimeAllowance: "",
    holidayAllowance: "",
    leaveEncashment: "",
    taAllowance: "",
    bonus: "",
    exgratia: "",
    arrears: "",
    loanTaken: "",
    loanRepayment: "",
    licPremium: "",
    houseLoanEMI: "",
    vehicleLoanEMI: "",
    otherDeduction: "",
    expectedEndDate: "",
    annualGrowthRate: "",
  });
  const [otherEarnings, setOtherEarnings] = useState([{ label: "", amount: "" }]);
  const [otherDeductions, setOtherDeductions] = useState([{ label: "", amount: "" }]);
  const [otherIncome, setOtherIncome] = useState({
    partTimeSalary: "",
    partTimeBusinessIncome: "",
    tuitionAmount: "",
    agriculturalIncome: "",
    extraOccupationalIncome: "",
    chitFundDividend: "",
    licCommission: "",
    shareTradingIncome: "",
    stockDividend: "",
    expectedEndDate: "",
    annualGrowthRate: "",
  });
  const [additionalIncome, setAdditionalIncome] = useState([{ label: "", amount: "" }]);
  const [capitalReceipt, setCapitalReceipt] = useState({
    saleOfHouseProperty: "",
    saleOfLandPlot: "",
    saleOfBusinessProperty: "",
    lumpSumReceiptChitFund: "",
    lumpSumReceiptDeposits: "",
    saleOfSharesDebentures: "",
    expectedEndDate: "",
    annualGrowthRate: "",
  });
  const [additionalCapitalReceipts, setAdditionalCapitalReceipts] = useState([{ label: "", amount: "" }]);
  const [isSaving, setIsSaving] = useState(false);
  // Helper config to fetch token dynamically
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return null;
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  };

   // Add this function to fetch capital receipt data
const fetchCapitalReceipt = async () => {
  const config = getAuthConfig();
  if (!config || !employeeDetails.empName || !employeeDetails.month) return;

  try {
    const res = await axios.get(
      `http://localhost:5000/api/capitalreceipt/get?empName=${encodeURIComponent(employeeDetails.empName)}&month=${encodeURIComponent(employeeDetails.month)}`,
      config
    );
    
    if (res.data.success && res.data.data) {
      const data = res.data.data;
      setCapitalReceipt(data.capitalReceipt);
      setAdditionalCapitalReceipts(data.additionalCapitalReceipts || [{ label: "", amount: "" }]);
    }
  } catch (error) {
    // 404 is okay - means no data yet
    if (error.response?.status !== 404) {
      console.error("Error fetching capital receipt:", error);
    }
  }
};



// ==========================
// FETCH PERSONAL SALARY DATA
// ==========================
const fetchPersonalSalary = async () => {
  const config = getAuthConfig();
  if (!config || !employeeDetails.empName || !employeeDetails.month) return;

  try {
    const res = await axios.get(
      `http://localhost:5000/api/personalsalary/get?empName=${encodeURIComponent(employeeDetails.empName)}&month=${encodeURIComponent(employeeDetails.month)}`,
      config
    );
    
    if (res.data.success && res.data.data) {
      const data = res.data.data;
      setPersonalSalary(prev => ({
  ...prev,
  ...(data.personalSalary || {})
}));
      setOtherEarnings(
    data.otherEarnings?.length
        ? data.otherEarnings
        : [{ label: "", amount: "" }]
);
      setOtherDeductions(data.otherDeductions || [{ label: "", amount: "" }]);
    }
  } catch (error) {
    if (error.response?.status !== 404) {
      console.error("Error fetching personal salary:", error);
    }
  }
};

// ==========================
// FETCH OTHER INCOME DATA
// ==========================
const fetchOtherIncome = async () => {
  const config = getAuthConfig();
  if (!config || !employeeDetails.empName || !employeeDetails.month) return;

  try {
    const res = await axios.get(
      `http://localhost:5000/api/otherincome/get?empName=${encodeURIComponent(employeeDetails.empName)}&month=${encodeURIComponent(employeeDetails.month)}`,
      config
    );
    
    if (res.data.success && res.data.data) {
      const data = res.data.data;
      setOtherIncome(data.otherIncome);
      setAdditionalIncome(data.additionalIncome || [{ label: "", amount: "" }]);
    }
  } catch (error) {
    if (error.response?.status !== 404) {
      console.error("Error fetching other income:", error);
    }
  }
};

useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        setEmployeeDetails((prev) => ({
            ...prev,
            empName: user.name,
        }));
    }
}, []);



// Combined useEffect to fetch all data
useEffect(() => {
  if (employeeDetails.empName && employeeDetails.month) {
    fetchPersonalSalary();
    fetchOtherIncome();
    fetchCapitalReceipt();
  }
}, [employeeDetails.empName, employeeDetails.month]);



  // Helper function to clean and format data - FIXED to handle undefined
  const preparePayload = () => {
    // Convert string numbers to actual numbers
    const parseNumber = (value) => {
      if (value === '' || value === null || value === undefined) return 0;
      return typeof value === 'number' ? value : parseFloat(value) || 0;    };

    // Clean earnings and deductions arrays
    const cleanArray = (arr) => {
      if (!arr || !Array.isArray(arr)) return [];
      return arr
        .filter(item => item && (item.label?.trim() !== '' || parseNumber(item.amount) > 0))
        .map(item => ({
          label: item.label?.trim() || 'Unnamed',
          amount: parseNumber(item.amount)
        }));
    };

    // Clean object values
  const cleanObject = (obj) => {
  if (!obj) return {};
  const cleaned = {};
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (key === "expectedEndDate") {
      cleaned[key] = value || null;
    } else {
      cleaned[key] = parseNumber(value);
    }
  });

  return cleaned;
};

    return {
      empName: employeeDetails.empName?.trim() || '',
      designation: employeeDetails.designation?.trim() || '',
      department: employeeDetails.department?.trim() || '',
      month: employeeDetails.month || '',
      financialYear: employeeDetails.financialYear?.trim() || '',
      retirementDate: employeeDetails.retirementDate || null,
      annualIncomeData: annualIncomeData || {},
      earnings: cleanArray(earnings),
      deductions: cleanArray(deductions),
      personalSalary: cleanObject(personalSalary),
      otherEarnings: cleanArray(otherEarnings),
      otherDeductions: cleanArray(otherDeductions),
      capitalReceipt: cleanObject(capitalReceipt),
      additionalCapitalReceipts: cleanArray(additionalCapitalReceipts),
      otherIncome: cleanObject(otherIncome),
      additionalIncome: cleanArray(additionalIncome),
      grossEarnings: parseNumber(grossEarnings),
      totalDeductions: parseNumber(totalDeductions),
      netPay: parseNumber(netPay),
    };
  };




useEffect(() => {
  const interceptor = axios.interceptors.request.use(config => {
    console.log(config.url);
    return config;
  });

  return () => {
    axios.interceptors.request.eject(interceptor);
  };
}, []);

  // ==========================
  // PERSONAL SALARY ACTIONS - FIXED
  // ==========================
  const handlePersonalSave = async () => {const config = getAuthConfig();if (!config) {alert("Please login first");return;
    }

    if (!employeeDetails.empName || !employeeDetails.month) {
      alert("Employee Name and Month are required");
      return;
    }

    try {
      const payload = {
        empName: employeeDetails.empName.trim(),
        month: employeeDetails.month,
        personalSalary: cleanObject(personalSalary),
        otherEarnings: cleanArray(otherEarnings),
        otherDeductions: cleanArray(otherDeductions),
      };

      console.log("Saving Personal Salary:", payload);
      console.log("Token:", localStorage.getItem("token"));

      // Try to save first, if data exists (409), update instead
      let res;
      try {
        res = await axios.post(
          "http://localhost:5000/api/personalsalary/save",
          payload,
          config
        );
        alert(res.data.message || "Personal Salary Saved Successfully");
      } catch (saveError) {
        if (saveError.response?.status === 409) {
          console.log("Data already exists, updating instead...");
          res = await axios.put(
            "http://localhost:5000/api/personalsalary/update",
            payload,
            config
          );
          alert(res.data.message || "Personal Salary Updated Successfully");
        } else {
          throw saveError;
        }
      }

     // Update annualIncomeData with Personal Salary + Other Earnings + Other Deductions
const months = [
  "Apr", "May", "Jun", "Jul",
  "Aug", "Sep", "Oct", "Nov",
  "Dec", "Jan", "Feb", "Mar"
];

const monthIndex = months.indexOf(employeeDetails.month);

if (monthIndex !== -1) {
  setAnnualIncomeData(prev => {
    const updated = [...prev];

    updated[monthIndex] = {
      ...updated[monthIndex],

      // Fixed Personal Salary fields
      personalSalary: cleanObject(personalSalary),

      // Dynamic Other Earnings
      otherEarnings: Object.fromEntries(
        otherEarnings
          .filter(item => item.label?.trim())
          .map(item => [
            item.label.trim(),
            Number(item.amount || 0)
          ])
      ),

      // Dynamic Other Deductions
      otherDeductions: Object.fromEntries(
        otherDeductions
          .filter(item => item.label?.trim())
          .map(item => [
            item.label.trim(),
            Number(item.amount || 0)
          ])
      ),
    };

    return updated;
  });
}
    } catch (error) {
      console.error("Personal Salary Save Error:", error);
      handleApiError(error);
    }
  };
  

  const handlePersonalEdit = () => {
    // Load data for the selected month from annualIncomeData
    const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
    const monthIndex = months.indexOf(employeeDetails.month);

    if (monthIndex !== -1 && annualIncomeData[monthIndex]) {
      const monthData = annualIncomeData[monthIndex];
      if (monthData.personalSalary) {
        setPersonalSalary(monthData.personalSalary);
      }
    }
    alert("Personal Salary data loaded for editing");
  };

  const handlePersonalUpdate = async () => {
    const config = getAuthConfig();
    if (!config) {
      alert("Please login first");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:5000/api/personalsalary/update",
        {
          empName: employeeDetails.empName.trim(),
          month: employeeDetails.month,
          personalSalary: cleanObject(personalSalary),
          otherEarnings: cleanArray(otherEarnings),
          otherDeductions: cleanArray(otherDeductions),
        },
        config
      );
      alert(res.data.message || "Personal Salary Updated");
    } catch (error) {
      console.error("Update Error:", error);
      handleApiError(error);
    }
  };


  // Add a function to check token validity
const checkTokenValidity = async () => {
  const config = getAuthConfig();
  if (!config) return false;
  
  try {
    // Make a lightweight request to check if token is valid
    await axios.get("http://localhost:5000/api/auth/verify", config);
    return true;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      alert("Session expired. Please login again.");
      window.location.href = "/login";
      return false;
    }
     // If endpoint doesn't exist, assume token is valid (since we have a token)
    if (error.response?.status === 404) {
      console.warn("Verify endpoint not found, assuming token is valid");
      return true;
    }
    return false;
  }
};

  const handlePersonalDelete = async () => {
    const config = getAuthConfig();
    if (!config) {
      alert("Please login first");
      return;
    }

    try {
      const res = await axios.delete(
             `http://localhost:5000/api/personalsalary/delete?empName=${encodeURIComponent(employeeDetails.empName.trim())}&month=${encodeURIComponent(employeeDetails.month)}`,
        {
          headers: config.headers,
          data: {
            empName: employeeDetails.empName.trim(),
            month: employeeDetails.month,
          },
        }
      );
      alert(res.data.message || "Personal Salary Deleted");
    } catch (error) {
      console.error("Delete Error:", error);
      handleApiError(error);
    }
  };

  // ==========================
  // OTHER INCOME ACTIONS - FIXED
  // ==========================
  const handleOtherIncomeSave = async () => {
    const config = getAuthConfig();
    if (!config) {
      alert("Please login first");
      return;
    }

    if (!employeeDetails.empName || !employeeDetails.month) {
      alert("Employee Name and Month are required");
      return;
    }

    try {
      const payload = {
        empName: employeeDetails.empName.trim(),
        month: employeeDetails.month,
        otherIncome: cleanObject(otherIncome),
        additionalIncome: cleanArray(additionalIncome),
      };

      console.log("Saving Other Income:", payload);

      // Try to save first, if data exists (409), update instead
      let res;
      try {
        res = await axios.post(
          "http://localhost:5000/api/otherincome/save",
          payload,
          config
        );
        alert(res.data.message || "Other Income Saved Successfully");
      } catch (saveError) {
        if (saveError.response?.status === 409) {
          console.log("Data already exists, updating instead...");
          res = await axios.put(
            "http://localhost:5000/api/otherincome/update",
            payload,
            config
          );
          alert(res.data.message || "Other Income Updated Successfully");
        } else {
          throw saveError;
        }
      }

      // Update annualIncomeData with saved data
      const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
      const monthIndex = months.indexOf(employeeDetails.month);

      if (monthIndex !== -1) {
        setAnnualIncomeData(prev => {
          const updated = [...prev];
          const monthIndex = months.indexOf(employeeDetails.month);
          updated[monthIndex] = {
                                ...updated[monthIndex],
                                otherIncome: cleanObject(otherIncome)};
          return updated;
        });
      }
    } catch (error) {
      console.error("Other Income Save Error:", error);
      handleApiError(error);
    }
  };



  

  const handleOtherIncomeEdit = () => {
    // Load data for the selected month from annualIncomeData
    const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
    const monthIndex = months.indexOf(employeeDetails.month);

    if (monthIndex !== -1 && annualIncomeData[monthIndex]) {
      const monthData = annualIncomeData[monthIndex];
      if (monthData.otherIncome) {
        setOtherIncome(monthData.otherIncome);
      }
    }
    alert("Other Income data loaded for editing");
  };

  const handleOtherIncomeUpdate = async () => {
    const config = getAuthConfig();
    if (!config) {
      alert("Please login first");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:5000/api/otherincome/update",
        {
          empName: employeeDetails.empName.trim(),
          month: employeeDetails.month,
          otherIncome: cleanObject(otherIncome),
          additionalIncome: cleanArray(additionalIncome),
        },
        config
      );
      alert(res.data.message || "Other Income Updated");
    } catch (error) {
      console.error("Update Error:", error);
      handleApiError(error);
    }
  };

  const handleOtherIncomeDelete = async () => {
    const config = getAuthConfig();
    if (!config) {
      alert("Please login first");
      return;
    }

    try {
      const res = await axios.delete(
        "http://localhost:5000/api/otherincome/delete",
        {
          headers: config.headers,
          data: {
            empName: employeeDetails.empName.trim(),
            month: employeeDetails.month,
          },
        }
      );
      alert(res.data.message || "Other Income Deleted");
    } catch (error) {
      console.error("Delete Error:", error);
      handleApiError(error);
    }
  };


  // ==========================
// CAPITAL RECEIPT ACTIONS
// ==========================
const handleCapitalReceiptSave = async () => {
  const config = getAuthConfig();
  if (!config) {alert("Please login first");return;}
  if (!employeeDetails.empName || !employeeDetails.month) {alert("Employee Name and Month are required");return;}
  try {
    const payload = {
      empName: employeeDetails.empName.trim(),
      month: employeeDetails.month,
      capitalReceipt: cleanObject(capitalReceipt),
    

  additionalCapitalReceipts: Object.fromEntries(
    additionalCapitalReceipts
      .filter(item => item.label?.trim())
      .map(item => [
        item.label.trim(),
        Number(item.amount || 0)
      ])
  )
    };
    console.log("Saving Capital Receipt:", payload);

    // Try to save first, if data exists (409), update instead
    let res;
    try {
      res = await axios.post(
        "http://localhost:5000/api/capitalreceipt/save",
        payload,
        config
      );
      alert(res.data.message || "Capital Receipt Saved Successfully");
    } catch (saveError) {
      if (saveError.response?.status === 409) {
        console.log("Data already exists, updating instead...");
        res = await axios.put(
          "http://localhost:5000/api/capitalreceipt/update",
          payload,
          config
        );
        alert(res.data.message || "Capital Receipt Updated Successfully");
      } else {
        throw saveError;
      }
    }

   const months = [
  "Apr", "May", "Jun", "Jul",
  "Aug", "Sep", "Oct", "Nov",
  "Dec", "Jan", "Feb", "Mar"
];

const monthIndex = months.indexOf(employeeDetails.month);

    if (monthIndex !== -1) {
      setAnnualIncomeData(prev => {
        const updated = [...prev];
        updated[monthIndex] = {
          ...updated[monthIndex],
          capitalReceipt: cleanObject(capitalReceipt),
        };
        return updated;
      });
    }
  } catch (error) {
    console.error("Capital Receipt Save Error:", error);
     if (error.response) {
      console.error("Error Response Data:", error.response.data);
      alert(`Error: ${error.response.data.message || error.response.data.error || 'Server error'}`);
    } else {
      alert("Network error. Please check your connection.");
    }
    handleApiError(error);
  }
};
const handleCapitalReceiptEdit = () => {
  // Load data for the selected month from annualIncomeData
  const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const monthIndex = months.indexOf(employeeDetails.month);

  if (monthIndex !== -1 && annualIncomeData[monthIndex]) {
    const monthData = annualIncomeData[monthIndex];
    if (monthData.capitalReceipt) {
      setCapitalReceipt(monthData.capitalReceipt);
    }
  }
  alert("Capital Receipt data loaded for editing");
};
const handleCapitalReceiptUpdate = async () => {
  const config = getAuthConfig();
  if (!config) {
    alert("Please login first");
    return;
  }
  try {
    const res = await axios.put(
      "http://localhost:5000/api/capitalreceipt/update",
      {
        empName: employeeDetails.empName.trim(),
        month: employeeDetails.month,
        capitalReceipt: cleanObject(capitalReceipt),
        additionalCapitalReceipts: cleanArray(additionalCapitalReceipts),
      },
      config
    );
    alert(res.data.message || "Capital Receipt Updated");
  } catch (error) {
    console.error("Update Error:", error);
    handleApiError(error);
  }
};
const handleCapitalReceiptDelete = async () => {
  const config = getAuthConfig();
  if (!config) {
    alert("Please login first");
    return;
  }
  if (!employeeDetails.empName || !employeeDetails.month) {
    alert("Employee Name and Month are required");
    return;
  }
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/capitalreceipt/delete?empName=${encodeURIComponent(employeeDetails.empName.trim())}&month=${encodeURIComponent(employeeDetails.month)}`,
      config
    );
    alert(res.data.message || "Capital Receipt Deleted Successfully");
  } catch (error) {
    console.error("Delete Error:", error);
    handleApiError(error);
  }
};
  // ==========================
  // MAIN CORE SAVE ACTION - FIXED
  // ==========================
  // Then in handleSave, check token validity first:
  const handleSave = async () => {
    // Prevent multiple submissions
      // Check token
  const token = localStorage.getItem("token");
  console.log("Token exists?", !!token);
  console.log("Token preview:", token ? token.substring(0, 20) + "..." : "No token");
    if (isSaving) return;

  // // Check if token is valid before proceeding
  // const isValid = await checkTokenValidity();
  // if (!isValid) return;


    // Get auth config once
    const config = getAuthConfig();
    if (!config) {alert("Authentication failed. Please login again.");
       window.location.href = "/login";
      return;}

    // Validate required fields
    const requiredFields = ['empName', 'month', 'financialYear', 'designation'];
    const missingFields = requiredFields.filter(field => !employeeDetails[field] || employeeDetails[field].trim() === '');
    
    if (missingFields.length > 0) {
      alert(`Missing required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Prepare the payload with proper data types
   // Get logged-in user
const user = JSON.parse(localStorage.getItem("user"));

const userId =
  user?._id ||
  user?.id ||
  user?.userId ||
  localStorage.getItem("userId");

console.log("Stored user:", user);
console.log("Resolved userId:", userId);

if (!userId) {
  alert("User ID is missing. Please log out and log in again.");
  return;
}

const payload = {
  ...preparePayload(),
  userId,
};
    console.log("Logged-in user:", user);
    console.log("User ID being sent:", payload.userId);
    console.log("=== SENDING PAYLOAD TO SERVER ===");
    console.log("Payload:", JSON.stringify(payload, null, 2));
    console.log("==================================");

    setIsSaving(true);
    
    if (!payload.userId) {
  console.error("User ID is missing:", user);
  alert("User ID is missing. Please log out and log in again.");
  return;
}

console.log("Final salary payload:");
console.log(JSON.stringify(payload, null, 2));
    try {
      const res = await axios.post(
        "http://localhost:5000/api/salaryslip/save",
        payload,
        config
      );

      console.log("Save Response:", res.data);
      alert(res.data.message || "Salary Slip Saved Successfully!");

      const months = [
  "Apr", "May", "Jun", "Jul",
  "Aug", "Sep", "Oct", "Nov",
  "Dec", "Jan", "Feb", "Mar"
];

const monthIndex = months.indexOf(employeeDetails.month);

if (monthIndex !== -1) {
  setAnnualIncomeData(prev => {
    const updated = [...prev];

    updated[monthIndex] = {
      ...updated[monthIndex],

      earnings: Object.fromEntries(
        earnings.map(item => [
          item.label,
          Number(item.amount || 0)
        ])
      ),

      deductions: Object.fromEntries(
        deductions.map(item => [
          item.label,
          Number(item.amount || 0)
        ])
      ),

      personalSalary: cleanObject(personalSalary),
      

    otherEarnings: Object.fromEntries(
        otherEarnings
            .filter(item => item.label?.trim())
            .map(item => [
                item.label.trim(),
                Number(item.amount || 0)
            ])
    ),

    otherDeductions: Object.fromEntries(
        otherDeductions
            .filter(item => item.label?.trim())
            .map(item => [
                item.label.trim(),
                Number(item.amount || 0)
            ])
    ),

      otherIncome: cleanObject(otherIncome),

       additionalIncome: Object.fromEntries(
    additionalIncome
      .filter(item => item.label?.trim())
      .map(item => [
        item.label.trim(),
        Number(item.amount || 0)
      ])
  ),

      capitalReceipt: cleanObject(capitalReceipt),

      taxExemption:
        updated[monthIndex]?.taxExemption || {},

      grossEarnings,

      totalDeductions,

      netPay
    };

    return updated;
  });
}

      // Fetch updated history using the same config
      try {
        const historyRes = await axios.get(
          "http://localhost:5000/api/salaryslip/history",
          config
        );
        setSavedSalaryData(historyRes.data.data || []);
      } catch (historyError) {
        console.error("Error fetching history:", historyError);
        // Don't block the flow if history fetch fails
      }

      // Reset form
      resetForm();
      
    } catch (error) {
      console.error("=== SAVE ERROR DETAILS ===");
      if (error.response?.status === 401) {
      localStorage.removeItem("token");
      alert("Session expired. Please login again.");
      }else {
      handleApiError(error);
    }
  }  finally {
      setIsSaving(false);
    }
  };

  // ==========================
  // HELPER FUNCTIONS
  // ==========================
  
  // Clean object function (moved here for reuse)
  const cleanObject = (obj) => {
    if (!obj) return {};
    const parseNumber = (value) => {
      if (value === '' || value === null || value === undefined) return 0;
      return typeof value === 'number' ? value : parseFloat(value) || 0;
    };
    const cleaned = {};
      Object.keys(obj).forEach((key) => {
    if (key === "expectedEndDate") {
      cleaned[key] = obj[key] || "";
    } else if (key === "annualGrowthRate") {
      cleaned[key] = Number(obj[key] || 0);
    } else {
      cleaned[key] = Number(obj[key] || 0);
    }
  });
    return cleaned;
  };

  const cleanArray = (arr) => {
    if (!arr || !Array.isArray(arr)) return [];
    const parseNumber = (value) => {
      if (value === '' || value === null || value === undefined) return 0;
      return typeof value === 'number' ? value : parseFloat(value) || 0;
    };
    return arr
      .filter(item => item && (item.label?.trim() !== '' || parseNumber(item.amount) > 0))
      .map(item => ({
        label: item.label?.trim() || 'Unnamed',
        amount: parseNumber(item.amount)
      }));
  };

const handleApiError = (error) => {
  console.error("=== API ERROR ===");

  if (error.response) {
    console.error("Status Code:", error.response.status);
    console.error(
      "Response Data:",
      JSON.stringify(error.response.data, null, 2)
    );

    const message =
      error.response.data?.message ||
      error.response.data?.error ||
      error.response.data?.details ||
      "Internal Server Error";

    alert(`Save failed: ${message}`);
  } else if (error.request) {
    console.error("No server response:", error.request);
    alert("Server is not responding.");
  } else {
    console.error("Request error:", error.message);
    alert(`Request error: ${error.message}`);
  }
};

  const resetForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(JSON.parse(localStorage.getItem("user")));

setEmployeeDetails({
  empCode: "",
  empName: user?.name || "", // ✅ keep logged-in user's name
  designation: "",
  department: "",
  financialYear: "",
  month: "",
  retirementDate: "",
});
    setEarnings([{ label: "", amount: "" }]);
    setDeductions([{ label: "", amount: "" }]);
    setPersonalSalary({
      overtimeAllowance: "",
      holidayAllowance: "",
      leaveEncashment: "",
      taAllowance: "",
      bonus: "",
      exgratia: "",
      arrears: "",
      loanTaken: "",
      loanRepayment: "",
      licPremium: "",
      houseLoanEMI: "",
      vehicleLoanEMI: "",
      otherDeduction: "",
      expectedEndDate: "",
      annualGrowthRate: "",
    });
    setOtherEarnings([{ label: "", amount: "" }]);
    setOtherDeductions([{ label: "", amount: "" }]);
    setOtherIncome({
      partTimeSalary: "",
      partTimeBusinessIncome: "",
      tuitionAmount: "",
      agriculturalIncome: "",
      extraOccupationalIncome: "",
      chitFundDividend: "",
      licCommission: "",
      shareTradingIncome: "",
      stockDividend: "",
      expectedEndDate: "",
      annualGrowthRate: "",
    });
    setAdditionalIncome([{ label: "", amount: "" }]);
    setCapitalReceipt({
      saleOfHouseProperty: "",
      saleOfLandPlot: "",
      saleOfBusinessProperty: "",
      lumpSumReceiptChitFund: "",
      lumpSumReceiptDeposits: "",
      saleOfSharesDebentures: "",
      expectedEndDate: "",
      annualGrowthRate: "",
    });
    setAdditionalCapitalReceipts([{ label: "", amount: "" }]);
  };

  return (
    <div className="salary-slip-container">
      <div className="salary-slip-header">
        <h2>THE SINGARENI COLLIERIES COMPANY LIMITED</h2>
        <p className="subtitle">(A Government Company)</p>
        <h3>EMPLOYEE SALARY DETAILS (PROVISIONAL)</h3>
      </div>
      <hr className="divider" />

      <div className="employee-info-grid">
        <div className="info-column">
          <p>
            <strong>Emp Name:</strong>
            <input type="text" name="empName" value={employeeDetails.empName} onChange={handleEmployeeDetailsChange} placeholder="Employee Name" readOnly/>
          </p>
          <p>
            <strong>Designation:</strong>
            <input type="text" name="designation" value={employeeDetails.designation} onChange={handleEmployeeDetailsChange} placeholder="e.g. Manager" />
          </p>
          <p>
            <strong>Department / Company:</strong>
            <input type="text" name="department" value={employeeDetails.department} onChange={handleEmployeeDetailsChange} placeholder="e.g. SCCL" />
          </p>
        </div>

        <div className="info-column">
          <p>
            <strong>Month:</strong>
            <select name="month" value={employeeDetails.month} onChange={handleEmployeeDetailsChange}>
              <option value="">Select Month</option>
              <option value="Apr">Apr</option>
              <option value="May">May</option>
              <option value="Jun">Jun</option>
              <option value="Jul">Jul</option>
              <option value="Aug">Aug</option>
              <option value="Sep">Sep</option>
              <option value="Oct">Oct</option>
              <option value="Nov">Nov</option>
              <option value="Dec">Dec</option>
              <option value="Jan">Jan</option>
              <option value="Feb">Feb</option>
              <option value="Mar">Mar</option>
            </select>
          </p>
          <p>
            <strong>Financial Year:</strong>
            <input type="text" name="financialYear" value={employeeDetails.financialYear} onChange={handleEmployeeDetailsChange} placeholder="e.g. 2026-27" />
          </p>
          <p>
            <strong>Retirement Date:</strong>
            <input type="date" name="retirementDate" value={employeeDetails.retirementDate} onChange={handleEmployeeDetailsChange} />
          </p>
        </div>
      </div>
      <hr className="divider" />

      <div className="salary-breakdown-wrapper">
        <div className="breakdown-column earnings-side">
          <h4>Earnings</h4>
          <div className="dynamic-rows">
            {earnings.map((item, index) => (
              <div className="dynamic-row-item" key={`earn-${index}`}>
                <input
                  type="text"
                  className="input-label"
                  value={item.label}
                  onChange={(e) => handleEarningChange(index, "label", e.target.value)}
                  placeholder="Earning Head"
                />
                <input
                  type="number"
                  className="input-amount"
                  value={item.amount || ""}
                  onChange={(e) => handleEarningChange(index, "amount", Number(e.target.value))}
                  placeholder="₹ 0.00"
                />
                <button className="delete-row-btn" onClick={() => removeEarningField(index)} title="Remove">✕</button>
              </div>
            ))}
          </div>
          <button className="add-row-btn" onClick={addEarningField}>+ Add Earning Head</button>
        </div>

        <div className="breakdown-column deductions-side">
          <h4>Deductions</h4>
          <div className="dynamic-rows">
            {deductions.map((item, index) => (
              <div className="dynamic-row-item" key={`deduct-${index}`}>
                <input
                  type="text"
                  className="input-label"
                  value={item.label}
                  onChange={(e) => handleDeductionChange(index, "label", e.target.value)}
                  placeholder="Deduction Head"
                />
                <input
                  type="number"
                  className="input-amount"
                  value={item.amount || ""}
                  onChange={(e) => handleDeductionChange(index, "amount", Number(e.target.value))}
                  placeholder="₹ 0.00"
                />
                <button className="delete-row-btn" onClick={() => removeDeductionField(index)} title="Remove">✕</button>
              </div>
            ))}
          </div>
          <button className="add-row-btn" onClick={addDeductionField}>+ Add Deduction Head</button>
        </div>
      </div>
      <hr className="divider" />

      <div className="salary-totals-summary">
        <div className="total-block">
          <span>Gross Earnings:</span>
          <strong>₹ {grossEarnings.toFixed(2)}</strong>
        </div>
        <div className="total-block">
          <span>Total Deductions:</span>
          <strong>₹ {totalDeductions.toFixed(2)}</strong>
        </div>
        <div className="total-block net-pay-block">
          <span>Net Take-Home Pay:</span>
          <strong>₹ {netPay.toFixed(2)}</strong>
        </div>
      </div>

      <div className="salary-actions-footer">
        <button className="action-btn save" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Slip"}
        </button>
        <button className="action-btn edit" onClick={handleEdit}>Edit</button>
        <button className="action-btn update" onClick={handleUpdate}>Update</button>
        <button className="action-btn delete" onClick={handleDelete}>Delete</button>
      </div>

      <hr className="section-divider" />
      <div className="section-card">
        <h3 className="section-title">Personal Salary</h3>
        <PersonalSalary
          employeeDetails={employeeDetails}
          personalSalary={personalSalary}
          setPersonalSalary={setPersonalSalary}
          otherEarnings={otherEarnings}
          setOtherEarnings={setOtherEarnings}
          otherDeductions={otherDeductions}
          setOtherDeductions={setOtherDeductions}
        />
        <div className="salary-actions-footer">
          <button className="action-btn save" onClick={handlePersonalSave}>Save Personal Salary</button>
          <button className="action-btn edit" onClick={handlePersonalEdit}>Edit</button>
          <button className="action-btn update" onClick={handlePersonalUpdate}>Update</button>
          <button className="action-btn delete" onClick={handlePersonalDelete}>Delete</button>
        </div>
      </div>

      <hr className="section-divider" />
      <div className="section-card">
        <h3 className="section-title">Other Income</h3>
        <OtherIncome
          employeeDetails={employeeDetails}
          otherIncome={otherIncome}
          setOtherIncome={setOtherIncome}
          additionalIncome={additionalIncome}
          setAdditionalIncome={setAdditionalIncome}
        />
        <div className="salary-actions-footer">
          <button className="action-btn save" onClick={handleOtherIncomeSave}>Save Other Income</button>
          <button className="action-btn edit" onClick={handleOtherIncomeEdit}>Edit</button>
          <button className="action-btn update" onClick={handleOtherIncomeUpdate}>Update</button>
          <button className="action-btn delete" onClick={handleOtherIncomeDelete}>Delete</button>
        </div>
      </div>

      <hr className="section-divider" />
      <div className="section-card">
        <h3 className="section-title">Capital Receipt</h3>
        <CapitalReceipt
          employeeDetails={employeeDetails}
          capitalReceipt={capitalReceipt}
          setCapitalReceipt={setCapitalReceipt}
          additionalCapitalReceipts={additionalCapitalReceipts}
          setAdditionalCapitalReceipts={setAdditionalCapitalReceipts}
        />
        <div className="salary-actions-footer">
          <button className="action-btn save" onClick={handleCapitalReceiptSave}>Save Capital Receipt</button>
          <button className="action-btn edit" onClick={handleCapitalReceiptEdit}>Edit</button>
          <button className="action-btn update" onClick={handleCapitalReceiptUpdate}>Update</button>
          <button className="action-btn delete" onClick={handleCapitalReceiptDelete}>Delete</button>
        </div>
      </div>
      <hr className="section-divider" />
    </div>
  );
};

export default SalarySlip;