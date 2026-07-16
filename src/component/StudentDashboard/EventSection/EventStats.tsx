export default function EventsStats() {
  const cards = [
    { label: "Upcoming", value: 5 },
    { label: "Attended", value: 3 },
    { label: "Saved", value: 2 },
  ];

  return (
    <>
      <div className="w-full bg-[#FFFDF7] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="mb-1 mt-2 text-2xl font-bold text-[#0A2342] sm:mb-2 sm:mt-4 sm:text-3xl lg:text-4xl">
            My Events
          </h1>
          <p className="mb-6 text-sm text-gray-500 sm:mb-8 sm:text-base lg:mb-10 lg:text-lg">
            Keep track of your upcoming and past events all in one place.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {cards.map((card) => (
              <div
                key={card.label}
                className="relative flex items-center justify-between rounded-xl border border-[#FFD700] bg-[#FFFEF5] px-5 py-5 shadow-sm sm:rounded-2xl sm:px-6 sm:py-6 lg:px-8 lg:py-8"
              >
                <div>
                  <p className="text-gray-500 text-sm sm:text-base md:text-lg mb-1">
                    {card.label}
                  </p>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A2342]">
                    {card.value}
                  </p>
                </div>

                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#FFD700] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <svg 
                    width="20" 
                    height="20" 
                    className="sm:w-6 sm:h-6"
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 2V6" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 2V6" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 10H21" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}