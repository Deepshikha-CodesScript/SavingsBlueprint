import { useState, useEffect } from 'react';
import '../styles/styles.css';

// Example historicalData shape passed down from a parent or fetched from an API:
// [
//   { year: 2021, salary: 500000, businessIncome: 100000 },
//   { year: 2025, salary: 720000, businessIncome: 180000 },
//   { year: 2026, salary: 800000, businessIncome: 200000 }
// ]

function FutureSavingsForecast({ historicalData = [] }) {
  const currentYear = new Date().getFullYear();

  // 1. Core Component States
  const [currentSalary, setCurrentSalary] = useState(800000);
  const [currentBusinessIncome, setCurrentBusinessIncome] = useState(200000);
  const [growthRate, setGrowthRate] = useState(10); // Default fallback growth %
  const [savingPercentage, setSavingPercentage] = useState(30);

  // 2. Automated Past Growth Metrics States
  const [pastGrowthMetrics, setPastGrowthMetrics] = useState({
    twoYearRate: 0,
    threeYearRate: 0,
    fourYearRate: 0,
    fiveYearRate: 0,
  });

  // 3. Automatically analyze past trend patterns when historicalData updates
  useEffect(() => {
    if (historicalData && historicalData.length >= 2) {
      // Sort data chronologically to align rates perfectly
      const sortedData = [...historicalData].sort((a, b) => a.year - b.year);
      const latestRecord = sortedData[sortedData.length - 1];
      
      // Auto-populate latest actual income from your Income/Actual Savings records
      if (latestRecord.salary) setCurrentSalary(latestRecord.salary);
      if (latestRecord.businessIncome) setCurrentBusinessIncome(latestRecord.businessIncome);

      // Helper function to extract Compound Annual Growth Rate (CAGR)
      const calculateCAGR = (pastYear) => {
        const pastRecord = sortedData.find((d) => d.year === pastYear);
        if (!pastRecord || !latestRecord) return null;

        const totalLatestIncome = latestRecord.salary + (latestRecord.businessIncome || 0);
        const totalPastIncome = pastRecord.salary + (pastRecord.businessIncome || 0);

        if (totalPastIncome === 0) return null;

        const yearsDiff = latestRecord.year - pastRecord.year;
        const cagr = (Math.pow(totalLatestIncome / totalPastIncome, 1 / yearsDiff) - 1) * 100;
        return parseFloat(cagr.toFixed(2));
      };

      const rate2Y = calculateCAGR(currentYear - 2);
      const rate3Y = calculateCAGR(currentYear - 3);
      const rate4Y = calculateCAGR(currentYear - 4);
      const rate5Y = calculateCAGR(currentYear - 5);

      setPastGrowthMetrics({
        twoYearRate: rate2Y || 0,
        threeYearRate: rate3Y || 0,
        fourYearRate: rate4Y || 0,
        fiveYearRate: rate5Y || 0,
      });

      // Automatically use the 5-year average growth rate as the baseline default if it exists
      if (rate5Y) {
        setGrowthRate(rate5Y);
      } else if (rate2Y) {
        setGrowthRate(rate2Y); // Fallback to 2-year average if 5 years isn't fully logged yet
      }
    }
  }, [historicalData, currentYear]);

  // 4. Forecast Projections Generation (Yearly breakdown mapping)
  const generateForecastTimeline = () => {
    const timeline = [];
    const baseSalary = Number(currentSalary || 0);
    const baseBusiness = Number(currentBusinessIncome || 0);
    const rate = Number(growthRate || 0) / 100;

    // Project predictions iteratively over a 10 year timeline block
    for (let i = 1; i <= 10; i++) {
      const projectionYear = currentYear + i;
      const predictedSalary = baseSalary * Math.pow(1 + rate, i);
      const predictedBusiness = baseBusiness * Math.pow(1 + rate, i);
      const totalCombinedIncome = predictedSalary + predictedBusiness;
      const estimatedSavings = (totalCombinedIncome * (savingPercentage / 100));

      timeline.push({
        year: projectionYear,
        yearsOut: i,
        salary: Math.round(predictedSalary),
        businessIncome: Math.round(predictedBusiness),
        totalIncome: Math.round(totalCombinedIncome),
        savings: Math.round(estimatedSavings),
      });
    }
    return timeline;
  };

  const forecastData = generateForecastTimeline();

  return (
    <div className="sb-container">
      {/* Header */}
      <div className="sb-page-header">
        <h1 className="sb-page-title">Future Savings & Income Forecast</h1>
        <p className="sb-page-subtitle">
          Dynamically tracking historical trends to build smart data-driven financial predictions.
        </p>
      </div>

      {/* Historical Trend Insights Cards */}
      <div className="sb-metrics-strip" style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <div className="sb-metric-card" style={{ padding: '15px', background: '#f4f6f9', borderRadius: '8px', flex: 1 }}>
          <h4>2-Year Custom Growth</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2ecc71' }}>{pastGrowthMetrics.twoYearRate}%</p>
        </div>
        <div className="sb-metric-card" style={{ padding: '15px', background: '#f4f6f9', borderRadius: '8px', flex: 1 }}>
          <h4>3-Year Custom Growth</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2ecc71' }}>{pastGrowthMetrics.threeYearRate}%</p>
        </div>
        <div className="sb-metric-card" style={{ padding: '15px', background: '#f4f6f9', borderRadius: '8px', flex: 1 }}>
          <h4>4-Year Custom Growth</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2ecc71' }}>{pastGrowthMetrics.fourYearRate}%</p>
        </div>
        <div className="sb-metric-card" style={{ padding: '15px', background: '#f4f6f9', borderRadius: '8px', flex: 1 }}>
          <h4>Last 5 Years Growth (CAGR)</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#27ae60' }}>{pastGrowthMetrics.fiveYearRate}%</p>
        </div>
      </div>

      <div className="sb-forecast-grid">
        {/* Form Controls */}
        <div className="sb-form-card">
          <div className="sb-form-grid">
            <div className="sb-form-group">
              <label className="sb-label">Current Base Salary (₹)</label>
              <input
                type="number"
                className="sb-input"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(e.target.value)}
              />
            </div>

            <div className="sb-form-group">
              <label className="sb-label">Current Business Income (₹)</label>
              <input
                type="number"
                className="sb-input"
                value={currentBusinessIncome}
                onChange={(e) => setCurrentBusinessIncome(e.target.value)}
              />
            </div>

            <div className="sb-form-group">
              <label className="sb-label">Target Growth Rate %</label>
              <input
                type="number"
                className="sb-input"
                value={growthRate}
                onChange={(e) => setGrowthRate(e.target.value)}
              />
              <small style={{ color: '#7f8c8d' }}>Auto-calculated or manually adjustable</small>
            </div>

            <div className="sb-form-group">
              <label className="sb-label">Goal Target Savings %</label>
              <input
                type="number"
                className="sb-input"
                value={savingPercentage}
                onChange={(e) => setSavingPercentage(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Multi-Income Forecast Table */}
        <div className="sb-forecast-table-card" style={{ marginTop: '25px' }}>
          <h2 className="sb-summary-title">Future Prediction Timeline Estimates</h2>
          <table className="sb-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '10px' }}>Year</th>
                <th style={{ padding: '10px' }}>Predicted Salary</th>
                <th style={{ padding: '10px' }}>Business Income</th>
                <th style={{ padding: '10px' }}>Total Projected Income</th>
                <th style={{ padding: '10px' }}>Estimated Annual Savings</th>
              </tr>
            </thead>
            <tbody>
              {forecastData.map((row) => (
                <tr key={row.year} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>{row.year} ({row.yearsOut}Y)</td>
                  <td style={{ padding: '10px' }}>₹ {row.salary.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '10px' }}>₹ {row.businessIncome.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '10px', color: '#2c3e50', fontWeight: 'bold' }}>
                    ₹ {row.totalIncome.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '10px', color: '#27ae60', fontWeight: 'bold' }}>
                    ₹ {row.savings.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FutureSavingsForecast;