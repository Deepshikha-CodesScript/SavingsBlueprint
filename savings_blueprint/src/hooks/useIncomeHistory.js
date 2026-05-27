// src/hooks/useIncomeHistory.js
import { useState, useEffect } from 'react';

export function useIncomeHistory() {
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch from API or LocalStorage
        const response = await fetch("http://localhost:5000/api/income/history");
        if (response.ok) {
          const data = await response.json();
          setHistoricalData(data);
        } else {
          // Fallback static data if api sends error
          setHistoricalData(getMockFallback());
        }
      } catch (err) {
        setHistoricalData(getMockFallback());
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { historicalData, loading };
}

// Kept private at the bottom of the file out of sight
function getMockFallback() {
  return [
    { year: 2022, salary: 550000, businessIncome: 120000 },
    { year: 2023, salary: 620000, businessIncome: 140000 },
    { year: 2024, salary: 680000, businessIncome: 160000 },
    { year: 2025, salary: 740000, businessIncome: 185000 },
    { year: 2026, salary: 800000, businessIncome: 200000 },
  ];
}