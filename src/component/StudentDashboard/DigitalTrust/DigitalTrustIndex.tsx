import { BookOpen, Calendar, Lock, ShieldCheck, Users } from "lucide-react";
import CommunitySpotlight from "../DashboardSection/CommunitySpotlight";
import EducationToolkitCommunity from "../ServicesSection/Toolkits/EducationToolkitCommunity";
import CollaborationLiveSessions from "../ToolkitsSection/CollaborativeSession";
import CommunityMentorship from "../ToolkitsSection/CommunityMentorship";
import ServiceToolkitAbout from "../ui/ServiceToolkitAbout";
import ServiceToolkitHero from "../ui/ServiceToolkitHero";

export default function DigitalTrustIndex() {
  return (
    <div className="min-w-0 overflow-x-hidden bg-[#FFFDF7] pb-20 lg:pb-8">
      <ServiceToolkitHero
        breadcrumb="Digital Trust"
        eyebrow="Digital Trust Toolkit"
        title="Security, Privacy & Digital Trust"
        icon={ShieldCheck}
        stats={[
          {
            title: "Trust Guides",
            value: 8,
            label: "Guides & Checklists",
            icon: BookOpen,
            badge: "Active",
            tone: "gold",
          },
          {
            title: "Trust Advisors",
            value: 5,
            label: "Available Now",
            icon: Users,
            badge: "Online",
            tone: "navy",
          },
          {
            title: "Workshops",
            value: 4,
            label: "This Month",
            icon: Calendar,
            badge: "Open",
            tone: "red",
          },
        ]}
      />

      <ServiceToolkitAbout
        title="About Digital Trust"
        description="The Digital Trust toolkit helps founders and teams build secure products, protect user data, and earn customer confidence. Access practical guides on cybersecurity basics, privacy compliance, fraud prevention, and trusted product practices — with mentorship from advisors who work in Greater Manchester's tech ecosystem."
        primaryLabel="View Trust Guides"
        secondaryLabel="Join Workshop"
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#001F3F]/70">
          <Lock className="h-4 w-4 text-[#D7263D]" />
          Secure collaboration & learning sessions
        </div>
      </div>

      <CollaborationLiveSessions />
      <CommunityMentorship />
      <EducationToolkitCommunity />
      <CommunitySpotlight />
    </div>
  );
}
