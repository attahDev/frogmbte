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
  // 1. Remove borderColor from here so it doesn't "lock" the color
  const customBorderStyle: React.CSSProperties = {
    borderWidth: '6px 3px 3px 3px',
    borderStyle: 'solid',
    backgroundColor: '#FAF9F6',
    borderRadius: '16px',
  };

  return (
    <div
      className="relative p-5 sm:p-6 md:p-7 lg:p-8 pt-6 sm:pt-8 md:pt-10 lg:pt-12 
                 flex flex-col h-full group transition-all duration-300 ease-in-out
                 shadow-lg hover:shadow-xl hover:shadow-red-600/20
                 border-[#FFD700] hover:border-[#D7263D] 
                 hover:transform hover:-translate-y-1
                 min-h-[380px] sm:min-h-[460px] md:min-h-[500px]"
      style={customBorderStyle}
    >

      {/* Count Badge */}
      <div className="absolute top-4 sm:top-5 md:top-6 right-4 sm:right-5 md:right-6 
                      px-3 sm:px-4 py-1.5 sm:py-2 
                      bg-[#FFFDF7] border border-[#001F3F1A] rounded-full 
                      text-xs sm:text-sm md:text-sm font-semibold text-[#001F3F] z-10
                       whitespace-nowrap">
        {count}
      </div>

      {/* Icon and Title Section */}
      <div className="flex mb-4 items-start sm:mb-5 ">
        <div className="p-2 sm:p-3 md:p-3 rounded-lg mr-3 sm:mr-4 flex justify-center flex-shrink-0 
                       group-hover:scale-110 transition-transform duration-300
                       w-12 h-12 sm:w-14 sm:h-14 md:w-[100px] md:h-[100px]">
          {icon}
        </div>
      </div>

      {/* Title - Better for medium screens */}
      <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-[30px]
                    font-bold text-[#001F3F] sm:mb-4 
                    leading-tight sm:leading-snug md:leading-normal
                     flex items-center">
        {title}
      </h3>

      {/* Description - Optimized for medium screens */}
      <p className="text-base sm:text-lg md:text-[17px] text-[#6B7280] 
                   mb-6 sm:mb-7 md:mb-8 
                   leading-relaxed sm:leading-loose
                   line-clamp-4 grow">
        {description}
      </p>

      {/* Links Grid - Better 2-column layout for all screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
         gap-x-4 sm:gap-x-5 md:gap-x-6
         gap-y-2 sm:gap-y-3 md:gap-y-4 mb-6 sm:mb-7 ">
        {links.map((link, index) => (
          <div key={index} className="flex items-baseline group/link gap-2 sm:gap-3">
            {/* Bullet point */}
            <span className="text-[#D7263D]/70 
                 text-2xl sm:text-3xl leading-none shrink-0 
                 group-hover/link:scale-125 transition-transform duration-200">
              •
            </span>

            {/* Link text */}
            <span className="text-xs sm:text-sm md:text-[14px] font-medium text-[#6B7280] 
                 leading-tight line-clamp-2 group-hover/link:text-[#001F3F] 
                 transition-colors duration-200 flex-1">
              {link}
            </span>
          </div>
        ))}
      </div>

      {/* CTA Button - Better proportions for medium screens */}
      <a
        href={ctaLink}
        className="mt-auto w-full inline-flex items-center justify-center 
                   py-3 sm:py-3.5 md:py-4
                   px-6 sm:px-8
                   text-base sm:text-lg md:text-[18px] font-semibold
                   border border-[#001F3F1A] rounded-xl md:rounded-2xl
                   bg-[#FFFDF7] text-[#001F3F]
                   hover:bg-[#D7263D] hover:text-white hover:border-[#D7263D] 
                   hover:shadow-lg hover:transform hover:scale-[1.02]
                   active:scale-[0.98]
                   transition-all duration-300 ease-out
                   group/button min-h-[50px] sm:min-h-[54px] md:min-h-[58px]"
      >
        {ctaText}
        <span className="ml-2 text-xl sm:text-2xl 
                        transition-transform duration-300 
                        group-hover/button:translate-x-1 group-hover/button:text-white">
          →
        </span>
      </a>
    </div>
  );
};

export default ProgramCard;