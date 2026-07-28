import { api } from "./api";

export type NotificationCategory =
  | "OPPORTUNITIES"
  | "JOBS_COS"
  | "FELLOWSHIP"
  | "ACADEMY"
  | "HALL_OF_FAME"
  | "EVENTS"
  | "AI_AGENTS"
  | "COMMUNITY"
  | "GREEN_IMPACT"
  | "DIGITAL_TRUST"
  | "SYSTEM";

export type BackendNotification = {
  id: string;
  category: NotificationCategory;
  title: string;
  body: string | null;
  actionLabel: string | null;
  actionUrl: string | null;
  isRead: boolean;
  createdAt: string;
};

/** Human labels for the filter chips — order matches the design. */
export const NOTIFICATION_CATEGORY_LABELS: { key: NotificationCategory; label: string }[] = [
  { key: "OPPORTUNITIES", label: "Opportunities" },
  { key: "JOBS_COS", label: "Jobs & CoS" },
  { key: "FELLOWSHIP", label: "Fellowship" },
  { key: "ACADEMY", label: "Academy" },
  { key: "HALL_OF_FAME", label: "Hall of Fame" },
  { key: "EVENTS", label: "Events" },
  { key: "AI_AGENTS", label: "AI Agents" },
  { key: "COMMUNITY", label: "Community" },
  { key: "GREEN_IMPACT", label: "Green Impact" },
  { key: "DIGITAL_TRUST", label: "Digital Trust" },
  { key: "SYSTEM", label: "System" },
];

/** GET /notifications — the current user's feed (bell + Notifications page). */
export async function fetchMyNotifications(opts?: {
  category?: NotificationCategory;
  unreadOnly?: boolean;
}): Promise<BackendNotification[]> {
  const { data } = await api.get("/notifications", {
    params: {
      ...(opts?.category ? { category: opts.category } : {}),
      ...(opts?.unreadOnly ? { unread: "true" } : {}),
    },
  });
  return data?.data ?? data;
}

export async function fetchMyUnreadCount(): Promise<number> {
  const { data } = await api.get("/notifications/unread-count");
  const payload = data?.data ?? data;
  return payload.count;
}

export async function markNotificationRead(id: string) {
  const { data } = await api.patch(`/notifications/${id}/read`);
  return data;
}

export async function markAllNotificationsRead() {
  const { data } = await api.patch("/notifications/read-all");
  return data;
}

/** Admin-wide feed — "everything on the platform". */
export async function fetchAdminNotifications(opts?: {
  category?: NotificationCategory;
  unreadOnly?: boolean;
}): Promise<BackendNotification[]> {
  const { data } = await api.get("/notifications/admin", {
    params: {
      ...(opts?.category ? { category: opts.category } : {}),
      ...(opts?.unreadOnly ? { unread: "true" } : {}),
    },
  });
  return data?.data ?? data;
}

export async function fetchAdminUnreadCount(): Promise<number> {
  const { data } = await api.get("/notifications/admin/unread-count");
  const payload = data?.data ?? data;
  return payload.count;
}

/** Buckets a notification list into Today / Yesterday / This Week / Earlier
 *  the way the design groups them, without needing a backend "bucket" field. */
export function groupByRecency(items: BackendNotification[]) {
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const today = startOfDay(new Date());
  const yesterday = today - 86400000;
  const weekAgo = today - 6 * 86400000;

  const groups: { label: string; items: BackendNotification[] }[] = [
    { label: "Today", items: [] },
    { label: "Yesterday", items: [] },
    { label: "This Week", items: [] },
    { label: "Earlier", items: [] },
  ];

  for (const item of items) {
    const t = startOfDay(new Date(item.createdAt));
    if (t === today) groups[0].items.push(item);
    else if (t === yesterday) groups[1].items.push(item);
    else if (t >= weekAgo) groups[2].items.push(item);
    else groups[3].items.push(item);
  }

  return groups.filter((g) => g.items.length > 0);
}
