import { useAuth } from "../../../contexts/mainuseAuth";
import { MentorIndex } from "./MentorIndex";
import MyMentees from "./MyMentees";

/** Single /dashboard/mentors route, two different experiences: a promoted
 *  MENTOR sees their mentee-management hub, everyone else sees the regular
 *  "find & track my mentors" hub. Keeps one nav slot and one route instead
 *  of branching in the sidebar and the router both. */
export default function MentorsRouteSwitch() {
  const { user } = useAuth();
  return user?.role === "MENTOR" ? <MyMentees /> : <MentorIndex />;
}
