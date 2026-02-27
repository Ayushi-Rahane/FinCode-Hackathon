import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ─── Sidebar Nav Items ─── */
const NAV_ITEMS = [
    { label: "Dashboard", to: "/dashboard", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> },
    { label: "Stress Testing", to: "/stress-testing", active: true, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /> },
    { label: "Loan Optimization", to: "/loan-optimization", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { label: "Insights", to: "/insights", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /> },
    { label: "Report", to: "/report", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> },
];

const fmt = (n) => {
    return "₹" + Math.round(n).toLocaleString("en-IN");
};

/* ═════════════════════════════════════════════════════════════════ */
/*  Stress Testing Page                                           */
/* ═════════════════════════════════════════════════════════════════ */
const StressTestingPage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const analysisData = JSON.parse(localStorage.getItem("pdf_analysis") || "{}");
    const hasData = Object.keys(analysisData).length > 0;

    // Live averages fallback to 0 safely (from actual Python keys)
    const avgRevenue = analysisData.avg_monthly_inflow || 0;
    const avgExpense = analysisData.avg_monthly_outflow || 0;

    // We assume an arbitrary initial proposed EMI for the stress test baseline if no loan page exists
    const proposedEMI = (avgRevenue - avgExpense) > 0 ? (avgRevenue - avgExpense) * 0.4 : 50000;

    const [revenueDrop, setRevenueDrop] = useState(30);
    const [expenseIncrease, setExpenseIncrease] = useState(20);

    // Baseline Overall Score
    const baseScore = analysisData?.scores?.overall || 548;

    // Derived stressed values
    const stressedRevenue = Math.round(avgRevenue * (1 - revenueDrop / 100));
    const stressedExpense = Math.round(avgExpense * (1 + expenseIncrease / 100));
    const netSurplus = stressedRevenue - stressedExpense;
    const emiCoverage = proposedEMI > 0 ? (netSurplus / proposedEMI) : 0;
    const liquidityBuffer = stressedExpense > 0 ? (netSurplus / stressedExpense) : 0;

    // Predictive Risk Score Recalculation (mock algorithm)
    // 1. Coverage Penalty: Drop score rapidly if coverage drops below 1.5x, max -150 pts
    let coveragePenalty = 0;
    if (emiCoverage < 1.5) {
        coveragePenalty = Math.min(150, (1.5 - Math.max(0, emiCoverage)) * 100);
    }

    // 2. Surplus Penalty: If net surplus goes negative, massive tank.
    let surplusPenalty = 0;
    if (netSurplus <= 0) {
        surplusPenalty = 200;
    }

    const rawStressedScore = baseScore - coveragePenalty - surplusPenalty;
    const stressedScore = Math.max(300, Math.min(900, Math.round(rawStressedScore))); // floor at 300

    // Risk level strictly tied to score drop or coverage collapse
    const isHighRisk = emiCoverage < 1.0 || netSurplus < 0 || stressedScore < 500;
    const isMediumRisk = !isHighRisk && (emiCoverage < 1.5 || stressedScore < 650);

    const riskLabel = isHighRisk ? "High Risk" : isMediumRisk ? "Medium Risk" : "Low Risk";
    const riskColor = isHighRisk ? "red" : isMediumRisk ? "orange" : "green";
    const riskMessage = isHighRisk
        ? "Surplus collapses below EMI obligations or predictive score crashes to high-risk thresholds. The business would face significant financial strain and potential default."
        : isMediumRisk
            ? "EMI coverage is moderate and credit score drops. The business may face some strain under adverse conditions, but technically clears obligations."
            : "EMI coverage remains healthy and score stays resilient. The business can comfortably withstand this stress scenario.";

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* ── Sidebar ── */}
            <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-gray-100 px-4 py-6 shrink-0 justify-between sticky top-0 h-screen overflow-y-auto">
                <div>
                    <Link to="/" className="flex items-center gap-2 px-2 mb-4">
                        <div className="w-8 h-8 bg-[#1B2F6E] rounded-lg flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                                <rect x="2" y="12" width="4" height="10" rx="1" fill="white" />
                                <rect x="8" y="7" width="4" height="15" rx="1" fill="white" />
                                <rect x="14" y="3" width="4" height="19" rx="1" fill="white" />
                            </svg>
                        </div>
                        <span className="text-[#1B2F6E] font-extrabold text-lg tracking-tight">Credalytix</span>
                    </Link>

                    {/* Divider */}
                    <div className="border-b border-gray-200 mx-2 mb-4" />

                    {/* Profile */}
                    <Link to="/profile" className="flex items-center gap-3 px-3 py-3 mb-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                        <div className="w-9 h-9 bg-[#1B2F6E] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {user?.businessName ? user.businessName.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                            <p className="text-gray-900 font-bold text-sm group-hover:text-[#1B2F6E] transition-colors truncate w-32">
                                {user?.businessName || "Your Business"}
                            </p>
                            <p className="text-gray-400 text-xs truncate w-32">
                                {user?.industry || "Industry"}
                            </p>
                        </div>
                    </Link>

                    {/* Divider */}
                    <div className="border-b border-gray-200 mx-2 mb-4" />

                    <nav className="flex flex-col gap-1">
                        {NAV_ITEMS.map(({ label, to, icon, active }) => (
                            <Link
                                key={label}
                                to={to}
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base transition-all duration-200 ${active
                                    ? "bg-blue-50 text-[#1B2F6E] font-bold"
                                    : "text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-700"
                                    }`}
                                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                            >
                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {icon}
                                </svg>
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-base text-gray-500 font-medium hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full"
                    style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                >
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </aside>

            {/* ── Main Content ── */}
            <main className="flex-1 px-10 py-10 overflow-auto">
                {!hasData ? (
                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md mx-auto mt-20">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Assessment Data</h2>
                        <p className="text-gray-500 mb-6">You haven't uploaded any bank statements yet. Please upload to generate your assessment.</p>
                        <Link to="/register?step=2" className="bg-[#1B2F6E] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#12235A] transition-colors inline-block">Upload Statements</Link>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="mb-10">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Stress Testing</h1>
                            <p className="text-gray-500 text-lg" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                                Simulate adverse financial scenarios to assess business resilience.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* ── Left Column ── */}
                            <div className="flex flex-col gap-8">

                                {/* Scenario Parameters */}
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Scenario Parameters</h2>

                                    {/* Revenue Drop Slider */}
                                    <div className="mb-8">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-gray-900 font-bold text-base" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Revenue Drop</span>
                                            <span className="text-[#1B2F6E] font-bold text-xl bg-blue-50 px-4 py-1.5 rounded-lg">{revenueDrop}%</span>
                                        </div>
                                        <input
                                            type="range" min="0" max="60" value={revenueDrop}
                                            onChange={(e) => setRevenueDrop(Number(e.target.value))}
                                            className="w-full h-2.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#1B2F6E]"
                                        />
                                        <div className="flex justify-between mt-2">
                                            <span className="text-gray-400 text-sm" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>0%</span>
                                            <span className="text-gray-400 text-sm" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>30%</span>
                                            <span className="text-gray-400 text-sm" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>60%</span>
                                        </div>
                                    </div>

                                    {/* Expense Increase Slider */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-gray-900 font-bold text-base" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Expense Increase</span>
                                            <span className="text-[#1B2F6E] font-bold text-xl bg-blue-50 px-4 py-1.5 rounded-lg">{expenseIncrease}%</span>
                                        </div>
                                        <input
                                            type="range" min="0" max="50" value={expenseIncrease}
                                            onChange={(e) => setExpenseIncrease(Number(e.target.value))}
                                            className="w-full h-2.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#1B2F6E]"
                                        />
                                        <div className="flex justify-between mt-2">
                                            <span className="text-gray-400 text-sm" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>0%</span>
                                            <span className="text-gray-400 text-sm" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>25%</span>
                                            <span className="text-gray-400 text-sm" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>50%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Baseline Figures */}
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-5" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Live PDF Baselines</h3>
                                    <div className="flex flex-col gap-4">
                                        <Row label="Avg Monthly Revenue" value={fmt(avgRevenue)} />
                                        <Row label="Avg Monthly Expense" value={fmt(avgExpense)} />
                                        <Row label="Proposed EMI (Mock)" value={fmt(proposedEMI)} />
                                    </div>
                                </div>
                            </div>

                            {/* ── Right Column ── */}
                            <div className="flex flex-col gap-8">

                                {/* High Risk Alert */}
                                <div className={`rounded-2xl border-2 p-8 ${riskColor === "red"
                                    ? "bg-red-50 border-red-200"
                                    : riskColor === "orange"
                                        ? "bg-orange-50 border-orange-200"
                                        : "bg-green-50 border-green-200"
                                    }`}>

                                    <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
                                        <div className="flex items-center gap-2">
                                            <svg className={`w-6 h-6 ${riskColor === "red" ? "text-red-500"
                                                : riskColor === "orange" ? "text-orange-500"
                                                    : "text-green-500"
                                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.832c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                            </svg>
                                            <h3 className={`text-2xl font-bold ${riskColor === "red" ? "text-red-600"
                                                : riskColor === "orange" ? "text-orange-600"
                                                    : "text-green-600"
                                                }`}>{riskLabel}</h3>
                                        </div>

                                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-3 flex items-center gap-4 shrink-0">
                                            <div className="flex flex-col">
                                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wide">Base Score</span>
                                                <span className="text-gray-900 font-bold text-lg">{baseScore}</span>
                                            </div>
                                            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                            <div className="flex flex-col items-end">
                                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wide">Stressed Score</span>
                                                <span className={`font-bold text-2xl ${stressedScore < 500 ? "text-red-600" : stressedScore < 650 ? "text-orange-600" : "text-green-600"
                                                    }`}>{stressedScore}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-gray-700 text-base leading-relaxed" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                                        {riskMessage}
                                    </p>
                                </div>

                                {/* Stressed Financials */}
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#1B2F6E] inline-block" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Stressed Financials</h2>
                                    <div className="flex flex-col gap-0">
                                        <FinancialRow
                                            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />}
                                            iconColor="text-red-500"
                                            label="Stressed Revenue"
                                            value={fmt(stressedRevenue)}
                                        />
                                        <FinancialRow
                                            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />}
                                            iconColor="text-red-500"
                                            label="Stressed Expense"
                                            value={fmt(stressedExpense)}
                                        />
                                        <FinancialRow
                                            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />}
                                            iconColor={netSurplus < 0 ? "text-red-500" : netSurplus < 50000 ? "text-yellow-500" : "text-green-500"}
                                            label="Net Surplus"
                                            value={fmt(netSurplus)}
                                            valueColor={netSurplus < 0 ? "text-red-500" : "text-gray-900"}
                                        />
                                        <FinancialRow
                                            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                                            iconColor={emiCoverage < 1.5 ? "text-red-500" : emiCoverage < 2.5 ? "text-yellow-500" : "text-green-500"}
                                            label="EMI Coverage Ratio"
                                            value={`${emiCoverage.toFixed(2)}x`}
                                            valueColor={emiCoverage < 1.5 ? "text-red-500" : "text-gray-900"}
                                        />
                                        <FinancialRow
                                            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                                            iconColor="text-gray-400"
                                            label="Liquidity Buffer"
                                            value={`${liquidityBuffer.toFixed(2)}x`}
                                            last
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Risk Warning — full width below both columns */}
                        {isHighRisk && (
                            <div className="mt-8 rounded-2xl border-2 border-red-200 bg-red-50 p-6">
                                <div className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.832c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <div>
                                        <h4 className="text-red-600 font-bold text-base mb-1" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Risk Warning</h4>
                                        <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                                            Under this stress scenario, EMI coverage collapses and your predictive credit score plummets to <strong>{stressedScore} / High Risk</strong>. Consider reducing the loan amount or extending the tenure to maintain adequate safe harbor.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

/* ─── Helper: Baseline Row ─── */
const Row = ({ label, value }) => (
    <div className="flex items-center justify-between py-2">
        <span className="text-gray-600 text-base" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>{label}</span>
        <span className="text-gray-900 font-bold text-base" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>{value}</span>
    </div>
);

/* ─── Helper: Stressed Financials Row ─── */
const FinancialRow = ({ icon, iconColor, label, value, valueColor = "text-gray-900", last = false }) => (
    <div className={`flex items-center justify-between py-5 ${!last ? "border-b border-gray-100" : ""}`}>
        <div className="flex items-center gap-3">
            <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {icon}
            </svg>
            <span className="text-gray-700 text-base font-medium" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>{label}</span>
        </div>
        <span className={`font-bold text-lg ${valueColor}`} style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>{value}</span>
    </div>
);

export default StressTestingPage;
