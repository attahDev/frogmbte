import { useEffect, useMemo, useState } from "react";
import { Users, MessageCircle, Calendar } from "lucide-react";
import { useApiGet } from "../hooks/useApiGet";
import CardSkeleton from "../shared/CardSkeleton";
import EmptyState from "../../MarketResearchDashboard/ui/EmptyState";
import { Card, CardContent, Button } from "./mentorsDashboard";
import ConnectionPanel from "./ConnectionPanel";
import {
  updateMenteeConnection,
  type MenteeConnection,
  type MentorConnectionStatus,
} from "../../../lib/mentorsApi";

const STATUS_STYLES: Record<MentorConnectionStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  ACTIVE: "bg-green-100 text-green-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  DECLINED: "bg-red-100 text-red-700",
};

function initials(first: string, last: string) {
  return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase();
}

function formatDate(iso: string | null) {
  if (!iso) return "Not scheduled";
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

// ------------------------------------------------------------
// One mentee row — status control, sessions, next session, chat entry
// ------------------------------------------------------------
function MenteeRow({
  connection,
  onOpenPanel,
  onUpdated,
}: {
  connection: MenteeConnection;
  onOpenPanel: (tab: "chat" | "sessions") => void;
  onUpdated: (updated: MenteeConnection) => void;
}) {
  const [busy, setBusy] = useState(false);

  const setStatus = async (status: MentorConnectionStatus) => {
    setBusy(true);
    try {
      const updated = await updateMenteeConnection(connection.connectionId, { status });
      onUpdated({ ...connection, status: updated.status ?? status });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="p-4">
      <CardContent className="p-0">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
              {initials(connection.mentee.firstname, connection.mentee.lastname)}
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold text-[#001F3F]">
                {connection.mentee.firstname} {connection.mentee.lastname}
              </p>
              <p className="truncate text-xs text-gray-500">{connection.mentee.email}</p>
              {connection.mentee.organization && (
                <p className="truncate text-xs text-gray-400">{connection.mentee.organization}</p>
              )}
            </div>
          </div>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[connection.status]}`}>
            {connection.status}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-gray-500">
          <span>Sessions completed: <strong className="text-gray-700">{connection.sessionsCompleted}</strong></span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> Next: {formatDate(connection.nextSessionAt)}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={() => onOpenPanel("chat")} variant="outline">
            <MessageCircle className="h-4 w-4" /> Chat
          </Button>
          <Button onClick={() => onOpenPanel("sessions")} variant="outline">
            <Calendar className="h-4 w-4" /> Sessions
          </Button>
          {connection.status === "PENDING" && (
            <>
              <Button onClick={() => setStatus("ACTIVE")} disabled={busy}>
                Accept
              </Button>
              <Button onClick={() => setStatus("DECLINED")} disabled={busy} variant="danger">
                Decline
              </Button>
            </>
          )}
          {connection.status === "ACTIVE" && (
            <Button onClick={() => setStatus("COMPLETED")} disabled={busy} variant="outline">
              Mark complete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ------------------------------------------------------------
// Main "My Mentees" page
// ------------------------------------------------------------
export default function MyMentees() {
  const { data, loading, error, refetch } = useApiGet<MenteeConnection[]>("/mentors/my-mentees", []);
  const [localConnections, setLocalConnections] = useState<MenteeConnection[] | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [initialTab, setInitialTab] = useState<"chat" | "sessions">("chat");
  const [filter, setFilter] = useState<MentorConnectionStatus | "ALL">("ALL");

  useEffect(() => {
    if (data) setLocalConnections(data);
  }, [data]);

  const connections = localConnections ?? [];

  const filtered = useMemo(
    () => (filter === "ALL" ? connections : connections.filter((c) => c.status === filter)),
    [connections, filter],
  );

  const activeChat = connections.find((c) => c.connectionId === activeChatId) ?? null;

  const handleUpdated = (updated: MenteeConnection) => {
    setLocalConnections((prev) => (prev ?? []).map((c) => (c.connectionId === updated.connectionId ? updated : c)));
  };

  const counts = useMemo(() => {
    const base: Record<MentorConnectionStatus, number> = { PENDING: 0, ACTIVE: 0, COMPLETED: 0, DECLINED: 0 };
    connections.forEach((c) => (base[c.status] += 1));
    return base;
  }, [connections]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-blue-100 p-2">
          <Users className="h-6 w-6 text-blue-700" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001F3F]">My Mentees</h1>
          <p className="text-sm text-gray-500">Manage mentees, track progress, and keep the conversation going.</p>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {(["ALL", "PENDING", "ACTIVE", "COMPLETED", "DECLINED"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              filter === f
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {f === "ALL" ? `All (${connections.length})` : `${f} (${counts[f]})`}
          </button>
        ))}
      </div>

      {loading ? (
        <CardSkeleton />
      ) : error ? (
        <EmptyState
          title="Couldn't load your mentees"
          description={error}
          buttonText="Retry"
          onButtonClick={refetch}
        />
      ) : connections.length === 0 ? (
        <EmptyState
          title="No mentees yet"
          description="When a student connects with you from the mentor directory, they'll show up here."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-3">
            {filtered.length === 0 ? (
              <EmptyState title="Nothing here" description="No mentees match this filter." />
            ) : (
              filtered.map((c) => (
                <MenteeRow
                  key={c.connectionId}
                  connection={c}
                  onOpenPanel={(tab) => {
                    setInitialTab(tab);
                    setActiveChatId(c.connectionId);
                  }}
                  onUpdated={handleUpdated}
                />
              ))
            )}
          </div>

          <div className="lg:col-span-2">
            {activeChat ? (
              <ConnectionPanel
                connectionId={activeChat.connectionId}
                otherPartyName={`${activeChat.mentee.firstname} ${activeChat.mentee.lastname}`}
                otherPartySubtitle={activeChat.mentee.email}
                viewerRole="mentor"
                initialTab={initialTab}
                onBack={() => setActiveChatId(null)}
              />
            ) : (
              <Card className="flex h-[520px] items-center justify-center p-6 text-center">
                <div>
                  <MessageCircle className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                  <p className="text-sm text-gray-400">Select "Chat" on a mentee to open the conversation here.</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
