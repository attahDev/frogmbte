"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { askGreenAdvisor, fetchGreenAdvice, type AdvisorCard } from "../../../../../lib/greenAdvisorApi";

function AdvisorCardView({ title, description, variant, badge }: AdvisorCard) {
    const styles = {
        danger:
            "border-2 border-[#FFC9C9] bg-[#FEF2F2]",
        info:
            "border-2 border-[#BEDBFF] bg-[#EFF6FF]",
        neutral:
            "border-2 border-[#E5E7EB] bg-[#FFFFFF]",
    };

    return (
        <div className={`rounded-[12px] px-4 py-4 ${styles[variant]}`}>
            <div className="flex items-start justify-between gap-3">
                <h3 className="min-w-0 flex-1 text-base font-semibold leading-[1.2] text-[#0B2B50] sm:text-[17px]">
                    {title}
                </h3>

                {badge && (
                    <span className="shrink-0 rounded-[999px] bg-[#FDD5D5] px-2.5 py-1 text-[11px] font-medium text-[#DC2138] sm:px-3 sm:text-[12px]">
                        {badge}
                    </span>
                )}
            </div>

            <p className="mt-3 text-[14px] leading-[1.6] text-[#4B5563]">
                {description}
            </p>
        </div>
    );
}

function AdvisorCardSkeleton() {
    return <div className="h-[110px] animate-pulse rounded-[12px] bg-slate-100" />;
}

type QaTurn = { question: string; answer?: string; error?: string };

export default function AIGreenAdvisor() {
    const [cards, setCards] = useState<AdvisorCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [question, setQuestion] = useState("");
    const [asking, setAsking] = useState(false);
    const [turns, setTurns] = useState<QaTurn[]>([]);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let cancelled = false;

        fetchGreenAdvice()
            .then((data) => {
                if (!cancelled) setCards(data);
            })
            .catch(() => {
                if (!cancelled) setError("Couldn't load your advisor tips right now.");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [turns, asking]);

    const handleAsk = async () => {
        const q = question.trim();
        if (!q || asking) return;

        setQuestion("");
        setAsking(true);
        setTurns((prev) => [...prev, { question: q }]);

        try {
            const answer = await askGreenAdvisor(q);
            setTurns((prev) =>
                prev.map((t, i) => (i === prev.length - 1 ? { ...t, answer } : t))
            );
        } catch (err: any) {
            const message =
                err?.response?.data?.message || "Couldn't get an answer right now — try again.";
            setTurns((prev) =>
                prev.map((t, i) => (i === prev.length - 1 ? { ...t, error: message } : t))
            );
        } finally {
            setAsking(false);
        }
    };

    return (
        <section className="rounded-[14px] border-2 border-[#FFF085] bg-gradient-to-r from-[#FEFCE8] to-[#FFFBEB] p-4 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10),0px_1px_3px_0px_rgba(0,0,0,0.10)] sm:p-5 lg:p-[26px]">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD700]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1112 6.889V3.55566H6.77783" stroke="#001F3F" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.111 6.88892H5.111C4.19053 6.88892 3.44434 7.63511 3.44434 8.55558V15.2222C3.44434 16.1427 4.19053 16.8889 5.111 16.8889H15.111C16.0315 16.8889 16.7777 16.1427 16.7777 15.2222V8.55558C16.7777 7.63511 16.0315 6.88892 15.111 6.88892Z" stroke="#001F3F" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1.77783 11.8889H3.4445" stroke="#001F3F" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16.7778 11.8889H18.4445" stroke="#001F3F" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.6111 11.0557V12.7223" stroke="#001F3F" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7.61108 11.0557V12.7223" stroke="#001F3F" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <div>
                    <h2 className="text-[20px] font-semibold leading-[1.15] text-[#0B2B50]">
                        AI Green Advisor
                    </h2>
                    <p className="mt-1 text-[14px] text-[#6B7280]">
                        Personalized sustainability insights
                    </p>
                </div>
            </div>

            <div className="mt-6 space-y-4">
                {loading ? (
                    <>
                        <AdvisorCardSkeleton />
                        <AdvisorCardSkeleton />
                        <AdvisorCardSkeleton />
                    </>
                ) : error ? (
                    <p className="text-sm text-[#6B7280]">{error}</p>
                ) : (
                    cards.map((card, i) => <AdvisorCardView key={i} {...card} />)
                )}
            </div>

            {/* Ask the advisor */}
            <div className="mt-6 border-t border-[#F0DE9A] pt-4">
                <p className="mb-2 text-[13px] font-semibold text-[#0B2B50]">
                    Ask your advisor
                </p>

                {turns.length > 0 && (
                    <div className="mb-3 max-h-[280px] space-y-3 overflow-y-auto pr-1">
                        {turns.map((t, i) => (
                            <div key={i} className="space-y-1.5">
                                <p className="rounded-[10px] bg-[#001F3F] px-3 py-2 text-[13px] font-medium text-white">
                                    {t.question}
                                </p>
                                {t.answer && (
                                    <p className="rounded-[10px] bg-white px-3 py-2 text-[13px] leading-[1.6] text-[#374151]">
                                        {t.answer}
                                    </p>
                                )}
                                {t.error && (
                                    <p className="rounded-[10px] bg-white px-3 py-2 text-[13px] text-red-500">
                                        {t.error}
                                    </p>
                                )}
                            </div>
                        ))}
                        {asking && (
                            <div className="flex items-center gap-2 rounded-[10px] bg-white px-3 py-2 text-[13px] text-[#6B7280]">
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                Thinking...
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <input
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAsk()}
                        disabled={asking}
                        placeholder="e.g. How much CO2 have I offset this month?"
                        className="h-10 min-w-0 flex-1 rounded-full border border-[#E5D580] bg-white px-3 text-[13px] outline-none placeholder:text-slate-400 focus:border-[#001F3F] disabled:bg-gray-100"
                    />
                    <button
                        type="button"
                        onClick={handleAsk}
                        disabled={asking || !question.trim()}
                        aria-label="Ask"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#001F3F] text-white transition disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {asking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </button>
                </div>
            </div>
        </section>
    );
}
