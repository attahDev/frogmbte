/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, ChevronRight, ArrowLeft, Send, Loader2 } from "lucide-react";
import { api } from "./lib/api"; // adjust path if your api file is elsewhere

type UserType = "Student" | "Mentor" | "Partner" | null;
type Message = {
  from: "bot" | "user";
  text: string;
};

const CHAT_SESSION_KEY = "gmbte_chat_session_id";

const visitorTypeMap = {
  Student: "STUDENT",
  Mentor: "MENTOR",
  Partner: "PARTNER",
} as const;

export const BotComp = () => {
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi, welcome to GMBTE. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const quickReplies = {
    Student: ["Find opportunities", "Get a mentor", "Explore toolkits"],
    Mentor: ["How to become a mentor", "Mentor dashboard", "Support students"],
    Partner: ["Partner with GMBTE", "Sponsor a program", "Contact team"],
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSelectType = (type: UserType) => {
    setUserType(type);
    setMessages([
      {
        from: "bot",
        text: `Great! You selected ${type}. What would you like to do?`,
      },
    ]);
  };

  const handleSend = async (text?: string) => {
  const messageText = text || input;
  if (!messageText.trim() || loading) return;

  setInput("");
  setLoading(true);

  setMessages((prev) => [...prev, { from: "user", text: messageText }]);

  const sendToBackend = async (sessionId?: string | null) => {
    return api.post("/chatbot/message", {
      sessionId: sessionId || undefined,
      visitorType: userType ? visitorTypeMap[userType] : "UNKNOWN",
      message: messageText,
    });
  };

  try {
    const savedSessionId = localStorage.getItem(CHAT_SESSION_KEY);

    let response;

    try {
      response = await sendToBackend(savedSessionId);
    } catch (err: any) {
      const backendMessage = err?.response?.data?.message;

      if (backendMessage === "Chat session not found") {
        localStorage.removeItem(CHAT_SESSION_KEY);
        response = await sendToBackend(undefined);
      } else {
        throw err;
      }
    }

    const data = response.data;

    if (!data?.success) {
      throw new Error(data?.message || "Failed to get response.");
    }

    const newSessionId = data?.data?.sessionId;
    const answer = data?.data?.answer;

    if (newSessionId) {
      localStorage.setItem(CHAT_SESSION_KEY, newSessionId);
    }

    setMessages((prev) => [
      ...prev,
      {
        from: "bot",
        text: answer || "Sorry, I could not generate a response.",
      },
    ]);
  } catch (error: any) {
    console.log("CHATBOT ERROR:", error);

    setMessages((prev) => [
      ...prev,
      {
        from: "bot",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Sorry, something went wrong. Please try again.",
      },
    ]);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-[9999] flex h-[520px] w-[360px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between bg-[#FFD700] px-5 py-4">
              <div className="flex items-center gap-3">
                {userType && (
                  <button onClick={() => setUserType(null)}>
                    <ArrowLeft className="h-5 w-5 text-[#00264D]" />
                  </button>
                )}

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                  <Bot className="h-7 w-7 text-[#00264D]" />
                </div>

                <div>
                  <h2 className="text-[16px] font-bold text-[#001F3F]">
                    GMBTE Assistant
                  </h2>
                  <p className="text-sm text-[#5C5C00]">Here to help!</p>
                </div>
              </div>

              <button onClick={() => setOpen(false)}>
                <X className="h-6 w-6 text-[#00264D]" />
              </button>
            </div>

            {!userType ? (
              <div className="p-6">
                <h3 className="mb-6 text-[16px] text-[#001F3F]">
                  How can I help you today?
                </h3>

                <div className="space-y-4">
                  {["Student", "Mentor", "Partner"].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSelectType(item as UserType)}
                      className="flex w-full items-center justify-between rounded-[22px] bg-[#00264D] px-6 py-5 text-left text-[16px] text-white transition hover:scale-[1.02]"
                    >
                      <span>I'm a {item}</span>
                      <ChevronRight className="h-7 w-7" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto p-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                        msg.from === "bot"
                          ? "bg-[#F3F4F6] text-[#001F3F]"
                          : "ml-auto bg-[#00264D] text-white"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}

                  {loading && (
                    <div className="max-w-[80%] rounded-2xl bg-[#F3F4F6] px-4 py-3 text-sm text-[#001F3F]">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Thinking...
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {quickReplies[userType]?.map((reply) => (
                      <button
                        key={reply}
                        onClick={() => handleSend(reply)}
                        disabled={loading}
                        className="rounded-full border border-[#00264D] px-3 py-2 text-xs text-[#00264D] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>

                  <div ref={bottomRef} />
                </div>

                <div className="flex items-center gap-2 border-t p-3">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your message..."
                    disabled={loading}
                    className="flex-1 rounded-full border px-4 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                  />

                  <button
                    onClick={() => handleSend()}
                    disabled={loading || !input.trim()}
                    className="rounded-full bg-[#00264D] p-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] rounded-full bg-[#FFD700] p-4 shadow-md"
      >
        <Bot className="h-[45px] w-[45px] text-black" />
      </motion.button>
    </>
  );
};