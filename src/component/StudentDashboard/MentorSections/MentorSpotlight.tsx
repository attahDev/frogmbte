import { useApiGet } from "../hooks/useApiGet";

interface SpotlightMentor {
  id: string;
  name: string;
  role: string;
  company: string | null;
  avatarUrl: string | null;
}

interface Spotlight {
  id: string;
  shoutout: string;
  mentor: SpotlightMentor;
}

/** Admin-curated shoutout — content comes from the "Mentor Spotlight" panel
 *  in the admin portal (create/update/remove a MentorSpotlight record for a
 *  mentor). Pulls whatever's currently active; renders nothing if the admin
 *  hasn't set one up yet, rather than showing stale placeholder content. */
export default function MentorSpotlight() {
  const { data: spotlights, loading } = useApiGet<Spotlight[]>("/mentors/spotlight/active", []);
  const spotlight = spotlights?.[0];

  if (!loading && !spotlight) return null;

  return (
    <section className="w-full bg-[#FDFBF7] px-4 py-10 sm:px-6 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl md:text-[40px] font-bold leading-tight text-[#0B1F3B]">
          Mentor Spotlight
        </h2>
        <p className="mt-2 sm:mt-3 text-base sm:text-lg text-gray-600">
          Meet professionals making a difference in our community
        </p>

        {/* Card */}
        {loading || !spotlight ? (
          <div className="mt-8 sm:mt-10 md:mt-14 h-64 animate-pulse rounded-2xl sm:rounded-3xl md:rounded-[28px] bg-gray-200 sm:h-56" />
        ) : (
          <div className="mt-8 sm:mt-10 md:mt-14 rounded-2xl sm:rounded-3xl md:rounded-[28px] bg-gradient-to-r from-[#081A36] to-[#0B2C56] p-6 sm:p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12">
              {/* Image Slot */}
              <div className="shrink-0 mx-auto sm:mx-0">
                <div className="h-40 w-40 sm:h-44 sm:w-44 md:h-48 md:w-48 rounded-2xl overflow-hidden bg-gray-200">
                  <img
                    src={
                      spotlight.mentor.avatarUrl ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(spotlight.mentor.name)}`
                    }
                    alt={spotlight.mentor.name}
                    className="h-full w-full object-cover rounded-2xl"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col justify-center text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-1 sm:mb-2">
                  {spotlight.mentor.name}
                </h3>

                <p className="mt-1 text-base sm:text-lg font-medium text-[#FFD700]">
                  {spotlight.mentor.role}
                  {spotlight.mentor.company ? `, ${spotlight.mentor.company}` : ""}
                </p>

                <p className="mt-3 sm:mt-4 max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-gray-200">
                  {spotlight.shoutout}
                </p>

                <a
                  href="/dashboard/mentors/find"
                  className="mt-5 sm:mt-6 w-full sm:w-fit mx-auto sm:mx-0 rounded-xl bg-[#D7263D] px-6 sm:px-7 py-2.5 sm:py-3 text-center text-sm sm:text-base font-medium text-white transition hover:bg-red-600"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
