import React from "react";
import { Link, useNavigate } from "react-router-dom";

/* ─── Sidebar Nav Items ─── */
const NAV_ITEMS = [
    { label: "Dashboard", to: "/dashboard", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> },
    { label: "Stress Testing", to: "/stress-testing", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /> },
    { label: "Loan Optimization", to: "/loan-optimization", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { label: "Insights", to: "/insights", active: true, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /> },
    { label: "Report", to: "/report", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> },
];

/* ─── Insight Data ─── */
const INSIGHTS = [
    {
        title: "Improve Liquidity Buffer",
        priority: "High Priority",
        priorityColor: "bg-red-500",
        priorityBadgeBg: "bg-red-500",
        iconBg: "bg-red-100",
        iconColor: "text-red-500",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.832c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
        ),
        issue: "Current liquidity buffer of 2.4 months is below the recommended 3-month threshold for your industry.",
        action: "Maintain a dedicated reserve account with at least 3 months of operating expenses. Consider negotiating extended payment terms with key suppliers.",
        scoreImpact: "+35 pts",
        metricName: "Liquidity Buffer",
        metricFrom: "2.4x",
        metricTo: "3.0x",
        barWidth: "80%",
    },
    {
        title: "Reduce Revenue Volatility",
        priority: "Medium Priority",
        priorityColor: "bg-orange-500",
        priorityBadgeBg: "bg-orange-500",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        issue: "Monthly revenue variance of 18% indicates inconsistent cash inflows, affecting scoring reliability.",
        action: "Diversify revenue streams and implement recurring billing where possible. Secure 2-3 anchor clients with long-term contracts.",
        scoreImpact: "+28 pts",
        metricName: "Cash Flow Stability",
        metricFrom: "87%",
        metricTo: "93%",
        barWidth: "93%",
    },
    {
        title: "Avoid High EMI Exposure",
        priority: "High Priority",
        priorityColor: "bg-red-500",
        priorityBadgeBg: "bg-red-500",
        iconBg: "bg-red-100",
        iconColor: "text-red-500",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        issue: "Proposed EMI consumes 42% of monthly surplus, leaving thin margins during revenue downturns.",
        action: "Consider the recommended loan restructuring to reduce EMI to 23% of surplus. Avoid taking additional credit facilities until coverage ratio exceeds 2.5x.",
        scoreImpact: "+45 pts",
        metricName: "EMI Coverage",
        metricFrom: "1.4x",
        metricTo: "2.5x",
        barWidth: "70%",
    },
    {
        title: "Strengthen Payment Discipline",
        priority: "Low Priority",
        priorityColor: "bg-green-500",
        priorityBadgeBg: "bg-green-500",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        issue: "6% of recurring obligations were delayed in the analysis period, slightly impacting payment discipline score.",
        action: "Set up automated payments for all recurring obligations. Create a payment calendar and maintain a 7-day buffer in the operating account.",
        scoreImpact: "+12 pts",
        metricName: "Payment Discipline",
        metricFrom: "94%",
        metricTo: "98%",
        barWidth: "98%",
    },
    {
        title: "Build Seasonal Cash Reserve",
        priority: "Medium Priority",
        priorityColor: "bg-orange-500",
        priorityBadgeBg: "bg-orange-500",
        iconBg: "bg-orange-100",
        iconColor: "text-orange-500",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        issue: "Analysis detects a 22% revenue dip in September, suggesting seasonal patterns that could affect loan servicing.",
        action: "Allocate surplus from high-revenue months (Oct-Dec) into a seasonal reserve. Target a reserve equal to 1.5x the average seasonal dip.",
        scoreImpact: "+20 pts",
        metricName: "Resilience Score",
        metricFrom: "72%",
        metricTo: "85%",
        barWidth: "85%",
    },
];

const FONT = { fontFamily: 'IBM Plex Sans, sans-serif' };

/* ═══════════════════════════════════════════════════════════════ */
const InsightsPage = () => {
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
                            <p className="text-gray-400 text-xs">Retail &amp; E-Commerce</p>
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
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Advisory Insights</h1>
                    <p className="text-gray-500 text-lg" style={FONT}>
                        Actionable recommendations to strengthen your credit profile and financial health.
                    </p>
                </div>

                {/* ── Summary Bar ── */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-10">
                        <div>
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1" style={FONT}>Total Potential Score Improvement</p>
                            <p className="text-3xl font-bold text-[#1B2F6E]" style={FONT}>+140 pts</p>
                        </div>
                        <div className="h-10 w-px bg-gray-200" />
                        <div>
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1" style={FONT}>Projected Score</p>
                            <p className="text-3xl font-bold text-gray-900" style={FONT}>742 → 882</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-4 py-1.5 rounded-full border border-red-200 text-red-600 text-sm font-bold" style={FONT}>2 High Priority</span>
                        <span className="px-4 py-1.5 rounded-full border border-orange-200 text-orange-600 text-sm font-bold" style={FONT}>2 Medium Priority</span>
                        <span className="px-4 py-1.5 rounded-full border border-green-200 text-green-600 text-sm font-bold" style={FONT}>1 Low Priority</span>
                    </div>
                </div>

                {/* ── Insight Cards ── */}
                <div className="flex flex-col gap-6">
                    {INSIGHTS.map((insight, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="flex flex-col lg:flex-row">
                                {/* Left Content */}
                                <div className="flex-1 p-8">
                                    {/* Title Row */}
                                    <div className="flex items-start gap-3 mb-1">
                                        <div className={`w-9 h-9 rounded-full ${insight.iconBg} flex items-center justify-center ${insight.iconColor} shrink-0`}>
                                            {insight.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900" style={FONT}>{insight.title}</h3>
                                            <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-white text-xs font-bold ${insight.priorityBadgeBg}`} style={FONT}>
                                                {insight.priority}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Issue */}
                                    <div className="mt-5 mb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider" style={FONT}>Issue Identified</span>
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed" style={FONT}>{insight.issue}</p>
                                    </div>

                                    {/* Recommended Action */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-4 h-4 text-[#1B2F6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                            <span className="text-xs font-bold text-[#1B2F6E] uppercase tracking-wider" style={FONT}>Recommended Action</span>
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed" style={FONT}>{insight.action}</p>
                                    </div>
                                </div>

                                {/* Right Score Impact Panel */}
                                <div className="lg:w-56 border-t lg:border-t-0 lg:border-l border-gray-100 p-6 flex flex-col items-center justify-center bg-gray-50/50">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1" style={FONT}>Score Impact</p>
                                    <p className="text-3xl font-bold text-[#1B2F6E] mb-4" style={FONT}>{insight.scoreImpact}</p>
                                    <p className="text-xs text-gray-500 font-medium mb-2" style={FONT}>{insight.metricName}</p>
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <span className="text-sm font-bold text-orange-500" style={FONT}>{insight.metricFrom}</span>
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                        <span className="text-sm font-bold text-gray-900" style={FONT}>{insight.metricTo}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-[#1B2F6E] h-2 rounded-full transition-all duration-500" style={{ width: insight.barWidth }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default InsightsPage;
