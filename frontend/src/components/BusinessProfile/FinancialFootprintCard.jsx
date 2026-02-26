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
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm mb-6 relative">
            <h3 className="text-xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Georgia, serif' }}>Banking & Financial Footprint</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Linked Bank Accounts */}
                <div className="flex flex-col gap-6">
                    <div>
                        <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase">Linked Bank Accounts</h4>
                        <div className="flex flex-col gap-3">
                            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center border border-gray-200 shrink-0">
                                        <svg className="w-5 h-5 text-[#2A3F84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 00-3 3z" />
                                        </svg>
                                    </div>
                                    <span className="font-bold text-sm text-gray-900">HDFC Bank •••• 4567</span>
                                </div>
                                <span className="bg-blue-50 text-[#2A3F84] text-xs font-bold px-3 py-1.5 rounded-md">Primary</span>
                            </div>

                            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center border border-gray-200 shrink-0">
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 00-3 3z" />
                                        </svg>
                                    </div>
                                    <span className="font-bold text-sm text-gray-900">ICICI Bank •••• 8923</span>
                                </div>
                                <span className="bg-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-md">Secondary</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase">Digital Payment Usage</h4>
                        <div className="flex gap-4">
                            <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-5 flex flex-col items-center justify-center text-center">
                                <span className="text-2xl font-bold text-gray-900 mb-1">68%</span>
                                <span className="text-xs font-semibold text-gray-500">UPI Transactions</span>
                            </div>
                            <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-5 flex flex-col items-center justify-center text-center">
                                <span className="text-2xl font-bold text-gray-900 mb-1">32%</span>
                                <span className="text-xs font-semibold text-gray-500">POS/Card</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl border border-blue-100 p-5 mt-2">
                        <p className="text-[#2A3F84] text-sm font-bold mb-1">Data Availability</p>
                        <p className="text-gray-900 font-bold text-base">18 Months of Transaction Data</p>
                    </div>
                </div>

                {/* Transaction Volume Trend */}
                <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase">Transaction Volume Trend</h4>
                    <div className="h-64 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={TRANSACTION_DATA} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
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
                                    domain={[0, 100]}
                                    ticks={[0, 25, 50, 75, 100]}
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

        </div>
    );
};

export default FinancialFootprintCard;
