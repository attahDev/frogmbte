import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Calendar,
  Mic,
  // FileText,
  // Presentation,
  // TrendingUp,
  Users,
  Video,
} from "lucide-react";

type SessionCardProps = {
  image: string;
  title: string;
  description: string;
  metaOne?: string;
  metaTwo?: string;
  buttonText: string;
  buttonVariant?: "yellow" | "red";
  badge?: string;
  icon?: LucideIcon;
  footerExtra?: React.ReactNode;
};

function SessionCard({
  image,
  title,
  description,
  metaOne,
  metaTwo,
  buttonText,
  buttonVariant = "red",
  badge,
  icon: Icon,
  footerExtra,
}: SessionCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#E8D48A] bg-white shadow-[0_4px_14px_rgba(0,31,63,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,31,63,0.10)] sm:rounded-[20px] lg:rounded-[22px]">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/80 via-[#001F3F]/35 to-[#001F3F]/10" />

        {badge && (
          <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#D7263D] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            {badge}
          </div>
        )}

        {Icon && (
          <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#001F3F]/90 ring-1 ring-[#FFD700]/50 backdrop-blur-sm">
            <Icon className="h-5 w-5 text-[#FFD700]" strokeWidth={2.2} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
        <h3 className="text-base font-bold leading-snug text-[#001F3F] sm:text-[17px] lg:text-lg">
          {title}
        </h3>

        <p className="mt-2 min-h-[40px] line-clamp-2 text-sm leading-relaxed text-[#4A5565] sm:min-h-[44px] sm:text-[15px]">
          {description}
        </p>

        {(metaOne || metaTwo || footerExtra) && (
          <div className="mt-3 flex min-h-[24px] items-center justify-between gap-2 text-xs text-[#667085] sm:text-sm">
            <div className="min-w-0 space-y-0.5">
              {metaOne && (
                <p className="font-medium text-[#001F3F]/70">{metaOne}</p>
              )}
              {metaTwo && <p>{metaTwo}</p>}
            </div>
            {footerExtra}
          </div>
        )}

        <div className="mt-auto border-t border-[#F1E6AF]/80 pt-4 sm:pt-5">
          <button
            type="button"
            className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold shadow-sm transition hover:shadow-md sm:h-12 sm:text-[15px] ${
              buttonVariant === "yellow"
                ? "bg-[#FFD700] text-[#001F3F] hover:bg-[#F5C800]"
                : "bg-[#D7263D] text-white hover:bg-[#C41F34]"
            }`}
          >
            {buttonText}
            <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </article>
  );
}

/*
type QuickToolCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  highlighted?: boolean;
};

function QuickToolCard({
  title,
  description,
  icon,
  highlighted = false,
}: QuickToolCardProps) {
  return (
    <div
      className={`rounded-[18px] sm:rounded-[20px] border bg-[#FFFDF7] p-4 sm:p-5 ${
        highlighted ? "border-[#F1D56A]" : "border-[#E5E7EB]"
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-[48px] w-[48px] sm:h-[54px] sm:w-[54px] shrink-0 items-center justify-center rounded-[12px] sm:rounded-[14px] bg-[#001F3F]">
          {icon}
        </div>

        <div className="min-w-0">
          <h4 className="text-[16px] sm:text-[17px] lg:text-[18px] font-bold leading-tight text-[#001F3F]">
            {title}
          </h4>
          <p className="mt-1 text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.45] text-[#667085]">
            {description}
          </p>
        </div>
      </div>

      <button className="mt-4 sm:mt-5 h-[48px] sm:h-[50px] lg:h-[52px] w-full rounded-[12px] sm:rounded-[14px] bg-[#001F3F] text-[15px] sm:text-[16px] lg:text-[18px] font-medium text-white transition hover:opacity-95">
        Open Tool
      </button>
    </div>
  );
}
*/

export default function CollaborationLiveSessions() {
  const sessions = [
    {
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      title: "Join Live Workshop",
      description: "Product Sales and Marketing Brand Development",
      metaOne: "Live Now",
      metaTwo: undefined,
      buttonText: "Join Now",
      buttonVariant: "yellow" as const,
      badge: "LIVE",
      icon: Video,
    },
    {
      image:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1200&q=80",
      title: "Schedule Business Coaching Call",
      description: "One on one mentorship Session",
      metaOne: "Choose your slot",
      metaTwo: undefined,
      buttonText: "Schedule Call",
      buttonVariant: "red" as const,
      icon: Calendar,
    },
    {
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
      title: "Peer Collaboration Rooms",
      description: "Connect with fellow entrepreneurs, share ideas and get inspired",
      metaOne: "5 rooms available",
      metaTwo: undefined,
      buttonText: "View Details",
      buttonVariant: "red" as const,
      icon: Users,
    },
    {
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
      title: "Virtual Pitch Practice Sessions",
      description: "Practice your pitch with peers",
      metaOne: "Next: Tomorrow 3pm",
      buttonText: "View Details",
      buttonVariant: "red" as const,
      icon: Mic,
      footerExtra: (
        <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#F3F4F6] px-2.5 py-1 text-xs font-medium text-[#667085] sm:text-sm">
          <Users className="h-3.5 w-3.5" />
          <span>8 participants</span>
        </div>
      ),
    },
  ];

  /*
  const quickTools = [
    {
      title: "AI Business Planner",
      description: "Generate comprehensive business plans",
      icon: <FileText size={24} className="text-[#FFD700]" strokeWidth={2.2} />,
    },
    {
      title: "Pitch Deck Generator",
      description: "Create investor ready presentations",
      icon: (
        <Presentation size={24} className="text-[#FFD700]" strokeWidth={2.2} />
      ),
    },
    {
      title: "Market Research AI",
      description: "Analyze market trends and opportunities",
      icon: <TrendingUp size={24} className="text-[#FFD700]" strokeWidth={2.2} />,
      highlighted: true,
    },
    {
      title: "Proposal Builder",
      description: "Craft winning business proposals",
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.4167 18.3334H15C15.4421 18.3334 15.866 18.1578 16.1786 17.8453C16.4911 17.5327 16.6667 17.1088 16.6667 16.6667V5.83341L12.5 1.66675H5.00004C4.55801 1.66675 4.13409 1.84234 3.82153 2.1549C3.50897 2.46746 3.33337 2.89139 3.33337 3.33341V11.2501" stroke="#FFD700" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.6666 1.66675V5.00008C11.6666 5.44211 11.8422 5.86603 12.1548 6.17859C12.4673 6.49115 12.8913 6.66675 13.3333 6.66675H16.6666" stroke="#FFD700" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.1483 13.0215C11.3126 12.8572 11.443 12.662 11.532 12.4473C11.6209 12.2325 11.6667 12.0023 11.6667 11.7699C11.6667 11.5374 11.6209 11.3072 11.532 11.0925C11.443 10.8777 11.3126 10.6826 11.1483 10.5182C10.9839 10.3538 10.7888 10.2235 10.574 10.1345C10.3592 10.0455 10.1291 9.99976 9.89661 9.99976C9.66415 9.99976 9.43397 10.0455 9.21921 10.1345C9.00445 10.2235 8.80931 10.3538 8.64494 10.5182L4.46994 14.6949C4.27181 14.8929 4.12679 15.1377 4.04827 15.4065L3.35077 17.7982C3.32986 17.8699 3.3286 17.9459 3.34714 18.0183C3.36568 18.0906 3.40333 18.1567 3.45615 18.2095C3.50896 18.2623 3.57501 18.3 3.64736 18.3185C3.71972 18.337 3.79573 18.3358 3.86744 18.3149L6.25911 17.6174C6.52799 17.5389 6.77275 17.3938 6.97077 17.1957L11.1483 13.0215Z" stroke="#FFD700" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: "Video Conference",
      description: "Founder Sessions",
      icon: <Video size={24} className="text-[#FFD700]" strokeWidth={2.2} />,
    },
  ];
  */

  return (
    <section className="mx-auto mb-5 mt-6 max-w-[1400px] rounded-[22px] border border-[#001F3F73] bg-[#FFFDF7] px-4 py-5 shadow-[0px_2px_4px_-1px_#001F3F0F,0px_4px_6px_-1px_#001F3F1A] sm:mt-8 sm:rounded-[24px] sm:px-6 sm:py-6 lg:rounded-[28px] lg:px-8 lg:py-8">
      <h2 className="mb-5 sm:mb-6 text-[22px] sm:text-[28px] lg:text-[34px] font-bold text-[#001F3F]">
        Collaboration & Live Sessions
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4 xl:gap-6">
        {sessions.map((session) => (
          <SessionCard
            key={session.title}
            image={session.image}
            title={session.title}
            description={session.description}
            metaOne={session.metaOne}
            metaTwo={session.metaTwo}
            buttonText={session.buttonText}
            buttonVariant={session.buttonVariant}
            badge={session.badge}
            icon={session.icon}
            footerExtra={session.footerExtra}
          />
        ))}
      </div>

      {/*
      <div>
        <h2 className="mb-5 sm:mb-6 text-[22px] sm:text-[28px] lg:text-[34px] font-bold text-[#001F3F]">
          Quick Tools
        </h2>

        <div className="space-y-4 sm:space-y-5">
          {quickTools.map((tool) => (
            <QuickToolCard
              key={tool.title}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              highlighted={tool.highlighted}
            />
          ))}
        </div>
      </div>
      */}
    </section>
  );
}