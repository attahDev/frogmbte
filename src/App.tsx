import './App.css';
import Footer from './component/Footer';
import { IndexLandingPage } from './component/LandingPages/IndexLandingPage';
import NavBar from './component/Navbar';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { IndexAboutPage } from './component/AboutPages/IndexAboutPage';
import { EventIndex } from './component/EventPages/EventIndex';
import IndexPartnersPage from './component/PartnersPage/PartnersIndex';
import { IndexContact } from './component/contactPages/IndexContact';
import { BotComp } from './Bot';
import LoginModal from './component/Authentication/Login';
import OtpPage from './component/Authentication/Otp';
import SignupModal from './component/Authentication/Signup';
import ForgotPasswordModal from './component/Authentication/forgot-Password';
import DashboardIndex from './component/StudentDashboard/DashboardIndex';
import { EventSectionIndex } from './component/StudentDashboard/EventSection/EventSection';
import { AuthProvider } from './contexts/mainuserContext';
import { MentorChatProvider } from './contexts/mentorChatContext';
import "./index.css";
import ClimateActionIndex from './component/StudentDashboard/ClimateDashboard/climateActionIndex';
import DashboardSection from './component/StudentDashboard/DashboardSection/DashboardSection';
import DigitalTrustIndex from './component/StudentDashboard/DigitalTrust/DigitalTrustIndex';
import PartnershipsIndex from './component/StudentDashboard/Partnerships/PartnershipsIndex';
import JobDetailsPage from './component/StudentDashboard/JobDashboard/JobDetailsPage';
import JobIndex from './component/StudentDashboard/JobDashboard/JobIndex';
import { ToolkitsIndex } from './component/StudentDashboard/ToolkitsSection/ToolkitsIndex';
import { ToolkIndex } from './component/StudentDashboard/ServicesSection/Toolkits/ToolkIndex';
import AcademyAllCourses from './component/StudentDashboard/ServicesSection/Toolkits/AcademyAllCourses';
import ServicesIndexPage from './component/servicesPages/servicesIndex';
import { Toaster } from "react-hot-toast";
import ComingSoon from './component/Authentication/Soon';
import HallOfFameEmbed from './component/StudentDashboard/HOFAI/HallOfFameEmbed';
import HallOfFameLandingEmbed from './component/StudentDashboard/HOFAI/HallOfFameLandingEmbed';
import AdminLayout from './component/Admin/AdminLayout';
import AdminOverview from './component/Admin/AdminOverview';
import AdminUsers from './component/Admin/AdminUsers';
import AdminMentors from './component/Admin/AdminMentors';
import AdminEvents from './component/Admin/AdminEvents';
import AdminCourses from './component/Admin/AdminCourses';
import AdminGreenProjects from './component/Admin/AdminGreenProjects';
import AdminHOF from './component/Admin/AdminHOF';
import AdminOpportunities from './component/Admin/AdminOpportunities';
import AdminCommunity from './component/Admin/AdminCommunity';
import AIDashboardIndex from './component/MarketResearchDashboard/AIDashboardIndex';
import BPTabs from './component/MarketResearchDashboard/BusinessPlanSection/BPTabs';
import { IGDashboardSection } from './component/MarketResearchDashboard/IdeaGenerator/IGDashboardSection';
import { MRDashboardSection } from './component/MarketResearchDashboard/MarketResearchSection/MRDashboardSection';
import AIBusinessStudioSection from './component/MarketResearchDashboard/DashboardSection/AIDashboardSection';
import { MentorIndexAI } from './component/StudentDashboard/MentorDashboard/MentorIndex';
import MentorsRouteSwitch from './component/StudentDashboard/MentorSections/MentorsRouteSwitch';
import FindMentor from './component/StudentDashboard/MentorSections/FindMentor';
import NotificationsPage from './component/StudentDashboard/NotificationsSection/NotificationsPage';
import CommunityPage from './component/StudentDashboard/CommunitySection/CommunityPage';
import SmoothScroll from './component/utils/lenis';
import BrandIdentityBuilder from './component/BrandIdentity/BrandIdentityBuilder';
import CourseLessonPage from './component/StudentDashboard/ClimateDashboard/Component/CourseLessonPage';
import CourseOverviewPage from './component/StudentDashboard/ClimateDashboard/Component/CourseOverviewPage';
import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PitchDeckGenerator = lazy(() => import('./component/PitchDeck/PitchDeckGenerator'));
const ProposalBuilder = lazy(() => import('./component/ProposalBuilder/ProposalBuilder'));
const MarketResearchTool = lazy(() => import('./component/MarketResearchTool/MarketResearchTool'));

function ToolFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-slate-500">
      Loading tool…
    </div>
  );
}

const queryClient = new QueryClient();

function LegacyJobRedirect() {
  const { id } = useParams();

  return <Navigate to={`/dashboard/opportunities/${id ?? ""}`} replace />;
}

function useIsAppShell() {
  const location = useLocation();

  return (
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/ai-dashboard')
  );
}

function AppLayout() {
  const isAppShell = useIsAppShell();

  useEffect(() => {
    if (!isAppShell) return;

    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [isAppShell]);

  return (
    <>
      <SmoothScroll />
      <NavBar />

      <div
        className={`relative bg-[#FFFDF7] ${
          isAppShell
            ? 'h-[calc(100dvh-65px)] overflow-hidden'
            : 'min-h-screen'
        }`}
      >
        <Routes>
          <Route path="/" element={<IndexLandingPage />} />
          <Route path="/about" element={<IndexAboutPage />} />
          <Route path="/partners" element={<IndexPartnersPage />} />
          <Route path="/events" element={<EventIndex />} />
          <Route path="/hall-of-fame" element={<HallOfFameLandingEmbed />} />
          <Route path="/contact" element={<IndexContact />} />
          <Route path="/services" element={<ServicesIndexPage />} />
          <Route path="/verify-otp" element={<OtpPage />} />
          <Route path="/dashboard" element={<DashboardIndex />}>
            <Route index element={<DashboardSection />} />

            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="mentors" element={<AdminMentors />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="opportunities" element={<AdminOpportunities />} />
              <Route path="community" element={<AdminCommunity />} />
              <Route path="hall-of-fame" element={<AdminHOF />} />
              <Route path="opportunities" element={<AdminOpportunities />} />
            </Route>

            {/* ── LIVE at launch: Dashboard, Academy, Green Impact, Hall of Fame ── */}
            <Route path="academy" element={<ToolkIndex />} />
            <Route path="academy/courses" element={<AcademyAllCourses />} />
            <Route
              path="academy/courses/:courseSlug"
              element={<CourseOverviewPage basePath="/dashboard/academy/courses" />}
            />
            <Route
              path="academy/courses/:courseSlug/:lessonSlug"
              element={<CourseLessonPage basePath="/dashboard/academy/courses" />}
            />
            <Route
                path="hall-of-fame"
                element={<HallOfFameEmbed />}
              />
            <Route path="green-impact" element={<ClimateActionIndex />} />
            <Route path="green-impact/:courseSlug" element={<CourseOverviewPage />} />
            <Route path="green-impact/:courseSlug/:lessonSlug" element={<CourseLessonPage />} />

            {/* ── Everything else: ComingSoon until rolled out. Imports kept
                 (not deleted) below so re-enabling later is a one-line swap. ── */}
            <Route path="opportunities" element={<JobIndex />} />
            <Route path="opportunities/:id" element={<JobDetailsPage />} />
            <Route path="careers" element={<Navigate to="/dashboard/opportunities" replace />} />
            <Route path="careers/:id" element={<LegacyJobRedirect />} />

            <Route path="business" element={<ComingSoon />} /> {/* <ToolkitsIndex /> */}
            <Route path="partnerships" element={<ComingSoon />} /> {/* <PartnershipsIndex /> */}
            <Route
              path="pitch-deck"
              element={
                <Suspense fallback={<ToolFallback />}>
                  <PitchDeckGenerator />
                </Suspense>
              }
            />
            <Route
              path="proposal-builder"
              element={
                <Suspense fallback={<ToolFallback />}>
                  <ProposalBuilder />
                </Suspense>
              }
            />
            <Route
              path="research"
              element={<Navigate to="/dashboard/market-research" replace />}
            />

            <Route path="digital-trust" element={<ComingSoon />} /> {/* <DigitalTrustIndex /> */}
            <Route path="mentors/find" element={<FindMentor />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="events" element={<EventSectionIndex />} />
            <Route path="mentors" element={<MentorsRouteSwitch />} />
            <Route path="mentors-ai" element={<ComingSoon />} /> {/* <MentorIndexAI /> */}
            <Route path="profile" element={<ComingSoon />} />
            <Route path="settings" element={<ComingSoon />} />
            <Route path="brand-identity" element={<BrandIdentityBuilder />} />
            <Route path="ai-studio" element={<ComingSoon />} /> {/* <AIBusinessStudioSection /> */}
            <Route path="idea-generator" element={<ComingSoon />} /> {/* <IGDashboardSection /> */}
            <Route
              path="market-research"
              element={
                <Suspense fallback={<ToolFallback />}>
                  <MarketResearchTool />
                </Suspense>
              }
            />
            <Route path="opportunity-insights" element={<ComingSoon />} /> {/* <MRDashboardSection /> */}
            <Route path="business-plan" element={<ComingSoon />} /> {/* <BPTabs /> */}

            <Route path="services" element={<Navigate to="/dashboard/business" replace />} />
            <Route path="services/toolkits" element={<Navigate to="/dashboard/business" replace />} />
            <Route path="services/toolkits/education" element={<Navigate to="/dashboard/academy" replace />} />
            <Route path="services/toolkits/climate-action" element={<Navigate to="/dashboard/green-impact" replace />} />
            <Route
              path="services/toolkits/climate-action/:courseSlug"
              element={<CourseOverviewPage />}
            />
            <Route
              path="services/toolkits/climate-action/:courseSlug/:lessonSlug"
              element={<CourseLessonPage />}
            />
            <Route path="services/toolkits/jobs" element={<Navigate to="/dashboard/opportunities" replace />} />
            <Route path="services/toolkits/jobs/:id" element={<LegacyJobRedirect />} />
          </Route>
          <Route path="ai-dashboard" element={<AIDashboardIndex />}>
            <Route index element={<ComingSoon />} /> {/* <AIBusinessStudioSection /> */}
            <Route path="id-generator" element={<Navigate to="/dashboard/idea-generator" replace />} />
            <Route path="market-research" element={<Navigate to="/dashboard/opportunity-insights" replace />} />
            <Route path="business-plan" element={<Navigate to="/dashboard/business-plan" replace />} />
          </Route>
          <Route path="/signup" element={<SignupModal />} />
          <Route path="/login" element={<LoginModal />} />
          <Route path="/reset-password" element={<ForgotPasswordModal />} />
          <Route path="/profile" element={<Navigate to="/dashboard/profile" replace />} />
          <Route path="/settings" element={<Navigate to="/dashboard/settings" replace />} />
        </Routes>
        <BotComp />
      </div>
      {!isAppShell && <Footer />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MentorChatProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,

              success: {
                style: {
                  background: "#064E3B",
                  color: "#FFFFFF",
                  border: "1px solid #065F46",
                },
                iconTheme: {
                  primary: "#10B981",
                  secondary: "#FFFFFF",
                },
              },

              error: {
                style: {
                  background: "#7F1D1D",
                  color: "#FFFFFF",
                  border: "1px solid #991B1B",
                },
                iconTheme: {
                  primary: "#EF4444",
                  secondary: "#FFFFFF",
                },
              },
            }}
          />
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </MentorChatProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
