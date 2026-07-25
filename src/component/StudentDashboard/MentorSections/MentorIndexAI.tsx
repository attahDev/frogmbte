import BusinessMentorChat from "../../MarketResearchDashboard/ChatSideBar/ChatSideBar";

/**
 * Standalone full-page AI Mentor — same chat component used in the
 * "AI Mentor" tab on the My Mentor page (MentorIndex.tsx), just given
 * its own dedicated route at /dashboard/mentors-ai.
 */
export default function MentorIndexAI() {
  return (
    <div className="mx-auto h-[calc(100dvh-97px)] max-w-3xl px-4 py-4 sm:px-6">
      <BusinessMentorChat />
    </div>
  );
}
