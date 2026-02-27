import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ─── Sidebar Nav Items ─── */
const NAV_ITEMS = [
    { label: "Dashboard", to: "/dashboard", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> },
    { label: "Stress Testing", to: "/stress-testing", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /> },
    { label: "Loan Optimization", to: "/loan-optimization", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { label: "Insights", to: "/insights", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /> },
    { label: "Report", to: "/report", active: true, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> },
];

const FONT = { fontFamily: 'IBM Plex Sans, sans-serif' };

/* ─── Report Data Helpers ─── */
const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

const calculateEMI = (principal, ratePerAnnum, tenureMonths) => {
    if (principal <= 0 || tenureMonths <= 0) return 0;
    if (ratePerAnnum === 0) return principal / tenureMonths;
    const r = ratePerAnnum / 12 / 100;
    return (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
};

// KEY_RECOMMENDATIONS removed, using dynamic insightsList now

/* ═══════════════════════════════════════════════════════════════ */
const ReportPage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const analysisData = JSON.parse(localStorage.getItem("pdf_analysis") || "{}");
    const insightsList = analysisData.insights || [];
    const reportRef = useRef(null);

    // Business Overview
    let analysisPeriod = "Jul – Dec 2025";
    if (analysisData?.monthly_data && analysisData.monthly_data.length > 0) {
        const start = analysisData.monthly_data[0].month;
        const end = analysisData.monthly_data[analysisData.monthly_data.length - 1].month;
        analysisPeriod = `${start} – ${end}`;
    }
    const totalTxns = analysisData?.total_transactions || 1284;
    const overallScore = analysisData?.scores?.overall || 742;

    // Scores Setup
    const scores = analysisData?.scores || { overall: 742, stability: 87, liquidity: 80, emi: 90, discipline: 94 };
    const SCORE_BREAKDOWN = [
        { metric: "Cash Flow Stability", score: `${scores.stability}/100`, weight: "25%", contribution: `${(scores.stability * 0.25).toFixed(1)} pts`, status: scores.stability >= 70 ? "Strong" : "Caution" },
        { metric: "Liquidity Buffer", score: `${scores.liquidity}/100`, weight: "20%", contribution: `${(scores.liquidity * 0.20).toFixed(1)} pts`, status: scores.liquidity >= 60 ? "Moderate" : "Caution" },
        { metric: "EMI Coverage Ratio", score: `${scores.emi}/100`, weight: "20%", contribution: `${(scores.emi * 0.20).toFixed(1)} pts`, status: scores.emi >= 75 ? "Strong" : "Caution" },
        { metric: "Payment Discipline", score: `${scores.discipline}/100`, weight: "20%", contribution: `${(scores.discipline * 0.20).toFixed(1)} pts`, status: scores.discipline >= 85 ? "Good" : "Caution" },
    ];

    // Stress Testing Setup
    const avgRevenue = analysisData.avg_monthly_inflow || 0;
    const avgExpense = analysisData.avg_monthly_outflow || 0;
    const STRESS_RESULTS = [10, 20, 30].map(drop => {
        const sr = Math.round(avgRevenue * (1 - drop / 100));
        const se = Math.round(avgExpense * 1.2); // Assuming 20% expense increase under stress
        const ns = sr - se;
        const assumedEMI = (avgRevenue - avgExpense) > 0 ? (avgRevenue - avgExpense) * 0.4 : 50000;
        const cov = assumedEMI > 0 ? (ns / assumedEMI) : 0;
        const emiCoverageText = cov.toFixed(1) + "x";
        let risk = cov < 1.0 ? "High" : cov < 1.5 ? "Moderate" : "Low";
        let flow = cov < 1.0 ? "Critical" : cov < 1.5 ? "Stressed" : "Stable";
        let surv = cov < 1.0 ? "4 months" : cov < 1.5 ? "8 months" : "12+ months";
        return { scenario: `${drop}% Revenue Decline`, emiCoverage: emiCoverageText, cashFlow: flow, survival: surv, risk: risk };
    });

    // Loan Comparison Setup
    const liveNetSurplus = analysisData.net_surplus && analysisData.net_surplus > 0 ? analysisData.net_surplus : 50000;
    const defaultLoanAmount = Number(user?.loanAmount) || 500000;
    const defaultTenure = Number(user?.loanTenure) || 24;
    const interestRate = 12;

    const propEMI = calculateEMI(defaultLoanAmount, interestRate, defaultTenure);
    const propEmiRatio = liveNetSurplus / (propEMI || 1);
    const emiBurdenPct = (propEMI / (liveNetSurplus || 1)) * 100;
    const isRisky = emiBurdenPct > 70;
    const isSafe = emiBurdenPct < 50;

    let recLoan = defaultLoanAmount, recTenure = defaultTenure, recRate = interestRate, recEMI = propEMI, recEmiRatio = propEmiRatio;
    if (isRisky) {
        recTenure = Math.min(60, defaultTenure + 12);
        recRate = interestRate - 0.5;
        recEMI = liveNetSurplus * 0.45;
        const r = recRate / 12 / 100;
        recLoan = recEMI * (Math.pow(1 + r, recTenure) - 1) / (r * Math.pow(1 + r, recTenure));
        recEmiRatio = liveNetSurplus / recEMI;
    }

    const LOAN_COMPARISON = [
        { metric: "Loan Amount", proposed: fmt(defaultLoanAmount), recommended: fmt(recLoan) },
        { metric: "Tenure", proposed: `${defaultTenure} months`, recommended: `${recTenure} months` },
        { metric: "Interest Rate", proposed: `${interestRate}%`, recommended: `${recRate}%` },
        { metric: "Monthly EMI", proposed: fmt(propEMI), recommended: fmt(recEMI) },
        { metric: "EMI Coverage", proposed: `${propEmiRatio.toFixed(1)}x`, recommended: `${recEmiRatio.toFixed(1)}x` },
        { metric: "Risk Level", proposed: isRisky ? "High" : isSafe ? "Safe" : "Moderate", recommended: "Safe" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleDownloadPDF = async () => {
        const html2pdf = (await import("html2pdf.js")).default;
        const element = reportRef.current;
        const opt = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: "Credalytix_Credit_Report.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
            pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        };
        html2pdf().set(opt).from(element).save();
    };

    const handlePrint = () => window.print();

    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* ── Sidebar (hidden on print) ── */}
            <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-gray-100 px-4 py-6 shrink-0 justify-between sticky top-0 h-screen overflow-y-auto print:hidden">
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
                    <div className="border-b border-gray-200 mx-2 mb-4" />
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
                    <div className="border-b border-gray-200 mx-2 mb-4" />
                    <nav className="flex flex-col gap-1">
                        {NAV_ITEMS.map(({ label, to, icon, active }) => (
                            <Link key={label} to={to}
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base transition-all duration-200 ${active ? "bg-blue-50 text-[#1B2F6E] font-bold" : "text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-700"}`}
                                style={FONT}>
                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <button onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-base text-gray-500 font-medium hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full" style={FONT}>
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </aside>

            {/* ── Main Content ── */}
            <main className="flex-1 px-10 py-10 overflow-auto">
                {/* Header with Actions */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Credit Assessment Report</h1>
                        <p className="text-gray-500 text-lg" style={FONT}>
                            Comprehensive credit risk analysis and loan recommendation summary.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 print:hidden">
                        <button onClick={handleDownloadPDF}
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#1B2F6E] text-white rounded-xl font-bold text-sm hover:bg-[#162858] transition-all duration-200 shadow-sm" style={FONT}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download PDF
                        </button>
                        <button onClick={handlePrint}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all duration-200 shadow-sm" style={FONT}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Print Report
                        </button>
                    </div>
                </div>

                {/* ── Printable Report Content ── */}
                <div ref={reportRef}>

                    {/* ── Report Header Banner ── */}
                    <div className="bg-[#1B2F6E] rounded-2xl p-8 mb-8 text-white">
                        <div className="flex flex-wrap items-center justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                                            <rect x="2" y="12" width="4" height="10" rx="1" fill="white" />
                                            <rect x="8" y="7" width="4" height="15" rx="1" fill="white" />
                                            <rect x="14" y="3" width="4" height="19" rx="1" fill="white" />
                                        </svg>
                                    </div>
                                    <span className="font-extrabold text-xl tracking-tight">Credalytix</span>
                                </div>
                                <p className="text-white/70 text-sm" style={FONT}>SME Credit Risk Assessment Report</p>
                            </div>
                            <div className="text-right">
                                <p className="text-white/70 text-sm mb-1" style={FONT}>Report Generated</p>
                                <p className="font-bold text-lg" style={FONT}>{today}</p>
                                <p className="text-white/50 text-xs mt-1" style={FONT}>Report ID: CRD-2026-00742</p>
                            </div>
                        </div>
                    </div>

                    {/* ── Business Overview ── */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2" style={FONT}>
                            <svg className="w-5 h-5 text-[#1B2F6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Business Overview
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1" style={FONT}>Company Name</p>
                                <p className="text-gray-900 font-bold text-base" style={FONT}>{user?.businessName || "Your Business"}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1" style={FONT}>Industry</p>
                                <p className="text-gray-900 font-bold text-base" style={FONT}>{user?.industry || "Industry"}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1" style={FONT}>Analysis Period</p>
                                <p className="text-gray-900 font-bold text-base" style={FONT}>{analysisPeriod}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1" style={FONT}>Data Points Analyzed</p>
                                <p className="text-gray-900 font-bold text-base" style={FONT}>{totalTxns} Transactions</p>
                            </div>
                        </div>
                    </div>

                    {/* ── Credit Score Summary ── */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2" style={FONT}>
                            <svg className="w-5 h-5 text-[#1B2F6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Credit Score Summary
                        </h2>
                        <div className="flex flex-wrap items-center gap-8 mb-8">
                            <div className="flex items-center gap-6">
                                <div className="w-28 h-28 rounded-full border-8 border-[#1B2F6E] flex items-center justify-center bg-blue-50">
                                    <div className="text-center">
                                        <p className="text-3xl font-extrabold text-[#1B2F6E]">{overallScore}</p>
                                        <p className="text-xs font-bold text-green-600">Good</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1" style={FONT}>Score Range</p>
                                    <p className="text-gray-900 font-bold text-sm" style={FONT}>300 – 900</p>
                                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mt-3 mb-1" style={FONT}>Potential Improvement</p>
                                    <p className="text-[#1B2F6E] font-bold text-sm" style={FONT}>+{900 - overallScore} pts → 900</p>
                                </div>
                            </div>
                            <div className="flex-1 min-w-[200px]">
                                <div className="w-full bg-gray-100 rounded-full h-4 relative">
                                    <div className="bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 to-green-600 h-4 rounded-full" style={{ width: '100%' }}></div>
                                    <div className="absolute top-0 h-4 flex items-center" style={{ left: `${((overallScore - 300) / 600) * 100}%` }}>
                                        <div className="w-1 h-6 bg-[#1B2F6E] rounded -mt-1"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span className="text-xs text-gray-400" style={FONT}>300 (Poor)</span>
                                    <span className="text-xs text-gray-400" style={FONT}>600 (Fair)</span>
                                    <span className="text-xs text-gray-400" style={FONT}>750 (Good)</span>
                                    <span className="text-xs text-gray-400" style={FONT}>900 (Excellent)</span>
                                </div>
                            </div>
                        </div>

                        {/* Score Breakdown Table */}
                        <div className="overflow-hidden rounded-xl border border-gray-100">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider" style={FONT}>Metric</th>
                                        <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider" style={FONT}>Score</th>
                                        <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider" style={FONT}>Weight</th>
                                        <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider" style={FONT}>Contribution</th>
                                        <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider" style={FONT}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {SCORE_BREAKDOWN.map((row, i) => (
                                        <tr key={i} className="border-t border-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900" style={FONT}>{row.metric}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-gray-900" style={FONT}>{row.score}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500" style={FONT}>{row.weight}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-[#1B2F6E]" style={FONT}>{row.contribution}</td>
                                            <td className="px-6 py-4" style={FONT}>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.status === "Strong" ? "bg-green-100 text-green-700" :
                                                    row.status === "Good" ? "bg-blue-100 text-blue-700" :
                                                        row.status === "Moderate" ? "bg-yellow-100 text-yellow-700" :
                                                            "bg-red-100 text-red-700"
                                                    }`}>{row.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* ── Stress Testing Summary ── */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2" style={FONT}>
                            <svg className="w-5 h-5 text-[#1B2F6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            Stress Testing Summary
                        </h2>
                        <div className="overflow-hidden rounded-xl border border-gray-100">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider" style={FONT}>Scenario</th>
                                        <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider" style={FONT}>EMI Coverage</th>
                                        <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider" style={FONT}>Cash Flow Status</th>
                                        <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider" style={FONT}>Survival Period</th>
                                        <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider" style={FONT}>Risk Level</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {STRESS_RESULTS.map((row, i) => (
                                        <tr key={i} className="border-t border-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900" style={FONT}>{row.scenario}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-gray-900" style={FONT}>{row.emiCoverage}</td>
                                            <td className="px-6 py-4" style={FONT}>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.cashFlow === "Stable" ? "bg-green-100 text-green-700" :
                                                    row.cashFlow === "Stressed" ? "bg-yellow-100 text-yellow-700" :
                                                        "bg-red-100 text-red-700"
                                                    }`}>{row.cashFlow}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700" style={FONT}>{row.survival}</td>
                                            <td className="px-6 py-4" style={FONT}>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.risk === "Low" ? "bg-green-100 text-green-700" :
                                                    row.risk === "Moderate" ? "bg-yellow-100 text-yellow-700" :
                                                        "bg-red-100 text-red-700"
                                                    }`}>{row.risk}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* ── Loan Optimization Summary ── */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2" style={FONT}>
                            <svg className="w-5 h-5 text-[#1B2F6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Loan Optimization Summary
                        </h2>
                        <div className="overflow-hidden rounded-xl border border-gray-100">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left px-6 py-3 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider w-[34%]" style={FONT}>Metric</th>
                                        <th className="text-left px-6 py-3 bg-red-50 text-xs font-bold text-red-500 uppercase tracking-wider w-[33%]" style={FONT}>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.832c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                </svg>
                                                Proposed Loan
                                            </div>
                                        </th>
                                        <th className="text-left px-6 py-3 bg-blue-50 text-xs font-bold text-[#1B2F6E] uppercase tracking-wider w-[33%]" style={FONT}>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                                Recommended
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {LOAN_COMPARISON.map((row, i) => (
                                        <tr key={i} className="border-t border-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-700" style={FONT}>{row.metric}</td>
                                            <td className={`px-6 py-4 text-sm font-bold bg-red-50/60 ${row.metric === "Risk Level" ? "text-red-600" : "text-gray-900"}`} style={FONT}>{row.proposed}</td>
                                            <td className={`px-6 py-4 text-sm font-bold bg-blue-50/60 ${row.metric === "Risk Level" ? "text-green-600" : "text-gray-900"}`} style={FONT}>{row.recommended}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* ── Key Recommendations ── */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2" style={FONT}>
                            <svg className="w-5 h-5 text-[#1B2F6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Key Recommendations
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {insightsList.map((rec, i) => (
                                <div key={i} className="rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${rec.priority === "High Priority" ? "bg-red-100 text-red-700" :
                                            rec.priority === "Medium Priority" ? "bg-orange-100 text-orange-700" :
                                                rec.priority === "Low Priority" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                                            }`} style={FONT}>{rec.priority.replace(" Priority", "")}</span>
                                        <span className={`font-bold text-sm ${rec.scoreImpact.includes("+") ? "text-[#1B2F6E]" : "text-green-600"}`} style={FONT}>{rec.scoreImpact}</span>
                                    </div>
                                    <h4 className="font-bold text-gray-900 text-sm mb-2" style={FONT}>{rec.title}</h4>
                                    <p className="text-gray-500 text-xs leading-relaxed" style={FONT}>{rec.action}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Disclaimer ── */}
                    <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 mb-4">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="text-gray-500 text-xs leading-relaxed" style={FONT}>
                                    <span className="font-bold text-gray-600">Disclaimer:</span> This report is generated based on the financial data provided and is intended for informational purposes only.
                                    It does not constitute financial advice. The credit score and recommendations are based on algorithmic analysis of cash flow patterns
                                    and may not reflect all factors considered by lending institutions. Please consult with a financial advisor before making lending decisions.
                                </p>
                                <p className="text-gray-400 text-xs mt-2" style={FONT}>
                                    © 2026 Credalytix. All rights reserved. Generated on {today}.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ReportPage;
