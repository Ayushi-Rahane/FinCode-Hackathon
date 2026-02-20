import React from "react";
import Navbar from "../components/Navbar";
import DashboardPreview from "../components/DashboardPreview";
import TrustBadges from "../components/TrustBadges";
import PlatformCapabilities from "../components/PlatformCapabilities";
import HowItWorks from "../components/HowItWorks";
import FinancialTransparency from "../components/FinancialTransparency";

/**
 * LandingPage
 * Assembles all landing page sections:
 *   1. Navbar
 *   2. Hero (left text + right dashboard preview side-by-side)
 *   3. TrustBadges
 */
const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white font-sans">
            {/* ── Navbar ── */}
            <Navbar />

            {/* ── Hero Section ── */}
            <section className="max-w-7xl mx-auto px-6 pt-16 pb-8">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Left: Text Content */}
                    <div className="flex-1">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#1B2F6E] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                            Cash-Flow Based Credit Intelligence
                        </div>

                        {/* H1 */}
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
                            Transparent Credit
                            <br />
                            Intelligence for SMEs
                        </h1>

                        {/* Description */}
                        <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
                            Move beyond traditional credit scoring. Our platform analyses your
                            actual cash flow patterns to provide explainable, fair, and
                            actionable credit assessments tailored for small and medium
                            enterprises.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex items-center gap-4 flex-wrap">
                            <button className="flex items-center gap-2 bg-[#1B2F6E] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#12235A] transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                                Start Assessment
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                            <button className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold text-sm hover:border-[#1B2F6E] hover:text-[#1B2F6E] transition-all duration-200">
                                Learn More
                            </button>
                        </div>

                        {/* ── Trust Badges ── */}
                        <TrustBadges />
                    </div>

                    {/* Right: Dashboard Preview */}
                    <div className="flex-[1.5] flex justify-center lg:justify-end">
                        <DashboardPreview />
                    </div>
                </div>
            </section>

            {/* ── Platform Capabilities ── */}
            <PlatformCapabilities />

            {/* ── How It Works ── */}
            <HowItWorks />

            {/* ── Built for Financial Transparency + Footer ── */}
            <FinancialTransparency />
        </div>
    );
};

export default LandingPage;
