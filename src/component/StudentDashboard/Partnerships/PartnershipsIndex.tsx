import { Building2, Calendar, Handshake, Target, Users } from "lucide-react";
import CommunitySpotlight from "../DashboardSection/CommunitySpotlight";
import EducationToolkitCommunity from "../ServicesSection/Toolkits/EducationToolkitCommunity";
import CollaborationLiveSessions from "../ToolkitsSection/CollaborativeSession";
import CommunityMentorship from "../ToolkitsSection/CommunityMentorship";
import RealWorldPractice from "../ToolkitsSection/RealWorldPractice";
import ServiceToolkitAbout from "../ui/ServiceToolkitAbout";
import ServiceToolkitHero from "../ui/ServiceToolkitHero";

export default function PartnershipsIndex() {
  return (
    <div className="min-w-0 overflow-x-hidden bg-[#FFFDF7] pb-20 lg:pb-8">
      <ServiceToolkitHero
        breadcrumb="Partnerships"
        eyebrow="Partnerships Toolkit"
        title="Strategic Partnerships & Collaborations"
        icon={Handshake}
        stats={[
          {
            title: "Partner Orgs",
            value: 14,
            label: "Active Networks",
            icon: Building2,
            badge: "Active",
            tone: "gold",
          },
          {
            title: "Open Opportunities",
            value: 9,
            label: "Collaborate Now",
            icon: Target,
            badge: "Open",
            tone: "navy",
          },
          {
            title: "Connector Mentors",
            value: 6,
            label: "Ready to Intro",
            icon: Users,
            badge: "Online",
            tone: "red",
          },
        ]}
      />

      <ServiceToolkitAbout
        title="About Partnerships"
        description="The Partnerships toolkit connects you with organisations, sponsors, and collaborators across Greater Manchester. Discover co-branded opportunities, referral networks, and introduction paths that help your venture grow — including events, shared programmes, and mentor-led matchmaking."
        primaryLabel="Browse Partners"
        secondaryLabel="Join Mixer"
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#001F3F]/70">
          <Calendar className="h-4 w-4 text-[#D7263D]" />
          Partner sessions & collaboration rooms
        </div>
      </div>

      <CollaborationLiveSessions />
      <CommunityMentorship />
      <RealWorldPractice />
      <EducationToolkitCommunity />
      <CommunitySpotlight />
    </div>
  );
}
