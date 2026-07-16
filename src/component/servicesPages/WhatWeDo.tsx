import React from "react";
import { FileText, Users, Globe } from "lucide-react";

const services = [
  {
    icon: <FileText size={28} className="text-red-500" />,
    title: "Business Registration & Compliance",
    description:
      "Navigate the complexities of UK business registration, tax requirements, and legal compliance with expert guidance tailored to your needs.",
  },
  {
    icon: <Users size={28} className="text-red-500" />,
    title: "Mentorship & Impactful Community Support",
    description:
      "Connect with experienced entrepreneurs and industry leaders who understand your journey and are committed to your success.",
  },
  {
    icon: <Globe size={28} className="text-red-500" />,
    title: "UK & International Business Setup",
    description:
      "Expand your reach locally and globally with support for multi market business structures and international trade opportunities.",
  },
];

const WhatWeDo: React.FC = () => {
  return (
    <section className="bg-[#FFFDF7] py-14 sm:py-16 lg:py-28">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-12">
        {/* Title Section */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#001F3F]">
            What We Do
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[#001F3F] leading-relaxed">
            Comprehensive support to help your business thrive in Greater
            Manchester&apos;s tech ecosystem
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-10 sm:mt-12 lg:mt-16 grid gap-5 sm:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#FFFDF7] w-full min-h-[280px] sm:min-h-[300px] lg:min-h-[312px] rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6 sm:p-7 lg:p-8 transition hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FFD700] rounded-xl flex items-center justify-center">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="mt-5 sm:mt-6 text-lg sm:text-xl font-semibold text-[#0A0A0A] leading-snug">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-3 sm:mt-4 text-[15px] sm:text-[16px] text-[#4A5565] leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;