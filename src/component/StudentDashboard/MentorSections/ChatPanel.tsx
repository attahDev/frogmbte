import { useEffect, useRef, useState } from "react";
import { Send, ChevronLeft, Award, Check, Plus } from "lucide-react";
import CardSkeleton from "../shared/CardSkeleton";
import { Card } from "./mentorsDashboard";
import { useAuth } from "../../../contexts/mainuseAuth";
import {
  fetchMenteeMessages,
  sendMenteeMessage,
  fetchSkillLogs,
  logSkill,
  confirmSkillLog,
  type MenteeMessage,
  type SkillLog,
} from "../../../lib/mentorsApi";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

/**
 * Chat panel for a single mentor<->mentee connection. Works from either side
 * (mentee viewing "My Mentors" or mentor viewing "My Mentees") — the backend's
 * assertConnectionMember() allows either party on the connection to read/send.
 */
export default function ChatPanel({
  connectionId,
  otherPartyName,
  otherPartySubtitle,
  viewerRole,
  onBack,
}: {
  connectionId: string;
  otherPartyName: string;
  otherPartySubtitle?: string;
  /** Whether the person viewing this panel is the mentee or the mentor on
   *  the connection — controls whether they can log a skill vs. confirm one. */
  viewerRole: "mentee" | "mentor";
  onBack?: () => void;
}) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<MenteeMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [skills, setSkills] = useState<SkillLog[]>([]);
  const [skillDraft, setSkillDraft] = useState("");
  const [loggingSkill, setLoggingSkill] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSkillLogs(connectionId)
      .then(setSkills)
      .catch(() => setSkills([]));
  }, [connectionId]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(false);
    fetchMenteeMessages(connectionId)
      .then((data) => !cancelled && setMessages(data))
      .catch(() => {
        if (!cancelled) {
          setMessages([]);
          setLoadError(true);
        }
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [connectionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const content = draft.trim();
    if (!content || sending) return;
    setSending(true);
    setDraft("");
    try {
      const message = await sendMenteeMessage(connectionId, content);
      setMessages((prev) => [...prev, message]);
    } catch {
      setDraft(content); // restore on failure so the message isn't lost
    } finally {
      setSending(false);
    }
  };

  const handleLogSkill = async () => {
    const skillName = skillDraft.trim();
    if (!skillName || loggingSkill) return;
    setLoggingSkill(true);
    try {
      const created = await logSkill(connectionId, skillName);
      setSkills((prev) => [created, ...prev]);
      setSkillDraft("");
      setShowSkillForm(false);
    } catch {
      // leave the draft in place so the mentee can retry
    } finally {
      setLoggingSkill(false);
    }
  };

  const handleConfirmSkill = async (skillLogId: string) => {
    setSkills((prev) => prev.map((s) => (s.id === skillLogId ? { ...s, confirmedByMentor: true } : s)));
    try {
      await confirmSkillLog(skillLogId);
    } catch {
      setSkills((prev) => prev.map((s) => (s.id === skillLogId ? { ...s, confirmedByMentor: false } : s)));
    }
  };

  return (
    <Card className="flex h-[520px] flex-col">
      <div className="flex items-center gap-3 border-b border-gray-100 p-4">
        {onBack && (
          <button onClick={onBack} className="rounded-lg p-1 hover:bg-gray-100 lg:hidden" aria-label="Back">
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          </button>
        )}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
          {initials(otherPartyName)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#001F3F]">{otherPartyName}</p>
          {otherPartySubtitle && <p className="truncate text-xs text-gray-500">{otherPartySubtitle}</p>}
        </div>
      </div>

      <div className="border-b border-gray-100 px-4 py-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
            <Award className="h-3.5 w-3.5" /> Skills logged
          </p>
          {viewerRole === "mentee" && (
            <button
              onClick={() => setShowSkillForm((v) => !v)}
              className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              <Plus className="h-3.5 w-3.5" /> Log a skill
            </button>
          )}
        </div>

        {showSkillForm && viewerRole === "mentee" && (
          <div className="mb-2 flex items-center gap-2">
            <input
              value={skillDraft}
              onChange={(e) => setSkillDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleLogSkill())}
              placeholder="e.g. React Query, Public speaking…"
              autoFocus
              className="flex-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleLogSkill}
              disabled={!skillDraft.trim() || loggingSkill}
              className="rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        )}

        {skills.length === 0 ? (
          <p className="text-xs text-gray-400">
            {viewerRole === "mentee"
              ? "Nothing logged yet — add a skill after your next session."
              : "Your mentee hasn't logged any skills yet."}
          </p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span
                key={s.id}
                className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs ${
                  s.confirmedByMentor
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-yellow-200 bg-yellow-50 text-gray-700"
                }`}
              >
                {s.skillName}
                {s.confirmedByMentor && <Check className="h-3 w-3" />}
                {!s.confirmedByMentor && viewerRole === "mentor" && (
                  <button
                    onClick={() => handleConfirmSkill(s.id)}
                    className="ml-1 rounded bg-white px-1.5 py-0.5 text-[10px] font-medium text-blue-600 hover:bg-blue-50"
                  >
                    Confirm
                  </button>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {loading ? (
          <CardSkeleton />
        ) : loadError ? (
          <p className="mt-8 text-center text-sm text-red-400">Couldn't load messages. Try reopening the chat.</p>
        ) : messages.length === 0 ? (
          <p className="mt-8 text-center text-sm text-gray-400">No messages yet — say hi to get things started.</p>
        ) : (
          messages.map((m) => {
            const isMe = m.senderId === user?.id;
            return (
              <div key={m.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                    isMe ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{m.content}</p>
                  <p className={`mt-1 text-[10px] ${isMe ? "text-blue-100" : "text-gray-400"}`}>
                    {new Date(m.createdAt).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-gray-100 p-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
          placeholder="Write a message…"
          className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          disabled={!draft.trim() || sending}
          className="rounded-xl bg-blue-600 p-2.5 text-white transition hover:bg-blue-700 disabled:opacity-50"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
}
