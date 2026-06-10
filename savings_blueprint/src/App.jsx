import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Savings from "./pages/Savings";
import Goals from "./pages/Goals";
import SalaryPlan from "./components/Salaryplan";
import FutureSavingsForecast from "./pages/FutureSavingsForecast";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Register from "./pages/Register";

import IncomeSource from "./components/IncomeSource.jsx";
// import SalarySlip from "./pages/SalarySlip";
// import PartTimeSalarySlip from "./pages/PartTimeSalarySlip";
import SavingsPlanFund from "./pages/SavingsPlanFund";


import SalarySlipPage from "./pages/SalarySlipPage"; 

import { useState } from "react";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  return (

    <Routes>

      {/* Public Routes */}
      {!isAuthenticated && (
        <>
          <Route path="/login" element={ <Login setIsAuthenticated={setIsAuthenticated} />}/>

          <Route
            path="/register"
            element={<Register />}
          />

          {/* Redirect */}
          <Route
            path="*"
            element={<Navigate to="/login" />}
          />
        </>
      )}

      {/* Protected Routes */}
      {isAuthenticated && (
        <Route
          path="*"
          element={
            <div className="app-layout">

              <Navbar />

              <main className="app-content">

                <Routes>

                  {/* <Route path="/" element={<Dashboard />} /> */}
                  <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}/>

                  <Route path="/income" element={<Income />} />

                  <Route
                    path="/incomeSource"
                    element={<IncomeSource />}
                  />

                  <Route
                    path="/savings"
                    element={<Savings />}     
                  />

                  <Route
                    path="/goals"
                    element={<Goals />}
                  />

                  <Route
                    path="/salary-plans"
                    element={<SalaryPlan />}
                  />

                  <Route
                    path="/forecast"
                    element={<FutureSavingsForecast />}
                  />

                  {/* <Route
                    path="/salary-slip"
                    element={<SalarySlip />}
                  /> */}

                  {/* <Route
                    path="/part-time-slip"
                    element={<PartTimeSalarySlip />}
                  /> */}

                  <Route
  path="/salary"
  element={<SalarySlipPage />}
/>

                  <Route
                    path="/savings-plan-fund"
                    element={<SavingsPlanFund />}
                  />

                  <Route
                    path="/reports"
                    element={<Reports />}
                  />

                </Routes>

              </main>

              <Footer />

            </div>
          }
        />
      )}

    </Routes>

  );
}

export default App;






// import { Routes , Route} from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Dashboard from "./pages/Dashboard";
// import Income from "./pages/Income";
// import Savings from "./pages/Savings";
// import Goals from "./pages/Goals";
// import SalaryPlan from "./components/Salaryplan";
// import FutureSavingsForecast from "./pages/FutureSavingsForecast";
// import Reports from "./pages/Reports";
// import {useState} from "react";
// import Login from "./pages/Login";
// import IncomeSource from "./components/IncomeSource.jsx";
// import SalarySlip from "./pages/SalarySlip";
// import PartTimeSalarySlip from "./pages/PartTimeSalarySlip";
// import SavingsPlanFund from "./pages/SavingsPlanFund";
// import Register from "./pages/Register";
// function App(){

//     const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorage.getItem("isAuthenticated") === "true");

//   if (!isAuthenticated) {
//     return <Login setIsAuthenticated={setIsAuthenticated} />;}

//     return <div>  

//       <div className="app-layout">
//         <Navbar />
//         <main className="app-content">
//           <Routes>
//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="/income" element={<Income />} />
//                  <Route path="/incomeSource" element={<IncomeSource />} />
//                 <Route path="/savings" element={<Savings />} />
//                 <Route path="/goals" element={<Goals/>} />
//                 <Route path="/salary-plans" element={<SalaryPlan/>}/>   
//                 <Route path="/forecast" element={<FutureSavingsForecast/>}/>   
//                 <Route path="/income" element={<Income />} /> 
//                 <Route path="/salary-slip" element={<SalarySlip />} />  
//                 <Route path="/part-time-slip" element={<PartTimeSalarySlip />}/>
//                 <Route path="/savings-plan-fund" element={<SavingsPlanFund />}/>
//                 <Route path="/register" element={<Register />} />
//                 <Route
//   path="/reports"
//   element={<Reports />}
// />         
//           </Routes>
//         </main>

//         <Footer />

//       </div>

   
             

//             </div>
// }
// export default App;