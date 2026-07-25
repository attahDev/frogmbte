import { useState } from "react";
import { Bot, Users } from "lucide-react";
import FindMentor from "./FindMentor";
import MentorsDashboard from "./mentorsDashboard";
import MentorshipProgress from "./MentorshipProgress";
import MentorSpotlight from "./MentorSpotlight";
import { MentorIndexAI as BusinessMentorAI } from "../MentorDashboard/MentorIndex";

type Tab = "mentors" | "ai";

export const MentorIndex = () => {
  const [tab, setTab] = useState<Tab>("mentors");

  return (
    <div className="min-w-0 overflow-x-hidden bg-[#FFFDF7] pb-20 lg:pb-8">
      <div className="sticky top-0 z-10 flex gap-2 border-b border-slate-200 bg-[#FFFDF7] px-4 pt-4 sm:px-6">
        <button
          type="button"
          onClick={() => setTab("mentors")}
          className={`flex items-center gap-2 rounded-t-xl px-4 py-2.5 text-sm font-semibold transition ${
            tab === "mentors"
              ? "border border-b-0 border-slate-200 bg-white text-[#001F3F]"
              : "text-slate-500 hover:text-[#001F3F]"
          }`}
        >
          <Users className="h-4 w-4" />
          Find a Mentor
        </button>
        <button
          type="button"
          onClick={() => setTab("ai")}
          className={`flex items-center gap-2 rounded-t-xl px-4 py-2.5 text-sm font-semibold transition ${
            tab === "ai"
              ? "border border-b-0 border-slate-200 bg-white text-[#001F3F]"
              : "text-slate-500 hover:text-[#001F3F]"
          }`}
        >
          <Bot className="h-4 w-4" />
          AI Mentor
        </button>
      </div>

      {tab === "mentors" ? (
        <>
          <MentorsDashboard />
          <MentorshipProgress />
          <FindMentor limit={15} />
          <MentorSpotlight />
        </>
      ) : (
        <div className="mx-auto h-[calc(100dvh-180px)] max-w-4xl px-4 py-4 sm:px-6">
          <BusinessMentorAI />
        </div>
      )}
    </div>
  );
};
