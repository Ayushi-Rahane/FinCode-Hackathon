import React from "react";

const BusinessHealthSnapshotCard = () => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                Business Health Snapshot
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Current Risk Category */}
                <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-gray-50/50">
                    <p className="text-gray-800 font-bold mb-3 text-[15px]">Current Risk Category</p>
                    <div className="bg-[#1B2F6E] text-white font-bold px-6 py-2 rounded shadow-sm">
                        Low Risk
                    </div>
                </div>

                {/* Current Liquidity Status */}
                <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-gray-50/50">
                    <p className="text-gray-800 font-bold mb-3 text-[15px]">Current Liquidity Status</p>
                    <div className="bg-[#1B2F6E] text-white font-bold px-6 py-2 rounded shadow-sm">
                        Healthy
                    </div>
                </div>

                {/* Current EMI Exposure */}
                <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-gray-50/50">
                    <p className="text-gray-800 font-bold mb-3 text-[15px]">Current EMI Exposure</p>
                    <div className="bg-gray-100 text-gray-800 font-bold px-6 py-2 rounded border border-gray-200 shadow-sm">
                        Moderate
                    </div>
                </div>

                {/* Revenue Stability Level */}
                <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-gray-50/50">
                    <p className="text-gray-800 font-bold mb-3 text-[15px]">Revenue Stability Level</p>
                    <div className="bg-[#1B2F6E] text-white font-bold px-6 py-2 rounded shadow-sm">
                        Healthy
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessHealthSnapshotCard;
