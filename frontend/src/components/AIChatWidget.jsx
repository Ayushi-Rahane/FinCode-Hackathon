import React, { useState, useRef, useEffect } from "react";

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Hi! I'm your **Credalytix Copilot** ✨\nAsk me anything about your financial data — scores, risks, loan recommendations, and more!",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const formatMessage = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br/>');
    };

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;

        const userMsg = { role: "user", content: trimmed };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const context = JSON.parse(localStorage.getItem("pdf_analysis") || "{}");

            const res = await fetch("http://localhost:5001/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: trimmed, context }),
            });

            const data = await res.json();

            if (data.reply) {
                setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: "Sorry, I couldn't process that. Please try again." },
                ]);
            }
        } catch (err) {
            console.error("Chat error:", err);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Oops! Something went wrong. Please check your connection and try again." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Don't show widget if user isn't logged in
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) return null;

    return (
        <>
            {/* ── Floating Bubble ── */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-[#1B2F6E] to-[#2A3F84] text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                    style={{ fontFamily: "IBM Plex Sans, sans-serif" }}
                >
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span className="text-sm">Copilot</span>
                </button>
            )}

            {/* ── Chat Panel ── */}
            {isOpen && (
                <div
                    className="fixed bottom-6 right-6 z-50 w-[400px] h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
                    style={{ fontFamily: "IBM Plex Sans, sans-serif" }}
                >
                    {/* Header */}
                    <div className="px-5 py-4 bg-gradient-to-r from-[#1B2F6E] to-[#2A3F84] flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                                    <rect x="2" y="12" width="4" height="10" rx="1" fill="white" />
                                    <rect x="8" y="7" width="4" height="15" rx="1" fill="white" />
                                    <rect x="14" y="3" width="4" height="19" rx="1" fill="white" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">Credalytix Copilot</h3>
                                <p className="text-blue-200 text-xs font-medium">AI Financial Assistant</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/70 hover:text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-gray-50/50">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                {msg.role === "assistant" && (
                                    <div className="w-7 h-7 bg-[#1B2F6E] rounded-lg flex items-center justify-center shrink-0 mr-2 mt-0.5">
                                        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                                            <rect x="2" y="12" width="4" height="10" rx="1" fill="white" />
                                            <rect x="8" y="7" width="4" height="15" rx="1" fill="white" />
                                            <rect x="14" y="3" width="4" height="19" rx="1" fill="white" />
                                        </svg>
                                    </div>
                                )}
                                <div
                                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === "user"
                                        ? "bg-[#1B2F6E] text-white rounded-br-md"
                                        : "bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-md"
                                        }`}
                                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                                />
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="w-7 h-7 bg-[#1B2F6E] rounded-lg flex items-center justify-center shrink-0 mr-2 mt-0.5">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                                        <rect x="2" y="12" width="4" height="10" rx="1" fill="white" />
                                        <rect x="8" y="7" width="4" height="15" rx="1" fill="white" />
                                        <rect x="14" y="3" width="4" height="19" rx="1" fill="white" />
                                    </svg>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                                    <div className="flex gap-1.5">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Bar */}
                    <div className="px-4 py-3 border-t border-gray-200 bg-white shrink-0">
                        <div className="flex items-center gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about your financial data..."
                                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2F6E] focus:border-transparent bg-gray-50"
                                disabled={isLoading}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={isLoading || !input.trim()}
                                className="w-10 h-10 bg-[#1B2F6E] text-white rounded-xl flex items-center justify-center hover:bg-[#12235A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChatWidget;
