import React from "react";

const BusinessProfileHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>Business Profile – Apex Trading Co.</h1>
                <p className="text-gray-500 text-base">Comprehensive business identity and operational overview</p>
            </div>

        </div>
    );
};

export default BusinessProfileHeader;
