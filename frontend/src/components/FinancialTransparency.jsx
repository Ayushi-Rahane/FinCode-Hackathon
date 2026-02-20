import React from "react";

const pillars = [
    {
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
            </svg>
        ),
        title: "100% Explainable",
        subtitle: "Every score factor is transparent",
    },
    {
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
            </svg>
        ),
        title: "Bank-Grade Security",
        subtitle: "Your data is encrypted end-to-end",
    },
    {
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
            </svg>
        ),
        title: "Data-Driven",
        subtitle: "Cash flow analysis, not guesswork",
    },
];

const FinancialTransparency = () => {
    return (
        <>
            {/* ── Dark Navy Section ── */}
            <section className="bg-[#1B2F6E] py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Built for Financial Transparency
                    </h2>
                    <p className="text-blue-200 text-lg leading-relaxed max-w-2xl mx-auto mb-16">
                        Our platform was designed with the belief that every small business deserves access to
                        fair, transparent, and explainable credit assessment. We use actual cash flow data — not
                        proxies — to build a complete picture of financial health.
                    </p>

                    {/* Pillars */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                        {pillars.map(({ icon, title, subtitle }) => (
                            <div key={title} className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                    {icon}
                                </div>
                                <h3 className="text-white font-bold text-lg">{title}</h3>
                                <p className="text-blue-300 text-sm">{subtitle}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="bg-white border-t border-gray-100 px-6 py-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#1B2F6E] rounded-lg flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                                <rect x="2" y="12" width="4" height="10" rx="1" fill="white" />
                                <rect x="8" y="7" width="4" height="15" rx="1" fill="white" />
                                <rect x="14" y="3" width="4" height="19" rx="1" fill="white" />
                                <rect x="20" y="8" width="2" height="14" rx="1" fill="#93C5FD" />
                            </svg>
                        </div>
                        <span className="text-[#1B2F6E] font-extrabold text-lg tracking-tight">Credalytix</span>
                    </div>

                    {/* Copyright */}
                    <p className="text-gray-400 text-sm">
                        © 2026 Credalytix. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    );
};

export default FinancialTransparency;
