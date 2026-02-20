import React from "react";

/* ──────────────────────────────────────────────
   SVG Gauge for the Credit Score meter
   ────────────────────────────────────────────── */
const CreditGauge = ({ score = 742 }) => {
    const cx = 100, cy = 100, r = 72;
    const startAngle = 200;
    const endAngle = 340;
    const totalArc = endAngle - startAngle;

    const pct = Math.min(Math.max((score - 300) / 600, 0), 1);
    const filledArc = totalArc * pct;

    const toRad = (deg) => (deg * Math.PI) / 180;
    const arcPath = (start, sweep) => {
        const x1 = cx + r * Math.cos(toRad(start));
        const y1 = cy + r * Math.sin(toRad(start));
        const x2 = cx + r * Math.cos(toRad(start + sweep));
        const y2 = cy + r * Math.sin(toRad(start + sweep));
        return `M ${x1},${y1} A ${r},${r} 0 ${sweep > 180 ? 1 : 0},1 ${x2},${y2}`;
    };

    return (
        <div className="flex flex-col items-center">
            <svg width="200" height="140" viewBox="0 0 200 140">
                {/* Track */}
                <path
                    d={arcPath(startAngle, totalArc)}
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="12"
                    strokeLinecap="round"
                />
                {/* Filled */}
                <path
                    d={arcPath(startAngle, filledArc)}
                    fill="none"
                    stroke="#1B2F6E"
                    strokeWidth="12"
                    strokeLinecap="round"
                />
                {/* Score label */}
                <text x="100" y="105" textAnchor="middle" fontSize="30" fontWeight="800" fill="#1B2F6E" fontFamily="Inter, sans-serif">
                    {score}
                </text>
                <text x="100" y="124" textAnchor="middle" fontSize="12" fill="#9CA3AF" fontFamily="Inter, sans-serif">
                    Credit Score
                </text>
            </svg>
        </div>
    );
};

/* ──────────────────────────────────────────────
   Mini Stat Card
   ────────────────────────────────────────────── */
const StatCard = ({ label, value }) => (
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex flex-col gap-2">
        <span className="text-gray-400 text-sm font-medium">{label}</span>
        <span className="font-extrabold text-2xl" style={{ color: "#1B2F6E" }}>{value}</span>
    </div>
);

/* ──────────────────────────────────────────────
   Simple SVG sparkline for Revenue vs Expense
   ────────────────────────────────────────────── */
const RevenueChart = () => {
    const revenue = [40, 55, 45, 70, 65, 80];
    const expense = [30, 40, 50, 45, 55, 60];
    const w = 400, h = 80, len = revenue.length;

    const toX = (i) => (i / (len - 1)) * w;
    const toY = (v, max = 100) => h - (v / max) * h;

    const linePath = (data) =>
        data.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)},${toY(v)}`).join(" ");

    const areaPath = (data) =>
        `${linePath(data)} L ${w},${h} L 0,${h} Z`;

    return (
        <div>
            <span className="text-gray-400 text-sm mb-2 block font-medium">Revenue vs Expense (6 months)</span>
            <svg width="100%" height="80" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                <path d={areaPath(revenue)} fill="#1B2F6E" fillOpacity="0.08" />
                <path d={linePath(revenue)} fill="none" stroke="#1B2F6E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d={areaPath(expense)} fill="#EF4444" fillOpacity="0.06" />
                <path d={linePath(expense)} fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 3" />
            </svg>
            <div className="flex gap-5 mt-2">
                <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <span className="w-4 h-0.5 bg-[#1B2F6E] block rounded" /> Revenue
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <span className="w-4 h-0.5 bg-red-400 block rounded" /> Expense
                </span>
            </div>
        </div>
    );
};

/* ──────────────────────────────────────────────
   Main DashboardPreview Component
   ────────────────────────────────────────────── */
const DashboardPreview = () => {
    return (
        <div className="relative w-full">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 w-full min-w-[520px]">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <span className="text-gray-500 text-sm font-semibold">Credit Risk Dashboard Preview</span>
                    <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                            <span key={i} className="w-2.5 h-2.5 rounded-full bg-gray-200 block" />
                        ))}
                    </div>
                </div>

                {/* Gauge */}
                <div className="flex justify-center mb-6">
                    <CreditGauge score={742} />
                </div>

                {/* Stat Grid */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                    <StatCard label="Cash Flow Stability" value="87%" />
                    <StatCard label="Liquidity Buffer" value="2.4X" />
                    <StatCard label="EMI Coverage" value="3.1X" />
                    <StatCard label="Payment Discipline" value="94%" />
                </div>

                {/* Revenue vs Expense Chart */}
                <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                    <RevenueChart />
                </div>
            </div>
        </div>
    );
};

export default DashboardPreview;

