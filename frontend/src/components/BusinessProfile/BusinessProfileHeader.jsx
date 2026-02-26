import React from "react";

const BusinessProfileHeader = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const companyName = user.businessName || "Your Business";

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>Business Profile – {companyName}</h1>
                <p className="text-gray-500 text-base" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>View and manage your company's assessment details.</p>
            </div>

        </div>
    );
};

export default BusinessProfileHeader;
