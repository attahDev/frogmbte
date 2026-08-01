import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import { fetchMySubscription, startCheckout } from "../../../lib/subscriptionsApi";
import type { Tier } from "../../../lib/subscriptionsApi";

const TIERS: { tier: Tier; label: string; monthly: string; annual: string }[] = [
  { tier: "STUDENT", label: "Student", monthly: "£9.99/mo", annual: "£99/yr" },
  { tier: "PROFESSIONAL", label: "Professional", monthly: "£29/mo", annual: "£290/yr" },
  { tier: "FOUNDER", label: "Founder", monthly: "£79/mo", annual: "£790/yr" },
  { tier: "EXECUTIVE", label: "Executive", monthly: "£199/mo", annual: "£1,990/yr" },
];

export default function BillingSection() {
  const [current, setCurrent] = useState<Tier>("EXPLORER");
  const [cycle, setCycle] = useState<"monthly" | "annual">("monthly");
  const [loadingTier, setLoadingTier] = useState<Tier | null>(null);

  useEffect(() => {
    fetchMySubscription()
      .then((s) => setCurrent(s.tier ?? "EXPLORER"))
      .catch(() => {
        /* default EXPLORER stands if this fails — not worth a toast on load */
      });
  }, []);

  async function handleUpgrade(tier: Tier) {
    setLoadingTier(tier);
    try {
      await startCheckout(tier, cycle);
    } catch {
      toast.error("Couldn't start checkout. Try again.");
      setLoadingTier(null);
    }
  }

  return (
    <div className="rounded-2xl bg-white shadow-sm p-6">
      <h2 className="text-base font-bold text-[#001F3F] mb-4 flex items-center gap-2">
        <CreditCard className="h-4 w-4" /> Billing & plan
      </h2>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-[#001F3F]">Current plan</p>
          <p className="text-xs text-gray-500 mt-0.5">{current}</p>
        </div>
        <div className="flex rounded-full bg-gray-100 p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setCycle("monthly")}
            className={`px-3 py-1 rounded-full transition-colors ${
              cycle === "monthly" ? "bg-white shadow-sm text-[#001F3F]" : "text-gray-500"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setCycle("annual")}
            className={`px-3 py-1 rounded-full transition-colors ${
              cycle === "annual" ? "bg-white shadow-sm text-[#001F3F]" : "text-gray-500"
            }`}
          >
            Annual
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TIERS.map((t) => {
          const isCurrent = t.tier === current;
          return (
            <div key={t.tier} className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm font-bold text-[#001F3F]">{t.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {cycle === "monthly" ? t.monthly : t.annual}
              </p>
              <button
                type="button"
                disabled={isCurrent || loadingTier === t.tier}
                onClick={() => handleUpgrade(t.tier)}
                className="mt-3 w-full rounded-full bg-[#001F3F] px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
              >
                {isCurrent ? "Current plan" : loadingTier === t.tier ? "Redirecting…" : "Upgrade"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
