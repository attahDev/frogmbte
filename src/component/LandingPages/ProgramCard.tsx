import React from 'react';

interface ProgramCardProps {
  icon: React.ReactNode;
  title: string;
  count: string;
  description: string;
  links: string[];
  ctaText: string;
  ctaLink: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  icon,
  title,
  count,
  description,
  links,
  ctaText,
  ctaLink,
}) => {
  const customBorderStyle: React.CSSProperties = {
    borderWidth: '6px 3px 3px 3px',
    borderStyle: 'solid',
    backgroundColor: '#FAF9F6',
    borderRadius: '18px',
  };

  return (
    <div
      className="relative flex h-full min-h-[410px] flex-col border-[#FFD700] p-5
                 sm:p-6 md:min-h-[424px] md:p-6
                 shadow-[0_6px_18px_rgba(0,31,63,0.10)]
                 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:border-[#D7263D] hover:shadow-[0_12px_28px_rgba(215,38,61,0.16)]"
      style={customBorderStyle}
    >
      {/* Count Badge */}
      <div className="absolute right-5 top-5 whitespace-nowrap rounded-full border border-[#001F3F1A]
                      bg-[#FFFDF7] px-3 py-1.5 text-xs font-semibold text-[#001F3F]
                      sm:right-6 sm:top-6 sm:px-3.5 sm:text-sm">
        {count}
      </div>

      {/* Icon */}
      <div className="mb-4 flex h-[65px] w-[65px] shrink-0 items-center justify-center">
        {icon}
      </div>

      <h3 className="mb-4 text-[26px] font-monserrat leading-tight tracking-tight text-[#001F3F]
                     sm:text-[29px] md:text-[30px]">
        {title}
      </h3>

      <p className="mb-5 text-[15px] leading-[1.65] text-[#6B7280] sm:text-base">
        {description}
      </p>

      {/* Feature links */}
      <div className="mb-6 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 md:grid-cols-3">
        {links.map((link, index) => (
          <div key={index} className="flex items-center gap-1">
            <span className="text-lg leading-none text-[#D7263D]/70">
              •
            </span>
            <span className="text-md leading-snug text-[#6B7280]">
              {link}
            </span>
          </div>
        ))}
      </div>

      <a
        href={ctaLink}
        className="group/button mt-auto inline-flex min-h-[46px] w-full items-center justify-center
                   rounded-[10px] border border-[#001F3F1A] bg-[#FFFDF7] px-6 py-2.5
                   text-sm font-medium text-[#001F3F] transition-colors duration-300
                   hover:border-[#D7263D] hover:bg-[#D7263D] hover:text-white"
      >
        {ctaText}
        <span className="ml-5 text-xl leading-none transition-transform duration-300 group-hover/button:translate-x-1">
          →
        </span>
      </a>
    </div>
  );
};

export default ProgramCard;