import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { api } from "../../../lib/api";

type Spotlight = {
  id: string;
  shoutout: string;
  mentor: { id: string; name: string; role: string; company: string | null; avatarUrl: string | null };
};

export default function MentorSpotlightBanner() {
  const [spotlights, setSpotlights] = useState<Spotlight[]>([]);

  useEffect(() => {
    api
      .get("/mentors/spotlight/active")
      .then(({ data }) => setSpotlights(data?.data ?? data ?? []))
      .catch(() => setSpotlights([]));
  }, []);

  if (spotlights.length === 0) return null;
  const spotlight = spotlights[0]; // most recently published active shoutout

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-yellow-200 bg-yellow-50/60 p-4 sm:p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFD700]">
        <Sparkles className="h-5 w-5 text-[#001F3F]" />
      </div>
      <div className="min-w-0">
        <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-[#B08900]">Mentor Spotlight</p>
        <p className="text-sm text-gray-700">{spotlight.shoutout}</p>
        <p className="mt-1 text-xs text-gray-500">
          — {spotlight.mentor.name}, {spotlight.mentor.role}
          {spotlight.mentor.company ? ` at ${spotlight.mentor.company}` : ""}
        </p>
      </div>
    </div>
  );
}
