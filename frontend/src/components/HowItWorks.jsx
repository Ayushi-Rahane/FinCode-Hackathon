import React from "react";

const steps = [
    {
        number: "01",
        title: "Set Up Profile",
        description: "Enter your business details and loan requirements.",
    },
    {
        number: "02",
        title: "Upload Statements",
        description: "Securely upload your bank statements for analysis.",
    },
    {
        number: "03",
        title: "Get Assessment",
        description: "Receive a comprehensive credit risk analysis within minutes.",
    },
    {
        number: "04",
        title: "Take Action",
        description: "Use insights to optimize your loan terms and financial health.",
    },
];

const HowItWorks = () => {
    return (
        <section className="bg-white py-20 px-6 border-b-4 border-[#1B2F6E]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                    <p className="text-gray-500 text-lg">
                        A streamlined four-step process from data submission to actionable credit insights.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {steps.map(({ number, title, description }) => (
                        <div key={number} className="flex flex-col gap-3">
                            <span className="text-5xl font-bold text-gray-400 leading-none select-none">
                                {number}
                            </span>
                            <h3 className="text-gray-900 font-bold text-lg mt-1">{title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
