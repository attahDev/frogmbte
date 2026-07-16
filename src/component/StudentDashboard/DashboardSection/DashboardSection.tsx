import CommunitySpotlight from "./CommunitySpotlight";
import DashboardHero from "./dashboardHero";
import EventsSection from "./Evensection";
// import DashboardLayout from "./DashboardLayout";
// import DashboardCards from "./Dashboardscard";
// import RightSidebar from "./RightSidebar";


const DashboardSection = () => {
  return (
    <div className="min-w-0 overflow-x-hidden bg-[#FFFDF7] pb-20 lg:pb-8">
      <DashboardHero />
      <EventsSection />
      <CommunitySpotlight />
    </div>
  );
};

export default DashboardSection;
