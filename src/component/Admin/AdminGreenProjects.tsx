import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type Project = {
  id: string;
  title: string;
  description: string;
  goalAmountMinor: number;
  raisedAmountMinor: number;
  _count: { supporters: number };
};

const EMPTY = { title: "", description: "", goalAmount: "" };

export default function AdminGreenProjects() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [raisedEdits, setRaisedEdits] = useState<Record<string, string>>({});

  const load = () => {
    api
      .get("/green-projects")
      .then(({ data }) => setProjects(data?.data ?? data ?? []))
      .catch(() => setProjects([]));
  };

  useEffect(load, []);

  const create = async () => {
    const goalAmountMinor = Math.round(parseFloat(form.goalAmount) * 100);
    if (!form.title || !goalAmountMinor) return;
    setSubmitting(true);
    try {
      await api.post("/green-projects", {
        title: form.title,
        description: form.description,
        goalAmountMinor,
      });
      setForm(EMPTY);
      load();
    } finally {
      setSubmitting(false);
    }
  };

  const saveRaised = async (id: string) => {
    const value = raisedEdits[id];
    if (value === undefined) return;
    const raisedAmountMinor = Math.round(parseFloat(value) * 100);
    if (isNaN(raisedAmountMinor)) return;
    await api.patch(`/green-projects/${id}/raised-amount`, { raisedAmountMinor });
    load();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Create a project</h2>
        <p className="mt-1 text-xs text-gray-400">
          No payment processor exists yet — "raised" is a manually-set running total below, not
          real transactions. Don't advertise this as live crowdfunding until that changes.
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            placeholder="Goal amount (£)"
            type="number"
            value={form.goalAmount}
            onChange={(e) => setForm({ ...form, goalAmount: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
        </div>

        <button
          onClick={create}
          disabled={submitting || !form.title || !form.goalAmount}
          className="mt-3 rounded bg-[#001F3F] px-3 py-1.5 text-sm text-white disabled:opacity-50"
        >
          Create project
        </button>
      </div>

      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Projects</h2>

        {projects === null ? (
          <p className="mt-3 text-sm text-gray-500">Loading…</p>
        ) : (
          <table className="mt-3 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 pr-3">Title</th>
                <th className="py-2 pr-3">Goal</th>
                <th className="py-2 pr-3">Raised</th>
                <th className="py-2 pr-3">Supporters</th>
                <th className="py-2">Update raised (£)</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-gray-100">
                  <td className="py-2 pr-3 whitespace-nowrap">{p.title}</td>
                  <td className="py-2 pr-3 whitespace-nowrap">
                    £{(p.goalAmountMinor / 100).toLocaleString()}
                  </td>
                  <td className="py-2 pr-3 whitespace-nowrap">
                    £{(p.raisedAmountMinor / 100).toLocaleString()}
                  </td>
                  <td className="py-2 pr-3">{p._count.supporters}</td>
                  <td className="py-2">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder={String(p.raisedAmountMinor / 100)}
                        value={raisedEdits[p.id] ?? ""}
                        onChange={(e) => setRaisedEdits({ ...raisedEdits, [p.id]: e.target.value })}
                        className="w-24 rounded border border-gray-300 px-2 py-1 text-xs"
                      />
                      <button
                        onClick={() => saveRaised(p.id)}
                        className="rounded border border-gray-300 px-2 py-1 text-xs"
                      >
                        Save
                      </button>
                    </div>
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
