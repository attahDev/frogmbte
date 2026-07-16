export default function EventsHighlights() {
  const cards = [
    {
      id: 1,
      title: "Annual Tech Expo 2024",
      year: "2024",
      image: "/events/expo/event-expo1.jpg",
      alt: "The exterior of the Hong Kong exhibition centre",
    },
    {
      id: 2,
      title: "Coding Workshop Series",
      year: "2024",
      image: "/events/expo/event-expo2.jpg",
      alt: "A diverse group of seven women collaborate around laptops and tablets in a bright office.",
    },
    {
      id: 3,
      title: "Entrepreneur Summit",
      year: "2024",
      image: "/events/expo/event-expo3.jpg",
      alt: "A group of people seated attentively in a seminar room.",
    },
    {
      id: 4,
      title: "Virtual Conference 2023",
      year: "2023",
      image: "/events/expo/event-expo4.jpg",
      alt: "Scrabble tiles on a dark wooden surface spell Virtual learning in a cross shape, surrounded by scattered letters.",
    },
  ];

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
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          {cards.map((card) => (
            <article
              key={card.id}
              className="relative group w-full max-w-[320px] sm:max-w-[350px] h-[280px] sm:h-[300px] bg-white rounded-[14px] overflow-hidden shadow-lg hover:shadow-2xl transform transition duration-300 hover:-translate-y-2"
            >
              {/* Background image */}
              <img
                src={card.image}
                alt={card.alt}
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
                    {card.title}
                  </h3>
                  <span className="mt-1 text-yellow-300 text-sm font-medium drop-shadow">
                    {card.year}
                  </span>
                </div>
              </div>

              {/* Accessibility */}
              <a
                href="#"
                className="absolute inset-0 focus:outline-none"
                aria-label={`${card.title} - ${card.year}`}
              />
            </article>
          ))}
        </div>

        {/* CTA button */}
        <div className="mt-12">
          <a
            href="#"
            className="inline-flex text-[15px] sm:text-[16px] items-center gap-3 bg-[#D7263D] hover:bg-[#C61E33] text-[#FFFFFF] font-medium px-6 py-3 rounded-md shadow-md transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D9384E]/30"
          >
            <span>View Gallery</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M5 12h14M13 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
