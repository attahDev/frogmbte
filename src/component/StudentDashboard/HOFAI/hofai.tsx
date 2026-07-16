"use client";

import {
  ArrowUp,
  Bot,
  ChevronDown,
  ChevronUp,
  Loader2,
  Sparkles,
} from "lucide-react";
import {
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const API_URL =
  "https://olayimika01-hall-of-fame.hf.space/api/v1/chat";

const suggestions = [
  "Show me inductees in Technology",
  "Find Community Champions in Education",
  "Compare innovators from Manchester",
  "Tell me Erinma Bell's legacy story",
];

const chips = [
  "Technology Inductees",
  "Education Champions",
  "Manchester Innovators",
  "Erinma Bell's Legacy",
];

type ApiResponse = {
  answer?: string;
  response?: string;
  message?: string;
  result?: string;
  data?: {
    answer?: string;
    response?: string;
    message?: string;
  };
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function getResponseText(data: ApiResponse | string): string {
  if (typeof data === "string") {
    return data;
  }

  return (
    data.answer ||
    data.response ||
    data.message ||
    data.result ||
    data.data?.answer ||
    data.data?.response ||
    data.data?.message ||
    "I received a response, but I couldn't read its format."
  );
}

export default function MentorAiSection() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const hasStarted = messages.length > 0 || loading;

  /**
   * Scroll ONLY the messages container.
   *
   * Using scrollIntoView() here can sometimes scroll the entire page
   * and push the input area outside of the user's viewport.
   */
  useEffect(() => {
    const container = messagesRef.current;

    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [messages, loading, error]);

  const startChat = async (text: string) => {
    const cleanText = text.trim();

    if (!cleanText || loading) return;

    setInput("");
    setError("");
    setLoading(true);
    setSuggestionsOpen(false);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: cleanText,
      },
    ]);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: cleanText,
        }),
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`;

        try {
          if (contentType?.includes("application/json")) {
            const errorData = await response.json();

            errorMessage =
              errorData?.detail ||
              errorData?.message ||
              errorData?.error ||
              errorMessage;
          } else {
            const errorText = await response.text();

            if (errorText) {
              errorMessage = errorText;
            }
          }
        } catch {
          // Keep default error message
        }

        throw new Error(errorMessage);
      }

      let replyText = "";

      if (contentType?.includes("application/json")) {
        const data: ApiResponse = await response.json();
        replyText = getResponseText(data);
      } else {
        replyText = await response.text();
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: replyText,
        },
      ]);
    } catch (err) {
      console.error("Hall of Fame AI error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Hall of Fame AI is currently unavailable. Please try again.",
      );
    } finally {
      setLoading(false);

      requestAnimationFrame(() => {
        textareaRef.current?.focus();
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startChat(input);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();

      if (input.trim() && !loading) {
        startChat(input);
      }
    }
  };

  return (
    <main
      className="
        flex
        h-[calc(100dvh-97px)]
        min-h-[500px]
        w-full
        flex-col
        overflow-hidden
        bg-[#F8F4EA]
        text-[#17120F]
      "
    >
      {/* ==================================================
          HEADER
      ================================================== */}
      <header className="shrink-0 border-b border-[#BFB2A3]/40 bg-[#F8F4EA] px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
        <div className="mx-auto flex w-full max-w-[1500px] items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8DCC5]">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8C4B4]">
              <Bot
                size={18}
                className="text-[#D7263D]"
                strokeWidth={1.8}
              />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-[17px] font-bold leading-tight text-[#000D1C] sm:text-[19px]">
                Hall of Fame AI
              </h1>

              <span className="hidden rounded-full bg-[#D9B700]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#8A7100] sm:inline-flex">
                AI Guide
              </span>
            </div>

            <p className="mt-0.5 truncate text-[11px] text-[#8C837C] sm:text-xs">
              Discover the stories, achievements and legacy behind our
              Hall of Fame.
            </p>
          </div>
        </div>
      </header>

      {/* ==================================================
          MAIN CHAT AREA
      ================================================== */}
      <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1">
        {/* ==================================================
            DESKTOP SIDEBAR
        ================================================== */}
        <aside className="hidden w-[260px] shrink-0 border-r border-[#BFB2A3]/30 bg-[#F5EFE0]/50 p-5 lg:flex lg:flex-col">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles
                size={15}
                className="text-[#D9B700]"
              />

              <h2 className="text-[14px] font-bold text-[#000D1C]">
                Try asking
              </h2>
            </div>

            <p className="mt-1 text-[11px] leading-[18px] text-[#8C837C]">
              Not sure where to begin? Start with one of these
              questions.
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-2.5">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => startChat(suggestion)}
                disabled={loading}
                className="
                  group
                  w-full
                  rounded-xl
                  border
                  border-[#BFB2A3]/70
                  bg-white/70
                  px-3.5
                  py-3
                  text-left
                  text-[12px]
                  font-medium
                  leading-[18px]
                  text-[#514B46]
                  transition-all
                  duration-200
                  hover:-translate-y-[1px]
                  hover:border-[#D9B700]
                  hover:bg-white
                  hover:shadow-sm
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <span className="flex items-start justify-between gap-3">
                  {suggestion}

                  <ArrowUp
                    size={13}
                    className="
                      mt-0.5
                      shrink-0
                      rotate-45
                      text-[#A59D96]
                      transition
                      group-hover:text-[#D9B700]
                    "
                  />
                </span>
              </button>
            ))}
          </div>

          <div className="mt-auto rounded-xl border border-[#BFB2A3]/40 bg-[#FFFDF8] p-3.5">
            <p className="text-[11px] font-bold text-[#514B46]">
              Explore the archive
            </p>

            <p className="mt-1 text-[10px] leading-[16px] text-[#8C837C]">
              Ask about inductees, categories, locations, achievements
              and legacy stories.
            </p>
          </div>
        </aside>

        {/* ==================================================
            CHAT SECTION
        ================================================== */}
        <section className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#FCFAF6]">
          {/* ==================================================
              MOBILE SUGGESTIONS
          ================================================== */}
          {!hasStarted && (
            <div className="shrink-0 border-b border-[#BFB2A3]/30 bg-[#F8F4EA]/80 lg:hidden">
              <button
                type="button"
                onClick={() =>
                  setSuggestionsOpen((prev) => !prev)
                }
                className="flex w-full items-center justify-between px-4 py-2.5"
                aria-expanded={suggestionsOpen}
              >
                <span className="flex items-center gap-2 text-xs font-bold text-[#514B46]">
                  <Sparkles
                    size={14}
                    className="text-[#D9B700]"
                  />
                  Suggested questions
                </span>

                {suggestionsOpen ? (
                  <ChevronUp
                    size={16}
                    className="text-[#8C837C]"
                  />
                ) : (
                  <ChevronDown
                    size={16}
                    className="text-[#8C837C]"
                  />
                )}
              </button>

              {suggestionsOpen && (
                <div className="flex gap-2 overflow-x-auto px-4 pb-3">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => startChat(suggestion)}
                      disabled={loading}
                      className="
                        shrink-0
                        rounded-lg
                        border
                        border-[#BFB2A3]/60
                        bg-white
                        px-3
                        py-2
                        text-[11px]
                        font-medium
                        text-[#514B46]
                      "
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ==================================================
              SCROLLABLE MESSAGES AREA
          ================================================== */}
          <div
            ref={messagesRef}
            className="
              min-h-0
              flex-1
              overflow-y-auto
              overscroll-contain
              scroll-smooth
              px-4
              sm:px-6
              lg:px-8
            "
          >
            {!hasStarted ? (
              /* ==============================================
                  EMPTY / WELCOME STATE
              ============================================== */
              <div className="mx-auto flex h-full w-full max-w-[760px] flex-col items-center justify-center py-6 text-center sm:py-8">
                <div className="relative">
                  <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#E8DCC5]/70 sm:h-[78px] sm:w-[78px]">
                    <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#E8C4B4]/80 sm:h-[58px] sm:w-[58px]">
                      <Bot
                        size={27}
                        className="text-[#D7263D]"
                        strokeWidth={1.7}
                      />
                    </div>
                  </div>

                  <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#FCFAF6] bg-[#D9B700]">
                    <Sparkles
                      size={11}
                      className="text-white"
                    />
                  </div>
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#A18A20]">
                  Meet your archive guide
                </p>

                <h2 className="mt-2 text-[24px] font-bold leading-tight tracking-[-0.02em] text-[#000D1C] sm:text-[30px]">
                  What would you like to discover?
                </h2>

                <p className="mt-2 max-w-[540px] text-[13px] leading-[21px] text-[#8C837C] sm:text-[14px]">
                  Ask about Hall of Fame inductees, their achievements,
                  inspiring stories, communities and contributions to
                  Black excellence.
                </p>

                <div className="mt-5 flex max-w-[650px] flex-wrap justify-center gap-2">
                  {chips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => startChat(chip)}
                      disabled={loading}
                      className="
                        rounded-full
                        border
                        border-[#BFB2A3]/70
                        bg-white
                        px-3.5
                        py-2
                        text-[11px]
                        font-semibold
                        text-[#514B46]
                        shadow-[0_2px_10px_rgba(0,0,0,0.02)]
                        transition
                        hover:border-[#D9B700]
                        hover:bg-[#FFFDF5]
                        disabled:opacity-50
                        sm:text-xs
                      "
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* ==============================================
                  CONVERSATION
              ============================================== */
              <div className="mx-auto w-full max-w-[820px] space-y-5 py-6 sm:py-8">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className="w-full"
                  >
                    {message.role === "user" ? (
                      /* USER MESSAGE */
                      <div className="flex justify-end">
                        <div
                          className="
                            max-w-[85%]
                            rounded-[20px]
                            rounded-br-[6px]
                            bg-[#000D1C]
                            px-4
                            py-3
                            text-[13px]
                            font-medium
                            leading-[21px]
                            text-white
                            sm:max-w-[70%]
                            sm:px-5
                            sm:text-[14px]
                          "
                        >
                          {message.content}
                        </div>
                      </div>
                    ) : (
                      /* AI MESSAGE */
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8DCC5]">
                          <Bot
                            size={16}
                            className="text-[#D7263D]"
                            strokeWidth={2}
                          />
                        </div>

                        <div className="min-w-0 max-w-[90%] sm:max-w-[78%]">
                          <div className="mb-1.5 flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-[#514B46]">
                              Hall of Fame AI
                            </span>

                            <Sparkles
                              size={11}
                              className="text-[#D9B700]"
                            />
                          </div>

                          <div
                            className="
                              rounded-[20px]
                              rounded-tl-[6px]
                              border
                              border-[#DDD5CB]
                              bg-white
                              px-4
                              py-3.5
                              shadow-[0_4px_18px_rgba(0,13,28,0.03)]
                              sm:px-5
                              sm:py-4
                            "
                          >
                            <p className="whitespace-pre-wrap break-words text-[13px] leading-[22px] text-[#514B46] sm:text-[14px] sm:leading-[23px]">
                              {message.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* AI LOADING */}
                {loading && (
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8DCC5]">
                      <Bot
                        size={16}
                        className="text-[#D7263D]"
                      />
                    </div>

                    <div>
                      <p className="mb-1.5 text-[11px] font-bold text-[#514B46]">
                        Hall of Fame AI
                      </p>

                      <div className="flex items-center gap-2 rounded-[18px] rounded-tl-[6px] border border-[#DDD5CB] bg-white px-4 py-3">
                        <Loader2
                          size={15}
                          className="animate-spin text-[#D7263D]"
                        />

                        <span className="text-xs text-[#8C837C]">
                          Searching the archive...
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ERROR */}
                {error && !loading && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D7263D]/10">
                      <Bot
                        size={16}
                        className="text-[#D7263D]"
                      />
                    </div>

                    <div className="max-w-[85%] rounded-xl border border-[#D7263D]/20 bg-[#D7263D]/5 px-4 py-3">
                      <p className="text-xs font-bold text-[#B91C1C]">
                        I couldn't complete that request.
                      </p>

                      <p className="mt-1 text-[11px] leading-relaxed text-[#6B625C]">
                        {error}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ==================================================
              ALWAYS-VISIBLE CHAT COMPOSER
          ================================================== */}
          <div
            className="
              shrink-0
              border-t
              border-[#BFB2A3]/30
              bg-[#FCFAF6]/95
              px-3
              pb-[max(12px,env(safe-area-inset-bottom))]
              pt-3
              backdrop-blur-md
              sm:px-6
              sm:pb-4
              sm:pt-4
              lg:px-8
            "
          >
            <form
              onSubmit={handleSubmit}
              className="mx-auto w-full max-w-[820px]"
            >
              <div
                className="
                  flex
                  items-end
                  gap-2
                  rounded-[20px]
                  border
                  border-[#BFB2A3]
                  bg-white
                  p-2
                  pl-4
                  shadow-[0_6px_24px_rgba(0,13,28,0.06)]
                  transition-all
                  focus-within:border-[#D9B700]
                  focus-within:shadow-[0_6px_28px_rgba(217,183,0,0.10)]
                "
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  disabled={loading}
                  rows={1}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  placeholder={
                    loading
                      ? "Searching the Hall of Fame archive..."
                      : "Ask anything about the Hall of Fame..."
                  }
                  className="
                    max-h-[120px]
                    min-h-[42px]
                    min-w-0
                    flex-1
                    resize-none
                    bg-transparent
                    py-2.5
                    text-[16px]
                    leading-[22px]
                    text-[#17120F]
                    outline-none
                    placeholder:text-[#9A938D]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    sm:text-[14px]
                  "
                />

                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#D7263D]
                    text-white
                    transition-all
                    duration-200
                    hover:bg-[#BE1F35]
                    active:scale-95
                    disabled:cursor-not-allowed
                    disabled:bg-[#D8D2CC]
                    disabled:text-[#9E9892]
                  "
                >
                  {loading ? (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <ArrowUp
                      size={19}
                      strokeWidth={2.4}
                    />
                  )}
                </button>
              </div>

              <p className="mt-1.5 text-center text-[9px] leading-[14px] text-[#A39C96] sm:text-[10px]">
                Hall of Fame AI can help you explore inductees,
                achievements and legacy stories from the archive.
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
