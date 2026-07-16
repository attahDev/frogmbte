import React from "react";
import { ArrowDownRight, Plus } from "lucide-react";

const services = [
  {
    title: "GMBTE Business Support Services",
    description:
      "Get step-by-step guidance through the business registration process, including selecting the right structure, completing official forms, and ensuring your business is properly set up and compliant from day one.",
  },
  {
    title: "Administrative and Compliance Guidance",
    description:
      "Monitor the status of your business support journey with clear milestones, structured updates, and transparent reporting so you always know what stage your application or service is in.",
  },
  {
    title: "Documentation Preparation",
    description:
      "Receive support with essential business administration tasks, legal requirements, and regulatory compliance to help your organisation operate smoothly and avoid costly mistakes.",
  },
  {
    title: "Progress Tracking and Reporting",
    description:
      "Monitor the status of your business support journey with clear milestones, structured updates, and transparent reporting so you always know what stage your application or service is in.",
  },
];

const extras = [
  "International business registration",
  "Trademark Support",
  "Office & virtual Address support",
  "Mentorship Coordination",
];

const SupportServices: React.FC = () => {
  return (
    <section className="bg-[#FFFDF7] py-14 sm:py-16 lg:py-28">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-center text-2xl sm:text-3xl md:text-[36px] font-semibold text-[#001F3F] mb-10 sm:mb-12 lg:mb-16">
          GMBTE Business Support Services
        </h2>

        {/* Navy Container */}
        <div className="rounded-[24px] sm:rounded-[32px] lg:rounded-[40px] overflow-hidden bg-[#001F3F]">
          {/* Rows */}
          {services.map((service, index) => (
            <div key={index}>
              <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 px-5 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10 lg:py-14 items-start">
                {/* Left Title + Arrow */}
                <div className="flex items-start gap-4 sm:gap-5 lg:gap-6">
                  <ArrowDownRight
                    size={24}
                    className="text-[#FFD700] mt-1 sm:mt-2 shrink-0"
                  />
                  <h3 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[40px] max-w-md leading-tight lg:leading-[40px] font-semibold text-white">
                    {service.title}
                  </h3>
                </div>

                {/* Right Description */}
                <p className="text-[15px] sm:text-[16px] leading-7 text-white/80 max-w-xl">
                  {service.description}
                </p>
              </div>

              {/* Divider */}
              {index !== services.length - 1 && (
                <div className="h-[1px] bg-white/20 mx-5 sm:mx-8 md:mx-10 lg:mx-12"></div>
              )}
            </div>
          ))}

          {/* Yellow Bottom Strip */}
          <div className="bg-[#FFD400] px-5 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
              {extras.map((item, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#001F3F] flex items-center justify-center shrink-0">
                    <Plus size={16} className="text-[#FFD700]" />
                  </div>

                  <span className="text-[15px] sm:text-[16px] font-medium text-[#06294B] leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportServices;