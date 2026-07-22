"use client";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowRight, Calendar, Clock, MapPin, Monitor, Users } from "lucide-react";
import { fetchUpcomingEvents, fetchAllEvents, type UiEvent, type EventFormat } from "../../lib/eventsApi";

type EventType = "in-person" | "virtual" | "hybrid";

const formatToType = (format: EventFormat): EventType =>
  format === "Virtual" ? "virtual" : format === "Hybrid" ? "hybrid" : "in-person";

const FILTERS: { id: string; label: string; type?: EventType | "all" }[] = [
  { id: "all", label: "All Events", type: "all" },
  { id: "in-person", label: "In person", type: "in-person" },
  { id: "virtual", label: "Virtual", type: "virtual" },
  { id: "hybrid", label: "Hybrid", type: "hybrid" },
];

function TypePill({ type }: { type: EventType }) {
  const map: Record<
    EventType,
    { bg: string; text: string; icon: ReactNode; label: string }
  > = {
    "in-person": {
      bg: "bg-emerald-100",
      text: "text-emerald-800",
      icon: <MapPin className="w-3.5 h-3.5 text-emerald-700" />,
      label: "In-Person",
    },
    virtual: {
      bg: "bg-sky-100",
      text: "text-sky-800",
      icon: <Monitor className="w-3.5 h-3.5 text-sky-700" />,
      label: "Virtual",
    },
    hybrid: {
      bg: "bg-violet-100",
      text: "text-violet-800",
      icon: <Users className="w-3.5 h-3.5 text-violet-700" />,
      label: "Hybrid",
    },
  };

  const cls = map[type];
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full shadow-sm ${cls.bg} ${cls.text}`}
    >
      {cls.icon}
      {cls.label}
    </span>
  );
}

function getBorderColor(_type: EventType): string {
  // All three used the same border color in the original design — kept as
  // a function in case that changes per-type later.
  return "border-[#FAD941]";
}

export default function EventsSection() {
  const [activeFilter, setActiveFilter] = useState<"all" | EventType | string>("all");
  const [events, setEvents] = useState<UiEvent[] | null>(null);
  const [showingAll, setShowingAll] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);

  useEffect(() => {
    fetchUpcomingEvents()
      .then(setEvents)
      .catch(() => setEvents([]));
  }, []);

  const viewAllEvents = () => {
    setLoadingAll(true);
    fetchAllEvents()
      .then((all) => {
        setEvents(all);
        setShowingAll(true);
      })
      .catch(() => {})
      .finally(() => setLoadingAll(false));
  };

  const counts = useMemo(() => {
    const list = events ?? [];
    const all = list.length;
    const inPerson = list.filter((e) => formatToType(e.format) === "in-person").length;
    const virtual = list.filter((e) => formatToType(e.format) === "virtual").length;
    const hybrid = list.filter((e) => formatToType(e.format) === "hybrid").length;
    return { all, inPerson, virtual, hybrid };
  }, [events]);

  const filtered = useMemo(() => {
    const list = events ?? [];
    if (activeFilter === "all") return list;
    return list.filter((e) => formatToType(e.format) === activeFilter);
  }, [events, activeFilter]);

  return (
    <section className="w-full bg-[#FFFDF7] py-12 sm:py-16 mt-12 sm:mt-16 md:mt-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <span className="inline-block bg-[#F5F5F5] text-[#001F3F] px-3 py-1 rounded-full text-base sm:text-base mb-4">
            {showingAll ? "All Events" : "Upcoming Events"}
          </span>

          <h2 className="font-open-sans text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#001F3F] leading-tight">
            Don’t Miss Out on These Events
          </h2>

          <p className="text-sm sm:text-[18px] md:text-[20px] text-[#6B7280] mt-4 sm:mt-6 leading-relaxed px-2">
            From workshops and networking events to conferences and panel{" "}
            <br className="hidden sm:block" />
            discussions, there’s always something exciting happening in our
            community.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-3 sm:gap-6">
          {FILTERS.map((f) => {
            const isActive =
              activeFilter === f.type || (f.id === "all" && activeFilter === "all");
            const count =
              f.id === "all"
                ? counts.all
                : f.id === "in-person"
                  ? counts.inPerson
                  : f.id === "virtual"
                    ? counts.virtual
                    : counts.hybrid;

            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.type ?? "all")}
                className={`inline-flex items-center gap-3 px-5 sm:px-8 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-200 ${isActive
                    ? "bg-[#FAD941] text-[#001F3F] shadow-[0_4px_0_rgba(193,40,60,0.25)]"
                    : "bg-white text-[#001F3F] border border-slate-100 hover:shadow-sm"
                  }`}
              >
                <span>{f.label}</span>
                <span
                  className={`inline-flex items-center justify-center rounded-full min-w-[22px] sm:min-w-[24px] h-[22px] sm:h-[24px] px-2 text-xs sm:text-sm font-semibold ${isActive
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600"
                    }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        {events === null ? (
          <p className="mt-14 text-center text-[#6B7280]">Loading events…</p>
        ) : filtered.length === 0 ? (
          <p className="mt-14 text-center text-[#6B7280]">
            No events match this filter right now — check back soon.
          </p>
        ) : (
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {filtered.map((ev) => {
            const type = formatToType(ev.format);
            return (
            <article
              key={ev.id}
              className={`bg-white rounded-[14px] border-l-[4px] ${getBorderColor(
                type
              )} shadow-md overflow-hidden flex flex-col transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-2`}
            >
              {/* Image (only this scales on hover) */}
              <div className="relative h-[200px] sm:h-[220px] overflow-hidden group">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover rounded-t-[14px] transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                  <TypePill type={type} />
                </div>
                {ev.isCompleted && (
                  <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Completed
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#001F3F]">
                    {ev.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-[#6B7280] mt-2 leading-[22px] line-clamp-3">
                    {ev.description}
                  </p>

                  <ul className="mt-4 space-y-2 text-[13px] sm:text-[14px] text-[#4B5563]">
                    <li className="flex items-center gap-2 sm:gap-3">
                      <Calendar className="w-4 h-4 text-[#C1283C]" />
                      <span>{ev.date}</span>
                    </li>
                    <li className="flex items-center gap-2 sm:gap-3">
                      <Clock className="w-4 h-4 text-[#C1283C]" />
                      <span>{ev.time}</span>
                    </li>
                    <li className="flex items-center gap-2 sm:gap-3">
                      <MapPin className="w-4 h-4 text-[#C1283C]" />
                      <span>{ev.location || "Virtual"}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-5">
                  {ev.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {ev.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <a
                    href={ev.link ?? "#"}
                    target={ev.link ? "_blank" : undefined}
                    rel={ev.link ? "noreferrer" : undefined}
                    className="w-full inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#D7263D] text-white px-4 py-2 sm:py-3 rounded-lg shadow-md hover:bg-[#A31F32] transition-all duration-300"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
            );
          })}
        </div>
        )}

        {/* View All Button */}
        {!showingAll && (
        <div className="mt-12 flex  justify-center">
          <button
            onClick={viewAllEvents}
            disabled={loadingAll}
            className="inline-flex items-center gap-2 sm:gap-3 bg-[#D7263D] text-white px-5 sm:px-6 py-2 sm:py-3 rounded-xl shadow hover:bg-[#A31F32] transition disabled:opacity-60"
          >
            {loadingAll ? "Loading…" : "View All Events"}

            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.3335 1.33337V4.00004" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.6665 1.33337V4.00004" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.6667 2.66663H3.33333C2.59695 2.66663 2 3.26358 2 3.99996V13.3333C2 14.0697 2.59695 14.6666 3.33333 14.6666H12.6667C13.403 14.6666 14 14.0697 14 13.3333V3.99996C14 3.26358 13.403 2.66663 12.6667 2.66663Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 6.66663H14" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        )}
      </div>
    </section>
  );
}
