import React from "react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  link: string ;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  badge,
  title,
  description,
  features,
  buttonText,
  link
}) => {
  const customBorderStyle: React.CSSProperties = {
    borderWidth: '6px 3px 3px 3px',
    borderStyle: 'solid',
    borderColor: '#FFD700',
    backgroundColor: '#FAF9F6',
    borderRadius: '16px',
  };

  return (
    <div style={customBorderStyle} className="shadow-sm p-4 sm:p-5 lg:p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[#FFD700] text-white">
          {icon}
        </div>

        <span className="rounded-full border border-[#001F3F1A] bg-[#FFFDF7] px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-bold text-[#001F3F]">
          {badge}
        </span>
      </div>

      {/* Content */}
      <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl font-semibold text-[#001F3F]">
        {title}
      </h3>

      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#6B7280]">
        {description}
      </p>

      {/* Features */}
      <ul className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-2 text-xs sm:text-sm text-[#6B7280]">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1.5 sm:mt-2 h-1.5 w-1.5 rounded-full bg-[#D7263D] flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <Link to={link}>
      <button className="mt-5 sm:mt-6 flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-xl bg-[#D7263D] px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white transition hover:bg-red-700">
        {buttonText}
        <span>→</span>
      </button>
      </Link>
      
    </div>
  );
};