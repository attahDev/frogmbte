import {
  Award,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  Handshake,
  LayoutDashboard,
  Leaf,
  Lightbulb,
  LogOut,
  Menu,
  MessageSquare,
  Palette,
  Presentation,
  Settings,
  ShieldCheck,
  TrendingUp,
  Trophy,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/mainuseAuth';
import { fetchMyUnreadCount } from '../../lib/notificationsApi';

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
  badge?: string;
};

type NavGroup = {
  name: string;
  icon: React.ReactNode;
  children: NavItem[];
};

type NavEntry = NavItem | NavGroup;

function isNavGroup(entry: NavEntry): entry is NavGroup {
  return 'children' in entry;
}

const DashboardIcon = () => (
  <svg className="h-4 w-4 lg:h-[18px] lg:w-[18px]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 14V8.66667C10 8.48986 9.92976 8.32029 9.80474 8.19526C9.67971 8.07024 9.51014 8 9.33333 8H6.66667C6.48986 8 6.32029 8.07024 6.19526 8.19526C6.07024 8.32029 6 8.48986 6 8.66667V14"
      stroke="currentColor"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 6.66666C1.99995 6.47271 2.04222 6.28108 2.12386 6.10514C2.20549 5.9292 2.32453 5.77319 2.47267 5.64799L7.13933 1.64799C7.37999 1.4446 7.6849 1.33301 8 1.33301C8.3151 1.33301 8.62001 1.4446 8.86067 1.64799L13.5273 5.64799C13.6755 5.77319 13.7945 5.9292 13.8761 6.10514C13.9578 6.28108 14 6.47271 14 6.66666V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V6.66666Z"
      stroke="currentColor"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AI_STUDIO_PATHS = [
  '/dashboard/ai-studio',
  '/dashboard/idea-generator',
  '/dashboard/opportunity-insights',
  '/dashboard/business-plan',
] as const;

const Dashboard: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const [aiStudioOpen, setAiStudioOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const load = () => fetchMyUnreadCount().then((count) => !cancelled && setUnreadNotifications(count)).catch(() => {});
    load();
    const interval = setInterval(load, 60000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [location.pathname]);
  const isMentorAiPage = location.pathname.includes('/mentors-ai');
  const isAiStudioRoute = AI_STUDIO_PATHS.some(
    (path) => location.pathname === path || location.pathname.startsWith(`${path}/`)
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const sync = () => setIsNarrow(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isAiStudioRoute) setAiStudioOpen(true);
  }, [isAiStudioRoute]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/');
    }
  };

  const iconClass = 'h-4 w-4 lg:h-[18px] lg:w-[18px]';

  const navSections: {
    title?: string;
    items: NavEntry[];
  }[] = useMemo(
    () => [
      {
        title: 'MAIN',
        items: [
          {
            name: 'Dashboard',
            icon: <DashboardIcon />,
            path: '/dashboard',
          },
          {
            name: 'Notifications',
            icon: <Bell className={iconClass} />,
            path: '/dashboard/notifications',
            badge: unreadNotifications > 0 ? String(unreadNotifications) : undefined,
          },
          {
            name: 'Academy',
            icon: <GraduationCap className={iconClass} />,
            path: '/dashboard/academy',
          },
          {
            name: 'Green Impact',
            icon: <Leaf className={iconClass} />,
            path: '/dashboard/green-impact',
          },
          {
            name: 'Hall of Fame',
            icon: <Trophy className={iconClass} />,
            path: '/dashboard/hall-of-fame',
          },
        ],
      },
      {
        title: 'OUR SERVICES',
        items: [
          {
            name: 'Opportunities',
            icon: <Lightbulb className={iconClass} />,
            path: '/dashboard/opportunities',
          },
          {
            name: 'Business Growth',
            icon: <Building2 className={iconClass} />,
            path: '/dashboard/business',
          },
          {
            name: 'Digital Trust',
            icon: <ShieldCheck className={iconClass} />,
            path: '/dashboard/digital-trust',
          },
          {
            name: 'Partnerships',
            icon: <Handshake className={iconClass} />,
            path: '/dashboard/partnerships',
          },
        ],
      },
      {
        title: 'EVENTS AND TRAININGS',
        items: [
          {
            name: 'Events',
            icon: <CalendarDays className={iconClass} />,
            path: '/dashboard/events',
          },
        ],
      },
      {
        title: 'MENTORS & COACHES',
        items: [
          {
            name: 'My Mentors',
            icon: <Users className={iconClass} />,
            path: '/dashboard/community',
          },
          {
            name: 'Mentor AI',
            icon: <MessageSquare className={iconClass} />,
            path: '/dashboard/mentors-ai',
            badge: 'AI',
          },
        ],
      },
      {
        title: 'PRODUCTIVITY TOOLS',
        items: [
          {
            name: 'AI Business Studio',
            icon: <LayoutDashboard className={iconClass} />,
            children: [
              {
                name: 'AI Business Studio Dashboard',
                icon: <LayoutDashboard className={iconClass} />,
                path: '/dashboard/ai-studio',
              },
              {
                name: 'Idea Generator',
                icon: <Lightbulb className={iconClass} />,
                path: '/dashboard/idea-generator',
              },
              {
                name: 'Opportunity Insights',
                icon: <TrendingUp className={iconClass} />,
                path: '/dashboard/opportunity-insights',
              },
              {
                name: 'Business Plan AI',
                icon: <FileText className={iconClass} />,
                path: '/dashboard/business-plan',
              },
            ],
          },
          {
            name: 'Brand Identity',
            icon: <Palette className={iconClass} />,
            path: '/dashboard/brand-identity',
          },
          {
            name: 'Market Research AI',
            icon: <BarChart3 className={iconClass} />,
            path: '/dashboard/market-research',
          },
          {
            name: 'Pitch Deck Builder',
            icon: <Presentation className={iconClass} />,
            path: '/dashboard/pitch-deck',
          },
          {
            name: 'Proposal Builder AI',
            icon: <Clock3 className={iconClass} />,
            path: '/dashboard/proposal-builder',
          },
        ],
      },
      {
        items: [
          {
            name: 'My Profile',
            icon: <UserRound className={iconClass} />,
            path: '/dashboard/profile',
          },
          {
            name: 'Settings',
            icon: <Settings className={iconClass} />,
            path: '/dashboard/settings',
          },
          ...(user?.role === 'ADMIN'
            ? [
                {
                  name: 'Admin Portal',
                  icon: <LayoutDashboard className={iconClass} />,
                  path: '/dashboard/admin',
                },
              ]
            : []),
        ],
      },
    ],
    [user, unreadNotifications]
  );
  const showExpandedSidebar = isNarrow ? isMobileMenuOpen : !isSidebarCollapsed;

  return (
    <div className="flex h-full overflow-hidden bg-[#FFFDF7]">
      {isMobileMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 hidden bg-black/50 max-lg:block"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu overlay"
        />
      )}

      {/* Desktop-first sidebar: always in document flow on large screens. */}
      <aside
        className={`
          relative z-20 flex h-full shrink-0 flex-col overflow-hidden bg-[#001F3F] text-white transition-[width,transform] duration-300
          ${isSidebarCollapsed ? 'w-20' : 'w-64'}
          max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-50 max-lg:w-64
          ${isMobileMenuOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'}
        `}
      >
        <div className={`flex shrink-0 items-center border-b border-white/10 px-4 py-5 ${showExpandedSidebar ? 'justify-between' : 'justify-center'}`}>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hidden rounded-md p-1.5 text-white/80 transition-colors hover:bg-white/10 max-lg:inline-flex"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 lg:block"
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isSidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>

        <nav
          data-lenis-prevent
          className="scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-contain"
        >
          {navSections.map((section) => (
            <div key={section.title ?? 'account'} className="border-b border-white/[0.08] py-2">
              {section.title && showExpandedSidebar && (
                <p className="px-4 pb-1 pt-1 text-[10px] font-medium tracking-[0.12em] text-white/45">
                  {section.title}
                </p>
              )}

              <div>
                {section.items.map((entry) => {
                  if (isNavGroup(entry)) {
                    const groupOpen = showExpandedSidebar && aiStudioOpen;

                    if (!showExpandedSidebar) {
                      return (
                        <NavLink
                          key={entry.name}
                          to="/dashboard/ai-studio"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={() =>
                            `
                              mx-3 flex items-center justify-center rounded-lg py-2.5 px-0 text-sm transition-colors
                              ${isAiStudioRoute ? 'bg-[#FFD700] text-[#001F3F]' : 'text-white/80 hover:bg-white/10'}
                            `
                          }
                          title={entry.name}
                        >
                          <span className={`flex-shrink-0 ${isAiStudioRoute ? 'text-[#001F3F]' : 'text-white/80'}`}>
                            {entry.icon}
                          </span>
                        </NavLink>
                      );
                    }

                    return (
                      <div key={entry.name} className="mx-3">
                        <button
                          type="button"
                          onClick={() => setAiStudioOpen((open) => !open)}
                          className={`
                            flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors
                            ${isAiStudioRoute ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/10'}
                          `}
                          aria-expanded={groupOpen}
                        >
                          <span className="flex-shrink-0">{entry.icon}</span>
                          <span className="flex-1 text-left">{entry.name}</span>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 transition-transform ${groupOpen ? 'rotate-180' : ''}`}
                          />
                        </button>

                        {groupOpen && (
                          <div className="mt-1 space-y-0.5 border-l border-white/15 ml-4 pl-2">
                            {entry.children.map((child) => (
                              <NavLink
                                key={child.path}
                                to={child.path}
                                end
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                  `
                                    flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors
                                    ${isActive ? 'bg-[#FFD700] text-[#001F3F]' : 'text-white/75 hover:bg-white/10'}
                                  `
                                }
                              >
                                {({ isActive }) => (
                                  <>
                                    <span className={`flex-shrink-0 ${isActive ? 'text-[#001F3F]' : 'text-white/75'}`}>
                                      {child.icon}
                                    </span>
                                    <span className="leading-snug">{child.name}</span>
                                  </>
                                )}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <NavLink
                      key={entry.name}
                      to={entry.path}
                      end={entry.path === '/dashboard'}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `
                          mx-3 flex items-center gap-2.5 rounded-lg py-2.5 text-sm transition-colors
                          ${isActive ? 'bg-[#FFD700] text-[#001F3F]' : 'text-white/80 hover:bg-white/10'}
                          ${showExpandedSidebar ? 'px-3' : 'justify-center px-0'}
                        `
                      }
                      title={!showExpandedSidebar ? entry.name : undefined}
                    >
                      {({ isActive }) => (
                        <>
                          <span className={`flex-shrink-0 ${isActive ? 'text-[#001F3F]' : 'text-white/80'}`}>
                            {entry.icon}
                          </span>
                          {showExpandedSidebar && <span>{entry.name}</span>}
                          {entry.badge && showExpandedSidebar && (
                            <span className="ml-auto rounded-full bg-[#FFD700] px-1.5 py-0.5 text-[9px] font-extrabold text-[#001F3F]">
                              {entry.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="border-b border-white/[0.08] py-2">
            <button
              type="button"
              onClick={handleLogout}
              className={`mx-3 flex items-center gap-2.5 rounded-lg py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10 ${
                showExpandedSidebar ? 'w-[calc(100%-1.5rem)] px-3' : 'w-10 justify-center px-0'
              }`}
              title={!showExpandedSidebar ? 'Log out' : undefined}
            >
              <LogOut className="h-4 w-4 lg:h-[18px] lg:w-[18px]" />
              {showExpandedSidebar && <span>Log out</span>}
            </button>
          </div>
        </nav>
      </aside>

      <div className="relative z-0 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#FFFDF7]">
        <header className="sticky top-0 z-30 hidden items-center gap-3 border-b border-[#E5E7EB] bg-[#FFFDF7] px-4 py-3 max-lg:flex">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="rounded-lg p-2 text-[#001F3F] transition hover:bg-[#001F3F]/5"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <p className="text-sm font-semibold text-[#001F3F]">Student Dashboard</p>
        </header>

        <main
          data-lenis-prevent
          className={`relative z-0 min-h-0 min-w-0 flex-1 overflow-x-hidden overscroll-contain ${
            isMentorAiPage ? 'flex flex-col overflow-hidden lg:overflow-y-auto' : 'overflow-y-auto'
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
