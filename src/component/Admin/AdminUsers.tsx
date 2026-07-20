import { useEffect, useState } from "react";
import { api } from "../../lib/api";

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

const ROLES = ["STUDENT", "PROFESSIONAL", "ENGINEER", "ADMIN", "OTHER"];

export default function AdminUsers() {
  const [users, setUsers] = useState<UserRow[] | null>(null);
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

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
              <tr key={u.id} className="border-b border-gray-100">
                <td className="py-2 pr-3 whitespace-nowrap">
                  {u.firstname} {u.lastname}
                </td>
                <td className="py-2 pr-3 whitespace-nowrap">{u.email}</td>
                <td className="py-2 pr-3">
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
                <td className="py-2">
                  <button
                    disabled={busyId === u.id}
                    onClick={() => toggleActive(u)}
                    className="rounded border border-gray-300 px-2 py-1 text-xs disabled:opacity-50"
                  >
                    {u.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="mt-3 text-xs text-gray-400">
        Note: a dedicated "MENTOR" role isn't in the database yet (mentor portal not built) —
        for now, admin-selected mentors are managed separately under the Mentors tab, not via
        role here.
      </p>
    </div>
  );
}
