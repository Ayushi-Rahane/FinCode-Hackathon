import React from "react";
import { Link, useNavigate } from "react-router-dom";

/* ─── Sidebar Nav Items ─── */
const NAV_ITEMS = [
    { label: "Dashboard", to: "/dashboard", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> },
    { label: "Stress Testing", to: "/stress-testing", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /> },
    { label: "Loan Optimization", to: "/loan-optimization", active: true, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { label: "Insights", to: "/insights", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /> },
    { label: "Report", to: "/report", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> },
];

/* ─── Comparison Table Data ─── */
const TABLE_ROWS = [
    { metric: "Loan Amount", proposed: "$5,00,000", recommended: "$3,50,000" },
    { metric: "Loan Tenure", proposed: "36 months", recommended: "48 months" },
    { metric: "Interest Rate", proposed: "12%", recommended: "11.5%" },
    { metric: "Monthly EMI", proposed: "$16,607", recommended: "$9,186" },
    { metric: "Total Interest Paid", proposed: "$97,852", recommended: "$90,928" },
    { metric: "EMI Coverage Ratio", proposed: "1.4x", recommended: "3.1x" },
    {
        metric: "Risk Assessment",
        proposed: "High Risk",
        proposedColor: "text-red-600",
        recommended: "Safe",
        recommendedColor: "text-green-600",
    },
];

const FONT = { fontFamily: 'IBM Plex Sans, sans-serif' };

/* ═══════════════════════════════════════════════════════════════ */
const LoanOptimizationPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
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
                        <div className="w-9 h-9 bg-[#1B2F6E] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">A</div>
                        <div>
                            <p className="text-gray-900 font-bold text-sm group-hover:text-[#1B2F6E] transition-colors">Apex Trading Co.</p>
                            <p className="text-gray-400 text-xs">Retail & E-Commerce</p>
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
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Loan Optimization</h1>
                    <p className="text-gray-500 text-lg" style={FONT}>
                        Compare your proposed loan with our AI-recommended safe alternative
                    </p>
                </div>

                {/* ── Loan Comparison Cards ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Your Proposed Loan */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900" style={FONT}>Your Proposed Loan</h2>
                            <span className="px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-700 text-sm font-bold" style={FONT}>Moderate</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-1" style={FONT}>Loan Amount</p>
                        <p className="text-3xl font-bold text-gray-900 mb-5" style={FONT}>$100,000</p>
                        <div className="flex gap-12 mb-6">
                            <div>
                                <p className="text-gray-500 text-sm mb-1" style={FONT}>Tenure</p>
                                <p className="text-lg font-bold text-gray-900" style={FONT}>36 months</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-1" style={FONT}>Monthly EMI</p>
                                <p className="text-lg font-bold text-gray-900" style={FONT}>$2,917</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 mb-5">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 text-sm font-medium" style={FONT}>EMI Coverage Ratio</span>
                                <span className="text-xl font-bold text-[#1B2F6E]" style={FONT}>1.68x</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-[#1B2F6E] h-2.5 rounded-full" style={{ width: '56%' }}></div>
                            </div>
                        </div>
                        <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
                            <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-700 text-sm" style={FONT}>This loan may strain your cash flow during economic downturns.</p>
                        </div>
                    </div>

                    {/* Recommended Safe Loan */}
                    <div className="rounded-2xl border-2 border-[#1B2F6E]/20 bg-white p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-[#1B2F6E]" style={FONT}>Recommended Safe Loan</h2>
                            <span className="px-4 py-1.5 rounded-full bg-[#1B2F6E] text-white text-sm font-bold" style={FONT}>Optimal</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-1" style={FONT}>Loan Amount</p>
                        <p className="text-3xl font-bold text-[#1B2F6E] mb-5" style={FONT}>$75,000</p>
                        <div className="flex gap-12 mb-6">
                            <div>
                                <p className="text-gray-500 text-sm mb-1" style={FONT}>Tenure</p>
                                <p className="text-lg font-bold text-gray-900" style={FONT}>48 months</p>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm mb-1" style={FONT}>Monthly EMI</p>
                                <p className="text-lg font-bold text-gray-900" style={FONT}>$1,719</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 mb-5">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-600 text-sm font-medium" style={FONT}>EMI Coverage Ratio</span>
                                <span className="text-xl font-bold text-[#1B2F6E]" style={FONT}>2.85x</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-[#1B2F6E] h-2.5 rounded-full" style={{ width: '95%' }}></div>
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
                            <h3 className="text-lg font-bold text-red-600" style={FONT}>Risk Analysis — Proposed Loan</h3>
                        </div>
                        <p className="text-gray-700 text-base leading-relaxed mb-5" style={FONT}>
                            Your proposed EMI of $16,607/month consumes a significant portion of your cash flow
                            surplus. The coverage ratio of 1.4x falls below the recommended minimum of 2.0x.
                        </p>
                        <ul className="flex flex-col gap-2">
                            <li className="flex items-center gap-2 text-gray-700 text-sm" style={FONT}>
                                <span className="w-2 h-2 bg-red-500 rounded-full shrink-0" />
                                High default probability under adverse conditions
                            </li>
                            <li className="flex items-center gap-2 text-gray-700 text-sm" style={FONT}>
                                <span className="w-2 h-2 bg-red-500 rounded-full shrink-0" />
                                Limited buffer for operational disruptions
                            </li>
                        </ul>
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
                            By reducing the principal to $3,50,000 and extending tenure to 48 months, your EMI
                            drops to $9,186/month with a healthy 3.1x coverage ratio.
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
                                Total interest savings of $6,924
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoanOptimizationPage;
