import React from "react";

const AccountSettingsCard = () => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6 relative">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                    Account Settings
                </h3>
                <button className="text-gray-500 hover:text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            </div>

            <div className="p-8 flex flex-col gap-4">
                {/* Change Password */}
                <button className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl text-left border border-transparent shadow-sm">
                    <span className="font-bold text-gray-900 text-[15px]">Change Password</span>
                    <span className="text-[#1B2F6E] font-bold">→</span>
                </button>

                {/* Update Business Info */}
                <button className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl text-left border border-transparent shadow-sm">
                    <span className="font-bold text-gray-900 text-[15px]">Update Business Info</span>
                    <span className="text-[#1B2F6E] font-bold">→</span>
                </button>

                {/* Manage Data Uploads */}
                <button className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl text-left border border-transparent shadow-sm">
                    <span className="font-bold text-gray-900 text-[15px]">Manage Data Uploads</span>
                    <span className="text-[#1B2F6E] font-bold">→</span>
                </button>

                {/* Delete Assessment Data */}
                <button className="w-full flex items-center justify-between px-6 py-4 bg-red-50 hover:bg-red-100 transition-colors rounded-xl text-left border border-red-100 shadow-sm mt-2">
                    <span className="font-bold text-red-600 text-[15px]">Delete Assessment Data</span>
                    <span className="text-red-600 font-bold">→</span>
                </button>
            </div>


        </div>
    );
};

export default AccountSettingsCard;
