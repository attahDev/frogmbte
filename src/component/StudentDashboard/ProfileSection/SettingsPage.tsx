import { useState } from "react";
import { KeyRound, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../../contexts/mainuseAuth";
import { changeMyPassword, updateProfileVisibility } from "../../../lib/profileApi";

export default function SettingsPage() {
  const { user, refreshUser } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changing, setChanging] = useState(false);

  if (!user) return null;
  const isPublic = (user.profileVisibility ?? "PUBLIC") === "PUBLIC";

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

  async function handleChangePassword() {
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match.");
      return;
    }
    setChanging(true);
    try {
      await changeMyPassword(currentPassword, newPassword);
      toast.success("Password changed");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Couldn't change your password — check your current password and try again.");
    } finally {
      setChanging(false);
    }
  }

  return (
    <div className="min-w-0 overflow-x-hidden bg-[#FFFDF7] pb-20 lg:pb-8">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001F3F]">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your privacy and account security</p>
        </div>

        {/* Privacy */}
        <div className="rounded-2xl bg-white shadow-sm p-6">
          <h2 className="text-base font-bold text-[#001F3F] mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> Privacy
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#001F3F]">Profile visibility</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {isPublic ? "Anyone can view your public profile." : "Only you can view your profile."}
              </p>
            </div>
            <button
              type="button"
              onClick={handleToggleVisibility}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                isPublic ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
              }`}
            >
              {isPublic ? "Public" : "Private"}
            </button>
          </div>
        </div>

        {/* Change password */}
        <div className="rounded-2xl bg-white shadow-sm p-6">
          <h2 className="text-base font-bold text-[#001F3F] mb-4 flex items-center gap-2">
            <KeyRound className="h-4 w-4" /> Change password
          </h2>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD54A]"
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD54A]"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD54A]"
            />
            <button
              type="button"
              disabled={changing || !currentPassword || !newPassword}
              onClick={handleChangePassword}
              className="rounded-full bg-[#001F3F] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {changing ? "Changing…" : "Change password"}
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400">
          Two-factor authentication isn't available yet — it'll show up here once it ships.
        </p>
      </div>
    </div>
  );
}
