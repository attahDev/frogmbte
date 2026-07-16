import React from "react";

const ClimateImpact: React.FC = () => {
  return (
    <section className="w-full bg-[#FDFBF7] px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-8xl px-3 sm:p-5">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#001F3F] via-[#0B2C56] to-[#003366] px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-14 text-white shadow-xl">
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 md:items-center">
            {/* LEFT CONTENT */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-yellow-400 text-[#071B3A] flex-shrink-0">
                  <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.9997 20C9.24379 20.0053 7.54999 19.3505 6.25425 18.1654C4.95852 16.9803 4.1555 15.3515 4.00447 13.6021C3.85344 11.8527 4.36543 10.1104 5.43888 8.72074C6.51234 7.33112 8.06886 6.3957 9.79974 6.1C15.4997 5 16.9997 4.48 18.9997 2C19.9997 4 20.9997 6.18 20.9997 10C20.9997 15.5 16.2197 20 10.9997 20Z" stroke="#001F3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 21C2 18 3.85 15.64 7.08 15C9.5 14.52 12 13 13 12" stroke="#001F3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Our Climate Impact
                </h2>
              </div>

              <p className="mt-4 sm:mt-5 max-w-md text-sm sm:text-base leading-relaxed text-gray-200">
                Thanks to our community choosing virtual events and greener
                habits, we&apos;ve already saved 450kg of CO₂. A real step
                toward a more sustainable Greater Manchester.
              </p>

              <button className="mt-6 sm:mt-8 inline-flex items-center justify-center rounded-lg sm:rounded-xl bg-[#D7263D] px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-white transition hover:bg-red-600">
                View Climate Stats
              </button>
            </div>

            {/* RIGHT SIDE: CIRCULAR PROGRESS + STATS */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center md:col-span-1 md:justify-end">
              {/* CIRCULAR PROGRESS */}
              <div className="flex justify-center">
                <div className="relative h-36 w-36 sm:h-44 sm:w-44 md:h-48 md:w-48">
                  {/* Background circle */}
                  <div className="absolute inset-0 rounded-full border-[16px] sm:border-[18px] md:border-[20px] border-white/10" />

                  {/* Progress segments with rotation animation */}
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s' }}>
                    <div
                      className="absolute inset-0 rounded-full border-[16px] sm:border-[18px] md:border-[20px] border-yellow-400"
                      style={{
                        clipPath:
                          "polygon(50% 0%, 100% 0%, 100% 50%, 75% 50%, 75% 25%, 50% 25%)",
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-full border-[16px] sm:border-[18px] md:border-[20px] border-yellow-400 rotate-[120deg]"
                      style={{
                        clipPath:
                          "polygon(50% 0%, 100% 0%, 100% 50%, 75% 50%, 75% 25%, 50% 25%)",
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-full border-[16px] sm:border-[18px] md:border-[20px] border-yellow-400 rotate-[240deg]"
                      style={{
                        clipPath:
                          "polygon(50% 0%, 100% 0%, 100% 50%, 75% 50%, 75% 25%, 50% 25%)",
                      }}
                    />
                  </div>

                  {/* Center text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl sm:text-4xl font-bold">65%</span>
                    <span className="text-xs sm:text-sm text-gray-300">Goal</span>
                  </div>
                </div>
              </div>

              {/* STATS */}
              <div className="space-y-6 sm:space-y-8 w-full sm:w-auto">
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="text-lg sm:text-xl text-green-400 flex-shrink-0">↗</span>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-300">Virtual Events</p>
                    <p className="text-base sm:text-lg font-semibold">
                      285kg CO₂ saved
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="text-lg sm:text-xl text-green-400 flex-shrink-0">↗</span>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-300">
                      Green Initiatives
                    </p>
                    <p className="text-base sm:text-lg font-semibold">
                      165kg CO₂ saved
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClimateImpact;