/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Check, Plus } from "lucide-react";
import BusinessSupportModal from "./BusinessSupportModal";
import type { PackageType } from "./utils";

type Package = {
  id: PackageType;
  name: string;
  price: number;
  description: string;
  features: string[];
  addons: { name: string; price: number }[];
  highlight?: boolean;
};

const packages: Package[] = [
  {
    id: "starter",
    name: "Starter Package",
    price: 99,
    description: "Perfect for new businesses getting started",
    features: [
      "Business registration support",
      "Basic compliance guidance",
      "Essential documentation",
      "Email support",
    ],
    addons: [
      { name: "Office address support", price: 350 },
      { name: "Mentorship coordination", price: 99 },
    ],
  },
  {
    id: "growth",
    name: "Growth Package",
    price: 129,
    description: "For businesses ready to scale operations",
    features: [
      "Full Business Registration",
      "Advanced Compliance Guidance",
      "Complete Documentation Suite",
      "Priority Support",
      "Quarterly Progress Reviews",
    ],
    addons: [
      { name: "International registration", price: 750 },
      { name: "Trademark Support", price: 500 },
      { name: "Office address Support", price: 350 },
      { name: "Mentorship Coordination", price: 99 },
    ],
    highlight: true,
  },
  {
    id: "platinum",
    name: "Platinum Package",
    price: 149,
    description: "Comprehensive support for ambitious ventures",
    features: [
      "Enterprise Registration Support",
      "Full Compliance Management",
      "Premium Documentation",
      "Dedicated Account Manager",
      "Monthly Strategic Reviews",
      "Partner Network Access",
    ],
    addons: [
      { name: "International registration", price: 750 },
      { name: "Trademark Support", price: 500 },
      { name: "Office & Virtual address Support", price: 350 },
      { name: "Executive Mentorship", price: 99 },
    ],
  },
];

