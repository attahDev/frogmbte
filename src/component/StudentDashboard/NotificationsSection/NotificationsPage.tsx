import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Bell,
  Award,
  Briefcase,
  CalendarDays,
  Compass,
  GraduationCap,
  Leaf,
  ShieldCheck,
  Sparkles,
  Trophy,
  Settings,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  fetchMyNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  groupByRecency,
  NOTIFICATION_CATEGORY_LABELS,
  type BackendNotification,
  type NotificationCategory,
} from "../../../lib/notificationsApi";
import CardSkeleton from "../shared/CardSkeleton";

const CATEGORY_ICON: Record<NotificationCategory, ReactNode> = {
  OPPORTUNITIES: <Sparkles className="h-4 w-4" />,
  JOBS_COS: <Briefcase className="h-4 w-4" />,
  FELLOWSHIP: <Award className="h-4 w-4" />,
  ACADEMY: <GraduationCap className="h-4 w-4" />,
  HALL_OF_FAME: <Trophy className="h-4 w-4" />,
  EVENTS: <CalendarDays className="h-4 w-4" />,
  AI_AGENTS: <Compass className="h-4 w-4" />,
  COMMUNITY: <Users className="h-4 w-4" />,
  GREEN_IMPACT: <Leaf className="h-4 w-4" />,
  DIGITAL_TRUST: <ShieldCheck className="h-4 w-4" />,
  SYSTEM: <Settings className="h-4 w-4" />,
};

const CATEGORY_LABEL: Record<NotificationCategory, string> = Object.fromEntries(
  NOTIFICATION_CATEGORY_LABELS.map((c) => [c.key, c.label])
) as Record<NotificationCategory, string>;

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

type Filter = "ALL" | "UNREAD" | NotificationCategory;

export default function NotificationsPage() {
  const [items, setItems] = useState<BackendNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("ALL");

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMyNotifications();
      setItems(data);
    } catch {
      setError("Couldn't load your notifications. Try refreshing.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (filter === "ALL") return items;
    if (filter === "UNREAD") return items.filter((n) => !n.isRead);
    return items.filter((n) => n.category === filter);
  }, [items, filter]);

  const grouped = useMemo(() => groupByRecency(filtered), [filtered]);
  const unreadCount = items.filter((n) => !n.isRead).length;

  async function handleMarkAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await markAllNotificationsRead();
    } catch {
      load();
    }
  }

  async function handleOpen(n: BackendNotification) {
    if (!n.isRead) {
      setItems((prev) => prev.map((i) => (i.id === n.id ? { ...i, isRead: true } : i)));
      try {
        await markNotificationRead(n.id);
      } catch {
        // best-effort — a stale unread flag isn't worth blocking navigation over
      }
    }
  }

  return (
    <div className="min-w-0 overflow-x-hidden bg-[#FFFDF7] pb-20 lg:pb-8">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001F3F]">Notifications</h1>
            <p className="text-sm text-gray-500 mt-1">
              Everything happening across your GMBTE ecosystem
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="text-sm font-semibold text-[#001F3F] hover:text-[#D7263D] transition-colors whitespace-nowrap"
            >
              ✓ Mark all read
            </button>
          )}
        </div>

        {/* Filter chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          <FilterChip label="All" active={filter === "ALL"} onClick={() => setFilter("ALL")} />
          <FilterChip label="Unread" active={filter === "UNREAD"} onClick={() => setFilter("UNREAD")} />
          {NOTIFICATION_CATEGORY_LABELS.map((c) => (
            <FilterChip
              key={c.key}
              label={c.label}
              active={filter === c.key}
              onClick={() => setFilter(c.key)}
            />
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 mt-6 space-y-8">
        {loading && (
          <div className="grid gap-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl bg-white shadow-sm p-6 text-sm text-gray-500">{error}</div>
        )}

        {!loading && !error && grouped.length === 0 && (
          <div className="rounded-2xl bg-white shadow-sm p-8 text-center">
            <Bell className="h-8 w-8 mx-auto text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">
              {filter === "ALL" ? "No notifications yet." : "Nothing here for this filter."}
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          grouped.map((group) => (
            <div key={group.label}>
              <h2 className="text-sm font-semibold text-gray-400 mb-3">{group.label}</h2>
              <div className="space-y-3">
                {group.items.map((n) => (
                  <div
                    key={n.id}
                    className="relative flex gap-4 rounded-2xl bg-white shadow-sm p-4 sm:p-5"
                  >
                    {!n.isRead && (
                      <span className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-[#D7263D]" />
                    )}
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-[#FFD54A] flex items-center justify-center text-[#001F3F]">
                      {CATEGORY_ICON[n.category]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#001F3F] leading-snug">{n.title}</p>
                      {n.body && <p className="text-sm text-gray-500 mt-0.5">{n.body}</p>}
                      <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                        <span>{timeAgo(n.createdAt)}</span>
                        <span className="text-gray-300">•</span>
                        <span className="font-medium text-amber-600">
                          {CATEGORY_LABEL[n.category]}
                        </span>
                      </div>
                      {n.actionLabel && n.actionUrl && (
                        <Link
                          to={n.actionUrl}
                          onClick={() => handleOpen(n)}
                          className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#D7263D] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#B81F32] transition-colors"
                        >
                          {n.actionLabel} →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors whitespace-nowrap ${
        active
          ? "bg-[#FFD54A] border-[#FFD54A] text-[#001F3F]"
          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
      }`}
    >
      {label}
    </button>
  );
}
