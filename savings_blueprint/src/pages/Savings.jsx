import { useState } from 'react';
import '../styles/styles.css';

function Savings() {
  const initialState = {
    // Category Details (Invested Amounts)
    lic: '',
    healthInsurance: '',
    sip: '',
    mutualFunds: '',
    fd: '',
    ppf: '',
    gold: '',
    stocks: '',
    emergencyFund: '',
    crypto: '',
    realEstate: '',

    // Performance Details (Estimated Return Percentages)
    licReturn: '6',
    healthInsuranceReturn: '0',
    sipReturn: '12',
    mutualFundsReturn: '12',
    fdReturn: '7',
    ppfReturn: '7.1',
    goldReturn: '8',
    stocksReturn: '15',
    emergencyFundReturn: '4',
    cryptoReturn: '20',
    realEstateReturn: '10',

    notes: ''
  };

  const [savingsData, setSavingsData] = useState(initialState);

  /* =========================
      HANDLE CHANGE
  ========================= */
  const handleChange = (e) => {
    setSavingsData({
      ...savingsData,
      [e.target.name]: e.target.value
    });
  };

  /* =========================
      ACTION HANDLERS (CRUD)
  ========================= */
  const handleSave = (e) => {
    if(e) e.preventDefault();
    alert('Savings Details Saved Successfully');
    console.log('Saved Record:', savingsData);
  };

  const handleEdit = () => {
    alert('You Can Now Edit Savings Details');
  };

  const handleUpdate = () => {
    alert('Savings Details Updated Successfully');
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to clear all investment data?');
    if (confirmDelete) {
      setSavingsData(initialState);
      alert('Savings Record Reset');
    }
  };

  /* =========================
      CALCULATIONS (Maturity = Principal + Simple Estimated Growth)
  ========================= */
  const calculateMaturity = (principal, returnRate) => {
    const p = Number(principal || 0);
    const r = Number(returnRate || 0);
    if (p === 0) return 0;
    // Calculation model assuming an illustrative holding duration milestone block
    return Math.round(p + (p * (r / 100)));
  };

  const categories = [
    { id: 'lic', label: 'LIC', value: savingsData.lic, rate: savingsData.licReturn, rateName: 'licReturn' },
    { id: 'healthInsurance', label: 'Health Insurance', value: savingsData.healthInsurance, rate: savingsData.healthInsuranceReturn, rateName: 'healthInsuranceReturn' },
    { id: 'sip', label: 'SIP', value: savingsData.sip, rate: savingsData.sipReturn, rateName: 'sipReturn' },
    { id: 'mutualFunds', label: 'Mutual Funds', value: savingsData.mutualFunds, rate: savingsData.mutualFundsReturn, rateName: 'mutualFundsReturn' },
    { id: 'fd', label: 'FD', value: savingsData.fd, rate: savingsData.fdReturn, rateName: 'fdReturn' },
    { id: 'ppf', label: 'PPF', value: savingsData.ppf, rate: savingsData.ppfReturn, rateName: 'ppfReturn' },
    { id: 'gold', label: 'Gold', value: savingsData.gold, rate: savingsData.goldReturn, rateName: 'goldReturn' },
    { id: 'stocks', label: 'Stocks', value: savingsData.stocks, rate: savingsData.stocksReturn, rateName: 'stocksReturn' },
    { id: 'emergencyFund', label: 'Emergency Fund', value: savingsData.emergencyFund, rate: savingsData.emergencyFundReturn, rateName: 'emergencyFundReturn' },
    { id: 'crypto', label: 'Crypto', value: savingsData.crypto, rate: savingsData.cryptoReturn, rateName: 'cryptoReturn' },
    { id: 'realEstate', label: 'Real Estate', value: savingsData.realEstate, rate: savingsData.realEstateReturn, rateName: 'realEstateReturn' },
  ];

  const totalSavings = categories.reduce((sum, item) => sum + Number(item.value || 0), 0);
  
  const totalMaturity = categories.reduce((sum, item) => {
    return sum + calculateMaturity(item.value, item.rate);
  }, 0);

  return (
    <div className="sb-container">
      {/* Header */}
      <div className="sb-page-header">
        <h1 className="sb-page-title">Savings Management</h1>
        <p className="sb-page-subtitle">
          Track, modify, and manage all actual savings assets across portfolio metrics.
        </p>
      </div>

      <div className="sb-savings-grid">
        {/* Savings Form & Product Metrics Input Table */}
        <div className="sb-form-card">
          <form onSubmit={handleSave} className="sb-form">
            
            <h2 className="sb-summary-title" style={{ color: '#03045e', marginBottom: '15px' }}>
              Portfolio Investment Grid
            </h2>

            {/* PRODUCT SPECIFICATION TABLE */}
            <div className="sb-table-wrapper" style={{ overflowX: 'auto', marginBottom: '25px' }}>
              <table className="sb-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #0077b6', background: '#caf0f8' }}>
                    <th style={{ padding: '12px 10px', color: '#03045e', fontWeight: '600' }}>Product</th>
                    <th style={{ padding: '12px 10px', color: '#03045e', fontWeight: '600' }}>Invested Amount (₹)</th>
                    <th style={{ padding: '12px 10px', color: '#03045e', fontWeight: '600' }}>Return %</th>
                    <th style={{ padding: '12px 10px', color: '#03045e', fontWeight: '600' }}>Est. Maturity (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      {/* Product Name */}
                      <td style={{ padding: '10px', fontWeight: '500', color: '#1e293b' }}>
                        {cat.label}
                      </td>
                      {/* Invested Principal Input */}
                      <td style={{ padding: '10px' }}>
                        <input
                          type="number"
                          name={cat.id}
                          className="sb-input"
                          style={{ margin: 0, padding: '6px 10px' }}
                          placeholder="0"
                          value={cat.value}
                          onChange={handleChange}
                        />
                      </td>
                      {/* Return Rate Percentage Input */}
                      <td style={{ padding: '10px' }}>
                        <input
                          type="number"
                          name={cat.rateName}
                          className="sb-input"
                          style={{ margin: 0, padding: '6px 10px', width: '80px' }}
                          placeholder="0"
                          value={cat.rate}
                          onChange={handleChange}
                        />
                      </td>
                      {/* Maturity Calculation Display */}
                      <td style={{ padding: '10px', fontWeight: '600', color: '#023e8a' }}>
                        ₹ {calculateMaturity(cat.value, cat.rate).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Notes Section */}
            <div className="sb-form-group">
              <label className="sb-label">Asset Management Notes</label>
              <textarea
                rows="4"
                name="notes"
                className="sb-textarea"
                placeholder="Specify specific allocations, portfolio rebalancing triggers, or tenure dates..."
                value={savingsData.notes}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* CRUD OPERATIONS INTERACTION BUTTONS */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
              <button type="submit" className="salary-slip-btn">Save</button>
              <button type="button" onClick={handleEdit} className="salary-slip-btn" style={{ backgroundColor: '#ef4444' }}>Edit</button>
              <button type="button" onClick={handleUpdate} className="salary-slip-btn" style={{ backgroundColor: '#10b981' }}>Update</button>
              <button type="button" onClick={handleDelete} className="salary-slip-btn" style={{ backgroundColor: '#6b7280' }}>Delete</button>
            </div>

          </form>
        </div>

        {/* Dynamic Portfolio Summary Card */}
        <div className="sb-summary-card">
          <h2 className="sb-summary-title">Savings Summary</h2>

          {categories.map((cat) => (
            Number(cat.value) > 0 && (
              <div className="sb-summary-item" key={`summary-${cat.id}`}>
                <span>{cat.label}</span>
                <strong>₹ {Number(cat.value).toLocaleString()}</strong>
              </div>
            )
          ))}

          <div className="sb-summary-item" style={{ marginTop: '15px', borderTop: '2px dashed #90e0ef', paddingTop: '15px' }}>
            <span>Total Invested Capital</span>
            <strong style={{ color: '#0077b6' }}>₹ {totalSavings.toLocaleString()}</strong>
          </div>

          <div className="sb-summary-item" style={{ borderBottom: 'none' }}>
            <span>Projected Maturity Value</span>
            <strong style={{ color: '#10b981' }}>₹ {totalMaturity.toLocaleString()}</strong>
          </div>

          {/* FINAL HIGHLIGHTED INVESTMENT BANNER */}
          <div className="sb-total-income" style={{ background: 'linear-gradient(135deg, #023e8a, #03045e)' }}>
            <h3>AGGREGATE NET PORTFOLIO</h3>
            <h1>₹ {totalSavings.toLocaleString()}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Savings;