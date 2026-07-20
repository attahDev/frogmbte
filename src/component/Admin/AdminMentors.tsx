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
};

const EMPTY = { name: "", role: "", company: "", bio: "", skills: "" };

export default function AdminMentors() {
  const [mentors, setMentors] = useState<Mentor[] | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    api
      .get("/mentors")
      .then(({ data }) => setMentors(data?.data ?? data ?? []))
      .catch(() => setMentors([]));
  };

  useEffect(load, []);

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

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Add a mentor</h2>
        <p className="mt-1 text-xs text-gray-400">
          Mentors are added here by admin — there's no self-signup flow, as decided.
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
        ) : (
          <table className="mt-3 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Role</th>
                <th className="py-2 pr-3">Company</th>
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
    </div>
  );
}
