import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { salaryCategories } from "../data/salarySources";

const IncomeSource = () => {
  const [salarySource, setSalarySource] = useState("");

  const navigate = useNavigate();

  // const incomeSource = [
  //   {
  //     title: "Software Engineer Salary",
  //     amount: "₹80,000",
  //   },
  //   {
  //     title: "Freelancing Income",
  //     amount: "₹25,000",
  //   },
  //   {
  //     title: "Part Time Income",
  //     amount: "₹15,000",
  //   },
  // ];

  return (
    <div className="income-page">
      <h2>Select Salary Source</h2>

      <select
        value={salarySource}
        onChange={(e) => setSalarySource(e.target.value)}
        className="salary-select"
      >
        <option value="">Choose Income Source</option>

        {Object.keys(salaryCategories).map((category) => (
          <optgroup key={category} label={category}>
            {salaryCategories[category].map((source, index) => (
              <option key={index} value={source}>
                {source}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      {salarySource && (
  <div className="selected-source-box">
    <p className="selected-source">
      Selected Source: <strong>{salarySource}</strong>
    </p>

    {/* <button
      className="salary-slip-btn"
      onClick={() =>
        navigate("/salary-slip", {
          state: {
            salary: "₹50,000",
            source: salarySource,
          },
        })
      }
    >
      Create {salarySource} Salary Slip
    </button> */}

{salarySource && (
  <div className="selected-source-box">

    <p className="selected-source">
      Selected Source: <strong>{salarySource}</strong>
    </p>

    {/* PART TIME JOB */}
    {salarySource === "Part-Time Job" && (
      <button
        className="salary-slip-btn"
        onClick={() =>
          navigate("/part-time-slip", {
            state: {
              source: salarySource,
            },
          })
        }
      >
        Create Part-Time Job Salary Slip
      </button>
    )}

    {/* INTERNSHIP */}
    {salarySource === "Internship Stipend" && (
      <button
        className="salary-slip-btn"
        onClick={() =>
          navigate("/salary", {
            state: {
              source: salarySource,
            },
          })
        }
      >
        Create Internship Stipend Salary Slip
      </button>
    )}

    {/* DEFAULT SALARY */}
    {salarySource !== "Part-Time Job" &&
      salarySource !== "Internship Stipend" && (
        <button
          className="salary-slip-btn"
          onClick={() =>
            navigate("/salary", {
              state: {
                salary: "₹50,000",
                source: salarySource,
              },
            })
          }
        >
          Create {salarySource} Salary Slip
        </button>
      )}

  </div>
)}





  </div>
)}

    </div>
  );
};

export default IncomeSource;