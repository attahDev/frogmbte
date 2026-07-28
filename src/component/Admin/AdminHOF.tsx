import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type Nomination = {
  id: string;
  nomineeName: string;
  category: string | null;
  story: string;
  status: string;
  createdAt: string;
  user: { firstname: string; lastname: string; email: string } | null;
};

type Tribute = {
  id: string;
  message: string;
  createdAt: string;
  user: { firstname: string; lastname: string };
};

export default function AdminHOF() {
  const [nominations, setNominations] = useState<Nomination[] | null>(null);
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [tributes, setTributes] = useState<Tribute[] | null>(null);

  const loadNominations = (status: string) => {
    api
      .get("/nominations/admin", { params: { status } })
      .then(({ data }) => setNominations(data?.data ?? data ?? []))
      .catch(() => setNominations([]));
  };

  const loadTributes = () => {
    api
      .get("/tributes")
      .then(({ data }) => setTributes(data?.data ?? data ?? []))
      .catch(() => setTributes([]));
  };

  useEffect(() => loadNominations(statusFilter), [statusFilter]);
  useEffect(loadTributes, []);

  const setNominationStatus = async (id: string, status: string) => {
    await api.patch(`/nominations/${id}/status`, { status });
    loadNominations(statusFilter);
  };

  const removeTribute = async (id: string) => {
    await api.delete(`/tributes/${id}/admin`);
    loadTributes();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-gray-300 bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#001F3F]">Nominations</h2>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          >
            <option value="PENDING">Pending review</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {nominations === null ? (
          <p className="mt-3 text-sm text-gray-500">Loading…</p>
        ) : nominations.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">Nothing in this status.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {nominations.map((n) => (
              <div key={n.id} className="rounded border border-gray-200 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#001F3F]">
                      {n.nomineeName}{" "}
                      {n.category && <span className="text-xs text-gray-400">· {n.category}</span>}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Submitted by {n.user ? `${n.user.firstname} ${n.user.lastname}` : "unknown"}{" "}
                      · {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {statusFilter === "PENDING" && (
                    <div className="flex shrink-0 gap-2">
                      <button
                        onClick={() => setNominationStatus(n.id, "APPROVED")}
                        className="rounded bg-green-600 px-2 py-1 text-xs text-white"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setNominationStatus(n.id, "REJECTED")}
                        className="rounded bg-red-600 px-2 py-1 text-xs text-white"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm text-gray-600">{n.story}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Tributes (shoutouts) — moderation</h2>
        <p className="mt-1 text-xs text-gray-400">
          Tributes go live immediately when posted — this is cleanup, not pre-approval.
        </p>

        {tributes === null ? (
          <p className="mt-3 text-sm text-gray-500">Loading…</p>
        ) : tributes.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">No tributes yet.</p>
        ) : (
          <div className="mt-3 space-y-2">
            {tributes.map((t) => (
              <div key={t.id} className="flex items-start justify-between gap-3 rounded border border-gray-200 p-3">
                <div>
                  <p className="text-xs font-semibold text-[#001F3F]">
                    {t.user.firstname} {t.user.lastname} ·{" "}
                    <span className="font-normal text-gray-400">
                      {new Date(t.createdAt).toLocaleString()}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-gray-600">{t.message}</p>
                </div>
                <button
                  onClick={() => removeTribute(t.id)}
                  className="shrink-0 rounded border border-red-300 px-2 py-1 text-xs text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
