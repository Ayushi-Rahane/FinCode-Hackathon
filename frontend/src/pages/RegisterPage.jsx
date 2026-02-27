import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/* ───────────────────────── Industries List ───────────────────────── */
const INDUSTRIES = [
    "Manufacturing", "Retail", "Technology", "Healthcare",
    "Construction", "Food & Beverage", "Transportation",
    "Professional Services", "Agriculture", "Other",
];

const REGISTRATION_TYPES = [
    "Sole Proprietorship",
    "Partnership",
    "LLP",
    "Private Limited",
    "One Person Company"
];

/* ───────────────────────── Analysis Steps ───────────────────────── */
const ANALYSIS_STEPS = [
    {
        title: "Parsing Transactions",
        subtitle: "Extracting and categorizing transaction records",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
    },
    {
        title: "Calculating Metrics",
        subtitle: "Computing cash flow ratios and financial indicators",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
        ),
    },
    {
        title: "Running Stress Test",
        subtitle: "Simulating adverse scenarios against your financials",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
    },
    {
        title: "Generating Score",
        subtitle: "Compiling final credit risk assessment",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
];

/* ═══════════════════════════════════════════════════════════════════ */
/*  STEP 1 — Business Profile                                        */
/* ═══════════════════════════════════════════════════════════════════ */
const StepBusinessProfile = ({ onContinue }) => {
    const [form, setForm] = useState({
        name: "", email: "", password: "", confirmPassword: "",
        businessName: "", industry: "", registrationType: "", yearsInOperation: "",
        loanAmount: "", loanTenure: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleContinue = async () => {
        // Basic validation
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const required = ["name", "email", "password", "businessName", "industry", "registrationType", "yearsInOperation", "loanAmount", "loanTenure"];
        if (required.some(key => !form[key])) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:5001/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to register");
            }

            // Success! Save user to localStorage
            localStorage.setItem("user", JSON.stringify(data.user));
            onContinue();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center py-14 px-6">
            <div className="w-full max-w-4xl flex gap-8">
                {/* ── Main Card ── */}
                <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm px-10 py-10">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#1B2F6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Business Profile</h2>
                    </div>
                    <p className="text-gray-500 text-sm mb-8 ml-12">Provide your business details to begin the credit assessment.</p>

                    <div className="flex flex-col gap-5">
                        {/* Account fields */}
                        <div className="grid grid-cols-2 gap-5">
                            <Field label="Full Name" placeholder="John Doe" value={form.name} onChange={set("name")} />
                            <Field label="Email Address" placeholder="you@company.com" type="email" value={form.email} onChange={set("email")} />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <Field label="Password" placeholder="••••••••" type="password" value={form.password} onChange={set("password")} />
                            <Field label="Confirm Password" placeholder="••••••••" type="password" value={form.confirmPassword} onChange={set("confirmPassword")} />
                        </div>

                        <hr className="border-gray-100 my-2" />

                        {/* Business fields */}
                        <Field label="Business Name" placeholder="e.g. Apex Trading Co." value={form.businessName} onChange={set("businessName")} />

                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-gray-700 text-sm font-semibold">Industry Type</label>
                                <select
                                    value={form.industry}
                                    onChange={set("industry")}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1B2F6E] focus:border-transparent transition appearance-none"
                                >
                                    <option value="">Select Industry</option>
                                    {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                                </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-gray-700 text-sm font-semibold">Registration Type</label>
                                <select
                                    value={form.registrationType}
                                    onChange={set("registrationType")}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1B2F6E] focus:border-transparent transition appearance-none"
                                >
                                    <option value="">Select Type</option>
                                    {REGISTRATION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                        </div>

                        <Field label="Years in Operation" placeholder="e.g. 5" type="number" value={form.yearsInOperation} onChange={set("yearsInOperation")} />

                        <div className="grid grid-cols-2 gap-5">
                            <Field label="Proposed Loan Amount" placeholder="5,00,000" type="number" prefix="₹" value={form.loanAmount} onChange={set("loanAmount")} />
                            <Field label="Loan Tenure (months)" placeholder="36" type="number" value={form.loanTenure} onChange={set("loanTenure")} />
                        </div>

                        {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">{error}</div>}

                        <button
                            onClick={handleContinue}
                            disabled={loading}
                            className={`w-full py-3.5 rounded-lg font-bold text-base transition-all duration-200 shadow-md flex items-center justify-center gap-2 mt-2 ${loading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#1B2F6E] text-white hover:bg-[#12235A] hover:shadow-lg'}`}
                        >
                            {loading ? "Registering..." : "Continue to Upload"}
                            {!loading && (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* ── Sidebar ── */}
                <div className="hidden lg:block w-72 shrink-0">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <svg className="w-4 h-4 text-[#1B2F6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-[#1B2F6E] font-bold text-sm">Why we need this</span>
                        </div>
                        <h4 className="text-gray-900 font-bold text-sm mb-1">Business Details</h4>
                        <p className="text-gray-600 text-xs leading-relaxed mb-4">
                            Your business profile helps us benchmark your cash flow metrics against industry standards for a more accurate assessment.
                        </p>
                        <h4 className="text-gray-900 font-bold text-sm mb-1">Loan Parameters</h4>
                        <p className="text-gray-600 text-xs leading-relaxed mb-4">
                            The proposed amount and tenure allow us to calculate EMI coverage ratios and recommend optimal loan structures.
                        </p>
                        <p className="text-green-700 text-xs leading-relaxed italic">
                            All data is encrypted and processed securely. We do not share your information with third parties.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
/*  STEP 2 — Upload Bank Statements                                  */
/* ═══════════════════════════════════════════════════════════════════ */
const StepUpload = ({ onBeginAnalysis }) => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});
    const [analysisData, setAnalysisData] = useState(null);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);

    const handleFiles = async (incoming) => {
        const newFiles = Array.from(incoming);
        // Only accept the first PDF for now
        if (newFiles.length === 0) return;

        const file = newFiles[0];
        if (file.type !== "application/pdf") {
            setError("Only PDF files are supported.");
            return;
        }

        setFiles([file]);
        setError(null);
        setUploading(true);
        setUploadProgress({ [file.name]: 10 }); // Start progress

        const formData = new FormData();
        formData.append("file", file);

        try {
            // Fake progress animation up to 80%
            const interval = setInterval(() => {
                setUploadProgress((prev) => ({
                    ...prev,
                    [file.name]: Math.min((prev[file.name] || 10) + 15, 80)
                }));
            }, 500);

            const res = await fetch("http://localhost:5001/api/upload", {
                method: "POST",
                body: formData,
            });

            clearInterval(interval);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to upload and parse PDF");
            }

            // Success! Jump to 100%
            setUploadProgress({ [file.name]: 100 });
            setAnalysisData(data.data);

            // Save to localStorage so dashboard can use it
            localStorage.setItem("pdf_analysis", JSON.stringify(data.data));

            // Also save to assessment history
            const history = JSON.parse(localStorage.getItem("assessment_history") || "[]");
            const score = data.data?.scores?.overall || 0;
            const netSurplus = data.data?.net_surplus || 0;
            const recommendation = score >= 700 ? "Eligible" : score >= 500 ? "Conditional" : "Not Recommended";
            history.unshift({
                date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                score: score,
                category: score >= 700 ? "Low Risk" : (score >= 600 ? "Medium Risk" : "High Risk"),
                recommendation: recommendation,
            });
            localStorage.setItem("assessment_history", JSON.stringify(history));

        } catch (err) {
            setError(err.message);
            setUploadProgress({ [file.name]: 0 });
            setFiles([]);
        } finally {
            setUploading(false);
        }
    };

    const allDone = files.length > 0 && Object.values(uploadProgress).every((p) => p === 100);

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center py-14 px-6">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">Upload Bank Statements</h2>
                    <p className="text-gray-500 text-lg">Upload your bank statements for the past 6–12 months to begin the analysis.</p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    {/* Drop Zone */}
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-[#1B2F6E] hover:bg-blue-50/30 transition-all duration-200"
                        onClick={() => inputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={(e) => { e.preventDefault(); e.stopPropagation(); handleFiles(e.dataTransfer.files); }}
                    >
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-[#1B2F6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </div>
                        <p className="text-gray-900 font-semibold text-base mb-1">Drag and drop your files here</p>
                        <p className="text-gray-400 text-sm mb-4">or click to browse from your computer</p>
                        <div className="flex items-center justify-center gap-2">
                            {[".pdf", ".csv", ".xls", ".xlsx"].map((ext) => (
                                <span key={ext} className="px-3 py-1 border border-gray-200 rounded-md text-gray-500 text-xs font-medium">{ext}</span>
                            ))}
                        </div>
                        <input
                            ref={inputRef}
                            type="file"
                            multiple
                            accept=".pdf,.csv,.xls,.xlsx"
                            className="hidden"
                            onChange={(e) => handleFiles(e.target.files)}
                        />
                    </div>

                    {/* File List */}
                    {files.length > 0 && (
                        <div className="mt-6 flex flex-col gap-3">
                            {files.map((f) => (
                                <div key={f.name} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                                    <svg className="w-5 h-5 text-[#1B2F6E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-900 text-sm font-medium truncate">{f.name}</p>
                                        <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                                            <div
                                                className="h-full bg-[#1B2F6E] rounded-full transition-all duration-300"
                                                style={{ width: `${uploadProgress[f.name] || 0}% ` }}
                                            />
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium w-10 text-right">
                                        {uploadProgress[f.name] || 0}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tip */}
                <div className="mt-4 bg-gray-100 rounded-xl px-6 py-4">
                    <p className="text-gray-600 text-sm leading-relaxed">
                        For best results, upload statements from your primary business account covering the last 6–12 months. Ensure files are not password-protected. Maximum file size: 10 MB per file.
                    </p>
                </div>

                {/* Begin Analysis */}
                {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl mb-6">{error}</div>}

                {/* Validation Success View */}
                {analysisData && (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 mt-6 text-left shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-green-800 font-bold text-lg">File Validated Successfully</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded-lg border border-green-100">
                                <p className="text-green-600 text-xs font-bold uppercase tracking-wider mb-1">Period</p>
                                <p className="text-gray-900 font-bold">{analysisData.period}</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-green-100">
                                <p className="text-green-600 text-xs font-bold uppercase tracking-wider mb-1">Transactions</p>
                                <p className="text-gray-900 font-bold">{analysisData.transactions_detected}</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-green-100">
                                <p className="text-green-600 text-xs font-bold uppercase tracking-wider mb-1">Total Inflow</p>
                                <p className="text-gray-900 font-bold">{"₹" + (analysisData.total_inflow || 0).toLocaleString("en-IN")}</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-green-100">
                                <p className="text-green-600 text-xs font-bold uppercase tracking-wider mb-1">Total Outflow</p>
                                <p className="text-gray-900 font-bold">{"₹" + (analysisData.total_outflow || 0).toLocaleString("en-IN")}</p>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    onClick={onBeginAnalysis}
                    disabled={!allDone || !analysisData}
                    className={`w-full mt-6 py-3.5 rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 ${allDone && analysisData
                        ? "bg-[#1B2F6E] text-white hover:bg-[#12235A] shadow-md hover:shadow-lg"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                >
                    Generate Credit Assessment
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  STEP 3 — Analyzing Your Data                                     */
/* ═══════════════════════════════════════════════════════════════════ */
const StepAnalyzing = ({ onComplete }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const totalSteps = ANALYSIS_STEPS.length;
        const perStep = 100 / totalSteps;
        let currentStep = 0;
        let currentPercent = 0;

        const interval = setInterval(() => {
            currentPercent += 2;
            setPercent(Math.min(currentPercent, 100));

            const expectedStep = Math.floor(currentPercent / perStep);
            if (expectedStep !== currentStep && expectedStep < totalSteps) {
                currentStep = expectedStep;
                setActiveIndex(expectedStep);
            }

            if (currentPercent >= 100) {
                clearInterval(interval);
                setTimeout(() => onComplete(), 800);
            }
        }, 80);

        return () => clearInterval(interval);
    }, [onComplete]);

    // SVG circle math
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
            <div className="w-full max-w-md text-center">
                {/* Circular Progress */}
                <div className="relative mx-auto w-40 h-40 mb-8">
                    <svg className="w-40 h-40 -rotate-90" viewBox="0 0 160 160">
                        <circle cx="80" cy="80" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="8" />
                        <circle
                            cx="80" cy="80" r={radius} fill="none"
                            stroke="#1B2F6E" strokeWidth="8" strokeLinecap="round"
                            strokeDasharray={circumference} strokeDashoffset={offset}
                            className="transition-all duration-200"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-extrabold text-[#1B2F6E]">{percent}%</span>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">Analyzing Your Data</h2>
                <p className="text-gray-500 mb-10">Please wait while we process your bank statements.</p>

                {/* Steps */}
                <div className="flex flex-col gap-3 text-left">
                    {ANALYSIS_STEPS.map((step, i) => {
                        const isDone = i < activeIndex;
                        const isActive = i === activeIndex;
                        const isPending = i > activeIndex;

                        return (
                            <div
                                key={step.title}
                                className={`flex items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-300 ${isActive
                                    ? "bg-blue-50 border-[#1B2F6E] shadow-sm"
                                    : isDone
                                        ? "bg-white border-gray-100"
                                        : "bg-white border-gray-100 opacity-40"
                                    }`}
                            >
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isActive || isDone ? "bg-[#1B2F6E] text-white" : "bg-gray-100 text-gray-400"
                                    }`}>
                                    {step.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`font-bold text-sm ${isPending ? "text-gray-400" : "text-gray-900"}`}>{step.title}</p>
                                    <p className={`text-xs ${isPending ? "text-gray-300" : "text-gray-500"}`}>{step.subtitle}</p>
                                </div>
                                {isDone && (
                                    <svg className="w-5 h-5 text-[#1B2F6E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  Shared Field                                                      */
/* ═══════════════════════════════════════════════════════════════════ */
const Field = ({ label, prefix, ...props }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-gray-700 text-sm font-semibold">{label}</label>
        <div className={prefix ? "relative" : ""}>
            {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{prefix}</span>}
            <input
                {...props}
                className={`w-full border border-gray-200 rounded-lg ${prefix ? "pl-8" : "px-4"} pr-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2F6E] focus:border-transparent transition`}
            />
        </div>
    </div>
);

/* ═══════════════════════════════════════════════════════════════════ */
/*  RegisterPage — Wizard                                             */
/* ═══════════════════════════════════════════════════════════════════ */
const RegisterPage = () => {
    const [searchParams] = useSearchParams();
    const initialStep = searchParams.get("step") ? parseInt(searchParams.get("step")) : 1;
    const [step, setStep] = useState(initialStep);
    const navigate = useNavigate();

    if (step === 1) return <StepBusinessProfile onContinue={() => setStep(2)} />;
    if (step === 2) return <StepUpload onBeginAnalysis={() => setStep(3)} />;
    if (step === 3) return <StepAnalyzing onComplete={() => navigate("/dashboard")} />;

    return null;
};

export default RegisterPage;
