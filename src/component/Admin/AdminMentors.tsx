import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type Mentor = {
  id: string;
  name: string;
  role: string;
  company: string | null;
  bio: string | null;
  skills: string[];
  isActive: boolean;
  userId: string | null;
};

type Spotlight = {
  id: string;
  shoutout: string;
  isActive: boolean;
  startDate: string;
  endDate: string | null;
  mentor: Mentor;
};

const EMPTY = { name: "", role: "", company: "", bio: "", skills: "" };
const EMPTY_SPOTLIGHT = { mentorId: "", shoutout: "", endDate: "" };

export default function AdminMentors() {
  const [mentors, setMentors] = useState<Mentor[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const [spotlights, setSpotlights] = useState<Spotlight[] | null>(null);
  const [spotlightForm, setSpotlightForm] = useState(EMPTY_SPOTLIGHT);
  const [submittingSpotlight, setSubmittingSpotlight] = useState(false);

  const load = () => {
    setLoadError(false);
    api
      .get("/mentors")
      .then(({ data }) => setMentors(data?.data ?? data ?? []))
      .catch(() => {
        setLoadError(true);
        setMentors([]);
      });
  };

  const loadSpotlights = () => {
    api
      .get("/mentors/spotlight/admin")
      .then(({ data }) => setSpotlights(data?.data ?? data ?? []))
      .catch(() => setSpotlights([]));
  };

  useEffect(() => {
    load();
    loadSpotlights();
  }, []);

  const create = async () => {
    if (!form.name || !form.role) return;
    setSubmitting(true);
    try {
      await api.post("/mentors", {
        name: form.name,
        role: form.role,
        company: form.company || undefined,
        bio: form.bio || undefined,
        skills: form.skills ? form.skills.split(",").map((s) => s.trim()).filter(Boolean) : [],
      });
      setForm(EMPTY);
      load();
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (m: Mentor) => {
    await api.patch(`/mentors/${m.id}`, { isActive: !m.isActive });
    load();
  };

  const remove = async (id: string) => {
    await api.delete(`/mentors/${id}`);
    load();
  };

  const createSpotlight = async () => {
    if (!spotlightForm.mentorId || !spotlightForm.shoutout) return;
    setSubmittingSpotlight(true);
    try {
      await api.post("/mentors/spotlight", {
        mentorId: spotlightForm.mentorId,
        shoutout: spotlightForm.shoutout,
        endDate: spotlightForm.endDate || undefined,
      });
      setSpotlightForm(EMPTY_SPOTLIGHT);
      loadSpotlights();
    } finally {
      setSubmittingSpotlight(false);
    }
  };

  const toggleSpotlightActive = async (s: Spotlight) => {
    await api.patch(`/mentors/spotlight/${s.id}`, { isActive: !s.isActive });
    loadSpotlights();
  };

  const removeSpotlight = async (id: string) => {
    await api.delete(`/mentors/spotlight/${id}`);
    loadSpotlights();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Add a mentor</h2>
        <p className="mt-1 text-xs text-gray-400">
          Mentors are added here by admin — there's no self-signup flow, as decided.
          To turn an existing user account into a mentor (so they can log in and manage
          mentees), use the "Promote to Mentor" button on the Users tab instead.
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            placeholder="Role / title"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            placeholder="Company (optional)"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            placeholder="Skills, comma separated"
            value={form.skills}
            onChange={(e) => setForm({ ...form, skills: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <textarea
            placeholder="Bio (optional)"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
          />
        </div>

        <button
          onClick={create}
          disabled={submitting || !form.name || !form.role}
          className="mt-3 rounded bg-[#001F3F] px-3 py-1.5 text-sm text-white disabled:opacity-50"
        >
          Add mentor
        </button>
      </div>

      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Mentor directory</h2>

        {mentors === null ? (
          <p className="mt-3 text-sm text-gray-500">Loading…</p>
        ) : loadError ? (
          <div className="mt-3 text-sm text-[#8A1F1F]">
            Couldn't load mentors — the request failed.{" "}
            <button onClick={load} className="underline">
              Retry
            </button>
          </div>
        ) : mentors.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">No mentors yet.</p>
        ) : (
          <table className="mt-3 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Role</th>
                <th className="py-2 pr-3">Company</th>
                <th className="py-2 pr-3">Account</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mentors.map((m) => (
                <tr key={m.id} className="border-b border-gray-100">
                  <td className="py-2 pr-3 whitespace-nowrap">{m.name}</td>
                  <td className="py-2 pr-3 whitespace-nowrap">{m.role}</td>
                  <td className="py-2 pr-3 whitespace-nowrap">{m.company || "—"}</td>
                  <td className="py-2 pr-3">
                    {m.userId ? (
                      <span className="rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                        Linked login
                      </span>
                    ) : (
                      <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                        Directory only
                      </span>
                    )}
                  </td>
                  <td className="py-2 pr-3">
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-medium ${
                        m.isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {m.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-2 flex gap-2">
                    <button
                      onClick={() => toggleActive(m)}
                      className="rounded border border-gray-300 px-2 py-1 text-xs"
                    >
                      {m.isActive ? "Deactivate" : "Reactivate"}
                    </button>
                    <button
                      onClick={() => remove(m.id)}
                      className="rounded border border-red-300 px-2 py-1 text-xs text-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Mentor Spotlight</h2>
        <p className="mt-1 text-xs text-gray-400">
          Pick a mentor from the directory and write a short shoutout — shown on the dashboard while active.
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <select
            value={spotlightForm.mentorId}
            onChange={(e) => setSpotlightForm({ ...spotlightForm, mentorId: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          >
            <option value="">Select a mentor…</option>
            {(mentors ?? []).map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} — {m.role}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={spotlightForm.endDate}
            onChange={(e) => setSpotlightForm({ ...spotlightForm, endDate: e.target.value })}
            title="Optional end date — leave blank to run indefinitely until you deactivate it"
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <textarea
            placeholder="Shoutout text, e.g. “Huge thanks to Jane for logging 12 sessions this month!”"
            value={spotlightForm.shoutout}
            onChange={(e) => setSpotlightForm({ ...spotlightForm, shoutout: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
          />
        </div>

        <button
          onClick={createSpotlight}
          disabled={submittingSpotlight || !spotlightForm.mentorId || !spotlightForm.shoutout}
          className="mt-3 rounded bg-[#001F3F] px-3 py-1.5 text-sm text-white disabled:opacity-50"
        >
          Publish spotlight
        </button>

        {spotlights === null ? (
          <p className="mt-4 text-sm text-gray-500">Loading…</p>
        ) : spotlights.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">No spotlights yet.</p>
        ) : (
          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 pr-3">Mentor</th>
                <th className="py-2 pr-3">Shoutout</th>
                <th className="py-2 pr-3">Ends</th>
                <th className="py-2 pr-3">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {spotlights.map((s) => (
                <tr key={s.id} className="border-b border-gray-100 align-top">
                  <td className="py-2 pr-3 whitespace-nowrap">{s.mentor.name}</td>
                  <td className="py-2 pr-3 max-w-xs">{s.shoutout}</td>
                  <td className="py-2 pr-3 whitespace-nowrap">
                    {s.endDate ? new Date(s.endDate).toLocaleDateString() : "No end date"}
                  </td>
                  <td className="py-2 pr-3">
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-medium ${
                        s.isActive ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {s.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-2 flex gap-2">
                    <button
                      onClick={() => toggleSpotlightActive(s)}
                      className="rounded border border-gray-300 px-2 py-1 text-xs"
                    >
                      {s.isActive ? "Deactivate" : "Reactivate"}
                    </button>
                    <button
                      onClick={() => removeSpotlight(s.id)}
                      className="rounded border border-red-300 px-2 py-1 text-xs text-red-600"
                    >
                      Remove
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
