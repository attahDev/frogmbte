import { useEffect, useState } from "react";
import {
    Calendar,
    Clock,
    ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchUpcomingEvents, type UiEvent } from "../../../../lib/eventsApi";

export default function EducationToolkitCommunity() {
    // "Related Events" used to be three events hard-typed into JSX with
    // fixed dates — now real upcoming events, featured ones first.
    const [events, setEvents] = useState<UiEvent[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUpcomingEvents()
            .then((data) => setEvents(data.slice(0, 3)))
            .catch(() => setEvents([]));
    }, []);

    return (
        <div className="px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 bg-[#FFFDF7] space-y-10 sm:space-y-12 md:space-y-16">
            {/* ---------------- Related Events ---------------- */}
            <section>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl md:text-[28px] font-semibold text-[#001F3F]">
                        Related Events
                    </h2>

                    <button
                        onClick={() => navigate("/dashboard/events")}
                        className="border border-[#001F3F] px-4 sm:px-6 py-2 rounded-full text-[#001F3F] text-sm sm:text-base font-medium hover:bg-[#001F3F] hover:text-white transition"
                    >
                        View All Events
                    </button>
                </div>

                {events === null ? (
                    <p className="text-sm text-[#6B7280]">Loading events…</p>
                ) : events.length === 0 ? (
                    <p className="text-sm text-[#6B7280]">No events have been published yet — check back soon.</p>
                ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            tag={event.format}
                            title={event.title}
                            desc={event.description}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                            onView={() => navigate("/dashboard/events")}
                        />
                    ))}
                </div>
                )}
            </section>


        </div>
    );
}

/* ---------------- Components ---------------- */

function EventCard({
    tag,
    icon,
    title,
    desc,
    date,
    time,
    image,
    onView,
}: {
    tag: string;
    icon?: React.ReactNode;
    title: string;
    desc: string;
    date: string;
    time: string;
    image: string;
    onView: () => void;
}) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
            <div className="relative">
                <img
                    src={image}
                    alt={title}
                    className="h-40 sm:h-48 w-full object-cover"
                />

                <span className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-[#FFD700] text-[#001F3F] px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2">
                    <span className="flex items-center">{icon}</span>
                    <span>{tag}</span>
                </span>

            </div>

            <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-[20px] font-semibold text-[#001F3F] mb-2">
                    {title}
                </h3>

                <p className="text-[#64748B] text-sm mb-4 line-clamp-2">
                    {desc}
                </p>

                <div className="flex flex-col gap-2 text-sm text-[#001F3F] mb-5 sm:mb-6">
                    <span className="flex items-center gap-2">
                        <Calendar size={16} className="text-[#D7263D]" />
                        {date}
                    </span>

                    <span className="flex items-center gap-2">
                        <Clock size={16} className="text-[#D7263D]" />
                        {time}
                    </span>
                </div>

                <button
                    onClick={onView}
                    className="w-full bg-[#D7263D] text-white py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition hover:bg-[#BE1F34]"
                >
                    View Details <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}
