import { useEffect, useState } from "react";
import { Calendar, Check, X, Clock, ChevronLeft } from "lucide-react";
import CardSkeleton from "../shared/CardSkeleton";
import { Card } from "./mentorsDashboard";
import {
  fetchSessions,
  requestSession,
  updateSession,
  type MentorSession,
  type SessionStatus,
} from "../../../lib/mentorsApi";

const statusStyles: Record<SessionStatus, string> = {
  PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
  SCHEDULED: "bg-blue-50 text-blue-700 border-blue-200",
  COMPLETED: "bg-green-50 text-green-700 border-green-200",
  CANCELLED: "bg-gray-100 text-gray-500 border-gray-200",
  NO_SHOW: "bg-red-50 text-red-600 border-red-200",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SessionsPanel({
  connectionId,
  otherPartyName,
  otherPartySubtitle,
  viewerRole,
  onBack,
}: {
  connectionId: string;
  otherPartyName: string;
  otherPartySubtitle?: string;
  viewerRole: "mentee" | "mentor";
  onBack?: () => void;
}) {
  const [sessions, setSessions] = useState<MentorSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [proposedFor, setProposedFor] = useState("");
  const [duration, setDuration] = useState(30);
  const [agenda, setAgenda] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setLoadError(false);
    fetchSessions(connectionId)
      .then(setSessions)
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  };

  useEffect(load, [connectionId]);

  const handleRequest = async () => {
    if (!proposedFor || submitting) return;
    setSubmitting(true);
    try {
      const created = await requestSession(connectionId, {
        proposedFor: new Date(proposedFor).toISOString(),
        durationMins: duration,
        agenda: agenda.trim() || undefined,
      });
      setSessions((prev) => [created, ...prev]);
      setShowForm(false);
      setProposedFor("");
      setAgenda("");
    } catch {
      // keep the form open so they can retry
    } finally {
      setSubmitting(false);
    }
  };

  const patch = async (sessionId: string, updates: Parameters<typeof updateSession>[1]) => {
    setBusyId(sessionId);
    try {
      const updated = await updateSession(sessionId, updates);
      setSessions((prev) => prev.map((s) => (s.id === sessionId ? updated : s)));
    } catch {
      // no-op — session list stays as-is, user can retry the action
    } finally {
      setBusyId(null);
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
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
          <Calendar className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#001F3F]">Sessions with {otherPartyName}</p>
          {otherPartySubtitle && <p className="truncate text-xs text-gray-500">{otherPartySubtitle}</p>}
        </div>
        {viewerRole === "mentee" && (
          <button
            onClick={() => setShowForm((v) => !v)}
            className="whitespace-nowrap rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
          >
            + Request time
          </button>
        )}
      </div>

      {showForm && viewerRole === "mentee" && (
        <div className="space-y-2 border-b border-gray-100 bg-gray-50/50 p-4">
          <div className="flex gap-2">
            <input
              type="datetime-local"
              value={proposedFor}
              onChange={(e) => setProposedFor(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
              <option value={60}>60 min</option>
            </select>
          </div>
          <input
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            placeholder="What would you like to cover? (optional)"
            className="w-full rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleRequest}
            disabled={!proposedFor || submitting}
            className="w-full rounded-lg bg-blue-600 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Send request
          </button>
        </div>
      )}

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {loading ? (
          <CardSkeleton />
        ) : loadError ? (
          <p className="mt-8 text-center text-sm text-red-400">Couldn't load sessions. Try again shortly.</p>
        ) : sessions.length === 0 ? (
          <p className="mt-8 text-center text-sm text-gray-400">
            {viewerRole === "mentee"
              ? "No sessions yet — request a time above to get started."
              : "No sessions requested yet."}
          </p>
        ) : (
          sessions.map((s) => {
            const isBusy = busyId === s.id;
            return (
              <div key={s.id} className="rounded-xl border border-gray-200 p-3">
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${statusStyles[s.status]}`}>
                    {s.status.replace("_", " ")}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {formatDate(s.scheduledFor ?? s.proposedFor)}
                    {s.durationMins ? ` · ${s.durationMins}m` : ""}
                  </span>
                </div>
                {s.agenda && <p className="mb-2 text-xs text-gray-600">{s.agenda}</p>}

                {/* Mentor confirming a pending request */}
                {s.status === "PENDING" && viewerRole === "mentor" && (
                  <div className="flex gap-2">
                    <button
                      disabled={isBusy}
                      onClick={() => patch(s.id, { status: "SCHEDULED", scheduledFor: s.proposedFor })}
                      className="flex items-center gap-1 rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                      <Check className="h-3 w-3" /> Confirm
                    </button>
                    <button
                      disabled={isBusy}
                      onClick={() => patch(s.id, { status: "CANCELLED" })}
                      className="flex items-center gap-1 rounded-lg border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <X className="h-3 w-3" /> Decline
                    </button>
                  </div>
                )}
                {s.status === "PENDING" && viewerRole === "mentee" && (
                  <p className="text-[11px] italic text-gray-400">Waiting on your mentor to confirm…</p>
                )}

                {/* Either side wraps up a scheduled session */}
                {s.status === "SCHEDULED" && (
                  <div className="flex gap-2">
                    <button
                      disabled={isBusy}
                      onClick={() => patch(s.id, { status: "COMPLETED" })}
                      className="flex items-center gap-1 rounded-lg bg-green-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50"
                    >
                      <Check className="h-3 w-3" /> Mark completed
                    </button>
                    <button
                      disabled={isBusy}
                      onClick={() => patch(s.id, { status: "NO_SHOW" })}
                      className="rounded-lg border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                    >
                      No-show
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}
