import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/mainuseAuth";

/**
 * Functional, not pretty — explicitly requested as "for the meantime."
 * Every screen under here talks to endpoints that already enforce
 * @Roles(ADMIN) server-side, so this client-side check is a UX convenience
 * (don't show a non-admin a broken admin screen), not the real security
 * boundary. The real boundary is the backend guard.
 */
const TABS = [
  { to: "/dashboard/admin", label: "Overview", end: true },
  { to: "/dashboard/admin/users", label: "Users" },
  { to: "/dashboard/admin/mentors", label: "Mentors" },
  { to: "/dashboard/admin/events", label: "Events" },
  { to: "/dashboard/admin/courses", label: "Courses" },
  { to: "/dashboard/admin/green-projects", label: "Green Projects" },
  { to: "/dashboard/admin/hall-of-fame", label: "Hall of Fame" },
];

export default function AdminLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="p-6 text-sm text-gray-500">Loading…</div>;
  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] p-4 sm:p-6">
      <h1 className="text-xl font-bold text-[#001F3F]">Admin Portal</h1>
      <p className="mt-1 text-sm text-gray-500">
        Plain functional screens for now — this is the API surface, not the final design.
      </p>

      <nav className="mt-4 flex flex-wrap gap-2 border-b border-gray-300 pb-3">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `rounded-md px-3 py-1.5 text-sm font-medium ${
                isActive ? "bg-[#001F3F] text-white" : "bg-white text-[#001F3F] border border-gray-300"
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
}
