import React from "react";

const AssessmentHistorySummaryCard = () => {
    // Read from persistent assessment history and fix old entries
    const historyData = JSON.parse(localStorage.getItem("assessment_history") || "[]").map(item => {
        if (!item.recommendation || item.recommendation === "N/A") {
            const score = item.score || 0;
            item.recommendation = score >= 700 ? "Eligible" : score >= 500 ? "Conditional" : "Not Recommended";
        }
        return item;
    });

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm mb-6 relative">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                    Assessment History Summary
                </h3>
            </div>

            <div className="flex flex-col gap-4 max-h-80 overflow-y-auto pr-1">
                {historyData.length === 0 ? (
                    <div className="border border-gray-200 rounded-xl p-8 text-center bg-gray-50/50">
                        <p className="text-gray-500 font-medium">No assessment history available yet.</p>
                        <p className="text-gray-400 text-sm mt-1">Run a new assessment to see your history here.</p>
                    </div>
                ) : (
                    historyData.map((item, index) => (
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
                                <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-md ${item.category === "Low Risk" ? "bg-[#1B2F6E] text-white" :
                                    item.category === "Medium Risk" ? "bg-orange-500 text-white" :
                                        "bg-red-600 text-white"
                                    }`}>
                                    {item.category}
                                </span>
                            </div>

                            {/* Loan Recommendation */}
                            <div className="md:w-1/4">
                                <p className="text-gray-600 text-[13px] font-semibold mb-1">Loan Recommendation</p>
                                <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-md ${item.recommendation === "Eligible" ? "bg-green-600 text-white" :
                                    item.recommendation === "Conditional" ? "bg-orange-500 text-white" :
                                        "bg-red-600 text-white"
                                    }`}>
                                    {item.recommendation}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>


        </div>
    );
};

export default AssessmentHistorySummaryCard;
