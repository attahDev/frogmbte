import GreenImpactProfile from "./Component/RightSide/GreenImpactProfile";
import SustainabilityAchievements from "./Component/RightSide/SustainabilityAchievements";
import SustainabilityLeaderboard from "./Component/RightSide/SustainabilityLeaderboard";
import AIGreenAdvisor from "./Component/RightSide/AIGreenAdvisor";

export default function RightRail() {
  return (
    <aside className="w-full space-y-5 sm:space-y-6 xl:max-w-[410px]">
      <GreenImpactProfile />
      <SustainabilityAchievements />
      <SustainabilityLeaderboard />
      <AIGreenAdvisor />
    </aside>
  );
}