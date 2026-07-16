import type { FC } from "react";
import { useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

interface Partner {
  id: string;
  name: string;
  image: string;
}

// Add your 23 partner images here - replace the URLs with your actual image paths
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

// Split partners into two groups
const firstHalf = allPartners.slice(0, Math.ceil(allPartners.length / 2));
const secondHalf = allPartners.slice(Math.ceil(allPartners.length / 2));

// Simple Logo Card - Just the image
const PartnerLogoCard: FC<Partner> = ({ name, image }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="rounded-xl transition-all duration-300 p-4 sm:p-6 flex items-center justify-center h-[110px] sm:h-[140px] min-w-[150px] sm:min-w-[200px] hover:shadow-lg hover:scale-[1.02]">
      {!imageError ? (
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-contain"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      ) : (
        <div className="text-center text-gray-400 text-sm">
          {name}
        </div>
      )}
    </div>
  );
};

// Infinite Scroll Row Component
const InfiniteRow: FC<{
  partners: Partner[];
  direction: "left" | "right";
}> = ({ partners, direction }) => {
  const baseVelocity = direction === "left" ? -50 : 50;
  const xRef = useRef(0);
  const motionRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    if (!motionRef.current) return;
    xRef.current += (baseVelocity * delta) / 1000;
    const width = motionRef.current.scrollWidth / 2;
    
    if (Math.abs(xRef.current) > width) {
      xRef.current = 0;
    }
    motionRef.current.style.transform = `translateX(${xRef.current}px)`;
  });

  // Double the array as requested
  const duplicated = [...partners, ...partners];

  return (
    <div className="overflow-hidden relative">
      <div
        className="pointer-events-none absolute top-0 left-0 w-12 sm:w-32 h-full z-10"
        style={{
          background: "linear-gradient(to right, #FFFDF7 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute top-0 right-0 w-12 sm:w-32 h-full z-10"
        style={{
          background: "linear-gradient(to left, #FFFDF7 0%, transparent 100%)",
        }}
      />

      <div ref={motionRef} className="flex gap-6 w-max py-4">
        {duplicated.map((partner, i) => (
          <PartnerLogoCard key={`${partner.id}-${i}`} {...partner} />
        ))}
      </div>
    </div>
  );
};

// Main Section Component
const PartnersSection: FC = () => (
  <section className="py-12 sm:py-16 bg-[#FFFDF7] overflow-hidden">
    <div className="max-w-full mx-auto space-y-8">
      {/* First row - scrolls RIGHT */}
      <InfiniteRow partners={firstHalf} direction="right" />
      
      {/* Second row - scrolls LEFT */}
      <InfiniteRow partners={secondHalf} direction="left" />
    </div>

    <div className="mt-12 sm:mt-20 text-[#001F3F] text-center px-4">
        <p className="mb-3 text-[16px] sm:text-[18px]">Interested in partnering with us?</p>
        <a
          href="#partners"
          className="text-[#D7263D] font-semibold hover:underline inline-flex items-center gap-2 text-base sm:text-[16px]"
        >
          Learn about partnership opportunities →
        </a>
      </div>
  
  </section>
);

export default PartnersSection;