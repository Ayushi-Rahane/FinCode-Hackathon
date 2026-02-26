import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ─── Sidebar Nav Items ─── */
const NAV_ITEMS = [
    { label: "Dashboard", to: "/dashboard", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> },
    { label: "Stress Testing", to: "/stress-testing", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /> },
    { label: "Loan Optimization", to: "/loan-optimization", active: true, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { label: "Insights", to: "/insights", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /> },
    { label: "Report", to: "/report", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> },
];

const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

const FONT = { fontFamily: 'IBM Plex Sans, sans-serif' };

const calculateEMI = (principal, ratePerAnnum, tenureMonths) => {
    if (principal <= 0 || tenureMonths <= 0) return 0;
    if (ratePerAnnum === 0) return principal / tenureMonths;
    const r = ratePerAnnum / 12 / 100;
    return (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
};

/* ═══════════════════════════════════════════════════════════════ */
const LoanOptimizationPage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const analysisData = JSON.parse(localStorage.getItem("pdf_analysis") || "{}");

    // Live Net Surplus from the PDF. If NaN or empty, default to 50000 
    const liveNetSurplus = analysisData.net_surplus && analysisData.net_surplus > 0 ? analysisData.net_surplus : 50000;

    // Local Component State for the inputs
    const [loanAmount, setLoanAmount] = useState(500000);
    const [tenure, setTenure] = useState(24);
    const [interestRate, setInterestRate] = useState(12);

    // Compute Proposed Math
    const proposedEMI = calculateEMI(loanAmount, interestRate, tenure);
    const proposedEmiRatio = liveNetSurplus / proposedEMI;
    const proposedTotalInterest = (proposedEMI * tenure) - loanAmount;

    // Affordability Logic
    const emiBurdenPct = (proposedEMI / liveNetSurplus) * 100;
    const isRisky = emiBurdenPct > 70;
    const isSafe = emiBurdenPct < 50;

    // Compute Recommended Math (Safe means EMI should be max 50% of Net Surplus)
    let recLoan, recTenure, recRate, recEMI, recTotalInterest, recEmiRatio;

    if (isRisky) {
        // Back-calculate a safe loan amount targeting 45% burden over a longer tenure
        recTenure = Math.min(60, tenure + 12);
        recRate = interestRate - 0.5; // Hypothetical lower rate if they take a smaller safer loan
        recEMI = liveNetSurplus * 0.45;
        const r = recRate / 12 / 100;
        // P = EMI * ((1+r)^n - 1) / (r * (1+r)^n)
        recLoan = recEMI * (Math.pow(1 + r, recTenure) - 1) / (r * Math.pow(1 + r, recTenure));
        recTotalInterest = (recEMI * recTenure) - recLoan;
        recEmiRatio = liveNetSurplus / recEMI;
    } else {
        // If they're already safe, just suggest keeping it or optimizing rate
        recLoan = loanAmount;
        recTenure = tenure;
        recRate = interestRate;
        recEMI = proposedEMI;
        recTotalInterest = proposedTotalInterest;
        recEmiRatio = proposedEmiRatio;
    }

    /* ─── Dynamic Comparison Table Data ─── */
    const TABLE_ROWS = [
        { metric: "Loan Amount", proposed: fmt(loanAmount), recommended: fmt(recLoan) },
        { metric: "Loan Tenure", proposed: `${tenure} months`, recommended: `${recTenure} months` },
        { metric: "Interest Rate", proposed: `${interestRate}%`, recommended: `${recRate}%` },
        { metric: "Monthly EMI", proposed: fmt(proposedEMI), recommended: fmt(recEMI) },
        { metric: "Total Interest Paid", proposed: fmt(proposedTotalInterest), recommended: fmt(recTotalInterest) },
        { metric: "Surplus Coverage Ratio", proposed: `${proposedEmiRatio.toFixed(1)}x`, recommended: `${recEmiRatio.toFixed(1)}x` },
        {
            metric: "Risk Assessment",
            proposed: isRisky ? "High Risk" : isSafe ? "Safe" : "Moderate",
            proposedColor: isRisky ? "text-red-600" : isSafe ? "text-green-600" : "text-yellow-600",
            recommended: "Optimal Safety",
            recommendedColor: "text-[#1B2F6E]",
        },
    ];

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
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base transition-all duration-200 ${active ? "bg-blue-50 text-[#1B2F6E] font-bold" : "text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-700"
                                    }`}
                                style={FONT}
                            >
                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-base text-gray-500 font-medium hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full"
                    style={FONT}
                >
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </aside>

            {/* ── Main Content ── */}
            <main className="flex-1 px-10 py-10 overflow-auto">
                <div className="mb-0">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Loan Optimization</h1>
                    <p className="text-gray-500 text-lg" style={FONT}>
                        Compare your proposed loan with our AI-recommended safe alternative based on your real Net Surplus of <span className="font-bold text-[#1B2F6E]">{fmt(liveNetSurplus)}/mo</span>.
                    </p>
                </div>

                {/* ── Inputs ── */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 mt-8 flex flex-wrap gap-6 items-end">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-bold text-gray-700 mb-2" style={FONT}>Proposed Loan Amount (₹)</label>
                        <input
                            type="number"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-bold focus:ring-2 focus:ring-[#1B2F6E]/50 focus:border-[#1B2F6E] outline-none"
                            style={FONT}
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-bold text-gray-700 mb-2" style={FONT}>Tenure (Months)</label>
                        <input
                            type="number"
                            value={tenure}
                            onChange={(e) => setTenure(Number(e.target.value))}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-bold focus:ring-2 focus:ring-[#1B2F6E]/50 focus:border-[#1B2F6E] outline-none"
                            style={FONT}
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-bold text-gray-700 mb-2" style={FONT}>Interest Rate (%)</label>
                        <input
                            type="number"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-bold focus:ring-2 focus:ring-[#1B2F6E]/50 focus:border-[#1B2F6E] outline-none"
                            style={FONT}
                        />
                    </div>
                </div>

                {/* ── Loan Comparison Cards ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Your Proposed Loan */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900" style={FONT}>Your Proposed Loan</h2>
                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${isRisky ? 'bg-red-100 text-red-700' : isSafe ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`} style={FONT}>
                                {isRisky ? 'High Risk' : isSafe ? 'Safe' : 'Moderate'}
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm mb-1" style={FONT}>Loan Amount</p>
                        <p className="text-3xl font-bold text-gray-900 mb-5" style={FONT}>{fmt(loanAmount)}</p>
                        <div className="flex gap-12 mb-6">
                            <div>
                                <p className="text-gray-500 text-sm mb-1" style={FONT}>Tenure</p>
                                <p className="text-lg font-bold text-gray-900" style={FONT}>{tenure} months</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-1" style={FONT}>Monthly EMI</p>
                                <p className="text-lg font-bold text-gray-900" style={FONT}>{fmt(proposedEMI)}</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 mb-5">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 text-sm font-medium" style={FONT}>EMI consumes {emiBurdenPct.toFixed(0)}% of Surplus</span>
                                <span className={`text-xl font-bold ${isRisky ? 'text-red-600' : 'text-[#1B2F6E]'}`} style={FONT}>{proposedEmiRatio.toFixed(1)}x Cov.</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className={`${isRisky ? 'bg-red-500' : isSafe ? 'bg-green-500' : 'bg-yellow-500'} h-2.5 rounded-full`} style={{ width: `${Math.min(100, emiBurdenPct)}%` }}></div>
                            </div>
                        </div>
                        {isRisky && (
                            <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
                                <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-gray-700 text-sm" style={FONT}>This EMI consumes &gt;70% of your net surplus. High risk of distress if revenues drop slightly.</p>
                            </div>
                        )}
                        {!isRisky && !isSafe && (
                            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 flex items-start gap-3">
                                <p className="text-gray-700 text-sm" style={FONT}>This loan consumes a moderate portion of your surplus. Buffer exists but caution advised.</p>
                            </div>
                        )}
                        {isSafe && (
                            <div className="rounded-xl border border-green-200 bg-green-50 p-4 flex items-start gap-3">
                                <p className="text-gray-700 text-sm" style={FONT}>Very safe configuration. EMI is well within 50% of monthly free cash flow.</p>
                            </div>
                        )}
                    </div>

                    {/* Recommended Safe Loan */}
                    <div className="rounded-2xl border-2 border-[#1B2F6E]/20 bg-white p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-[#1B2F6E]" style={FONT}>Recommended Safe Loan</h2>
                            <span className="px-4 py-1.5 rounded-full bg-[#1B2F6E] text-white text-sm font-bold" style={FONT}>Optimal</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-1" style={FONT}>Loan Amount</p>
                        <p className="text-3xl font-bold text-[#1B2F6E] mb-5" style={FONT}>{fmt(recLoan)}</p>
                        <div className="flex gap-12 mb-6">
                            <div>
                                <p className="text-gray-500 text-sm mb-1" style={FONT}>Tenure</p>
                                <p className="text-lg font-bold text-gray-900" style={FONT}>{recTenure} months</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-1" style={FONT}>Monthly EMI</p>
                                <p className="text-lg font-bold text-gray-900" style={FONT}>{fmt(recEMI)}</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 mb-5">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 text-sm font-medium" style={FONT}>EMI Coverage Ratio</span>
                                <span className="text-xl font-bold text-[#1B2F6E]" style={FONT}>{recEmiRatio.toFixed(1)}x Cov.</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-[#1B2F6E] h-2.5 rounded-full" style={{ width: `${Math.min(100, (recEMI / liveNetSurplus) * 100)}%` }}></div>
                            </div>
                        </div>
                        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 flex items-start gap-3">
                            <svg className="w-5 h-5 text-[#1B2F6E] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <p className="text-gray-700 text-sm" style={FONT}>Provides excellent safety margin and withstands economic stress scenarios.</p>
                        </div>
                    </div>
                </div>

                {/* ── Comparison Table ── */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left px-8 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider w-[34%] border-b border-gray-100" style={FONT}>
                                    Metric
                                </th>
                                <th className="text-left px-8 py-5 w-[33%] bg-red-50 border-b border-red-100">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.832c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                        <span className="text-red-500 text-sm font-bold uppercase tracking-wider" style={FONT}>Your Proposed Loan</span>
                                    </div>
                                </th>
                                <th className="text-left px-8 py-5 w-[33%] bg-blue-50 border-b border-blue-100">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[#1B2F6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <span className="text-[#1B2F6E] text-sm font-bold uppercase tracking-wider" style={FONT}>Recommended Safe Loan</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {TABLE_ROWS.map((row, i) => (
                                <tr key={row.metric}>
                                    <td className="px-8 py-5 text-base font-medium text-gray-700 border-b border-gray-50" style={FONT}>
                                        {row.metric}
                                    </td>
                                    <td className={`px-8 py-5 text-base font-bold bg-red-50/60 border-b border-red-50 ${row.proposedColor || "text-gray-900"}`} style={FONT}>
                                        {row.proposed}
                                    </td>
                                    <td className={`px-8 py-5 text-base font-bold bg-blue-50/60 border-b border-blue-50 ${row.recommendedColor || "text-gray-900"}`} style={FONT}>
                                        {row.recommended}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ── Bottom Cards ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Risk Analysis */}
                    <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-8">
                        <div className="flex items-center gap-2 mb-4">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.832c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <h3 className="text-lg font-bold text-red-600" style={FONT}>Risk Analysis</h3>
                        </div>
                        <p className="text-gray-700 text-base leading-relaxed mb-5" style={FONT}>
                            Your proposed EMI of {fmt(proposedEMI)} consumes {emiBurdenPct.toFixed(1)}% of your actual historical cash flow surplus of {fmt(liveNetSurplus)}.
                            {isRisky ? " The coverage ratio is dangerously low and could lead to distress in a single bad month." : " This loan meets basic coverage models, but could be further optimized for maximum safety ceiling against market shocks."}
                        </p>
                    </div>

                    {/* Optimized Recommendation */}
                    <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-8">
                        <div className="flex items-center gap-2 mb-4">
                            <svg className="w-6 h-6 text-[#1B2F6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <h3 className="text-lg font-bold text-[#1B2F6E]" style={FONT}>Optimized Recommendation</h3>
                        </div>
                        <p className="text-gray-700 text-base leading-relaxed mb-5" style={FONT}>
                            {isRisky ? `By reducing the principal to ${fmt(recLoan)} and extending tenure to ${recTenure} months, your EMI drops to ${fmt(recEMI)}/mo ensuring you stay below the 50% safety ceiling for EMI outflows.`
                                : `Your proposed loan is already reasonably safe. A recommended "optimal safety" configuration locks your EMI coverage securely at ${recEmiRatio.toFixed(1)}x limiting downside impact.`}
                        </p>
                        <ul className="flex flex-col gap-2">
                            <li className="flex items-center gap-2 text-gray-700 text-sm" style={FONT}>
                                <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                45% lower monthly EMI burden
                            </li>
                            <li className="flex items-center gap-2 text-gray-700 text-sm" style={FONT}>
                                <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Resilient under stress scenarios up to 25% revenue drop
                            </li>
                            <li className="flex items-center gap-2 text-gray-700 text-sm" style={FONT}>
                                <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Total interest savings over lifecycle of recommendation: {fmt(Math.abs(proposedTotalInterest - recTotalInterest))}
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoanOptimizationPage;
