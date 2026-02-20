import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line,
} from "recharts";

/* ─── Sidebar Nav Items ─── */
const NAV_ITEMS = [
    { label: "Dashboard", to: "/dashboard", active: true, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> },
    { label: "Stress Testing", to: "/stress-testing", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /> },
    { label: "Loan Optimization", to: "/loan-optimization", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { label: "Insights", to: "/insights", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /> },
    { label: "Report", to: "/report", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> },
];

/* ─── Stat Cards Data ─── */
const METRICS = [
    {
        value: "87", unit: "%", label: "Cash Flow Stability",
        description: "Strong consistency in monthly cash inflows with low variance.",
        change: "+3% from prior period", positive: true,
        iconPath: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />,
    },
    {
        value: "2.4", unit: "x", label: "Liquidity Buffer",
        description: "Operating expenses covered for 2.4 months without new inflows.",
        change: "+0.2x improvement", positive: true,
        iconPath: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    },
    {
        value: "3.1", unit: "x", label: "EMI Coverage",
        description: "Monthly surplus covers proposed EMI 3.1 times over.",
        change: "Healthy coverage ratio", positive: true,
        iconPath: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
    },
    {
        value: "94", unit: "%", label: "Payment Discipline",
        description: "94% of recurring obligations met on time within the period.",
        change: "-2% from prior period", positive: false,
        iconPath: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    },
];

/* ─── Chart Data ─── */
const REVENUE_DATA = [
    { month: "Jul", revenue: 180000, expense: 120000 },
    { month: "Aug", revenue: 195000, expense: 130000 },
    { month: "Sep", revenue: 160000, expense: 125000 },
    { month: "Oct", revenue: 210000, expense: 135000 },
    { month: "Nov", revenue: 250000, expense: 140000 },
    { month: "Dec", revenue: 190000, expense: 155000 },
];

const VOLATILITY_DATA = [
    { month: "Jul", volatility: 12 },
    { month: "Aug", volatility: 17 },
    { month: "Sep", volatility: 8 },
    { month: "Oct", volatility: 22 },
    { month: "Nov", volatility: 16 },
    { month: "Dec", volatility: 13 },
];

/* ─── Gauge Component ─── */
const CreditGauge = ({ score }) => {
    const min = 300, max = 900;
    const pct = (score - min) / (max - min);
    const startAngle = -210;
    const sweep = 240;
    const angle = startAngle + pct * sweep;

    const r = 100;
    const cx = 130, cy = 130;

    const toRad = (deg) => (deg * Math.PI) / 180;

    // Arc path
    const arcStart = {
        x: cx + r * Math.cos(toRad(startAngle)),
        y: cy + r * Math.sin(toRad(startAngle)),
    };
    const arcEnd = {
        x: cx + r * Math.cos(toRad(startAngle + sweep)),
        y: cy + r * Math.sin(toRad(startAngle + sweep)),
    };
    const needleTip = {
        x: cx + (r - 10) * Math.cos(toRad(angle)),
        y: cy + (r - 10) * Math.sin(toRad(angle)),
    };

    // Progress arc end
    const progressEnd = {
        x: cx + r * Math.cos(toRad(angle)),
        y: cy + r * Math.sin(toRad(angle)),
    };
    const largeArcFlag = pct * sweep > 180 ? 1 : 0;

    return (
        <div className="flex flex-col items-center">
            <svg viewBox="0 0 260 180" className="w-64 h-44">
                {/* Background arc */}
                <path
                    d={`M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 1 1 ${arcEnd.x} ${arcEnd.y}`}
                    fill="none" stroke="#E5E7EB" strokeWidth="14" strokeLinecap="round"
                />
                {/* Progress arc */}
                <path
                    d={`M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${progressEnd.x} ${progressEnd.y}`}
                    fill="none" stroke="#5B8DEF" strokeWidth="14" strokeLinecap="round"
                />
                {/* Needle */}
                <line x1={cx} y1={cy} x2={needleTip.x} y2={needleTip.y}
                    stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx={cx} cy={cy} r="5" fill="#374151" />
                {/* Dot at progress end */}
                <circle cx={progressEnd.x} cy={progressEnd.y} r="6" fill="#5B8DEF" />
            </svg>
            <div className="text-center -mt-4">
                <p className="text-5xl font-extrabold text-[#1B2F6E]">{score}</p>
                <p className="text-green-600 font-bold text-base mt-1">Good</p>
                <p className="text-gray-400 text-sm mt-0.5">Score Range: 300 – 900</p>
            </div>
        </div>
    );
};

/* ═════════════════════════════════════════════════════════════════ */
/*  Dashboard Page                                                  */
/* ═════════════════════════════════════════════════════════════════ */
const DashboardPage = () => {
    const navigate = useNavigate();
    const handleLogout = () => navigate("/login");

    return (
        <div className="min-h-screen flex bg-gray-50">

            {/* ── Sidebar ── */}
            <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-gray-100 px-4 py-6 shrink-0 justify-between sticky top-0 h-screen overflow-y-auto">
                <div>
                    {/* Logo */}
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

                    {/* Nav */}
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
            <main className="flex-1 px-8 py-8 overflow-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Credit Risk Dashboard</h1>
                    <p className="text-gray-500 text-base">Comprehensive risk assessment based on your cash flow analysis.</p>
                </div>

                {/* Overall Risk Score Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Overall Risk Score</h2>
                        <span className="text-[#1B2F6E] text-sm font-semibold bg-blue-50 px-3 py-1.5 rounded-lg">Updated: Feb 20, 2026</span>
                    </div>
                    <CreditGauge score={742} />
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    {METRICS.map(({ value, unit, label, description, change, positive, iconPath }) => (
                        <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-6">
                            {/* Top row — icon + trend */}
                            <div className="flex items-center justify-between mb-5">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[#1B2F6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {iconPath}
                                    </svg>
                                </div>
                                <svg className="w-5 h-5 text-[#1B2F6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>

                            {/* Value */}
                            <div className="flex items-baseline gap-0.5 mb-2">
                                <span className="text-4xl font-extrabold text-gray-900">{value}</span>
                                <span className="text-xl font-bold text-gray-400">{unit}</span>
                            </div>

                            {/* Label */}
                            <p className="text-gray-900 font-bold text-base mb-2">{label}</p>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>{description}</p>

                            {/* Change */}
                            <p className={`text-sm font-semibold ${positive ? "text-green-600" : "text-red-500"}`}>
                                {change}
                            </p>
                        </div>
                    ))}
                </div>

                {/* ── Charts Row ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                    {/* Revenue vs Expense */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-6" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Revenue vs Expense</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={REVENUE_DATA} barGap={4} barCategoryGap="25%">
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                                <XAxis
                                    dataKey="month" axisLine={false} tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 13, fontFamily: 'IBM Plex Sans, sans-serif' }}
                                />
                                <YAxis
                                    axisLine={false} tickLine={false}
                                    tickFormatter={(v) => `$${v / 1000}k`}
                                    tick={{ fill: '#6B7280', fontSize: 13, fontFamily: 'IBM Plex Sans, sans-serif' }}
                                />
                                <Tooltip
                                    formatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                                    contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13 }}
                                />
                                <Legend
                                    iconType="square" iconSize={12}
                                    wrapperStyle={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13, paddingTop: 12 }}
                                />
                                <Bar dataKey="revenue" name="Revenue" fill="#1B2F6E" radius={[4, 4, 0, 0]} barSize={22} />
                                <Bar dataKey="expense" name="Expense" fill="#93B5F7" radius={[4, 4, 0, 0]} barSize={22} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Monthly Revenue Volatility */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-6" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>Monthly Revenue Volatility</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={VOLATILITY_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                                <XAxis
                                    dataKey="month" axisLine={false} tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 13, fontFamily: 'IBM Plex Sans, sans-serif' }}
                                />
                                <YAxis
                                    axisLine={false} tickLine={false}
                                    tickFormatter={(v) => `${v}%`}
                                    domain={[0, 24]}
                                    tick={{ fill: '#6B7280', fontSize: 13, fontFamily: 'IBM Plex Sans, sans-serif' }}
                                />
                                <Tooltip
                                    formatter={(v) => `${v}%`}
                                    contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13 }}
                                />
                                <Line
                                    type="monotone" dataKey="volatility" name="Volatility"
                                    stroke="#1B2F6E" strokeWidth={2.5}
                                    dot={{ r: 5, fill: '#1B2F6E', stroke: '#fff', strokeWidth: 2 }}
                                    activeDot={{ r: 7, fill: '#1B2F6E' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
