import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type ActivityRow = {
  id: string;
  action: string;
  description: string;
  createdAt: string;
  user: { id: string; firstname: string; lastname: string; email: string } | null;
};

export default function AdminOverview() {
  const [rows, setRows] = useState<ActivityRow[] | null>(null);

  useEffect(() => {
    api
      .get("/activity/admin?limit=50")
      .then(({ data }) => setRows(data?.data ?? data ?? []))
      .catch(() => setRows([]));
  }, []);

  return (
    <div className="rounded-md border border-gray-300 bg-white p-4">
      <h2 className="text-base font-semibold text-[#001F3F]">Recent Activity (platform-wide)</h2>

      {rows === null ? (
        <p className="mt-3 text-sm text-gray-500">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="mt-3 text-sm text-gray-500">No activity logged yet.</p>
      ) : (
        <table className="mt-3 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500">
              <th className="py-2 pr-3">When</th>
              <th className="py-2 pr-3">User</th>
              <th className="py-2 pr-3">Action</th>
              <th className="py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-100">
                <td className="py-2 pr-3 whitespace-nowrap text-gray-500">
                  {new Date(row.createdAt).toLocaleString()}
                </td>
                <td className="py-2 pr-3 whitespace-nowrap">
                  {row.user ? `${row.user.firstname} ${row.user.lastname}` : "—"}
                </td>
                <td className="py-2 pr-3 whitespace-nowrap font-mono text-xs text-gray-600">
                  {row.action}
                </td>
                <td className="py-2">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
