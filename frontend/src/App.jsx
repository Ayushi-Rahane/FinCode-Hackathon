import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import StressTestingPage from "./pages/StressTestingPage";
import LoanOptimizationPage from "./pages/LoanOptimizationPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/stress-testing" element={<StressTestingPage />} />
                <Route path="/loan-optimization" element={<LoanOptimizationPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

