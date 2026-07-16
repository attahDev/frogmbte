import ClimateToolkit from "./climateToolkits";
import SustainabilityStats from "./SustainabilityStats";
import RightRail from "./RightRail";
import SustainabilityLearningSection from "./SustainabilityLearning";
import MeasureYourImpact from "./MeasureYourImpact";
import GreenExchange from "./GreenExchange";
import ExpertSupport from "./ExpertSupport";
import GreenInnovationProjects from "./GreenInnovationProject";
import ClimateInsightsData from "./ClimateInsightsData";

export default function ClimateActionIndex() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden bg-[#FFFDF7]">
      <ClimateToolkit />

      <div className="mx-auto w-full max-w-[1400px] space-y-6 px-4 py-4 sm:space-y-8 sm:px-6 sm:py-6 lg:px-8">
        <SustainabilityStats />

        <section className="grid w-full grid-cols-1 gap-6 lg:gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(320px,390px)] xl:items-start">
          <main className="min-w-0 space-y-6 sm:space-y-8">
            <SustainabilityLearningSection />
            <MeasureYourImpact />
            <GreenExchange />
            <ExpertSupport />
            <GreenInnovationProjects />
            <ClimateInsightsData />
          </main>

          <aside className="min-w-0 w-full xl:sticky xl:top-6 xl:self-start">
            <RightRail />
          </aside>
        </section>
      </div>
    </div>
  );
}
