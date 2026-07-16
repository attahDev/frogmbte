import CommunitySpotlight from "../../DashboardSection/CommunitySpotlight"
import EducationToolkit from "./Educationaltoolkit"
import EducationToolkitCommunity from "./EducationToolkitCommunity"
import EducationToolkitContent from "./EducationToolkitContent"


export const ToolkIndex = () => {
  return (
   <>
   <EducationToolkit />
   <EducationToolkitContent />
   <EducationToolkitCommunity />
   <CommunitySpotlight />
   </>
  )
}
