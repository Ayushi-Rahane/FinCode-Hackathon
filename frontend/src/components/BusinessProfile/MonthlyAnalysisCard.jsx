import React from 'react';

const MonthlyAnalysisCard = () => {
    const analysisData = JSON.parse(localStorage.getItem("pdf_analysis") || "{}");

    if (!analysisData || !analysisData.monthly_data || analysisData.monthly_data.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Monthly Stability Analysis
                </h3>
            </div>

            <div className="p-6">
                {/* Summary Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Period</p>
                        <p className="text-gray-900 font-bold">{analysisData.period}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Transactions</p>
                        <p className="text-gray-900 font-bold">{analysisData.transactions_detected}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                        <p className="text-green-600 text-xs font-bold uppercase tracking-wider mb-1">Total Inflow</p>
                        <p className="text-gray-900 font-bold">{"₹" + (analysisData.total_inflow || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">Total Outflow</p>
                        <p className="text-gray-900 font-bold">{"₹" + (analysisData.total_outflow || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                </div>

                {/* Monthly Table */}
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Month</th>
                                <th className="px-6 py-3 text-right font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Inflow</th>
                                <th className="px-6 py-3 text-right font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Outflow</th>
                                <th className="px-6 py-3 text-right font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Net Surplus</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {analysisData.monthly_data.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{row.month}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right font-semibold text-green-600">
                                        +₹{(row.inflow || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-gray-600">
                                        -₹{(row.outflow || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-right font-bold ${row.net_surplus >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {row.net_surplus >= 0 ? '+' : '-'}₹{Math.abs(row.net_surplus || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Advanced Decision Variables */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                    <h4 className="text-md font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Advanced Decision Variables
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* 1. Net Monthly Surplus */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                </svg>
                            </div>
                            <h5 className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-2">Net Monthly Surplus</h5>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-gray-900">
                                    {"₹" + (analysisData.net_surplus || 0).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </span>
                            </div>
                            <p className="text-gray-400 text-xs mt-2 font-medium">Avg Inflow - Avg Outflow</p>
                        </div>

                        {/* 2. Revenue Volatility */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <svg className="w-12 h-12 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                                </svg>
                            </div>
                            <h5 className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-2">Revenue Volatility</h5>
                            <div className="flex items-baseline gap-2">
                                <span className={`text-2xl font-black ${analysisData.seasonality_indicator === 'High Variation' ? 'text-red-600' : 'text-gray-900'}`}>
                                    {"₹" + (analysisData.volatility || 0).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </span>
                            </div>
                            <p className="text-gray-400 text-xs mt-2 font-medium">Standard deviation of inflow</p>
                        </div>

                        {/* 3. Liquidity Strength */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <svg className="w-12 h-12 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zM7.83 14c.37 0 .67.26.74.62 1.41-1.54 3.53-2.18 5.6-2.18 1.46 0 2.87.35 4 .92-1.57-2.92-5.4-4.8-10.34-1.36z" />
                                </svg>
                            </div>
                            <h5 className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-2">Liquidity Strength</h5>
                            <div className="flex items-baseline gap-2">
                                <span className={`text-2xl font-black ${(analysisData.liquidity_buffer || 0) > 1.0 ? 'text-teal-600' : 'text-red-500'}`}>
                                    {(analysisData.liquidity_buffer || 0).toFixed(2)}x
                                </span>
                            </div>
                            <p className="text-gray-400 text-xs mt-2 font-medium">Avg Balance ÷ Monthly Expense</p>
                        </div>

                        {/* 4. Cash Flow Consistency */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <svg className="w-12 h-12 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V7h-2v5H6v-2h2V5h2v5h2v2zm4 4h-6v-2h6v2zm2-4h-8v-2h8v2z" />
                                </svg>
                            </div>
                            <h5 className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-2">CF Consistency Ratio</h5>
                            <div className="flex items-baseline gap-2">
                                <span className={`text-2xl font-black ${(analysisData.consistency_ratio || 0) >= 66 ? 'text-green-600' : 'text-gray-900'}`}>
                                    {(analysisData.consistency_ratio || 0).toFixed(0)}%
                                </span>
                            </div>
                            <p className="text-gray-400 text-xs mt-2 font-medium">Positive months ÷ Total</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonthlyAnalysisCard;
