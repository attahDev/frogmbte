import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { adminGetUserSubscription, adminGrantTier } from "../../lib/subscriptionsApi";
import type { AdminSubscriptionView, Tier } from "../../lib/subscriptionsApi";

type UserRow = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
};

const TIERS: Tier[] = ["EXPLORER", "STUDENT", "PROFESSIONAL", "FOUNDER", "EXECUTIVE"];

/** Test panel only — grants/inspects subscriptions via SubscriptionStatus.MANUAL,
 *  same upsert the Stripe webhook will use once checkout is live. Lets the whole
 *  credits/entitlement flow be exercised on the real site before Stripe is wired up. */
export default function AdminBilling() {
  const [users, setUsers] = useState<UserRow[] | null>(null);
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [views, setViews] = useState<Record<string, AdminSubscriptionView>>({});
  const [selectedTier, setSelectedTier] = useState<Record<string, Tier>>({});

  const load = (q?: string) => {
    api
      .get("/users", { params: q ? { search: q } : undefined })
      .then(({ data }) => setUsers(data?.data ?? data ?? []))
      .catch(() => setUsers([]));
  };

  useEffect(() => load(), []);

  const refreshView = async (userId: string) => {
    const view = await adminGetUserSubscription(userId);
    setViews((prev) => ({ ...prev, [userId]: view }));
  };

  const grant = async (userId: string) => {
    const tier = selectedTier[userId] ?? "PROFESSIONAL";
    setBusyId(userId);
    try {
      await adminGrantTier(userId, tier);
      await refreshView(userId);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="rounded-md border border-gray-300 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[#001F3F]">Billing (test panel)</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Grants a tier manually (no Stripe) — same code path the checkout webhook uses.
          </p>
        </div>
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
              <th className="py-2 pr-3">Current tier / credits</th>
              <th className="py-2">Grant tier</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const view = views[u.id];
              return (
                <React.Fragment key={u.id}>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3 whitespace-nowrap">
                      {u.firstname} {u.lastname}
                    </td>
                    <td className="py-2 pr-3 whitespace-nowrap">{u.email}</td>
                    <td className="py-2 pr-3 whitespace-nowrap">
                      {view ? (
                        <span>
                          {view.tier} · {view.creditsBalance ?? "—"} credits
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => refreshView(u.id)}
                          className="text-xs text-blue-600 underline"
                        >
                          Load
                        </button>
                      )}
                    </td>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <select
                          value={selectedTier[u.id] ?? "PROFESSIONAL"}
                          onChange={(e) =>
                            setSelectedTier((prev) => ({ ...prev, [u.id]: e.target.value as Tier }))
                          }
                          className="rounded border border-gray-300 px-2 py-1 text-sm"
                        >
                          {TIERS.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          disabled={busyId === u.id}
                          onClick={() => grant(u.id)}
                          className="rounded bg-[#001F3F] px-3 py-1 text-xs text-white disabled:opacity-50"
                        >
                          {busyId === u.id ? "Granting…" : "Grant"}
                        </button>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
