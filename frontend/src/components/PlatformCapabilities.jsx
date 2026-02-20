import React from "react";

const capabilities = [
    {
        icon: (
            <svg className="w-5 h-5 text-[#1B2F6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
            </svg>
        ),
        title: "Explainable Scoring",
        description: "Transparent credit scores with full breakdown of contributing factors. No black-box models.",
        highlighted: false,
    },
    {
        icon: (
            <svg className="w-5 h-5 text-[#1B2F6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
            </svg>
        ),
        title: "Stress Testing",
        description: "Simulate adverse scenarios to understand how your business withstands revenue drops and expense spikes.",
        highlighted: false,
    },
    {
        icon: (
            <svg className="w-5 h-5 text-[#1B2F6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
        title: "Loan Optimization",
        description: "Get data-driven recommendations on optimal loan amounts and tenures for your cash flow profile.",
        highlighted: true,
    },
    {
        icon: (
            <svg className="w-5 h-5 text-[#1B2F6E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
            </svg>
        ),
        title: "Financial Advisory",
        description: "Actionable insights to strengthen your credit profile and improve financial health over time.",
        highlighted: false,
    },
];

const PlatformCapabilities = () => {
    return (
        <section className="bg-gray-50 py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Platform Capabilities
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        A comprehensive suite of analytical tools designed to provide transparent, data-driven
                        credit intelligence for SMEs.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {capabilities.map(({ icon, title, description, highlighted }) => (
                        <div
                            key={title}
                            className={`relative rounded-2xl border p-6 flex flex-col gap-4 transition-shadow hover:shadow-md
                                ${highlighted
                                    ? "bg-white border-blue-100 shadow-sm"
                                    : "bg-white border-gray-100"
                                }`}
                        >
                            {/* Icon */}
                            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                                {icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-gray-900 font-bold text-lg leading-snug">
                                {title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PlatformCapabilities;
