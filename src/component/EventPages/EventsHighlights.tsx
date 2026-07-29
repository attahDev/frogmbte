import { useEffect, useState } from "react";
import { fetchPastEvents, type UiEvent } from "../../lib/eventsApi";

export default function EventsHighlights() {
  const [pastEvents, setPastEvents] = useState<UiEvent[] | null>(null);
  const [selected, setSelected] = useState<UiEvent | null>(null);

  useEffect(() => {
    fetchPastEvents()
      .then(setPastEvents)
      .catch(() => setPastEvents([]));
  }, []);

  // Nothing to show yet — no completed events with a recap. Don't render
  // an empty "Our Past Events" section.
  if (pastEvents !== null && pastEvents.length === 0) return null;

  return (
    <section className="bg-[#FFF9E6] py-16 px-4 sm:px-8 md:px-12 lg:px-24">
      <div className="mx-auto text-center max-w-7xl">
        {/* Small pill label */}
        <span className="inline-block bg-[#FFFEFB] text-[#001F3F] rounded-full px-4 py-1 text-sm sm:text-[14px] font-medium shadow-sm">
          Our Past Events
        </span>

        {/* Heading */}
        <h2 className="mt-6 text-[26px] sm:text-[30px] md:text-[35px] font-extrabold text-[#001F3F] leading-tight">
          Highlights from Previous Editions
        </h2>

        {/* Subheading */}
        <p className="mt-4 max-w-[900px] mx-auto text-[#6B7280] text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed">
          From tech meetups to mentorship sessions, every event has helped us
          shape a stronger, more connected community.
        </p>

        {/* Cards grid */}
        {pastEvents === null ? (
          <p className="mt-14 text-[#6B7280]">Loading past events…</p>
        ) : (
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
            {pastEvents.slice(0, 8).map((ev) => (
              <article
                key={ev.id}
                className="relative group w-full max-w-[320px] sm:max-w-[350px] h-[280px] sm:h-[300px] bg-white rounded-[14px] overflow-hidden shadow-lg hover:shadow-2xl transform transition duration-300 hover:-translate-y-2"
              >
                {/* Background image — recap gallery's first shot if there is
                    one, otherwise the event's own cover image. */}
                <img
                  src={ev.recap?.gallery?.[0] || ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#001F3FE5] via-[#001F3F66] to-transparent"
                  aria-hidden="true"
                />

                {/* Card content */}
                <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between">
                  <div className="flex flex-col items-start">
                    <h3 className="text-white text-[16px] sm:text-[18px] font-semibold leading-snug drop-shadow-lg">
                      {ev.title}
                    </h3>
                    <span className="mt-1 text-yellow-300 text-sm font-medium drop-shadow">
                      {ev.date}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelected(ev)}
                  className="absolute inset-0 focus:outline-none"
                  aria-label={`View recap: ${ev.title}`}
                />
              </article>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-white overflow-hidden max-h-[90vh] overflow-y-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[220px] sm:h-[280px]">
              <img
                src={selected.recap?.gallery?.[0] || selected.image}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
              >
                ✕
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-[#001F3F]">{selected.title}</h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                {selected.date} · {selected.location || "Virtual"}
              </p>

              {selected.recap?.summary && (
                <div className="mt-5">
                  <h4 className="text-sm font-semibold text-[#001F3F] uppercase tracking-wide">
                    What Happened
                  </h4>
                  <p className="mt-2 text-sm sm:text-[15px] text-[#4B5563] leading-relaxed whitespace-pre-line">
                    {selected.recap.summary}
                  </p>
                </div>
              )}

              {selected.recap?.speakers && selected.recap.speakers.length > 0 && (
                <div className="mt-5">
                  <h4 className="text-sm font-semibold text-[#001F3F] uppercase tracking-wide">
                    Who Spoke
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selected.recap.speakers.map((s) => (
                      <span key={s} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selected.recap?.achievements && selected.recap.achievements.length > 0 && (
                <div className="mt-5">
                  <h4 className="text-sm font-semibold text-[#001F3F] uppercase tracking-wide">
                    What We Achieved
                  </h4>
                  <ul className="mt-2 space-y-1.5 text-sm text-[#4B5563] list-disc list-inside">
                    {selected.recap.achievements.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selected.recap?.gallery && selected.recap.gallery.length > 1 && (
                <div className="mt-5">
                  <h4 className="text-sm font-semibold text-[#001F3F] uppercase tracking-wide">
                    Gallery
                  </h4>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {selected.recap.gallery.map((url) => (
                      <img
                        key={url}
                        src={url}
                        alt=""
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {!selected.recap?.summary &&
                !selected.recap?.speakers?.length &&
                !selected.recap?.achievements?.length && (
                  <p className="mt-5 text-sm text-gray-500">
                    Full recap coming soon — check back for photos and highlights.
                  </p>
                )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
