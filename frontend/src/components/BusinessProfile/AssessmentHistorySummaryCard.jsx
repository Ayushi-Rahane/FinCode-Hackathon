import React from "react";

const HISTORY_DATA = [
    {
        date: "February 15, 2024",
        score: "742",
        category: "Low Risk",
        recommendation: "₹15-20 Lakhs",
    },
    {
        date: "January 10, 2024",
        score: "735",
        category: "Low Risk",
        recommendation: "₹12-18 Lakhs",
    },
    {
        date: "December 5, 2023",
        score: "728",
        category: "Low Risk",
        recommendation: "₹10-15 Lakhs",
    },
];

const AssessmentHistorySummaryCard = () => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm mb-6 relative">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                    Assessment History Summary
                </h3>
                <button className="text-[#2A3F84] text-sm font-bold hover:underline flex items-center gap-1">
                    View Full History
                    <span>→</span>
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {HISTORY_DATA.map((item, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-sm transition-shadow bg-white"
                    >
                        {/* Assessment Date */}
                        <div className="flex items-center gap-3 md:w-1/4">
                            <div className="w-2 h-2 rounded-full bg-[#1B2F6E] shrink-0"></div>
                            <div>
                                <p className="text-gray-600 text-[13px] font-semibold mb-1">Assessment Date</p>
                                <p className="text-gray-900 font-bold text-[15px]">{item.date}</p>
                            </div>
                        </div>

                        {/* Risk Score */}
                        <div className="md:w-1/5">
                            <p className="text-gray-600 text-[13px] font-semibold mb-1">Risk Score</p>
                            <p className="text-[#1B2F6E] font-bold text-[15px]">{item.score}</p>
                        </div>

                        {/* Risk Category */}
                        <div className="md:w-1/5">
                            <p className="text-gray-600 text-[13px] font-semibold mb-1">Risk Category</p>
                            <span className="inline-block bg-blue-50 text-[#1B2F6E] text-xs font-bold px-3 py-1.5 rounded-md">
                                {item.category}
                            </span>
                        </div>

                        {/* Loan Recommendation */}
                        <div className="md:w-1/4">
                            <p className="text-gray-600 text-[13px] font-semibold mb-1">Loan Recommendation</p>
                            <p className="text-gray-900 font-bold text-[15px]">{item.recommendation}</p>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default AssessmentHistorySummaryCard;
