import { useEffect, useState } from "react";
import {
    Calendar,
    Clock,
    ArrowRight,
} from "lucide-react";
import { fetchUpcomingEvents, type UiEvent } from "../../../../lib/eventsApi";

export default function EducationToolkitCommunity() {
    // "Related Events" used to be three events hard-typed into JSX with
    // fixed dates — now real upcoming events, featured ones first.
    const [events, setEvents] = useState<UiEvent[] | null>(null);

    useEffect(() => {
        fetchUpcomingEvents()
            .then((data) => setEvents(data.slice(0, 3)))
            .catch(() => setEvents([]));
    }, []);

    return (
        <div className="px-10 py-16 bg-[#FFFDF7] space-y-16">
            {/* ---------------- Related Events ---------------- */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-[28px] font-semibold text-[#001F3F]">
                        Related Events
                    </h2>

                    <button className="border border-[#001F3F] px-6 py-2 rounded-full text-[#001F3F] font-medium hover:bg-[#001F3F] hover:text-white transition">
                        View All Events
                    </button>
                </div>

                {events === null ? (
                    <p className="text-sm text-[#6B7280]">Loading events…</p>
                ) : events.length === 0 ? (
                    <p className="text-sm text-[#6B7280]">No events have been published yet — check back soon.</p>
                ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            tag={event.format}
                            title={event.title}
                            desc={event.description}
                            date={event.date}
                            time={event.time}
                            image={event.image}
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
}: {
    tag: string;
    icon?: React.ReactNode;
    title: string;
    desc: string;
    date: string;
    time: string;
    image: string;
}) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
            <div className="relative">
                <img
                    src={image}
                    alt={title}
                    className="h-48 w-full object-cover"
                />

                <span className="absolute top-4 right-4 bg-[#FFD700] text-[#001F3F] px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                    <span className="flex items-center">{icon}</span>
                    <span>{tag}</span>
                </span>

            </div>

            <div className="p-6">
                <h3 className="text-[20px] font-semibold text-[#001F3F] mb-2">
                    {title}
                </h3>

                <p className="text-[#64748B] text-sm mb-4">
                    {desc}
                </p>

                <div className="flex flex-col gap-2 text-sm text-[#001F3F] mb-6">
                    <span className="flex items-center gap-2">
                        <Calendar size={16} className="text-[#D7263D]" />
                        {date}
                    </span>

                    <span className="flex items-center gap-2">
                        <Clock size={16} className="text-[#D7263D]" />
                        {time}
                    </span>
                </div>

                <button className="w-full bg-[#D7263D] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2">
                    View Details <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}
