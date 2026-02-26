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
// Static fallback INSIGHTS removed, relying on dynamic analysisData.insights.

const FONT = { fontFamily: 'IBM Plex Sans, sans-serif' };

/* ═══════════════════════════════════════════════════════════════ */
const InsightsPage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const analysisData = JSON.parse(localStorage.getItem("pdf_analysis") || "{}");

    // Dynamic insights data from Python response
    const insightsList = analysisData.insights || [];
    const aiInsightText = analysisData.ai_insight || null;

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const getInsightStyles = (priority, type) => {
        let styles = {
            priorityBadgeBg: "bg-gray-500",
            iconBg: "bg-gray-100",
            iconColor: "text-gray-500",
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        };

        if (priority === "High Priority") {
            styles.priorityBadgeBg = "bg-red-500";
            styles.iconBg = "bg-red-100";
            styles.iconColor = "text-red-500";
        } else if (priority === "Medium Priority") {
            styles.priorityBadgeBg = "bg-orange-500";
            styles.iconBg = "bg-orange-100";
            styles.iconColor = "text-orange-500";
        } else if (priority === "Low Priority") {
            styles.priorityBadgeBg = "bg-green-500";
            styles.iconBg = "bg-green-100";
            styles.iconColor = "text-green-600";
        } else if (priority === "Positive Insight") {
            styles.priorityBadgeBg = "bg-blue-500";
            styles.iconBg = "bg-blue-100";
            styles.iconColor = "text-blue-600";
        }

        if (type === "liquidity" || type === "liquidity_positive") {
            styles.icon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.832c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>;
        } else if (type === "volatility" || type === "stability_positive") {
            styles.icon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
        } else if (type === "emi" || type === "emi_positive") {
            styles.icon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
        } else if (type === "discipline") {
            styles.icon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
        } else if (type === "transaction_pattern" || type === "trend_positive") {
            styles.icon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
        }
        return styles;
    };

    const totalImpact = insightsList.reduce((acc, curr) => {
        const ptsMatch = curr.scoreImpact.match(/\+(\d+)/);
        const pts = ptsMatch ? parseInt(ptsMatch[1], 10) : 0;
        return acc + pts;
    }, 0);

    const highCount = insightsList.filter(i => i.priority === "High Priority").length;
    const medCount = insightsList.filter(i => i.priority === "Medium Priority").length;
    const lowCount = insightsList.filter(i => i.priority === "Low Priority").length;
    const posCount = insightsList.filter(i => i.priority === "Positive Insight").length;

    const baseScore = analysisData?.scores?.overall || 548;
    const projectedScore = Math.min(900, baseScore + totalImpact);

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
                            <p className="text-3xl font-bold text-[#1B2F6E]" style={FONT}>+{totalImpact} pts</p>
                        </div>
                        <div className="h-10 w-px bg-gray-200" />
                        <div>
                            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1" style={FONT}>Projected Score</p>
                            <p className="text-3xl font-bold text-gray-900" style={FONT}>{baseScore} → {projectedScore}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        {highCount > 0 && <span className="px-4 py-1.5 rounded-full border border-red-200 text-red-600 text-sm font-bold" style={FONT}>{highCount} High Priority</span>}
                        {medCount > 0 && <span className="px-4 py-1.5 rounded-full border border-orange-200 text-orange-600 text-sm font-bold" style={FONT}>{medCount} Medium Priority</span>}
                        {lowCount > 0 && <span className="px-4 py-1.5 rounded-full border border-green-200 text-green-600 text-sm font-bold" style={FONT}>{lowCount} Low Priority</span>}
                        {posCount > 0 && <span className="px-4 py-1.5 rounded-full border border-blue-200 text-blue-600 text-sm font-bold" style={FONT}>{posCount} Positive Insight{posCount > 1 ? "s" : ""}</span>}
                        {insightsList.length === 0 && <span className="px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 text-sm font-bold" style={FONT}>Generate assessment to see insights</span>}
                    </div>
                </div>

                {/* ── AI Advisory Narrative ── */}
                {aiInsightText && (
                    <div className="bg-gradient-to-r from-[#1B2F6E]/5 to-transparent rounded-2xl border border-[#1B2F6E]/10 p-8 mb-8 relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>

                        <div className="flex items-start gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1B2F6E] to-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2" style={FONT}>
                                    Credalytix AI Analysis
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1B2F6E]/10 text-[#1B2F6E] uppercase tracking-wider">Premium</span>
                                </h3>
                                <p className="text-gray-700 leading-relaxed font-medium" style={FONT}>
                                    "{aiInsightText}"
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Insight Cards ── */}
                <div className="flex flex-col gap-6">
                    {insightsList.map((insight, idx) => {
                        const styles = getInsightStyles(insight.priority, insight.type);

                        return (
                            <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="flex flex-col lg:flex-row">
                                    {/* Left Content */}
                                    <div className="flex-1 p-8">
                                        {/* Title Row */}
                                        <div className="flex items-start gap-3 mb-1">
                                            <div className={`w-9 h-9 rounded-full ${styles.iconBg} flex items-center justify-center ${styles.iconColor} shrink-0`}>
                                                {styles.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900" style={FONT}>{insight.title}</h3>
                                                <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-white text-xs font-bold ${styles.priorityBadgeBg}`} style={FONT}>
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
                                        <p className={`text-3xl font-bold mb-4 ${insight.scoreImpact.includes('+') ? 'text-[#1B2F6E]' : 'text-gray-500 text-2xl'}`} style={FONT}>{insight.scoreImpact}</p>
                                        <p className="text-xs text-gray-500 font-medium mb-2 text-center" style={FONT}>{insight.metricName}</p>
                                        <div className="flex items-center justify-center gap-1.5 mb-2 flex-wrap">
                                            <span className={`text-sm font-bold ${insight.scoreImpact.includes("+") ? "text-orange-500" : "text-green-600"}`} style={FONT}>{insight.metricFrom}</span>
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                            <span className="text-sm font-bold text-gray-900" style={FONT}>{insight.metricTo}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className={`h-2 rounded-full transition-all duration-500 ${insight.priority === 'Positive Insight' ? 'bg-green-500' : 'bg-[#1B2F6E]'}`} style={{ width: insight.barWidth }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default InsightsPage;
