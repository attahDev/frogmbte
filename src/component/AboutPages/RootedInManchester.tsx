import React, { useState } from "react";

const boroughs = [
  { label: "Salford", top: "38%", left: "20%" },
  { label: "Oldham", top: "25%", left: "60%" },
  { label: "Manchester City Centre", top: "48%", left: "40%" },
  { label: "Stockport", top: "55%", left: "75%" },
];

const RootedInManchester: React.FC = () => {
  const [activeBorough, setActiveBorough] = useState<string | null>(null);
  const [bounceKey, setBounceKey] = useState(0);

  const handleBoroughSelect = (label: string) => {
    setActiveBorough(label);
    setBounceKey((key) => key + 1);
  };

  return (
    <section className="flex flex-col items-center text-center py-12 sm:py-16 md:py-20 bg-[#FFFDF7] mt-6 sm:mt-10">
      <div className="w-full max-w-xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-montserrat text-xl font-bold text-[#001F3F] mb-3 sm:text-[27px] md:text-[30px]">
          Rooted in Manchester
        </h2>
        <p className="text-[#001F3F] text-sm sm:text-base md:text-[18px] mt-2 leading-relaxed">
          Connecting every borough from Salford to Stockport, Wigan to Bury
          Greater Manchester thrives through opportunity and innovation.
        </p>
      </div>

      <div className="relative mt-8 sm:mt-12 bg-white rounded-xl border border-yellow-400 p-4 sm:p-6 md:p-10 shadow-[0_4px_10px_rgba(0,0,0,0.1)] w-full max-w-[1440px] mx-4 sm:mx-auto">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src="/about/manimg.jpg"
            alt="A modern skyline of tall skyscrapers at sunset, featuring diverse architectural styles."
            className="object-cover w-full h-[220px] sm:h-[320px] md:h-[400px] lg:h-[449px] rounded-lg"
          />

          {boroughs.map((borough) => (
            <Marker
              key={borough.label}
              label={borough.label}
              top={borough.top}
              left={borough.left}
              isActive={activeBorough === borough.label}
              bounceKey={
                activeBorough === borough.label ? bounceKey : 0
              }
              onSelect={() => handleBoroughSelect(borough.label)}
            />
          ))}

          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 hidden md:block bg-[#FFD700] text-[#001F3F] text-[10px] sm:text-[12px] md:text-[14px] px-2 sm:px-3 py-1 rounded-md shadow-sm max-w-[45%] sm:max-w-none leading-tight">
            Interactive map coming soon
          </div>
        </div>

        
        <div className="mt-4 flex flex-wrap justify-center gap-2 md:hidden">
          {boroughs.map((borough) => {
            const isActive = activeBorough === borough.label;
            return (
              <button
                key={borough.label}
                type="button"
                onClick={() => handleBoroughSelect(borough.label)}
                className={`rounded-full cursor-pointer px-3 py-1 text-[10px] font-medium sm:text-xs transition-all ${
                  isActive
                    ? "border-2 border-[#FFD700] bg-[#0D2149] text-white shadow-md"
                    : "border-2 border-transparent bg-[#0D2149] text-white"
                }`}
              >
                {borough.label}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className="mt-8 sm:mt-10 text-sm sm:text-[16px] bg-[#D7263D] hover:bg-[#D7263D]/90 transition text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-md shadow-md"
      >
        View Local Hubs
      </button>
    </section>
  );
};

interface MarkerProps {
  label: string;
  top: string;
  left: string;
  isActive: boolean;
  bounceKey: number;
  onSelect: () => void;
}

const Marker: React.FC<MarkerProps> = ({
  label,
  top,
  left,
  isActive,
  bounceKey,
  onSelect,
}) => {
  const outerFill = isActive ? "#FFD700" : "#D7263D";
  const innerFill = isActive ? "#D7263D" : "#FFD700";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Select ${label}`}
      aria-pressed={isActive}
      className="absolute flex flex-col items-center cursor-pointer touch-manipulation md:cursor-default md:pointer-events-none"
      style={{
        top,
        left,
        transform: "translate(-50%, -50%)",
      }}
    >
      <svg
        key={bounceKey}
        width="20"
        height="20"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 ${
          isActive ? "pin-bounce" : ""
        }`}
        aria-hidden
      >
        <path
          d="M26.6666 13.3333C26.6666 19.9906 19.2813 26.924 16.8013 29.0653C16.5702 29.239 16.289 29.333 15.9999 29.333C15.7109 29.333 15.4296 29.239 15.1986 29.0653C12.7186 26.924 5.33325 19.9906 5.33325 13.3333C5.33325 10.5043 6.45706 7.79121 8.45745 5.79082C10.4578 3.79043 13.1709 2.66663 15.9999 2.66663C18.8289 2.66663 21.542 3.79043 23.5424 5.79082C25.5428 7.79121 26.6666 10.5043 26.6666 13.3333Z"
          fill={outerFill}
          stroke={outerFill}
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 17.3334C18.2091 17.3334 20 15.5425 20 13.3334C20 11.1242 18.2091 9.33337 16 9.33337C13.7909 9.33337 12 11.1242 12 13.3334C12 15.5425 13.7909 17.3334 16 17.3334Z"
          fill={innerFill}
          stroke={innerFill}
          strokeWidth="2.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="mt-1 hidden rounded-md bg-[#0D2149] px-1.5 py-0.5 text-[8px] text-white shadow-sm whitespace-nowrap sm:text-[10px] md:inline-block md:text-xs md:px-2 md:py-1">
        {label}
      </span>
    </button>
  );
};

export default RootedInManchester;
