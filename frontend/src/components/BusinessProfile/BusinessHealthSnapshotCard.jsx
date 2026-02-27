import React from "react";

const BusinessHealthSnapshotCard = () => {
    const analysisData = JSON.parse(localStorage.getItem("pdf_analysis") || "{}");
    const scores = analysisData?.scores || {};

    const hasData = Object.keys(scores).length > 0;

    // Derived states based on actual scores
    const riskCategory = !hasData ? "Not Assessed" : (scores.overall >= 700 ? "Low Risk" : (scores.overall >= 600 ? "Medium Risk" : "High Risk"));
    const riskColor = !hasData ? "bg-gray-200 text-gray-600 shadow-none border border-gray-300" : (scores.overall >= 700 ? "bg-[#1B2F6E] text-white border border-transparent shadow-sm" : (scores.overall >= 600 ? "bg-orange-500 text-white border border-transparent shadow-sm" : "bg-red-600 text-white border border-transparent shadow-sm"));

    const liquidityStatus = !hasData ? "Not Assessed" : (scores.liquidity >= 75 ? "Healthy" : "Tight");
    const liquidityColor = !hasData ? "bg-gray-200 text-gray-600 shadow-none border border-gray-300" : (scores.liquidity >= 75 ? "bg-[#1B2F6E] text-white border border-transparent shadow-sm" : "bg-red-500 text-white border border-transparent shadow-sm");

    const emiExposure = !hasData ? "Not Assessed" : (scores.emi >= 80 ? "Low Burden" : (scores.emi >= 50 ? "Moderate" : "High Burden"));
    const emiColor = !hasData ? "bg-gray-200 text-gray-600 shadow-none border border-gray-300" : "bg-gray-100 text-gray-800 border border-gray-200 shadow-sm";

    const revStability = !hasData ? "Not Assessed" : (scores.stability >= 75 ? "Consistent" : "Volatile");
    const revColor = !hasData ? "bg-gray-200 text-gray-600 shadow-none border border-gray-300" : (scores.stability >= 75 ? "bg-[#1B2F6E] text-white border border-transparent shadow-sm" : "bg-orange-500 text-white border border-transparent shadow-sm");

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                Business Health Snapshot
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Current Risk Category */}
                <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-gray-50/50">
                    <p className="text-gray-800 font-bold mb-3 text-[15px]">Current Risk Category</p>
                    <div className={`${riskColor} font-bold px-6 py-2 rounded`}>
                        {riskCategory}
                    </div>
                </div>

                {/* Current Liquidity Status */}
                <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-gray-50/50">
                    <p className="text-gray-800 font-bold mb-3 text-[15px]">Current Liquidity Status</p>
                    <div className={`${liquidityColor} font-bold px-6 py-2 rounded`}>
                        {liquidityStatus}
                    </div>
                </div>

                {/* Current EMI Exposure */}
                <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-gray-50/50">
                    <p className="text-gray-800 font-bold mb-3 text-[15px]">Current EMI Exposure</p>
                    <div className={`${emiColor} font-bold px-6 py-2 rounded`}>
                        {emiExposure}
                    </div>
                </div>

                {/* Revenue Stability Level */}
                <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-gray-50/50">
                    <p className="text-gray-800 font-bold mb-3 text-[15px]">Revenue Stability Level</p>
                    <div className={`${revColor} font-bold px-6 py-2 rounded`}>
                        {revStability}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessHealthSnapshotCard;
