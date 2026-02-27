import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import StressTestingPage from "./pages/StressTestingPage";
import LoanOptimizationPage from "./pages/LoanOptimizationPage";
import InsightsPage from "./pages/InsightsPage";
import ReportPage from "./pages/ReportPage";
import BusinessProfilePage from "./pages/BusinessProfilePage";
import AIChatWidget from "./components/AIChatWidget";


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
                <Route path="/insights" element={<InsightsPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/profile" element={<BusinessProfilePage />} />

            </Routes>
            <AIChatWidget />
        </BrowserRouter>
    );
}

export default App;
