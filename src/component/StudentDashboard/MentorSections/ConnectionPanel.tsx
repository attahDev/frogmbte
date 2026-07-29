import { useState } from "react";
import ChatPanel from "./ChatPanel";
import SessionsPanel from "./SessionsPanel";

export default function ConnectionPanel({
  connectionId,
  otherPartyName,
  otherPartySubtitle,
  viewerRole,
  initialTab = "chat",
  onBack,
}: {
  connectionId: string;
  otherPartyName: string;
  otherPartySubtitle?: string;
  viewerRole: "mentee" | "mentor";
  initialTab?: "chat" | "sessions";
  onBack?: () => void;
}) {
  const [tab, setTab] = useState<"chat" | "sessions">(initialTab);

  return (
    <div>
      <div className="mb-2 flex gap-1 rounded-xl bg-gray-100 p-1">
        <button
          onClick={() => setTab("chat")}
          className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition ${
            tab === "chat" ? "bg-white text-[#001F3F] shadow-sm" : "text-gray-500"
          }`}
        >
          Chat
        </button>
        <button
          onClick={() => setTab("sessions")}
          className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition ${
            tab === "sessions" ? "bg-white text-[#001F3F] shadow-sm" : "text-gray-500"
          }`}
        >
          Sessions
        </button>
      </div>

      {tab === "chat" ? (
        <ChatPanel
          connectionId={connectionId}
          otherPartyName={otherPartyName}
          otherPartySubtitle={otherPartySubtitle}
          viewerRole={viewerRole}
          onBack={onBack}
        />
      ) : (
        <SessionsPanel
          connectionId={connectionId}
          otherPartyName={otherPartyName}
          otherPartySubtitle={otherPartySubtitle}
          viewerRole={viewerRole}
          onBack={onBack}
        />
      )}
    </div>
  );
}
