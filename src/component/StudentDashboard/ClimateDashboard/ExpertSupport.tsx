import { CalendarDays, FileText, Star } from "lucide-react";

type ConsultantCardProps = {
  name: string;
  specialty: string;
  rating: string;
  sessions: string;
  image: string;
};

const consultants: ConsultantCardProps[] = [
  {
    name: "James Thompson",
    specialty: "Green Energy",
    rating: "4.8",
    sessions: "94 sessions",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Maria Rodriguez",
    specialty: "ESG Compliance",
    rating: "5",
    sessions: "156 sessions",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  },
];

function ConsultantCard({
  name,
  specialty,
  rating,
  sessions,
  image,
}: ConsultantCardProps) {
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");

  return (
    <article className="w-full rounded-[18px] border border-[#E5E7EB] bg-[#FFFDF7] p-4 sm:p-5 lg:p-6">
      <div className="flex items-start gap-4">
        <img
          src={image}
          alt={name}
          className="h-16 w-16 shrink-0 rounded-full object-cover sm:h-[72px] sm:w-[72px]"
        />

        <div className="min-w-0 flex-1">
          <h3 className="text-[17px] font-semibold leading-[1.2] tracking-[-0.03em] text-[#001F3F] sm:text-[18px]">
            {firstName}
            {lastName && (
              <>
                <br />
                {lastName}
              </>
            )}
          </h3>

          <p className="mt-2 text-[13px] leading-[1.4] text-[#4A5565] sm:text-[14px]">
            {specialty}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px] leading-none text-[#7A8699] sm:text-[14px]">
            <div className="flex items-center gap-1">
              <Star
                size={14}
                className="fill-[#FFD700] text-[#FFD700]"
                strokeWidth={1.8}
              />
              <span className="text-[#FFD700]">{rating}</span>
            </div>

            <span className="text-[#6A7282]">•</span>
            <span>{sessions}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-[#DF223C] px-4 text-[15px] font-medium text-white transition hover:opacity-95 sm:mt-6 sm:rounded-[16px] sm:text-[16px]"
      >
        <CalendarDays size={18} strokeWidth={2.2} />
        Book Session
      </button>
    </article>
  );
}

function DiagnosticBanner() {
  return (
    <div className="rounded-[18px] border border-[#E5E7EB] bg-[#F9FAFB] p-4 sm:p-5 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-[18px]">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#FFD700] sm:h-[58px] sm:w-[58px] sm:rounded-[16px]">
          <FileText size={26} className="text-[#001F3F]" strokeWidth={2.2} />
        </div>

        <div className="min-w-0">
          <h3 className="text-[17px] font-semibold leading-[1.2] tracking-[-0.03em] text-[#001F3F] sm:text-[18px]">
            Free Business Sustainability Diagnostic
          </h3>

          <p className="mt-3 max-w-[860px] text-[13px] leading-[1.55] text-[#4A5565] sm:mt-4 sm:text-[14px]">
            Get a comprehensive assessment of your business&apos;s environmental
            impact and receive personalized recommendations.
          </p>

          <button
            type="button"
            className="mt-4 flex h-12 w-full items-center justify-center rounded-[14px] border-2 border-[#001F3F] bg-transparent px-5 text-[15px] font-medium text-[#001F3F] transition hover:bg-[#eef2f7] sm:w-fit sm:px-6 sm:text-[16px] lg:h-[56px] lg:rounded-[18px]"
          >
            Start Diagnostic
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ExpertSupport() {
  return (
    <section className="w-full rounded-[20px] border-[0.3px] border-[#001F3F73] bg-[#FFFDF7] px-4 py-5 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:px-5 sm:py-6 lg:rounded-[24px] lg:px-9 lg:pb-[38px] lg:pt-[34px]">
      <h2 className="text-[22px] font-semibold leading-tight tracking-[-0.04em] text-[#001F3F] sm:text-[25px]">
        Expert Support
      </h2>

      <p className="mt-3 max-w-2xl text-[14px] leading-[1.45] text-[#6B7280] sm:mt-4 sm:text-base">
        Connect with sustainability consultants and get expert guidance
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-5 lg:mt-[34px] lg:grid-cols-2 lg:gap-6">
        {consultants.map((consultant) => (
          <ConsultantCard key={consultant.name} {...consultant} />
        ))}
      </div>

      <div className="mt-5 sm:mt-6">
        <DiagnosticBanner />
      </div>

      <div className="mt-7 flex justify-center lg:mt-[34px]">
        <button
          type="button"
          className="flex h-12 w-full max-w-[260px] items-center justify-center gap-3 rounded-[14px] bg-[#D7263D] px-5 text-[15px] font-medium text-white transition hover:opacity-95 sm:w-auto sm:max-w-none sm:px-7 sm:text-[16px]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M13.3334 17.5V15.8333C13.3334 14.9493 12.9822 14.1014 12.3571 13.4763C11.732 12.8512 10.8841 12.5 10.0001 12.5H5.00008C4.11603 12.5 3.26818 12.8512 2.64306 13.4763C2.01794 14.1014 1.66675 14.9493 1.66675 15.8333V17.5"
              stroke="white"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.50008 9.16667C9.34103 9.16667 10.8334 7.67428 10.8334 5.83333C10.8334 3.99238 9.34103 2.5 7.50008 2.5C5.65913 2.5 4.16675 3.99238 4.16675 5.83333C4.16675 7.67428 5.65913 9.16667 7.50008 9.16667Z"
              stroke="white"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.3333 17.5001V15.8334C18.3327 15.0948 18.0869 14.3774 17.6344 13.7937C17.1819 13.2099 16.5484 12.793 15.8333 12.6084"
              stroke="white"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.3333 2.6084C14.0503 2.79198 14.6858 3.20898 15.1396 3.79366C15.5935 4.37833 15.8398 5.09742 15.8398 5.83757C15.8398 6.57771 15.5935 7.2968 15.1396 7.88147C14.6858 8.46615 14.0503 8.88315 13.3333 9.06673"
              stroke="white"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          Book Consultation
        </button>
      </div>
    </section>
  );
}