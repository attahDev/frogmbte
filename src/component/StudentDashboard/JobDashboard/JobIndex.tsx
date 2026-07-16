import CommunitySpotlight from "../DashboardSection/CommunitySpotlight";
import AICareerTips from "./AICareerTips";
// import CareerToolsSection from "./CareerToolsSection";
import JobToolkit from "./component/JobToolkit";
import JobOpportunitiesPage from "./JobOpportunitiesPage";

export default function JobIndex() {
  return (
    <div className="min-w-0 overflow-x-hidden bg-[#FFFDF7] pb-24 lg:pb-6">
      <JobToolkit />
      <div className="mx-auto w-full max-w-[1400px] space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 lg:px-8">
        <JobOpportunitiesPage />
        {/* <CareerToolsSection /> */}
        <AICareerTips />
        <CommunitySpotlight />
      </div>
    </div>
  );
}
