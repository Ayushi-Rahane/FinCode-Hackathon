import React from "react";

const badges = [
    "Bank-grade security",
    "No credit bureau dependency",
    "Results in minutes",
];

const CircleCheckIcon = () => (
    <svg
        className="w-4 h-4 flex-shrink-0 text-[#1B2F6E]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <circle cx="12" cy="12" r="9" strokeWidth={2} />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.5 12.5l2.5 2.5 4-4.5"
        />
    </svg>
);

const TrustBadges = () => {
    return (
        <div className="flex flex-nowrap items-center gap-8 mt-10 pt-6 border-t border-gray-200 w-full">
            {badges.map((label) => (
                <div key={label} className="flex items-center gap-1.5 text-gray-600 text-sm whitespace-nowrap">
                    <CircleCheckIcon />
                    {label}
                </div>
            ))}
        </div>
    );
};

export default TrustBadges;