const BusinessPackages: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage] =
    useState<PackageType>("growth");

  return (
    <section className="bg-[#FFFDF7] py-14 sm:py-16 lg:py-28">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* your existing content */}

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 items-stretch lg:items-end">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-[22px] sm:rounded-[24px] lg:rounded-[26px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-all
                           ${pkg.highlight
                  ? "bg-[linear-gradient(135deg,_#FFFBEB_0%,_#FFFFFF_100%)] border-[2px] border-[#FFB900] shadow-[0_20px_60px_rgba(0,0,0,0.08)] lg:-translate-y-6"
                  : "bg-[#FFFDF7] border-[3px] border-[#E3E4E6] shadow-[0_15px_50px_rgba(0,0,0,0.06)]"
                }`}
            >
              {/* MOST POPULAR BADGE */}
              {pkg.highlight && (
                <div className="flex items-center gap-1 absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-[#F2A900] text-[#101828] text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 rounded-full shadow whitespace-nowrap">
                  <span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.34496 1.87605C7.37353 1.72312 7.45468 1.58499 7.57436 1.4856C7.69404 1.3862 7.84472 1.33179 8.00029 1.33179C8.15587 1.33179 8.30655 1.3862 8.42623 1.4856C8.54591 1.58499 8.62706 1.72312 8.65563 1.87605L9.35629 5.58138C9.40606 5.84482 9.53408 6.08713 9.72365 6.2767C9.91322 6.46627 10.1555 6.59429 10.419 6.64405L14.1243 7.34472C14.2772 7.37328 14.4154 7.45443 14.5147 7.57412C14.6141 7.6938 14.6686 7.84447 14.6686 8.00005C14.6686 8.15563 14.6141 8.3063 14.5147 8.42599C14.4154 8.54567 14.2772 8.62682 14.1243 8.65538L10.419 9.35605C10.1555 9.40581 9.91322 9.53383 9.72365 9.7234C9.53408 9.91297 9.40606 10.1553 9.35629 10.4187L8.65563 14.1241C8.62706 14.277 8.54591 14.4151 8.42623 14.5145C8.30655 14.6139 8.15587 14.6683 8.00029 14.6683C7.84472 14.6683 7.69404 14.6139 7.57436 14.5145C7.45468 14.4151 7.37353 14.277 7.34496 14.1241L6.64429 10.4187C6.59453 10.1553 6.46651 9.91297 6.27694 9.7234C6.08737 9.53383 5.84506 9.40581 5.58163 9.35605L1.87629 8.65538C1.72336 8.62682 1.58524 8.54567 1.48584 8.42599C1.38644 8.3063 1.33203 8.15563 1.33203 8.00005C1.33203 7.84447 1.38644 7.6938 1.48584 7.57412C1.58524 7.45443 1.72336 7.37328 1.87629 7.34472L5.58163 6.64405C5.84506 6.59429 6.08737 6.46627 6.27694 6.2767C6.46651 6.08713 6.59453 5.84482 6.64429 5.58138L7.34496 1.87605Z"
                        stroke="#101828"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.334 1.33325V3.99992"
                        stroke="#101828"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.6667 2.66675H12"
                        stroke="#101828"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.66732 14.6667C3.4037 14.6667 4.00065 14.0697 4.00065 13.3333C4.00065 12.597 3.4037 12 2.66732 12C1.93094 12 1.33398 12.597 1.33398 13.3333C1.33398 14.0697 1.93094 14.6667 2.66732 14.6667Z"
                        stroke="#101828"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  Most Popular
                </div>
              )}

              <div>
                {/* TITLE */}
                <h3 className="text-2xl sm:text-[26px] lg:text-[28px] font-semibold text-[#001F3F]">
                  {pkg.name}
                </h3>

                <p className="mt-3 text-[#4F5E6C] text-[15px] sm:text-[16px] leading-relaxed">
                  {pkg.description}
                </p>

                {/* PRICE */}
                <div className="mt-6 flex items-end gap-1 sm:gap-2 flex-wrap">
                  <span className="text-[22px] sm:text-[24px] lg:text-[26px] font-semibold text-[#001F3F] leading-none">
                    £
                  </span>

                  <span className="text-[44px] sm:text-[50px] lg:text-[58px] font-bold text-[#001F3F] leading-none">
                    {pkg.price}
                  </span>

                  <span className="text-[14px] sm:text-[16px] text-[#4F5E6C] mb-1">
                    Base fee
                  </span>
                </div>

                {/* CORE SERVICES */}
                <div className="mt-8">
                  <p className="font-medium text-[#001F3F]">
                    Included Core Services:
                  </p>

                  <ul className="mt-4 space-y-3">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check
                          size={18}
                          className={`mt-1 shrink-0 ${pkg.highlight ? "text-[#F2A900]" : "text-[#001F3F]"
                            }`}
                        />
                        <span className="text-[#4F5E6C] text-[14px] sm:text-[15px] leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ADDONS */}
                <div className="mt-8">
                  <p className="font-medium text-[#001F3F]">
                    Available Addons:
                  </p>

                  <ul className="mt-4 space-y-3">
                    {pkg.addons.map((addon, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-md border border-[#E2DED7] flex items-center justify-center shrink-0">
                          <Plus size={12} className="text-[#001F3F]" />
                        </div>
                        <span className="text-[#4F5E6C] text-[14px] sm:text-[15px] leading-relaxed">
                          {addon.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="mt-8 sm:mt-10 bg-[#D7263D] text-white px-5 sm:px-6 py-3 rounded-lg text-[15px] sm:text-[16px] font-medium hover:bg-[#C81E1E] transition w-full sm:w-auto"
              >
                Choose {pkg.name.split(" ")[0]} Package →
              </button>
            </div>
          ))}
        </div>
      </div>

      <BusinessSupportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultPackage={selectedPackage}
      />
    </section>
  );
};

export default BusinessPackages;