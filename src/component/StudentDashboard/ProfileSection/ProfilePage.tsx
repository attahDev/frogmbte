import { useState } from "react";
import {
  Award,
  BadgeCheck,
  Calendar,
  Edit2,
  GraduationCap,
  Lock,
  Rocket,
  Save,
  Star,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "../../../contexts/mainuseAuth";
import { useApiGet } from "../hooks/useApiGet";
import CardSkeleton from "../shared/CardSkeleton";
import { updateMyProfile, updateProfileVisibility, fetchMyBadges, type Badge } from "../../../lib/profileApi";
import toast from "react-hot-toast";

interface DashboardSummary {
  activeMentors: number;
  coursesCompleted: number;
  eventsThisMonth: number;
}

const EMPTY_SUMMARY: DashboardSummary = { activeMentors: 0, coursesCompleted: 0, eventsThisMonth: 0 };

// Icon per badge name — falls back to a generic trophy for anything not
// explicitly mapped, so a new badge added in the admin/seed data never
// renders broken.
const BADGE_ICON: Record<string, React.ReactNode> = {
  "Fast Starter": <Rocket className="h-6 w-6" />,
  "3 Courses": <GraduationCap className="h-6 w-6" />,
  "Top Learner": <Trophy className="h-6 w-6" />,
  Community: <Star className="h-6 w-6" />,
  Regular: <Star className="h-6 w-6" />,
  Mentored: <Users className="h-6 w-6" />,
};

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl sm:rounded-2xl bg-[#FFFDF7] shadow-sm p-5 sm:p-6">
      <div className="text-2xl font-extrabold text-[#001F3F]">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const { data: summary, loading: summaryLoading } = useApiGet<DashboardSummary>(
    "/dashboard/summary",
    EMPTY_SUMMARY
  );
  const { data: badges, loading: badgesLoading, refetch: refetchBadges } = useApiGet<Badge[]>(
    "/badges/me",
    []
  );

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    firstname: user?.firstname ?? "",
    lastname: user?.lastname ?? "",
    organization: user?.organization ?? "",
    region: user?.region ?? "",
  });

  if (!user) return null;

  const badgesEarned = (badges ?? []).filter((b) => b.earned).length;
  const isPublic = (user.profileVisibility ?? "PUBLIC") === "PUBLIC";

  async function handleSave() {
    setSaving(true);
    try {
      await updateMyProfile(form);
      await refreshUser();
      setEditing(false);
      toast.success("Profile updated");
    } catch {
      toast.error("Couldn't save your profile. Try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleVisibility() {
    const next = isPublic ? "PRIVATE" : "PUBLIC";
    try {
      await updateProfileVisibility(next);
      await refreshUser();
      toast.success(`Profile is now ${next === "PUBLIC" ? "public" : "private"}`);
    } catch {
      toast.error("Couldn't update visibility. Try again.");
    }
  }

  return (
    <div className="min-w-0 overflow-x-hidden bg-[#FFFDF7] pb-20 lg:pb-8">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
        {/* Hero */}
        <div className="rounded-2xl bg-[#001F3F] p-6 sm:p-8 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-[#FFD54A] flex items-center justify-center text-xl font-extrabold text-[#001F3F]">
              {user.firstname?.[0]}
              {user.lastname?.[0]}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                {user.firstname} {user.lastname}
              </h1>
              <p className="text-sm text-gray-300 mt-1">
                {[user.role, user.region].filter(Boolean).join(" • ")}
              </p>
            </div>
          </div>
          {!editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#D7263D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#B81F32] transition-colors"
            >
              <Edit2 className="h-4 w-4" /> Edit profile
            </button>
          )}
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryLoading || badgesLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            <>
              <StatCard label="Courses completed" value={summary?.coursesCompleted ?? 0} />
              <StatCard label="Active mentors" value={summary?.activeMentors ?? 0} />
              <StatCard label="Events this month" value={summary?.eventsThisMonth ?? 0} />
              <StatCard label="Badges earned" value={badgesEarned} />
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Personal information */}
          <div className="rounded-2xl bg-white shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#001F3F]">Personal information</h2>
              {editing && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setForm({
                        firstname: user.firstname ?? "",
                        lastname: user.lastname ?? "",
                        organization: user.organization ?? "",
                        region: user.region ?? "",
                      });
                    }}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Cancel"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={handleSave}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#001F3F] px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                  >
                    <Save className="h-3.5 w-3.5" /> {saving ? "Saving…" : "Save"}
                  </button>
                </div>
              )}
            </div>

            <dl className="divide-y divide-gray-100 text-sm">
              <Row label="First name">
                {editing ? (
                  <Input value={form.firstname} onChange={(v) => setForm((f) => ({ ...f, firstname: v }))} />
                ) : (
                  user.firstname
                )}
              </Row>
              <Row label="Last name">
                {editing ? (
                  <Input value={form.lastname} onChange={(v) => setForm((f) => ({ ...f, lastname: v }))} />
                ) : (
                  user.lastname
                )}
              </Row>
              <Row label="Email">{user.email}</Row>
              <Row label="Organization">
                {editing ? (
                  <Input
                    value={form.organization}
                    onChange={(v) => setForm((f) => ({ ...f, organization: v }))}
                  />
                ) : (
                  user.organization || "—"
                )}
              </Row>
              <Row label="Region">
                {editing ? (
                  <Input
                    value={form.region}
                    onChange={(v) => setForm((f) => ({ ...f, region: v }))}
                    placeholder="e.g. Greater Manchester"
                  />
                ) : (
                  user.region || "—"
                )}
              </Row>
            </dl>
          </div>

          {/* Privacy & account */}
          <div className="rounded-2xl bg-white shadow-sm p-6">
            <h2 className="text-base font-bold text-[#001F3F] mb-4 flex items-center gap-2">
              <Lock className="h-4 w-4" /> Privacy & account
            </h2>
            <dl className="divide-y divide-gray-100 text-sm">
              <Row label="Profile visibility">
                <button
                  type="button"
                  onClick={handleToggleVisibility}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    isPublic ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isPublic ? "Public" : "Private"}
                </button>
              </Row>
              <Row label="Member since">
                <span className="inline-flex items-center gap-1.5 text-[#001F3F] font-medium">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(user.createdAt).toLocaleDateString(undefined, {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </Row>
            </dl>
            <p className="text-xs text-gray-400 mt-4">
              Two-factor authentication isn't available yet — it'll show up here once it ships.
            </p>
          </div>
        </div>

        {/* Skills passport — honest placeholder until the mentee log ships */}
        <div className="rounded-2xl bg-white shadow-sm p-6">
          <h2 className="text-base font-bold text-[#001F3F] mb-2">Skills passport</h2>
          <p className="text-sm text-gray-500">
            Your skills will populate here once course and mentee-log activity is tracked. Nothing to
            show yet.
          </p>
        </div>

        {/* Achievements & badges */}
        <div className="rounded-2xl bg-white shadow-sm p-6">
          <h2 className="text-base font-bold text-[#001F3F] mb-4 flex items-center gap-2">
            <Award className="h-4 w-4" /> Achievements & badges
          </h2>
          {badgesLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(badges ?? []).map((b) => (
                <div
                  key={b.id}
                  className={`rounded-xl p-4 text-center border ${
                    b.earned ? "bg-[#FFF7DD] border-[#FFD54A]" : "bg-gray-50 border-gray-100 opacity-60"
                  }`}
                  title={b.earned ? `Earned` : `${b.current}/${b.target} — ${b.progress}%`}
                >
                  <div
                    className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                      b.earned ? "bg-[#FFD54A] text-[#001F3F]" : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {BADGE_ICON[b.name] ?? <BadgeCheck className="h-6 w-6" />}
                  </div>
                  <p className="text-xs font-semibold text-[#001F3F]">{b.name}</p>
                  {!b.earned && <p className="text-[11px] text-gray-400 mt-0.5">{b.progress}%</p>}
                </div>
              ))}
              {(badges ?? []).length === 0 && (
                <p className="col-span-full text-sm text-gray-500">No badges available yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 gap-4">
      <span className="text-gray-400">{label}</span>
      <span className="text-[#001F3F] font-medium text-right">{children}</span>
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-gray-200 px-2 py-1 text-sm text-right focus:outline-none focus:ring-2 focus:ring-[#FFD54A]"
    />
  );
}
