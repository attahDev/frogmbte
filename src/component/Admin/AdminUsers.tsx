import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { promoteToMentor, demoteMentor } from "../../lib/mentorsApi";

type UserRow = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
};

// ADMIN is deliberately not selectable here — granting admin access is a
// direct database action only (the API rejects it too, this just keeps the
// UI from offering an option that will fail). MENTOR isn't in this dropdown
// either since promoting to mentor also needs a profile (company/skills/bio)
// — that's the "Promote to Mentor" flow below instead.
const ROLES = ["STUDENT", "PROFESSIONAL", "ENGINEER", "OTHER"];

const PROMOTE_EMPTY = { roleTitle: "", company: "", skills: "", bio: "" };

export default function AdminUsers() {
  const [users, setUsers] = useState<UserRow[] | null>(null);
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [promotingId, setPromotingId] = useState<string | null>(null);
  const [promoteForm, setPromoteForm] = useState(PROMOTE_EMPTY);

  const load = (q?: string) => {
    api
      .get("/users", { params: q ? { search: q } : undefined })
      .then(({ data }) => setUsers(data?.data ?? data ?? []))
      .catch(() => setUsers([]));
  };

  useEffect(() => load(), []);

  const changeRole = async (id: string, role: string) => {
    setBusyId(id);
    try {
      await api.patch(`/users/${id}/role`, { role });
      load(search);
    } finally {
      setBusyId(null);
    }
  };

  const toggleActive = async (u: UserRow) => {
    setBusyId(u.id);
    try {
      await api.patch(`/users/${u.id}/status`, { isActive: !u.isActive });
      load(search);
    } finally {
      setBusyId(null);
    }
  };

  const submitPromote = async (userId: string) => {
    if (!promoteForm.roleTitle.trim()) return;
    setBusyId(userId);
    try {
      await promoteToMentor({
        userId,
        roleTitle: promoteForm.roleTitle,
        company: promoteForm.company || undefined,
        bio: promoteForm.bio || undefined,
        skills: promoteForm.skills
          ? promoteForm.skills.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
      });
      setPromotingId(null);
      setPromoteForm(PROMOTE_EMPTY);
      load(search);
    } finally {
      setBusyId(null);
    }
  };

  const revoke = async (userId: string) => {
    setBusyId(userId);
    try {
      await demoteMentor(userId);
      load(search);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="rounded-md border border-gray-300 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-[#001F3F]">Users</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            load(search);
          }}
          className="flex gap-2"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name/email"
            className="rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <button type="submit" className="rounded bg-[#001F3F] px-3 py-1 text-sm text-white">
            Search
          </button>
        </form>
      </div>

      {users === null ? (
        <p className="mt-3 text-sm text-gray-500">Loading…</p>
      ) : (
        <table className="mt-3 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500">
              <th className="py-2 pr-3">Name</th>
              <th className="py-2 pr-3">Email</th>
              <th className="py-2 pr-3">Role</th>
              <th className="py-2 pr-3">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <React.Fragment key={u.id}>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-3 whitespace-nowrap">
                    {u.firstname} {u.lastname}
                  </td>
                  <td className="py-2 pr-3 whitespace-nowrap">{u.email}</td>
                  <td className="py-2 pr-3">
                    {u.role === "MENTOR" ? (
                      <span className="rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                        MENTOR
                      </span>
                    ) : (
                      <select
                        value={u.role}
                        disabled={busyId === u.id}
                        onChange={(e) => changeRole(u.id, e.target.value)}
                        className="rounded border border-gray-300 px-1 py-0.5 text-xs"
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td className="py-2 pr-3">
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-medium ${
                        u.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {u.isActive ? "Active" : "Deactivated"}
                    </span>
                  </td>
                  <td className="py-2 flex flex-wrap gap-2">
                    <button
                      disabled={busyId === u.id}
                      onClick={() => toggleActive(u)}
                      className="rounded border border-gray-300 px-2 py-1 text-xs disabled:opacity-50"
                    >
                      {u.isActive ? "Deactivate" : "Activate"}
                    </button>
                    {u.role === "MENTOR" ? (
                      <button
                        disabled={busyId === u.id}
                        onClick={() => revoke(u.id)}
                        className="rounded border border-red-300 px-2 py-1 text-xs text-red-600 disabled:opacity-50"
                      >
                        Revoke mentor
                      </button>
                    ) : (
                      <button
                        disabled={busyId === u.id}
                        onClick={() => {
                          setPromotingId(promotingId === u.id ? null : u.id);
                          setPromoteForm(PROMOTE_EMPTY);
                        }}
                        className="rounded border border-purple-300 px-2 py-1 text-xs text-purple-700 disabled:opacity-50"
                      >
                        {promotingId === u.id ? "Cancel" : "Promote to Mentor"}
                      </button>
                    )}
                  </td>
                </tr>
                {promotingId === u.id && (
                  <tr className="border-b border-gray-100 bg-purple-50/40">
                    <td colSpan={5} className="p-3">
                      <p className="mb-2 text-xs text-gray-500">
                        {u.firstname} {u.lastname} keeps their existing login — this just adds the mentor
                        profile shown in the directory and unlocks "My Mentees" for them.
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <input
                          placeholder="Role / title (e.g. Senior Frontend Engineer)"
                          value={promoteForm.roleTitle}
                          onChange={(e) => setPromoteForm({ ...promoteForm, roleTitle: e.target.value })}
                          className="rounded border border-gray-300 px-2 py-1 text-sm"
                        />
                        <input
                          placeholder="Company (optional)"
                          value={promoteForm.company}
                          onChange={(e) => setPromoteForm({ ...promoteForm, company: e.target.value })}
                          className="rounded border border-gray-300 px-2 py-1 text-sm"
                        />
                        <input
                          placeholder="Skills, comma separated"
                          value={promoteForm.skills}
                          onChange={(e) => setPromoteForm({ ...promoteForm, skills: e.target.value })}
                          className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
                        />
                        <textarea
                          placeholder="Bio (optional)"
                          value={promoteForm.bio}
                          onChange={(e) => setPromoteForm({ ...promoteForm, bio: e.target.value })}
                          className="rounded border border-gray-300 px-2 py-1 text-sm sm:col-span-2"
                        />
                      </div>
                      <button
                        onClick={() => submitPromote(u.id)}
                        disabled={busyId === u.id || !promoteForm.roleTitle.trim()}
                        className="mt-2 rounded bg-purple-700 px-3 py-1.5 text-sm text-white disabled:opacity-50"
                      >
                        Confirm promotion
                      </button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}

      <p className="mt-3 text-xs text-gray-400">
        Admin access can't be granted here — that's a direct database action only, never through the app.
      </p>
    </div>
  );
}
