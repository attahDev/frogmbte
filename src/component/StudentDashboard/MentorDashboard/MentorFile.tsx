"use client";

import { ArrowRight, Bot, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api } from "../../../lib/api";

const quickPrompts = [
  "Help me choose the right career path",
  "What skills should I learn next?",
  "Build a roadmap for my growth",
  "How do I become more productive?",
  "Help me think clearly about my future",
];

const chips = ["Start a business", "Find a job", "Recommend a course", "Improve my CV"];

type ApiResponse = {
  reply: string;
  chatId: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function MentorAIAssistant() {
  const [hasStarted, setHasStarted] = useState(false);
  const [input, setInput] = useState("Help me choose a toolkit");
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [promptsOpen, setPromptsOpen] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, error]);

  const startChat = async (text: string) => {
    const cleanText = text.trim();
    if (!cleanText || loading) return;

    setHasStarted(true);
    setInput("");
    setError("");
    setLoading(true);
    setPromptsOpen(false);

    setMessages((prev) => [...prev, { role: "user", content: cleanText }]);

    try {
      const res = await api.post("/mentor-ai/chat", {
        message: cleanText,
        chatId,
      });

      const data: ApiResponse = res.data?.data ?? res.data;

      if (!data?.reply || !data?.chatId) {
        throw new Error("Invalid MentorAI response");
      }

      setChatId(data.chatId);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (err) {
      console.error("MENTOR AI ERROR:", err);
      setError("Unable to get MentorAI response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-full min-h-0 flex-col bg-[#FFFDF7] text-[#001F3F]">
      <header className="shrink-0 border-b border-[#001F3F33] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <h1 className="text-lg font-bold leading-tight text-[#001F3F] sm:text-xl lg:text-[25px]">
          MentorAI Assistant
        </h1>
        <p className="mt-1 text-xs leading-relaxed text-[#6B7280] sm:text-sm lg:mt-2">
          Get personalized guidance, insights, and recommendations to grow your career or business.
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Mobile: collapsible quick prompts */}
        <div className="shrink-0 border-b border-[#001F3F33] lg:hidden">
          <button
            type="button"
            onClick={() => setPromptsOpen((prev) => !prev)}
            className="flex w-full items-center justify-between px-4 py-3 text-left"
            aria-expanded={promptsOpen}
          >
            <span className="text-sm font-bold text-[#001F3F]">Quick Prompts</span>
            {promptsOpen ? (
              <ChevronUp size={18} className="text-[#6B7280]" />
            ) : (
              <ChevronDown size={18} className="text-[#6B7280]" />
            )}
          </button>

          {!promptsOpen && (
            <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => startChat(prompt)}
                  disabled={loading}
                  className="shrink-0 rounded-full border border-[#DADADA] bg-[#001F3F0D] px-3 py-2 text-xs font-medium text-[#001F3F] transition hover:border-[#09294A]/30 disabled:opacity-60"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {promptsOpen && (
            <div className="grid grid-cols-1 gap-2 px-4 pb-4 sm:grid-cols-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => startChat(prompt)}
                  disabled={loading}
                  className="min-h-[48px] rounded-[12px] border border-[#DADADA] bg-[#001F3F0D] px-3 py-2.5 text-left text-xs leading-[18px] text-[#001F3F] transition hover:border-[#09294A]/30 disabled:opacity-60 sm:text-[13px]"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop: sidebar prompts */}
        <aside className="hidden w-[248px] shrink-0 border-r border-[#001F3F73] px-6 py-6 lg:block">
          <h2 className="text-[20px] font-bold leading-[29px] tracking-[-0.3px]">
            Quick Prompts
          </h2>
          <div className="mt-4 flex flex-col gap-3">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => startChat(prompt)}
                disabled={loading}
                className="min-h-[72px] w-full rounded-[12px] border border-[#DADADA] bg-[#001F3F0D] px-4 py-3 text-left text-sm leading-[22px] text-[#001F3F] transition hover:border-[#09294A]/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {prompt}
              </button>
            ))}
          </div>
        </aside>

        {/* Chat panel */}
        <section className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div
            ref={messagesRef}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#F3F3F1]"
          >
            {!hasStarted ? (
              <div className="flex flex-col items-center justify-center px-4 py-8 text-center sm:px-6 sm:py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#001F3F0D] sm:h-20 sm:w-20">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFD700] sm:h-[72px] sm:w-[72px]">
                    <Bot size={28} strokeWidth={2.4} className="sm:h-8 sm:w-8" />
                  </div>
                </div>

                <h2 className="mt-4 text-lg font-bold text-[#001F3F] sm:mt-5 sm:text-xl lg:text-[25px]">
                  Hi, I&apos;m your MentorAI 👋
                </h2>

                <p className="mt-2 max-w-[520px] text-sm leading-relaxed text-[#6B7280]">
                  Ask me anything about your learning, career, or business journey.
                </p>

                <div className="mt-5 flex w-full max-w-[680px] flex-wrap justify-center gap-2 sm:mt-6 sm:gap-3">
                  {chips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => startChat(chip)}
                      disabled={loading}
                      className="min-h-[40px] rounded-full border border-[#001F3F26] bg-white px-3 py-2 text-xs text-[#09294A] disabled:opacity-60 sm:min-h-[43px] sm:px-4 sm:text-sm"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4 px-3 py-4 sm:space-y-5 sm:px-6 sm:py-6 lg:space-y-6 lg:px-8 lg:py-8">
                {messages.map((msg, index) => (
                  <div key={`${msg.role}-${index}`}>
                    {msg.role === "user" ? (
                      <div className="ml-auto w-fit max-w-[92%] rounded-[14px] bg-[#FFD400] px-3.5 py-2.5 text-left text-sm font-semibold leading-snug text-black sm:max-w-[430px] sm:px-5 sm:py-3 sm:text-base">
                        {msg.content}
                      </div>
                    ) : (
                      <div className="flex items-start gap-2.5 sm:gap-4">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#002A54] sm:h-11 sm:w-11">
                          <Bot size={18} className="text-[#FFD400] sm:h-5 sm:w-5" strokeWidth={2.2} />
                        </div>
                        <div className="min-w-0 max-w-[92%] rounded-[14px] bg-[#001F3F08] px-3.5 py-3 sm:max-w-[532px] sm:px-5 sm:py-4">
                          <p className="whitespace-pre-line break-words text-sm font-semibold leading-relaxed text-[#101828] sm:text-base">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex items-start gap-2.5 sm:gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#002A54] sm:h-11 sm:w-11">
                      <Bot size={18} className="text-[#FFD400]" strokeWidth={2.2} />
                    </div>
                    <div className="rounded-[14px] bg-[#001F3F08] px-3.5 py-3 sm:px-5 sm:py-4">
                      <p className="text-sm font-semibold text-[#101828] sm:text-base">
                        MentorAI is thinking...
                      </p>
                    </div>
                  </div>
                )}

                {error && !loading && (
                  <div className="flex items-start gap-2.5 sm:gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#002A54] sm:h-11 sm:w-11">
                      <Bot size={18} className="text-[#FFD400]" strokeWidth={2.2} />
                    </div>
                    <div className="max-w-[92%] rounded-[14px] border border-[#D7263D40] bg-[#D7263D08] px-3.5 py-3 sm:px-5 sm:py-4">
                      <p className="text-sm font-semibold text-[#D7263D] sm:text-[15px]">
                        {error}
                      </p>
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-[#001F3F33] bg-[#FBFAF7] px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-4 lg:px-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <input
                value={input}
                disabled={loading}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading) {
                    startChat(input);
                  }
                }}
                placeholder={loading ? "Please wait..." : "Ask MentorAI anything"}
                className="box-border min-h-[48px] min-w-0 flex-1 rounded-full border border-[#D5DCE4] bg-white px-4 text-base text-[#09294A] outline-none placeholder:text-[#697789] focus:border-[#001F3F]/30 disabled:opacity-60 sm:min-h-[52px] sm:text-sm"
              />
              <button
                type="button"
                onClick={() => startChat(input)}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#DD1F3B] text-white transition hover:bg-[#c91b35] disabled:cursor-not-allowed disabled:opacity-60 sm:h-[52px] sm:w-[52px]"
              >
                <ArrowRight size={22} strokeWidth={2} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
