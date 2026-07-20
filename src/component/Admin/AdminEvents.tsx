import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type EventRow = {
  id: string;
  title: string;
  location: string | null;
  startsAt: string;
  endsAt: string | null;
  isActive: boolean;
};

const EMPTY = { title: "", description: "", location: "", startsAt: "", endsAt: "" };

export default function AdminEvents() {
  const [events, setEvents] = useState<EventRow[] | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    api
      .get("/events")
      .then(({ data }) => setEvents(data?.data ?? data ?? []))
      .catch(() => setEvents([]));
  };

  useEffect(load, []);

  const create = async () => {
    if (!form.title || !form.startsAt) return;
    setSubmitting(true);
    try {
      await api.post("/events", {
        title: form.title,
        description: form.description || undefined,
        location: form.location || undefined,
        startsAt: new Date(form.startsAt).toISOString(),
        endsAt: form.endsAt ? new Date(form.endsAt).toISOString() : undefined,
      });
      setForm(EMPTY);
      load();
    } finally {
      setSubmitting(false);
    }
  };

  const cancelEvent = async (id: string) => {
    await api.delete(`/events/${id}`);
    load();
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
          <div />
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
          <textarea
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
          />
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
        <h2 className="text-base font-semibold text-[#001F3F]">Upcoming events</h2>

        {events === null ? (
          <p className="mt-3 text-sm text-gray-500">Loading…</p>
        ) : events.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">No upcoming events.</p>
        ) : (
          <table className="mt-3 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 pr-3">Title</th>
                <th className="py-2 pr-3">Starts</th>
                <th className="py-2 pr-3">Location</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev.id} className="border-b border-gray-100">
                  <td className="py-2 pr-3 whitespace-nowrap">{ev.title}</td>
                  <td className="py-2 pr-3 whitespace-nowrap">
                    {new Date(ev.startsAt).toLocaleString()}
                  </td>
                  <td className="py-2 pr-3 whitespace-nowrap">{ev.location || "Virtual"}</td>
                  <td className="py-2">
                    <button
                      onClick={() => cancelEvent(ev.id)}
                      className="rounded border border-red-300 px-2 py-1 text-xs text-red-600"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
