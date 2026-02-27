import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountSettingsCard = ({ onEditProfile }) => {
    const navigate = useNavigate();
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const submitPasswordChange = () => {
        if (!passwords.current || !passwords.new || !passwords.confirm) {
            alert("Please fill in all fields");
            return;
        }
        if (passwords.new !== passwords.confirm) {
            alert("New passwords do not match");
            return;
        }

        let user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.password && user.password !== passwords.current) {
            alert("Incorrect current password");
            return;
        }

        user.password = passwords.new;
        localStorage.setItem("user", JSON.stringify(user));
        alert("Password changed successfully!");
        setIsPasswordModalOpen(false);
        setPasswords({ current: "", new: "", confirm: "" });
    };

    const handleDeleteAssessment = () => {
        const confirmed = window.confirm("Are you sure you want to delete your assessment data? This will reset your dashboard, report, insights, stress testing, and optimization pages. This action cannot be undone.");
        if (confirmed) {
            localStorage.removeItem("pdf_analysis");
            localStorage.removeItem("assessment_history");
            alert("Assessment data deleted successfully!");
            navigate("/dashboard"); // Redirect to dashboard to show empty state
        }
    };
    return (
        <>
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
                    <button
                        onClick={() => setIsPasswordModalOpen(true)}
                        className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl text-left border border-transparent shadow-sm"
                    >
                        <span className="font-bold text-gray-900 text-[15px]">Change Password</span>
                        <span className="text-[#1B2F6E] font-bold">→</span>
                    </button>

                    {/* Update Business Info */}
                    <button
                        onClick={() => onEditProfile && onEditProfile()}
                        className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl text-left border border-transparent shadow-sm"
                    >
                        <span className="font-bold text-gray-900 text-[15px]">Update Business Info</span>
                        <span className="text-[#1B2F6E] font-bold">→</span>
                    </button>


                    {/* Delete Assessment Data */}
                    <button
                        onClick={handleDeleteAssessment}
                        className="w-full flex items-center justify-between px-6 py-4 bg-red-50 hover:bg-red-100 transition-colors rounded-xl text-left border border-red-100 shadow-sm mt-2"
                    >
                        <span className="font-bold text-red-600 text-[15px]">Delete Assessment Data</span>
                        <span className="text-red-600 font-bold">→</span>
                    </button>
                </div>


            </div>

            {/* ── Change Password Modal ── */}
            {
                isPasswordModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
                                <button onClick={() => setIsPasswordModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <div className="p-6 flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-gray-700 text-sm font-semibold">Current Password</label>
                                    <input type="password" name="current" value={passwords.current} onChange={handlePasswordChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2F6E]" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-gray-700 text-sm font-semibold">New Password</label>
                                    <input type="password" name="new" value={passwords.new} onChange={handlePasswordChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2F6E]" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-gray-700 text-sm font-semibold">Confirm New Password</label>
                                    <input type="password" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2F6E]" />
                                </div>
                            </div>
                            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
                                <button onClick={() => setIsPasswordModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition-colors text-sm">Cancel</button>
                                <button onClick={submitPasswordChange} className="px-5 py-2.5 bg-[#1B2F6E] text-white font-semibold hover:bg-[#12235A] rounded-lg shadow-sm transition-colors text-sm">Update</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default AccountSettingsCard;
