import React, { useEffect, useState } from "react";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  Lightbulb,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const AIDashboard: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navSections = [
    {
      title: "MAIN",
      items: [
        {
          name: "Dashboard",
          icon: <Home className="h-4 w-4 lg:h-[18px] lg:w-[18px]" />,
          path: "/ai-dashboard",
        },
      ],
    },
    {
      title: "IDEA STUDIO",
      items: [
        {
          name: "Idea Generator",
          icon: <Lightbulb className="h-4 w-4 lg:h-[18px] lg:w-[18px]" />,
          path: "/ai-dashboard/id-generator",
        },
      ],
    },
    {
      title: "RESEARCH",
      items: [
        {
          name: "Market Research",
          icon: <BarChart3 className="h-4 w-4 lg:h-[18px] lg:w-[18px]" />,
          path: "/ai-dashboard/market-research",
        },
      ],
    },
    {
      title: "PLAN BUILDER",
      items: [
        {
          name: "Business Plan",
          icon: <FileText className="h-4 w-4 lg:h-[18px] lg:w-[18px]" />,
          path: "/ai-dashboard/business-plan",
        },
      ],
    },
  ];

  const showExpandedSidebar = isMobileMenuOpen || !isSidebarCollapsed;

  return (
    <div className="flex min-h-screen bg-[#FFFDF7]">
      {isMobileMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu overlay"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex h-screen w-56 flex-col overflow-hidden bg-[#001F3F] py-5 text-white transition-transform duration-300 sm:w-64 lg:py-8
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:sticky lg:top-0 lg:z-auto lg:shrink-0 lg:translate-x-0 lg:transition-[width]
          ${isSidebarCollapsed ? "lg:w-20" : "lg:w-64"}
        `}
      >
        <div className="flex shrink-0 items-center justify-between px-3 pb-3 sm:px-4 sm:pb-4 lg:justify-end">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="rounded-lg p-1.5 transition-colors hover:bg-white/10 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden rounded-lg p-2 transition-colors hover:bg-white/10 lg:block"
            aria-label={
              isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="scrollbar-hide flex min-h-0 flex-1 flex-col overflow-y-auto">
          <nav className="ml-3 flex flex-col gap-0.5 sm:ml-5 lg:gap-1">
            {navSections.map((section) => (
              <div key={section.title} className="mb-4 lg:mb-6">
                {showExpandedSidebar && (
                  <p className="mb-2 px-2 text-[10px] font-medium tracking-[0.12em] text-white/45 sm:px-3 lg:mb-3 lg:text-[13px] lg:tracking-[0.14em]">
                    {section.title}
                  </p>
                )}

                <div className="flex flex-col gap-0.5 lg:gap-1">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      end={item.path === "/ai-dashboard"}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `
                          flex items-center gap-2 rounded-lg py-2 text-sm transition-all sm:gap-2.5 lg:gap-3 lg:py-3 lg:text-[18px]
                          ${
                            isActive
                              ? "bg-[#FFD700] text-[#001F3F]"
                              : "text-[#FFFFFFCC] hover:bg-white/5"
                          }
                          ${
                            showExpandedSidebar
                              ? "w-full max-w-[13rem] px-3 sm:px-4 lg:w-52 lg:px-5"
                              : "w-10 justify-center px-0 lg:w-12"
                          }
                        `
                      }
                      title={!showExpandedSidebar ? item.name : ""}
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            className={`flex-shrink-0 ${
                              isActive
                                ? "text-[#001F3F]"
                                : "text-[#FFFFFFCC]"
                            }`}
                          >
                            {item.icon}
                          </span>

                          {showExpandedSidebar && (
                            <span
                              className={`${
                                isActive
                                  ? "text-[#001F3F]"
                                  : "text-[#FFFFFFCC]"
                              }`}
                            >
                              {item.name}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {showExpandedSidebar ? (
            <div className="mt-auto border-t border-white/10 pt-4 lg:pt-6">
              <button
                type="button"
                className="flex items-center gap-2 px-5 py-2 text-gray-300 transition hover:bg-white/5 sm:px-6 lg:gap-3 lg:px-8 lg:py-3"
              >
                <Settings className="h-4 w-4 lg:h-5 lg:w-5" />
                <span className="text-xs lg:text-[15px]">Settings</span>
              </button>

              <button
                type="button"
                className="flex items-center gap-2 px-5 py-2 text-gray-300 transition hover:bg-white/5 sm:px-6 lg:gap-3 lg:px-8 lg:py-3"
              >
                <LogOut className="h-4 w-4 lg:h-5 lg:w-5" />
                <span className="text-xs lg:text-[15px]">Log out</span>
              </button>
            </div>
          ) : (
            <div className="mt-auto flex flex-col items-center gap-1 border-t border-white/10 pt-4 lg:gap-2 lg:pt-6">
              <button
                type="button"
                className="rounded-lg p-2 text-gray-300 transition hover:bg-white/5 lg:p-3"
                title="Settings"
              >
                <Settings className="h-4 w-4 lg:h-5 lg:w-5" />
              </button>

              <button
                type="button"
                className="rounded-lg p-2 text-gray-300 transition hover:bg-white/5 lg:p-3"
                title="Log out"
              >
                <LogOut className="h-4 w-4 lg:h-5 lg:w-5" />
              </button>
            </div>
          )}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-[#E5E7EB] bg-[#FFFDF7] px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="rounded-lg p-2 text-[#001F3F] transition hover:bg-[#001F3F]/5"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <p className="text-sm font-semibold text-[#001F3F]">AI Dashboard</p>
        </header>

        <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AIDashboard;