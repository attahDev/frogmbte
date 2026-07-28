import type { FC } from "react";
import { useState } from "react";

interface Partner {
  id: string;
  name: string;
  image: string;
}

const allPartners: Partner[] = [
  { id: "1", name: "Adanian Labs", image: "/partners/patnerslist/pat1.jpeg" },
  { id: "2", name: "NICE", image: "/partners/patnerslist/pat2.jpeg" },
  { id: "3", name: "ANS", image: "/partners/patnerslist/pat3.jpeg" },
  { id: "4", name: "Bruntwood SciTech", image: "/partners/patnerslist/pat5.jpeg" },
  { id: "5", name: "GM Business Growth Hub", image: "/partners/patnerslist/pat6.jpeg" },
  { id: "6", name: "Abertay University", image: "/partners/patnerslist/pat8.jpeg" },
  { id: "7", name: "AI Tech UK", image: "/partners/patnerslist/pat9.jpeg" },
  { id: "8", name: "Switch Future", image: "/partners/patnerslist/pat10.jpeg" },
  { id: "9", name: "Tony Tokunbo Fernandez", image: "/partners/patnerslist/pat11.jpeg" },
  { id: "10", name: "University of Salford", image: "/partners/patnerslist/pat13.jpeg" },
  { id: "11", name: "Manchester Metropolitan University", image: "/partners/patnerslist/pat15.jpeg" },
  { id: "12", name: "DishMCR", image: "/partners/patnerslist/pat19.jpeg" },
  { id: "13", name: "Made4Tech Global", image: "/partners/patnerslist/pat20.jpeg" },
  { id: "14", name: "AI Tech UK", image: "/partners/patnerslist/pat22.jpeg" },
];

const firstHalf = allPartners.slice(0, Math.ceil(allPartners.length / 2));
const secondHalf = allPartners.slice(Math.ceil(allPartners.length / 2));

const PartnerLogoCard: FC<Partner> = ({ name, image }) => {
  const [error, setError] = useState(false);

  return (
    <div className="flex h-[110px] w-[170px] sm:h-[140px] sm:w-[220px] flex-shrink-0 items-center justify-center rounded-xl p-4 transition-all duration-300 hover:scale-[1.03]">
      {!error ? (
        <img
          src={image}
          alt={name}
          loading="lazy"
          onError={() => setError(true)}
          className="h-full w-full object-contain"
        />
      ) : (
        <span className="text-center text-sm text-gray-400">{name}</span>
      )}
    </div>
  );
};

const InfiniteRow: FC<{
  partners: Partner[];
  direction: "left" | "right";
}> = ({ partners, direction }) => {
  const logos = Array.from({ length: 8 }).flatMap(() => partners);

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 sm:w-24"
        style={{
          background:
            "linear-gradient(to right,#FFFDF7 0%,rgba(255,253,247,0) 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 sm:w-24"
        style={{
          background:
            "linear-gradient(to left,#FFFDF7 0%,rgba(255,253,247,0) 100%)",
        }}
      />

      <div
        className={`marquee flex w-max gap-6 py-4 ${
          direction === "left" ? "marquee-left" : "marquee-right"
        }`}
      >
        {logos.map((partner, index) => (
          <PartnerLogoCard
            key={`${partner.id}-${index}`}
            {...partner}
          />
        ))}
      </div>
    </div>
  );
};

const PartnersSection: FC = () => {
  return (
    <section className="overflow-hidden bg-[#FFFDF7] py-12 sm:py-16">
      <div className="space-y-8">
        <InfiniteRow
          partners={firstHalf}
          direction="right"
        />

        <InfiniteRow
          partners={secondHalf}
          direction="left"
        />
      </div>

      <div className="mt-12 px-4 text-center text-[#001F3F] sm:mt-20">
        <p className="mb-3 text-[16px] sm:text-[18px]">
          Interested in partnering with us?
        </p>

        <a
          href="#partners"
          className="inline-flex items-center gap-2 text-base font-semibold text-[#D7263D] hover:underline sm:text-[16px]"
        >
          Learn about partnership opportunities →
        </a>
      </div>
    </section>
  );
};

export default PartnersSection;
