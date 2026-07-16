import { useMemo, useState } from "react";
import { api } from "../../../lib/api";
import { useApiGet } from "../hooks/useApiGet";
import CardSkeleton from "../shared/CardSkeleton";
import EmptyState from "../../MarketResearchDashboard/ui/EmptyState";

interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string | null;
  avatarUrl: string | null;
  bio: string | null;
  skills: string[];
}

const FILTERS = ["UI/UX", "Engineering", "Marketing", "AI", "Cybersecurity"];

export default function FindMentor() {
  const { data: mentors, loading, error } = useApiGet<Mentor[]>("/mentors", []);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [connectedIds, setConnectedIds] = useState<Set<string>>(new Set());
  const [connectError, setConnectError] = useState<string | null>(null);

  const filteredMentors = useMemo(() => {
    const list = mentors ?? [];
    return list.filter((m) => {
      const matchesFilter = !activeFilter || m.skills.some((s) => s.toLowerCase().includes(activeFilter.toLowerCase()));
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.skills.some((s) => s.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });
  }, [mentors, activeFilter, search]);

  const handleConnect = async (mentorId: string) => {
    setConnectError(null);
    setConnectingId(mentorId);
    try {
      await api.post(`/mentors/${mentorId}/connect`);
      setConnectedIds((prev) => new Set(prev).add(mentorId));
    } catch (err: any) {
      const alreadyConnected = err?.response?.status === 409;
      if (alreadyConnected) {
        setConnectedIds((prev) => new Set(prev).add(mentorId));
      } else {
        setConnectError("Couldn't send that request. Please try again.");
      }
    } finally {
      setConnectingId(null);
    }
  };

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B2545] mb-2">Find a Mentor</h2>
      <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-3xl">
        Explore experienced professionals ready to guide your career in tech.
      </p>

      {/* Filters + Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">
        {/* Filters (LEFT) */}
        <div className="flex gap-2 sm:gap-3 lg:gap-4 flex-wrap">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(isActive ? null : filter)}
                aria-pressed={isActive}
                className={`px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border-2 text-xs sm:text-sm lg:text-base font-medium transition ${
                  isActive
                    ? "border-[#D7263D] bg-[#D7263D] text-white"
                    : "border-[#FFD700] text-[#0B2545] bg-white hover:bg-yellow-50"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Search (RIGHT) */}
        <div className="w-full min-w-0 lg:max-w-xl lg:shrink-0">
          <div className="bg-gray-100 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-3 text-[#6B7280]">
            <span className="text-lg sm:text-xl flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.9998 14L11.1064 11.1067" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for mentors and career leaders..."
              className="bg-transparent outline-none w-full text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base"
            />
          </div>
        </div>
      </div>

      {connectError && (
        <p className="mb-4 text-sm text-[#D7263D]" role="alert">{connectError}</p>
      )}

      {/* Mentor Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {[0, 1, 2].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <p className="text-sm text-[#D7263D]">{error}</p>
      ) : filteredMentors.length === 0 ? (
        <EmptyState
          title={mentors && mentors.length > 0 ? "No mentors match that search" : "No mentors available right now"}
          description={
            mentors && mentors.length > 0
              ? "Try a different filter or search term."
              : "Check back soon — new mentors are added regularly."
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredMentors.map((m) => {
            const isConnected = connectedIds.has(m.id);
            const isConnecting = connectingId === m.id;
            return (
              <div
                key={m.id}
                className="bg-[#FFFDF7] rounded-2xl sm:rounded-3xl shadow-md p-4 sm:p-5 lg:p-6 flex flex-col border border-[#0000001A] hover:shadow-xl transition"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={m.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(m.name)}`}
                      alt={m.name}
                      className="h-16 w-16 rounded-full object-cover sm:h-[72px] sm:w-[72px] lg:h-20 lg:w-20"
                    />
                    <span className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 w-3 h-3 sm:w-4 sm:h-4 bg-[#00C950] border-2 border-white rounded-full"></span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#0B2545] truncate">{m.name}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm truncate">
                      {m.role}{m.company ? `, ${m.company}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 sm:gap-3 flex-wrap mb-3 sm:mb-4">
                  {m.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 sm:px-3 lg:px-4 py-1 bg-yellow-50 text-[#001F3F] rounded-lg sm:rounded-xl border border-yellow-100 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-[#4A5565] text-xs sm:text-sm mb-4 sm:mb-5 lg:mb-6 leading-relaxed flex-grow">
                  {m.bio || "This mentor hasn't added a bio yet."}
                </p>

                <button
                  onClick={() => handleConnect(m.id)}
                  disabled={isConnecting || isConnected}
                  className="w-full bg-[#D7263D] hover:bg-[#B91C32] disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition"
                >
                  {isConnected ? "Request Sent" : isConnecting ? "Sending..." : "Request Mentorship"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
