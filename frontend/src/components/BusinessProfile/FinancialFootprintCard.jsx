import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const TRANSACTION_DATA = [
    { month: "Jan", volume: 90 },
    { month: "Feb", volume: 95 },
    { month: "Mar", volume: 92 },
    { month: "Apr", volume: 98 },
    { month: "May", volume: 100 },
    { month: "Jun", volume: 95 },
];

const FinancialFootprintCard = () => {
    const analysisData = JSON.parse(localStorage.getItem("pdf_analysis") || "{}");
    const { digital_footprint } = analysisData;

    const upiPct = digital_footprint?.upi_pct ?? 68;
    const posPct = digital_footprint?.pos_pct ?? 32;
    const txVolumeTrend = digital_footprint?.tx_volume_trend ?? TRANSACTION_DATA;

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm mb-6 relative">
            <h3 className="text-xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Georgia, serif' }}>Banking &amp; Financial Footprint</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Digital Payment Usage */}
                <div className="flex flex-col gap-6">
                    <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase">Digital Payment Usage</h4>
                    <div className="flex gap-4">
                        <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-5 flex flex-col items-center justify-center text-center">
                            <span className="text-2xl font-bold text-gray-900 mb-1">{upiPct}%</span>
                            <span className="text-xs font-semibold text-gray-500">UPI Transactions</span>
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-5 flex flex-col items-center justify-center text-center">
                            <span className="text-2xl font-bold text-gray-900 mb-1">{posPct}%</span>
                            <span className="text-xs font-semibold text-gray-500">Other Forms (POS/NEFT)</span>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 rounded-xl border border-blue-100 p-5 mt-2">
                    <p className="text-[#2A3F84] text-sm font-bold mb-1">Analysis Period</p>
                    <p className="text-gray-900 font-bold text-base">{analysisData.period || "Transaction Data available"}</p>
                </div>
            </div>

            {/* Transaction Volume Trend */}
            <div className="mt-8">
                <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase">Transaction Volume Trend</h4>
                <div className="h-64 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={txVolumeTrend} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis
                                dataKey="month"
                                axisLine={{ stroke: '#D1D5DB' }}
                                tickLine={true}
                                tick={{ fill: '#6B7280', fontSize: 13, fontFamily: 'Georgia, serif' }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={{ stroke: '#D1D5DB' }}
                                tickLine={true}
                                tick={{ fill: '#6B7280', fontSize: 13, fontFamily: 'Georgia, serif' }}
                                domain={[0, 'auto']}
                                dx={-5}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 13, fontFamily: 'Georgia, serif' }}
                                formatter={(v) => [`${v}`, 'Volume']}
                            />
                            <Line
                                type="monotone"
                                dataKey="volume"
                                stroke="#2A3F84"
                                strokeWidth={1.5}
                                dot={{ r: 4, fill: '#2A3F84', stroke: '#2A3F84', strokeWidth: 1 }}
                                activeDot={{ r: 6, fill: '#2A3F84' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default FinancialFootprintCard;
