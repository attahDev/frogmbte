import { api } from "./api";

export type Tier = "EXPLORER" | "STUDENT" | "PROFESSIONAL" | "FOUNDER" | "EXECUTIVE";

export type MySubscription = {
  tier: Tier;
  status: string;
};

export async function fetchMySubscription(): Promise<MySubscription> {
  const { data } = await api.get(`/subscriptions/me`);
  return data?.data ?? data;
}

/** Kicks off Stripe Checkout and redirects the browser to it. */
export async function startCheckout(tier: Tier, billingCycle: "monthly" | "annual") {
  const { data } = await api.post(`/subscriptions/checkout`, { tier, billingCycle });
  const url = data?.data?.url ?? data?.url;
  if (url) window.location.href = url;
}

// --- Admin test-panel calls (no Stripe involved — MANUAL status) ---

export type AdminSubscriptionView = {
  tier: Tier;
  status: string;
  creditsBalance: number | null;
};

export async function adminGetUserSubscription(userId: string): Promise<AdminSubscriptionView> {
  const { data } = await api.get(`/subscriptions/admin/${userId}`);
  return data?.data ?? data;
}

export async function adminGrantTier(userId: string, tier: Tier): Promise<void> {
  await api.post(`/subscriptions/admin/grant`, { userId, tier });
}
