import React from "react";

const BusinessDetailsCard = () => {
    const analysisData = JSON.parse(localStorage.getItem("pdf_analysis") || "{}");

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-8">Business Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {/* Left Column */}
                <div className="space-y-8">
                    {/* Business Registration Number */}
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100">
                            <svg className="w-5 h-5 text-[#2A3F84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-600 text-xs font-bold uppercase tracking-wide mb-1">Business Registration Number</p>
                            <p className="text-gray-900 font-bold text-sm">BRN/MH/2019/00234567</p>
                        </div>
                    </div>

                    {/* GST Number */}
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100">
                            <svg className="w-5 h-5 text-[#2A3F84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-600 text-xs font-bold uppercase tracking-wide mb-1">GST Number</p>
                            <p className="text-gray-900 font-bold text-sm">27AABCT1234F1Z5</p>
                        </div>
                    </div>

                    {/* PAN Number */}
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 border border-blue-100">
                            <svg className="w-5 h-5 text-[#2A3F84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-600 text-xs font-bold uppercase tracking-wide mb-1">PAN Number</p>
                            <p className="text-gray-900 font-bold text-sm">AABCT****F</p>
                        </div>
                    </div>

                    {/* Primary Bank Account */}
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100">
                            <svg className="w-5 h-5 text-[#2A3F84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-600 text-xs font-bold uppercase tracking-wide mb-1">Primary Bank Account</p>
                            <p className="text-gray-900 font-bold text-sm">HDFC Bank •••• 4567</p>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8 relative">

                    {/* Average Monthly Revenue */}
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 border border-blue-100">
                            <svg className="w-5 h-5 text-[#2A3F84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-600 text-xs font-bold uppercase tracking-wide mb-1">Average Monthly Revenue</p>
                            <p className="text-gray-900 font-bold text-sm">{"₹" + (analysisData.avg_monthly_inflow || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                        </div>
                    </div>

                    {/* Average Monthly Expense */}
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center shrink-0 border border-red-100">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-600 text-xs font-bold uppercase tracking-wide mb-1">Average Monthly Expense</p>
                            <p className="text-gray-900 font-bold text-sm">{"₹" + (analysisData.avg_monthly_outflow || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                        </div>
                    </div>

                    {/* Average Monthly Net Cash Flow */}
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 border border-blue-100">
                            <svg className="w-5 h-5 text-[#2A3F84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-600 text-xs font-bold uppercase tracking-wide mb-1">Average Monthly Net Cash Flow</p>
                            <p className="text-[#2A3F84] font-bold text-sm">{"₹" + (analysisData.net_surplus || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                        </div>
                    </div>

                    {/* Revenue Seasonality Indicator */}
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100">
                            <svg className="w-5 h-5 text-[#2A3F84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-600 text-xs font-bold uppercase tracking-wide mb-1">Revenue Seasonality Indicator</p>
                            <p className="text-gray-900 font-bold text-sm">{analysisData.seasonality_indicator || "Unknown"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessDetailsCard;
