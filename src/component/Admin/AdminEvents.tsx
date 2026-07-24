import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type EventRow = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  imageUrl: string | null;
  mode: string | null;
  link: string | null;
  tags: string[];
  startsAt: string;
  endsAt: string | null;
  isActive: boolean;
  isFeatured: boolean;
  isCompleted: boolean;
};

// Same shape as EventRow, minus the admin-only flags a member submission
// never has — "Host an Event" doesn't expose isFeatured/isActive/isCompleted.
type PendingSubmission = Omit<EventRow, "isActive" | "isFeatured" | "isCompleted">;

const EMPTY = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  mode: "In-Person",
  link: "",
  tagsText: "",
  startsAt: "",
  endsAt: "",
  isFeatured: false,
};

// datetime-local inputs need "YYYY-MM-DDTHH:mm" with no timezone suffix.
function toLocalInput(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function AdminEvents() {
  const [events, setEvents] = useState<EventRow[] | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(EMPTY);

  const [pending, setPending] = useState<PendingSubmission[] | null>(null);
  const [moderatingId, setModeratingId] = useState<string | null>(null);

  const load = () => {
    api
      .get("/events", { params: { includeInactive: "true" } })
      .then(({ data }) => setEvents(data?.data ?? data ?? []))
      .catch(() => setEvents([]));
  };

  const loadPending = () => {
    api
      .get("/events/admin/pending")
      .then(({ data }) => setPending(data?.data ?? data ?? []))
      .catch(() => setPending([]));
  };

  useEffect(() => {
    load();
    loadPending();
  }, []);

  const approveSubmission = async (id: string) => {
    setModeratingId(id);
    try {
      await api.patch(`/events/admin/${id}/approve`);
      loadPending();
      load(); // approved event now shows up in the main Events list below
    } finally {
      setModeratingId(null);
    }
  };

  const rejectSubmission = async (id: string) => {
    setModeratingId(id);
    try {
      await api.patch(`/events/admin/${id}/reject`);
      loadPending();
    } finally {
      setModeratingId(null);
    }
  };

  const create = async () => {
    if (!form.title || !form.startsAt) return;
    setSubmitting(true);
    try {
      await api.post("/events", {
        title: form.title,
        description: form.description || undefined,
        location: form.location || undefined,
        imageUrl: form.imageUrl || undefined,
        mode: form.mode || undefined,
        link: form.link || undefined,
        tags: form.tagsText
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        startsAt: new Date(form.startsAt).toISOString(),
        endsAt: form.endsAt ? new Date(form.endsAt).toISOString() : undefined,
        isFeatured: form.isFeatured,
      });
      setForm(EMPTY);
      load();
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (ev: EventRow) => {
    setEditingId(ev.id);
    setEditForm({
      title: ev.title,
      description: ev.description ?? "",
      location: ev.location ?? "",
      imageUrl: ev.imageUrl ?? "",
      mode: ev.mode ?? "In-Person",
      link: ev.link ?? "",
      tagsText: ev.tags.join(", "),
      startsAt: toLocalInput(ev.startsAt),
      endsAt: toLocalInput(ev.endsAt),
      isFeatured: ev.isFeatured,
    });
  };

  const saveEdit = async (id: string) => {
    setSubmitting(true);
    try {
      await api.patch(`/events/${id}`, {
        title: editForm.title,
        description: editForm.description,
        location: editForm.location,
        imageUrl: editForm.imageUrl,
        mode: editForm.mode,
        link: editForm.link,
        tags: editForm.tagsText
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        startsAt: new Date(editForm.startsAt).toISOString(),
        endsAt: editForm.endsAt ? new Date(editForm.endsAt).toISOString() : null,
        isFeatured: editForm.isFeatured,
      });
      setEditingId(null);
      load();
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (ev: EventRow) => {
    setSubmitting(true);
    try {
      if (ev.isActive) {
        await api.delete(`/events/${ev.id}`); // soft-delete, backend never hard-deletes
      } else {
        await api.patch(`/events/${ev.id}`, { isActive: true });
      }
      load();
    } finally {
      setSubmitting(false);
    }
  };

  // Distinct from Remove/Restore (isActive) — a completed event stays on
  // the record and in the public archive, it just drops off the upcoming
  // list. Ticking it back off (un-completing) puts it back on Upcoming.
  const toggleCompleted = async (ev: EventRow) => {
    setSubmitting(true);
    try {
      await api.patch(`/events/${ev.id}`, { isCompleted: !ev.isCompleted });
      load();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Create an event</h2>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
          />
          <input
            placeholder="Location (blank = virtual)"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <select
            value={form.mode}
            onChange={(e) => setForm({ ...form, mode: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          >
            <option value="Virtual">Virtual</option>
            <option value="In-Person">In-Person</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <label className="text-xs text-gray-500">
            Starts
            <input
              type="datetime-local"
              value={form.startsAt}
              onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
              className="mt-1 block w-full rounded border border-gray-300 px-2 py-1 text-sm"
            />
          </label>
          <label className="text-xs text-gray-500">
            Ends (optional)
            <input
              type="datetime-local"
              value={form.endsAt}
              onChange={(e) => setForm({ ...form, endsAt: e.target.value })}
              className="mt-1 block w-full rounded border border-gray-300 px-2 py-1 text-sm"
            />
          </label>
          <input
            placeholder="Image URL (optional)"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            placeholder="Link — registration page, Zoom/Meet, Eventbrite (optional)"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            placeholder="Tags, comma-separated (e.g. AI/ML, Networking)"
            value={form.tagsText}
            onChange={(e) => setForm({ ...form, tagsText: e.target.value })}
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
            Feature this event (pins it first on the dashboard, ahead of soonest-first sorting)
          </label>
        </div>

        <button
          onClick={create}
          disabled={submitting || !form.title || !form.startsAt}
          className="mt-3 rounded bg-[#001F3F] px-3 py-1.5 text-sm text-white disabled:opacity-50"
        >
          Create event
        </button>
      </div>

      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">
          Pending Submissions{" "}
          {pending && pending.length > 0 && (
            <span className="ml-1 rounded-full bg-[#D7263D] px-2 py-0.5 text-xs text-white">{pending.length}</span>
          )}
        </h2>
        <p className="mt-1 text-xs text-gray-500">
          Events members submitted via "Host an Event" — not visible anywhere until you approve them.
        </p>

        {pending === null ? (
          <p className="mt-3 text-sm text-gray-500">Loading…</p>
        ) : pending.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">Nothing waiting on review.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {pending.map((ev) => (
              <div key={ev.id} className="flex flex-wrap items-center justify-between gap-2 rounded border border-gray-200 p-3 text-sm">
                <div>
                  <p className="font-medium text-[#001F3F]">{ev.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(ev.startsAt).toLocaleString()} · {ev.location || "Virtual"} · {ev.mode ?? "In-Person"}
                  </p>
                  {ev.description && <p className="mt-1 text-xs text-gray-600">{ev.description}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => approveSubmission(ev.id)}
                    disabled={moderatingId === ev.id}
                    className="rounded bg-[#001F3F] px-2 py-1 text-xs text-white disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectSubmission(ev.id)}
                    disabled={moderatingId === ev.id}
                    className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-600 disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Events</h2>

        {events === null ? (
          <p className="mt-3 text-sm text-gray-500">Loading…</p>
        ) : events.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">No events created yet.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {events.map((ev) =>
              editingId === ev.id ? (
                <div key={ev.id} className="rounded border border-[#001F3F] p-3">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      placeholder="Title"
                      className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
                    />
                    <input
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      placeholder="Location"
                      className="rounded border border-gray-300 px-2 py-1 text-sm"
                    />
                    <select
                      value={editForm.mode}
                      onChange={(e) => setEditForm({ ...editForm, mode: e.target.value })}
                      className="rounded border border-gray-300 px-2 py-1 text-sm"
                    >
                      <option value="Virtual">Virtual</option>
                      <option value="In-Person">In-Person</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                    <label className="text-xs text-gray-500">
                      Starts
                      <input
                        type="datetime-local"
                        value={editForm.startsAt}
                        onChange={(e) => setEditForm({ ...editForm, startsAt: e.target.value })}
                        className="mt-1 block w-full rounded border border-gray-300 px-2 py-1 text-sm"
                      />
                    </label>
                    <label className="text-xs text-gray-500">
                      Ends
                      <input
                        type="datetime-local"
                        value={editForm.endsAt}
                        onChange={(e) => setEditForm({ ...editForm, endsAt: e.target.value })}
                        className="mt-1 block w-full rounded border border-gray-300 px-2 py-1 text-sm"
                      />
                    </label>
                    <input
                      value={editForm.imageUrl}
                      onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                      placeholder="Image URL"
                      className="rounded border border-gray-300 px-2 py-1 text-sm"
                    />
                    <input
                      value={editForm.link}
                      onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                      placeholder="Link (optional)"
                      className="rounded border border-gray-300 px-2 py-1 text-sm"
                    />
                    <input
                      value={editForm.tagsText}
                      onChange={(e) => setEditForm({ ...editForm, tagsText: e.target.value })}
                      placeholder="Tags, comma-separated"
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
                      onClick={() => saveEdit(ev.id)}
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
                  key={ev.id}
                  className={`flex flex-wrap items-center justify-between gap-2 rounded border border-gray-200 p-3 text-sm ${
                    !ev.isActive ? "opacity-50" : ""
                  }`}
                >
                  <div>
                    <p className="font-medium text-[#001F3F]">
                      {ev.title} {ev.isFeatured && <span className="text-xs text-[#D7263D]">★ Featured</span>}{" "}
                      {ev.isCompleted && <span className="text-xs text-green-700">✓ Completed</span>}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(ev.startsAt).toLocaleString()} · {ev.location || "Virtual"} · {ev.mode ?? "In-Person"}
                      {!ev.isActive && " · Removed"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(ev)}
                      className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleCompleted(ev)}
                      disabled={submitting}
                      className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-600 disabled:opacity-50"
                    >
                      {ev.isCompleted ? "Mark upcoming again" : "Mark completed"}
                    </button>
                    <button
                      onClick={() => toggleActive(ev)}
                      disabled={submitting}
                      className="rounded border border-gray-300 px-2 py-1 text-xs text-gray-600 disabled:opacity-50"
                    >
                      {ev.isActive ? "Remove" : "Restore"}
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
