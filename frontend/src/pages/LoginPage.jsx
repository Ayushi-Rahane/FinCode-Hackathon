import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5001/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to login");
            }

            // Save user to localStorage
            localStorage.setItem("user", JSON.stringify(data.user));

            // Navigate to dashboard
            navigate("/dashboard");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">

            {/* ── Left Panel ── */}
            <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#1B2F6E] px-16 py-14">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                            <rect x="2" y="12" width="4" height="10" rx="1" fill="white" />
                            <rect x="8" y="7" width="4" height="15" rx="1" fill="white" />
                            <rect x="14" y="3" width="4" height="19" rx="1" fill="white" />
                            <rect x="20" y="8" width="2" height="14" rx="1" fill="#93C5FD" />
                        </svg>
                    </div>
                    <span className="text-white font-extrabold text-2xl tracking-tight">Credalytix</span>
                </div>

                {/* Center Content */}
                <div>
                    <h1 className="text-white text-4xl font-bold leading-tight mb-6">
                        Secure Access to Your<br />
                        Financial Risk Dashboard
                    </h1>
                    <p className="text-blue-200 text-lg leading-relaxed max-w-sm">
                        Log in to view your credit score, run stress tests, and access actionable financial insights tailored for your SME.
                    </p>

                    {/* Stats row */}
                    <div className="flex gap-10 mt-12">
                        {[
                            { value: "742", label: "Avg. Credit Score" },
                            { value: "5 min", label: "Assessment Time" },
                            { value: "100%", label: "Explainable" },
                        ].map(({ value, label }) => (
                            <div key={label}>
                                <p className="text-white text-2xl font-extrabold">{value}</p>
                                <p className="text-blue-300 text-sm mt-0.5">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom note */}
                <p className="text-blue-300 text-sm">
                    © 2026 Credalytix. All rights reserved.
                </p>
            </div>

            {/* ── Right Panel ── */}
            <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-14">
                <div className="w-full max-w-md">

                    {/* Mobile logo */}
                    <div className="flex items-center gap-2 mb-10 lg:hidden">
                        <div className="w-9 h-9 bg-[#1B2F6E] rounded-lg flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                                <rect x="2" y="12" width="4" height="10" rx="1" fill="white" />
                                <rect x="8" y="7" width="4" height="15" rx="1" fill="white" />
                                <rect x="14" y="3" width="4" height="19" rx="1" fill="white" />
                            </svg>
                        </div>
                        <span className="text-[#1B2F6E] font-extrabold text-xl">Credalytix</span>
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-10 py-10">
                        <h2 className="text-gray-900 text-3xl font-bold mb-1">Welcome back</h2>
                        <p className="text-gray-500 text-base mb-8">Sign in to your account</p>

                        <form onSubmit={handleLogin} className="flex flex-col gap-5">
                            {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">{error}</div>}

                            {/* Email */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-gray-700 text-sm font-semibold" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2F6E] focus:border-transparent transition"
                                />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-gray-700 text-sm font-semibold" htmlFor="password">
                                        Password
                                    </label>
                                    <a href="#" className="text-[#1B2F6E] text-xs font-medium hover:underline">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-11 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2F6E] focus:border-transparent transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((p) => !p)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        aria-label="Toggle password visibility"
                                    >
                                        {showPassword ? (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember me */}
                            <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe((v) => !v)}
                                    className="w-4 h-4 rounded border-gray-300 accent-[#1B2F6E]"
                                />
                                <span className="text-gray-600 text-sm">Remember me for 30 days</span>
                            </label>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full text-white py-3 rounded-lg font-bold text-base transition-all duration-200 mt-1 flex justify-center items-center ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#1B2F6E] hover:bg-[#12235A] shadow-md hover:shadow-lg hover:-translate-y-0.5"}`}
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>

                        {/* Create Account */}
                        <p className="text-center text-gray-500 text-sm mt-7">
                            New User?{" "}
                            <Link to="/register" className="text-[#1B2F6E] font-semibold hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
