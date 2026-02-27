import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BusinessProfileHeader from "../components/BusinessProfile/BusinessProfileHeader";
import BusinessSummaryCard from "../components/BusinessProfile/BusinessSummaryCard";
import BusinessDetailsCard from "../components/BusinessProfile/BusinessDetailsCard";
import MonthlyAnalysisCard from "../components/BusinessProfile/MonthlyAnalysisCard";
import FinancialFootprintCard from "../components/BusinessProfile/FinancialFootprintCard";
import AssessmentHistorySummaryCard from "../components/BusinessProfile/AssessmentHistorySummaryCard";
import BusinessHealthSnapshotCard from "../components/BusinessProfile/BusinessHealthSnapshotCard";
import AccountSettingsCard from "../components/BusinessProfile/AccountSettingsCard";

/* ─── Sidebar Nav Items ─── */
const NAV_ITEMS = [
    { label: "Dashboard", to: "/dashboard", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> },
    { label: "Stress Testing", to: "/stress-testing", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /> },
    { label: "Loan Optimization", to: "/loan-optimization", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { label: "Insights", to: "/insights", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /> },
    { label: "Report", to: "/report", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> },
];

const BusinessProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleSaveProfile = (updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditModalOpen(false);
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* ── Sidebar ── */}
            <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-gray-100 px-4 py-6 shrink-0 justify-between sticky top-0 h-screen overflow-y-auto">
                <div>
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 px-2 mb-4">
                        <div className="w-8 h-8 bg-[#1B2F6E] rounded-lg flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                                <rect x="2" y="12" width="4" height="10" rx="1" fill="white" />
                                <rect x="8" y="7" width="4" height="15" rx="1" fill="white" />
                                <rect x="14" y="3" width="4" height="19" rx="1" fill="white" />
                            </svg>
                        </div>
                        <span className="text-[#1B2F6E] font-extrabold text-lg tracking-tight">Credalytix</span>
                    </Link>

                    {/* Divider */}
                    <div className="border-b border-gray-200 mx-2 mb-4" />

                    {/* Profile Link (Active) */}
                    <Link to="/profile" className="flex items-center gap-3 px-3 py-3 mb-4 rounded-xl bg-gray-50 transition-all duration-200 group border border-gray-100 shadow-sm">
                        <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-[#1B2F6E] font-bold text-lg shrink-0 border border-blue-100">
                            {user?.businessName ? user.businessName.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                            <p className="text-[#1B2F6E] font-bold text-sm truncate w-32">{user?.businessName || "Your Business"}</p>
                            <p className="text-gray-400 text-xs font-semibold mt-0.5 truncate w-32">{user?.industry || "Industry"}</p>
                        </div>
                    </Link>

                    {/* Divider */}
                    <div className="border-b border-gray-200 mx-2 mb-4" />

                    {/* Nav */}
                    <nav className="flex flex-col gap-1">
                        {NAV_ITEMS.map(({ label, to, icon, active }) => (
                            <Link
                                key={label}
                                to={to}
                                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base transition-all duration-200 ${active
                                    ? "bg-blue-50 text-[#1B2F6E] font-bold"
                                    : "text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-700"
                                    }`}
                                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                            >
                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {icon}
                                </svg>
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-base text-gray-500 font-medium hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full"
                    style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                >
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </aside>

            {/* ── Main Content ── */}
            <main className="flex-1 px-8 py-8 overflow-auto">
                <div className="max-w-[1200px]">
                    <BusinessProfileHeader />

                    <BusinessSummaryCard onEditProfile={() => setIsEditModalOpen(true)} />
                    <MonthlyAnalysisCard />
                    <BusinessDetailsCard />
                    <FinancialFootprintCard />
                    <AssessmentHistorySummaryCard />
                    <BusinessHealthSnapshotCard />
                    <AccountSettingsCard onEditProfile={() => setIsEditModalOpen(true)} />
                </div>
            </main>

            {/* ── Edit Profile Modal ── */}
            {isEditModalOpen && (
                <EditProfileModal
                    user={user}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSaveProfile}
                />
            )}
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  Edit Profile Modal Component                                      */
/* ═══════════════════════════════════════════════════════════════════ */
const EditProfileModal = ({ user, onClose, onSave }) => {
    const [form, setForm] = useState({
        name: user.name || "",
        businessName: user.businessName || "",
        industry: user.industry || "",
        registrationType: user.registrationType || "",
        yearsInOperation: user.yearsInOperation || "",
        loanAmount: user.loanAmount || "",
        loanTenure: user.loanTenure || "",
        brn: user.brn || "",
        gstNumber: user.gstNumber || "",
        panNumber: user.panNumber || "",
        bankAccount: user.bankAccount || "",
    });

    const INDUSTRIES = [
        "Manufacturing", "Retail", "Technology", "Healthcare",
        "Construction", "Food & Beverage", "Transportation",
        "Professional Services", "Agriculture", "Other",
    ];

    const REGISTRATION_TYPES = [
        "Sole Proprietorship", "Partnership", "LLP", "Private Limited", "One Person Company"
    ];

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleSave = () => {
        onSave({ ...user, ...form });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <h3 className="text-xl font-bold text-gray-900">Edit Business Profile</h3>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-gray-700 text-sm font-semibold">Full Name</label>
                        <input value={form.name} onChange={set("name")} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2F6E]" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-gray-700 text-sm font-semibold">Business Name</label>
                        <input value={form.businessName} onChange={set("businessName")} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2F6E]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-gray-700 text-sm font-semibold">Industry Type</label>
                            <select value={form.industry} onChange={set("industry")} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1B2F6E] appearance-none">
                                <option value="">Select</option>
                                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-gray-700 text-sm font-semibold">Registration Type</label>
                            <select value={form.registrationType} onChange={set("registrationType")} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1B2F6E] appearance-none">
                                <option value="">Select</option>
                                {REGISTRATION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-gray-700 text-sm font-semibold">Years in Operation</label>
                        <input type="number" value={form.yearsInOperation} onChange={set("yearsInOperation")} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2F6E]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-gray-700 text-sm font-semibold">Loan Amount (₹)</label>
                            <input type="number" value={form.loanAmount} onChange={set("loanAmount")} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2F6E]" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-gray-700 text-sm font-semibold">Loan Tenure (m)</label>
                            <input type="number" value={form.loanTenure} onChange={set("loanTenure")} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2F6E]" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-gray-700 text-sm font-semibold">Business Registration Number</label>
                            <input value={form.brn} onChange={set("brn")} placeholder="e.g. BRN/MH/2019/..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2F6E]" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-gray-700 text-sm font-semibold">GST Number</label>
                            <input value={form.gstNumber} onChange={set("gstNumber")} placeholder="e.g. 27AABCT..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2F6E]" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-gray-700 text-sm font-semibold">PAN Number</label>
                            <input value={form.panNumber} onChange={set("panNumber")} placeholder="e.g. AABCT****F" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2F6E]" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-gray-700 text-sm font-semibold">Primary Bank Account</label>
                            <input value={form.bankAccount} onChange={set("bankAccount")} placeholder="e.g. HDFC Bank •••• 4567" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B2F6E]" />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
                    <button onClick={onClose} className="px-5 py-2.5 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition-colors text-sm">Cancel</button>
                    <button onClick={handleSave} className="px-5 py-2.5 bg-[#1B2F6E] text-white font-semibold hover:bg-[#12235A] rounded-lg shadow-sm transition-colors text-sm">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default BusinessProfilePage;
