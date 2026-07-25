import AICareerTips from "./AICareerTips";
// import CareerToolsSection from "./CareerToolsSection";
import JobToolkit from "./component/JobToolkit";
import JobOpportunitiesPage from "./JobOpportunitiesPage";
import { ErrorBoundary } from "../../ErrorBoundary";

export default function JobIndex() {
  return (
    <div className="min-w-0 overflow-x-hidden bg-[#FFFDF7] pb-24 lg:pb-6">
      <ErrorBoundary section="Job toolkit">
        <JobToolkit />
      </ErrorBoundary>
      <div className="mx-auto w-full max-w-[1400px] space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 lg:px-8">
        <JobOpportunitiesPage />
        {/* <CareerToolsSection /> */}
        <ErrorBoundary section="AI career tips">
          <AICareerTips />
        </ErrorBoundary>
      </div>
    </div>
  );
}
