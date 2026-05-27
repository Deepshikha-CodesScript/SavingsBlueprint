import React, { useState } from "react";
import "../styles/styles.css";

function Goals() {
  // Pre-populated examples based on your exact requirements
  const initialGoalsList = [
    {
      id: 1,
      goalName: "House Building",
      targetYear: "2036",
      targetMonth: "October",
      futureAmountRequired: "700000",
      inflationRate: "6",
    },
    {
      id: 2,
      goalName: "Daughter Marriage",
      targetYear: "2040",
      targetMonth: "April",
      futureAmountRequired: "500000",
      inflationRate: "6",
    },
    {
      id: 3,
      goalName: "Children Education",
      targetYear: "2030",
      targetMonth: "June",
      futureAmountRequired: "2000000",
      inflationRate: "7",
    },
    {
      id: 4,
      goalName: "Foreign Travel",
      targetYear: "2032",
      targetMonth: "January",
      futureAmountRequired: "500000",
      inflationRate: "5",
    },
  ];

  const initialFormState = {
    id: null,
    goalName: "",
    targetYear: "",
    targetMonth: "",
    futureAmountRequired: "",
    inflationRate: "6", // default sensible value
  };

  const [goals, setGoals] = useState(initialGoalsList);
  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  /* =====================================================
     INFLATION ADJUSTED VALUE FORMULA INTERPRETER
     FV = PV * (1 + r)^n
     Where:
       PV = Current Present Cost Target (futureAmountRequired)
       r  = Inflation Rate %
       n  = Time delta computed dynamically (Target Year - Current Year)
  ===================================================== */
  const calculateAdjustedAmount = (pv, rate, targetYear) => {
    const presentValue = Number(pv || 0);
    const inflationPercent = Number(rate || 0) / 100;
    const currentYear = new Date().getFullYear();
    const targetYr = Number(targetYear || currentYear);
    
    // Determine delta year 'n' (Ensure it is non-negative)
    const n = targetYr > currentYear ? targetYr - currentYear : 0;
    
    if (presentValue === 0) return 0;
    
    const futureValue = presentValue * Math.pow(1 + inflationPercent, n);
    return Math.round(futureValue);
  };

  /* =========================
      INPUT SYNC HANDLER
  ========================= */
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
      ACTION HANDLERS (CRUD)
  ========================= */
  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.goalName || !formData.targetYear || !formData.futureAmountRequired) {
      alert("Please fill in Goal Name, Target Year, and Future Amount Required.");
      return;
    }

    const newGoal = {
      ...formData,
      id: Date.now(),
    };

    setGoals([...goals, newGoal]);
    setFormData(initialFormState);
    alert("Financial Goal Saved Successfully");
  };

  const handleSelectEdit = (goal) => {
    setFormData(goal);
    setIsEditing(true);
    alert(`Loaded "${goal.goalName}" into the input editor panel.`);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!formData.id) return;

    setGoals(goals.map((g) => (g.id === formData.id ? formData : g)));
    setIsEditing(false);
    setFormData(initialFormState);
    alert("Financial Goal Updated Successfully");
  };

  const handleDelete = (id) => {
    const confirmClear = window.confirm("Are you sure you want to delete this financial goal?");
    if (confirmClear) {
      setGoals(goals.filter((g) => g.id !== id));
      if (formData.id === id) {
        setFormData(initialFormState);
        setIsEditing(false);
      }
      alert("Goal Entry Removed");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="sb-container">
      {/* Header */}
      <div className="sb-page-header">
        <h1 className="sb-page-title">Financial Goal Setting</h1>
        <p className="sb-page-subtitle">
          Define target horizons, outline milestones, and compute inflation-adjusted future capital requirements.
        </p>
      </div>

      <div className="sb-savings-grid">
        {/* Interactive Goal Form Workspace */}
        <div className="sb-form-card">
          <h2 className="sb-summary-title" style={{ color: "#03045e", marginBottom: "15px" }}>
            {isEditing ? "Modify Goal Parameters" : "Establish New Financial Goal"}
          </h2>
          
          <form className="sb-form" onSubmit={isEditing ? (e) => e.preventDefault() : handleSave}>
            <div className="sb-form-grid">
              
              <div className="sb-form-group">
                <label className="sb-label">Goal Target Name</label>
                <input
                  type="text"
                  name="goalName"
                  className="sb-input"
                  placeholder="e.g. House Building, Retirement"
                  value={formData.goalName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="sb-form-group">
                <label className="sb-label">Target Year</label>
                <input
                  type="number"
                  name="targetYear"
                  className="sb-input"
                  placeholder={`e.g. ${currentYear + 10}`}
                  value={formData.targetYear}
                  onChange={handleInputChange}
                />
              </div>

              <div className="sb-form-group">
                <label className="sb-label">Target Month</label>
                <select
                  name="targetMonth"
                  className="sb-input"
                  style={{ height: "45px" }}
                  value={formData.targetMonth}
                  onChange={handleInputChange}
                >
                  <option value="">Select Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>

              <div className="sb-form-group">
                <label className="sb-label">Present Value Required (₹)</label>
                <input
                  type="number"
                  name="futureAmountRequired"
                  className="sb-input"
                  placeholder="Enter current target price"
                  value={formData.futureAmountRequired}
                  onChange={handleInputChange}
                />
              </div>

              <div className="sb-form-group">
                <label className="sb-label">Estimated Inflation % (Annual)</label>
                <input
                  type="number"
                  name="inflationRate"
                  className="sb-input"
                  placeholder="6"
                  value={formData.inflationRate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="sb-form-group">
                <label className="sb-label" style={{ color: "#0077b6" }}>Calculated Dynamic FV Output</label>
                <div style={{ 
                  height: "45px", 
                  background: "#caf0f8", 
                  borderRadius: "8px", 
                  display: "flex", 
                  alignItems: "center", 
                  paddingLeft: "15px", 
                  fontWeight: "600",
                  color: "#03045e",
                  border: "1px dashed #90e0ef"
                }}>
                  ₹ {calculateAdjustedAmount(formData.futureAmountRequired, formData.inflationRate, formData.targetYear).toLocaleString()}
                </div>
              </div>

            </div>

            {/* ACTION TRIGGERS BAR */}
            <div style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap" }}>
              {!isEditing ? (
                <button type="submit" className="salary-slip-btn">Save</button>
              ) : (
                <>
                  <button type="button" onClick={handleUpdate} className="salary-slip-btn" style={{ backgroundColor: "#10b981" }}>Update</button>
                  <button type="button" onClick={() => { setFormData(initialFormState); setIsEditing(false); }} className="salary-slip-btn" style={{ backgroundColor: "#6b7280" }}>Cancel Edit</button>
                </>
              )}
            </div>
          </form>
        </div>

        {/* Dynamic Display Tracker Panel */}
        <div className="sb-summary-card" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <h2 className="sb-summary-title">Goal Milestones Overview</h2>
          
          {goals.length === 0 ? (
            <p style={{ color: "#64748b", fontStyle: "italic", textAlign: "center", marginTop: "20px" }}>No active goals tracked. Establish one inside the editor grid.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", maxHeight: "680px", overflowY: "auto", paddingRight: "5px" }}>
              {goals.map((goal) => {
                const fv = calculateAdjustedAmount(goal.futureAmountRequired, goal.inflationRate, goal.targetYear);
                const yearsLeft = Number(goal.targetYear || currentYear) - currentYear;
                
                return (
                  <div className="sb-goal-card" key={goal.id} style={{ border: "1px solid #e2e8f0", padding: "15px", borderRadius: "10px", background: "#ffffff" }}>
                    <div className="sb-goal-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <h3 className="sb-goal-title" style={{ fontSize: "18px", color: "#03045e", fontWeight: "600" }}>{goal.goalName}</h3>
                      <span className="sb-goal-progress-text" style={{ fontSize: "12px", padding: "4px 8px", background: "#e2e8f0", borderRadius: "20px", fontWeight: "500" }}>
                        {yearsLeft > 0 ? `${yearsLeft} Years Horizon` : "Immediate Target"}
                      </span>
                    </div>

                    <div className="sb-goal-details" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "13px", marginBottom: "12px" }}>
                      <div>
                        <span style={{ color: "#64748b", display: "block" }}>Timeline</span>
                        <strong style={{ color: "#1e293b" }}>{goal.targetMonth || "Unspecified"} {goal.targetYear}</strong>
                      </div>
                      <div>
                        <span style={{ color: "#64748b", display: "block" }}>Base Amount (PV)</span>
                        <strong style={{ color: "#1e293b" }}>₹ {Number(goal.futureAmountRequired).toLocaleString()}</strong>
                      </div>
                      <div>
                        <span style={{ color: "#64748b", display: "block" }}>Inflation Rate</span>
                        <strong style={{ color: "#1e293b" }}>{goal.inflationRate}% Compounded Annually</strong>
                      </div>
                      <div>
                        <span style={{ color: "#0077b6", display: "block" }}>Adjusted Value (FV)</span>
                        <strong style={{ color: "#023e8a", fontSize: "15px" }}>₹ {fv.toLocaleString()}</strong>
                      </div>
                    </div>

                    {/* ACTION WORKFLOW OPERATIONS FOR INDIVIDUAL TARGET CARDS */}
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", borderTop: "1px solid #f1f5f9", paddingTop: "8px" }}>
                      <button type="button" onClick={() => handleSelectEdit(goal)} style={{ background: "none", border: "none", color: "#ef4444", fontWeight: "500", cursor: "pointer", fontSize: "13px" }}>Edit</button>
                      <span style={{ color: "#cbd5e1" }}>|</span>
                      <button type="button" onClick={() => handleDelete(goal.id)} style={{ background: "none", border: "none", color: "#6b7280", fontWeight: "500", cursor: "pointer", fontSize: "13px" }}>Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Goals;