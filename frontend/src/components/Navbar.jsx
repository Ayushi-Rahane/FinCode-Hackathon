import React, { useState } from "react";
import { Link } from "react-router-dom";

// Map nav labels to their destinations
const NAV_LINKS = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "About", href: "#about" },
    { label: "Login", to: "/login" },   // React Router route
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="w-full bg-white border-b border-gray-100 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-[#1B2F6E] rounded-lg flex items-center justify-center shadow-md">
                        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="12" width="4" height="10" rx="1" fill="white" />
                            <rect x="8" y="7" width="4" height="15" rx="1" fill="white" />
                            <rect x="14" y="3" width="4" height="19" rx="1" fill="white" />
                            <rect x="20" y="8" width="2" height="14" rx="1" fill="#93C5FD" />
                        </svg>
                    </div>
                    <span className="text-[#1B2F6E] font-extrabold text-xl tracking-tight">Credalytix</span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-2">
                    {NAV_LINKS.map(({ label, href, to }) =>
                        to ? (
                            <Link
                                key={label}
                                to={to}
                                className="text-gray-800 hover:text-white hover:bg-[#1B2F6E] font-semibold text-base px-4 py-2 rounded-lg transition-all duration-200"
                            >
                                {label}
                            </Link>
                        ) : (
                            <a
                                key={label}
                                href={href}
                                className="text-gray-800 hover:text-white hover:bg-[#1B2F6E] font-semibold text-base px-4 py-2 rounded-lg transition-all duration-200"
                            >
                                {label}
                            </a>
                        )
                    )}
                </div>

                {/* CTA — Dashboard */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        to="/login"
                        className="bg-[#1B2F6E] text-white px-5 py-2.5 rounded-lg text-base font-semibold hover:bg-[#12235A] transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                        Dashboard
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-gray-600 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden mt-3 pb-3 flex flex-col gap-3 border-t border-gray-100 pt-3">
                    {NAV_LINKS.map(({ label, href, to }) =>
                        to ? (
                            <Link
                                key={label}
                                to={to}
                                className="text-gray-700 hover:text-[#1B2F6E] font-semibold text-base px-2"
                                onClick={() => setMenuOpen(false)}
                            >
                                {label}
                            </Link>
                        ) : (
                            <a
                                key={label}
                                href={href}
                                className="text-gray-700 hover:text-[#1B2F6E] font-semibold text-base px-2"
                                onClick={() => setMenuOpen(false)}
                            >
                                {label}
                            </a>
                        )
                    )}
                    <Link
                        to="/login"
                        className="bg-[#1B2F6E] text-white px-5 py-2.5 rounded-lg text-sm font-semibold w-fit"
                        onClick={() => setMenuOpen(false)}
                    >
                        Dashboard
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
