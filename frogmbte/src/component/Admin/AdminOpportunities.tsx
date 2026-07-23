import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type OpportunityRow = {
  id: string;
  title: string;
  company: string;
  location: string | null;
  category: string | null;
  type: string | null;
  description: string | null;
  applyUrl: string | null;
  imageUrl: string | null;
  source: "MANUAL" | "API";
  provider: string | null;
  postedAt: string;
  isActive: boolean;
  isFeatured: boolean;
};

const EMPTY = {
  title: "",
  company: "",
  location: "",
  category: "",
  type: "",
  description: "",
  applyUrl: "",
  imageUrl: "",
  isFeatured: false,
};

const CATEGORY_SUGGESTIONS = ["Jobs", "Internships", "Grants", "Fellowships", "Scholarships", "Competitions"];

export default function AdminOpportunities() {
  const [opportunities, setOpportunities] = useState<OpportunityRow[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [syncQuery, setSyncQuery] = useState("sustainability");
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(EMPTY);

  const load = () => {
    setLoadError(false);
    api
      .get("/opportunities", { params: { includeInactive: "true" } })
      .then(({ data }) => setOpportunities(data?.data ?? data ?? []))
      .catch(() => {
        setLoadError(true);
        setOpportunities([]);
      });
  };

  useEffect(load, []);

  const create = async () => {
    if (!form.title || !form.company || !form.applyUrl) return;
    setSubmitting(true);
    try {
      await api.post("/opportunities", {
        title: form.title,
        company: form.company,
        location: form.location || undefined,
        category: form.category || undefined,
        type: form.type || undefined,
        description: form.description || undefined,
        applyUrl: form.applyUrl,
        imageUrl: form.imageUrl || undefined,
        isFeatured: form.isFeatured,
      });
      setForm(EMPTY);
      load();
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (op: OpportunityRow) => {
    setEditingId(op.id);
    setEditForm({
      title: op.title,
      company: op.company,
      location: op.location ?? "",
      category: op.category ?? "",
      type: op.type ?? "",
      description: op.description ?? "",
      applyUrl: op.applyUrl ?? "",
      imageUrl: op.imageUrl ?? "",
      isFeatured: op.isFeatured,
    });
  };

  const saveEdit = async (id: string) => {
    setSubmitting(true);
    try {
      await api.patch(`/opportunities/${id}`, {
        title: editForm.title,
        company: editForm.company,
        location: editForm.location,
        category: editForm.category,
        type: editForm.type,
        description: editForm.description,
        applyUrl: editForm.applyUrl,
        imageUrl: editForm.imageUrl,
        isFeatured: editForm.isFeatured,
      });
      setEditingId(null);
      load();
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (op: OpportunityRow) => {
    setSubmitting(true);
    try {
      if (op.isActive) {
        await api.delete(`/opportunities/${op.id}`); // soft-delete, backend never hard-deletes
      } else {
        await api.patch(`/opportunities/${op.id}`, { isActive: true });
      }
      load();
    } finally {
      setSubmitting(false);
    }
  };

  const runSync = async () => {
    setSyncing(true);
    setSyncMessage(null);
    try {
      const { data } = await api.post("/opportunities/sync", null, {
        params: { query: syncQuery || undefined },
      });
      if (data?.skipped === "missing_credentials") {
        setSyncMessage("Adzuna credentials aren't set on the backend yet (ADZUNA_APP_ID / ADZUNA_APP_KEY).");
      } else {
        setSyncMessage(`Synced ${data?.synced ?? 0} listings for "${data?.query ?? syncQuery}".`);
      }
      load();
    } catch {
      setSyncMessage("Sync failed — check the backend logs.");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Add an opportunity</h2>
        <p className="mt-1 text-xs text-gray-500">
          We're not a job board — every opportunity routes off-site to apply. Paste the company's own
          posting link, or a specific Indeed/LinkedIn listing URL, as the Apply link below.
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            placeholder="Company / organisation"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            placeholder="Location (blank = remote/unspecified)"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            list="opportunity-categories"
            placeholder="Category (e.g. Jobs, Grants, Internships)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <datalist id="opportunity-categories">
            {CATEGORY_SUGGESTIONS.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          <input
            placeholder="Type (e.g. Full-time, Internship, Grant)"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            placeholder="Image URL (optional)"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            placeholder="Apply URL (required — where 'Apply' sends the user)"
            value={form.applyUrl}
            onChange={(e) => setForm({ ...form, applyUrl: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
          />
          <textarea
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
          />
          <label className="flex items-center gap-2 text-xs text-gray-600 sm:col-span-2">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
            />
            Feature this opportunity (pins it first, ahead of most-recent sorting)
          </label>
        </div>

        <button
          onClick={create}
          disabled={submitting || !form.title || !form.company || !form.applyUrl}
          className="mt-3 rounded bg-[#001F3F] px-3 py-1.5 text-sm text-white disabled:opacity-50"
        >
          Add opportunity
        </button>
      </div>

      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Sync from Adzuna (API)</h2>
        <p className="mt-1 text-xs text-gray-500">
          Pulls listings server-side and adds them alongside manual entries, tagged "API" below.
          Indeed and LinkedIn don't offer a public self-serve search API — for those, add a manual
          entry above with the listing's own URL as the Apply link.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <input
            placeholder="Search keyword (e.g. sustainability, climate)"
            value={syncQuery}
            onChange={(e) => setSyncQuery(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <button
            onClick={runSync}
            disabled={syncing}
            className="rounded bg-[#001F3F] px-3 py-1.5 text-sm text-white disabled:opacity-50"
          >
            {syncing ? "Syncing…" : "Run sync now"}
          </button>
        </div>
        {syncMessage && <p className="mt-2 text-xs text-gray-600">{syncMessage}</p>}
      </div>

      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Opportunities</h2>

        {opportunities === null ? (
          <p className="mt-3 text-sm text-gray-500">Loading…</p>
        ) : loadError ? (
          <div className="mt-3 text-sm text-[#8A1F1F]">
            Couldn't load opportunities — the request failed.{" "}
            <button onClick={load} className="underline">
              Retry
            </button>
          </div>
        ) : opportunities.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">No opportunities yet.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {opportunities.map((op) =>
              editingId === op.id ? (
                <div key={op.id} className="rounded border border-[#001F3F] p-3">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      placeholder="Title"
                      className="rounded border border-gray-300 px-2 py-1 text-sm"
                    />
                    <input
                      value={editForm.company}
                      onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                      placeholder="Company"
                      className="rounded border border-gray-300 px-2 py-1 text-sm"
                    />
                    <input
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      placeholder="Location"
                      className="rounded border border-gray-300 px-2 py-1 text-sm"
                    />
                    <input
                      list="opportunity-categories"
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      placeholder="Category"
                      className="rounded border border-gray-300 px-2 py-1 text-sm"
                    />
                    <input
                      value={editForm.type}
                      onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                      placeholder="Type"
                      className="rounded border border-gray-300 px-2 py-1 text-sm"
                    />
                    <input
                      value={editForm.imageUrl}
                      onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                      placeholder="Image URL"
                      className="rounded border border-gray-300 px-2 py-1 text-sm"
                    />
                    <input
                      value={editForm.applyUrl}
                      onChange={(e) => setEditForm({ ...editForm, applyUrl: e.target.value })}
                      placeholder="Apply URL"
                      className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
                    />
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      placeholder="Description"
                      className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
                    />
                    <label className="flex items-center gap-2 text-xs text-gray-600 sm:col-span-2">
                      <input
                        type="checkbox"
                        checked={editForm.isFeatured}
                        onChange={(e) => setEditForm({ ...editForm, isFeatured: e.target.checked })}
                      />
                      Featured
                    </label>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => saveEdit(op.id)}
                      disabled={submitting}
                      className="rounded bg-[#001F3F] px-3 py-1.5 text-sm text-white disabled:opacity-50"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  key={op.id}
                  className={`flex flex-wrap items-center justify-between gap-2 rounded border border-gray-200 p-3 text-sm ${
                    !op.isActive ? "opacity-50" : ""
                  }`}
                >
                  <div>
                    <p className="font-medium text-[#001F3F]">
                      {op.title} — {op.company}{" "}
                      {op.isFeatured && <span className="text-xs text-[#D7263D]">★ Featured</span>}{" "}
                      <span
                        className={`text-xs ${op.source === "API" ? "text-blue-700" : "text-gray-500"}`}
                      >
                        {op.source === "API" ? `API · ${op.provider}` : "Manual"}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {op.category || "Uncategorised"} · {op.location || "Remote/unspecified"}
                      {!op.isActive && " · Removed"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(op)}
                      className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleActive(op)}
                      disabled={submitting}
                      className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-600 disabled:opacity-50"
                    >
                      {op.isActive ? "Remove" : "Restore"}
                    </button>
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
