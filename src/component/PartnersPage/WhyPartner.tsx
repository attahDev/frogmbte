import type { FC, JSX } from "react";

interface TimelineItemProps {
  title: string;
  description: string;
  icon: JSX.Element;
  side: "left" | "right";
}

const TimelineItem: FC<TimelineItemProps> = ({
  title,
  description,
  icon,
  side,
}) => {
  return (
    <div
      className={`
        font-open-sans relative grid items-center
        lg:grid-cols-2 gap-8
      `}
    >
      {/* Left Side (on large screens) */}
      {side === "left" ? (
        <div className="hidden lg:flex justify-end pr-8">
          <div className="bg-white rounded-xl shadow-md p-6 max-w-md text-right">
            <h3 className="text-[20px] font-bold text-[#001F3F] mb-2 mt-5">
              {title}
            </h3>
            <p className="text-[#001F3F] text-sm leading-relaxed mb-5">
              {description}
            </p>
          </div>
        </div>
      ) : (
        <div className="hidden lg:block"></div>
      )}

      {/* Right Side (on large screens) */}
      {side === "right" ? (
        <div className="hidden lg:flex justify-start pl-8">
          <div className="bg-white rounded-xl shadow-md p-6 max-w-md text-left">
            <h3 className="text-xl font-bold text-[#001F3F] mb-2 mt-5">
              {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              {description}
            </p>
          </div>
        </div>
      ) : (
        <div className="hidden lg:block"></div>
      )}

      {/* Mobile & Tablet View (stacked) */}
      <div className="lg:hidden flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center shadow-lg mb-6">
          <div className="text-white">{icon}</div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 w-full max-w-md mx-auto">
          <h3 className="text-lg md:text-xl font-bold text-[#001F3F] mb-2 mt-2">
            {title}
          </h3>
          <p className="text-[#001F3F] text-sm leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Center Timeline Node for large screens */}
      <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center shadow-lg">
          <div className="text-white">{icon}</div>
        </div>
      </div>
    </div>
  );
};

const WhyPartner: FC = () => {
  const timelineItems = [
    {
      title: "Connect",
      description:
        "Connect with a vibrant community of emerging tech professionals & digital creators.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.3334 28V25.3333C21.3334 23.9188 20.7715 22.5623 19.7713 21.5621C18.7711 20.5619 17.4146 20 16.0001 20H8.00008C6.58559 20 5.22904 20.5619 4.22885 21.5621C3.22865 22.5623 2.66675 23.9188 2.66675 25.3333V28"
            stroke="#D7263D"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.3333 4.17065C22.4769 4.46715 23.4898 5.13501 24.2128 6.0694C24.9359 7.0038 25.3282 8.15184 25.3282 9.33332C25.3282 10.5148 24.9359 11.6628 24.2128 12.5972C23.4898 13.5316 22.4769 14.1995 21.3333 14.496"
            stroke="#D7263D"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M29.3333 28V25.3333C29.3324 24.1516 28.9391 23.0037 28.2151 22.0698C27.4911 21.1358 26.4774 20.4688 25.3333 20.1733"
            stroke="#D7263D"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.0001 14.6667C14.9456 14.6667 17.3334 12.2789 17.3334 9.33333C17.3334 6.38781 14.9456 4 12.0001 4C9.05456 4 6.66675 6.38781 6.66675 9.33333C6.66675 12.2789 9.05456 14.6667 12.0001 14.6667Z"
            stroke="#D7263D"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      side: "left" as const,
    },
    {
      title: "Impact",
      description:
        "Support education, skills and opportunity in Manchester empowering people to learn & grow",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.0001 29.3334C23.3639 29.3334 29.3334 23.3639 29.3334 16.0001C29.3334 8.63628 23.3639 2.66675 16.0001 2.66675C8.63628 2.66675 2.66675 8.63628 2.66675 16.0001C2.66675 23.3639 8.63628 29.3334 16.0001 29.3334Z"
            stroke="#D7263D"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24Z"
            stroke="#D7263D"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.9999 18.6666C17.4727 18.6666 18.6666 17.4727 18.6666 15.9999C18.6666 14.5272 17.4727 13.3333 15.9999 13.3333C14.5272 13.3333 13.3333 14.5272 13.3333 15.9999C13.3333 17.4727 14.5272 18.6666 15.9999 18.6666Z"
            stroke="#D7263D"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      side: "right" as const,
    },
    {
      title: "Grow",
      description:
        "Join our network of forward thinking innovators & partners dedicated to transforming communities through tech, education, and collaboration.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.3333 9.33325H29.3333V17.3333"
            stroke="#D7263D"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M29.3334 9.33325L18.0001 20.6666L11.3334 13.9999L2.66675 22.6666"
            stroke="#D7263D"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      side: "left" as const,
    },
  ];

  return (
    <section className="bg-[#F5F3EE] py-12 sm:py-16 lg:py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-lg p-4 sm:p-8 md:p-12 lg:p-16">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#001F3F] mb-4">
              Why Partner With Us
            </h2>
            <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
              Together, we can create lasting impact, empower local talent{" "}
              <br className="hidden sm:block" />
              and drive Greater Manchester’s digital future.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line (hidden on mobile for clarity) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#FFD700] -translate-x-1/2"></div>

            {/* Timeline Items */}
            <div className="space-y-16 lg:space-y-32">
              {timelineItems.map((item, index) => (
                <TimelineItem
                  key={index}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  side={item.side}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPartner;
