import React from "react";
import { useNavigate } from "react-router-dom";

const BusinessSummaryCard = ({ onEditProfile }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const companyName = user.businessName || "Apex Trading Co.";
    const industry = user.industry || "Retail & E-Commerce";

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6 shadow-sm flex flex-col md:flex-row gap-8 justify-between">
            {/* Left Section */}
            <div className="flex gap-6">
                {/* Logo */}
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-3xl font-bold text-[#1B2F6E]">
                        {companyName.charAt(0).toUpperCase()}
                    </span>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 truncate max-w-sm">{companyName}</h2>
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#1B2F6E] text-sm font-semibold rounded-lg">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            Active
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                        <div>
                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <span className="text-sm font-medium">Industry</span>
                            </div>
                            <p className="text-gray-900 font-bold text-base truncate max-w-xs">{industry}</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm font-medium">Location</span>
                            </div>
                            <p className="text-gray-900 font-bold text-base">Pune, Maharashtra</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm font-medium">Years in Operation</span>
                            </div>
                            <p className="text-gray-900 font-bold text-base">5 Years</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-gray-400 mb-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-sm font-medium">Registration Type</span>
                            </div>
                            <p className="text-gray-900 font-bold text-base">Sole Proprietorship</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section / Buttons */}
            <div className="flex flex-col gap-3 min-w-[200px]">
                <button onClick={onEditProfile} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2A3F84] text-white rounded-lg hover:bg-[#1B2F6E] transition-colors shadow-sm font-semibold text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit Profile
                </button>
                <button
                    onClick={() => navigate('/register?step=2')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-[#2A3F84] rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-semibold text-sm cursor-pointer"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Run New Assessment
                </button>
                <button onClick={() => navigate('/report')} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-semibold text-sm cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Summary
                </button>
            </div>
        </div>
    );
};

export default BusinessSummaryCard;
