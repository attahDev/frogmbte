import { Search, MessageCircle, Users } from "lucide-react";

type MentorshipCardProps = {
  title: string;
  description: string;
  buttonText: string;
  icon?: React.ReactNode;
  highlightNumber?: string;
};

export default function CommunityMentorship() {
  const cards = [
    {
      title: "Find Industry Mentors",
      description: "Connect with experts in your field",
      buttonText: "Browse Mentors",
      icon: <Search size={30} className="text-white" strokeWidth={2.2} />,
    },
    {
      title: "Ask a Question Thread",
      description: "Get answers from community",
      buttonText: "Join Now",
      highlightNumber: "24",
      icon: (
        <MessageCircle size={30} className="text-white" strokeWidth={2.2} />
      ),
    },
    {
      title: "Peer Founder Circle",
      description: "Network with fellow entrepreneurs",
      buttonText: "Join Now",
      highlightNumber: "127",
      icon: <Users size={30} className="text-white" strokeWidth={2.2} />,
    },
  ];

  return (
    <section className="mx-auto mt-6 max-w-[1400px] px-4 sm:mt-8 sm:px-6 lg:px-8">
      <h2 className="mb-6 sm:mb-8 text-[24px] sm:text-[28px] lg:text-[34px] font-bold text-[#001F3F]">
        Community Mentorship
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        <FeaturedMentorCard />

        {cards.map((card) => (
          <MentorshipActionCard
            key={card.title}
            title={card.title}
            description={card.description}
            buttonText={card.buttonText}
            icon={card.icon}
            highlightNumber={card.highlightNumber}
          />
        ))}
      </div>
    </section>
  );
}

function MentorshipActionCard({
  title,
  description,
  buttonText,
  icon,
  highlightNumber,
}: MentorshipCardProps) {
  return (
    <div className="rounded-[18px] sm:rounded-[20px] lg:rounded-[24px] border border-[#FFD700] bg-[#FFFDF7] px-5 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-9 shadow-[0px_2px_4px_-1px_#001F3F0F,0px_4px_6px_-1px_#001F3F1A]">
      <div className="mx-auto mb-6 sm:mb-7 lg:mb-8 flex h-[64px] w-[64px] sm:h-[72px] sm:w-[72px] lg:h-[80px] lg:w-[80px] items-center justify-center rounded-[18px] sm:rounded-[20px] lg:rounded-[22px] bg-gradient-to-b from-[#FFD700] to-[#FF7A3D]">
        {icon}
      </div>

      <div className="mx-auto w-full max-w-[260px] text-center sm:max-w-none">
        <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold leading-[1.2] text-[#001F3F]">
          {title}
        </h3>

        <p className="mt-3 sm:mt-4 text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.55] text-[#5B6475]">
          {description}
        </p>

        {highlightNumber && (
          <p className="mt-3 text-[16px] sm:text-[17px] lg:text-[18px] font-bold text-[#D7263D]">
            {highlightNumber}
          </p>
        )}

        <button className="mt-6 sm:mt-7 lg:mt-8 h-[50px] sm:h-[54px] lg:h-[58px] w-full rounded-[14px] sm:rounded-[16px] border-2 border-[#D7263D] bg-transparent text-[15px] sm:text-[16px] lg:text-[18px] font-medium text-[#001F3F] transition hover:bg-[#E11D48] hover:text-white">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

function FeaturedMentorCard() {
  return (
    <div className="rounded-[18px] sm:rounded-[20px] lg:rounded-[24px] border border-[#FFD700] bg-[#FFFDF7] px-5 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-9 shadow-[0px_2px_4px_-1px_#001F3F0F,0px_4px_6px_-1px_#001F3F1A]">
      <div className="flex flex-col items-center text-center">
        {/* Avatar wrapper */}
        <div className="relative mb-6 sm:mb-7 lg:mb-8 h-[96px] w-[96px] sm:h-[108px] sm:w-[108px] lg:h-[122px] lg:w-[122px]">
          <img
            src="/dashboard/toolkits/roset.jpg"
            alt="Rose Gordon"
            className="h-full w-full rounded-full object-cover"
          />

          {/* online dot */}
          <span className="absolute right-[8px] top-[2px] h-[16px] w-[16px] sm:h-[18px] sm:w-[18px] lg:h-[20px] lg:w-[20px] rounded-full border-2 border-[#FFFFFF] bg-[#00C950]" />

          {/* unread/notification badge */}
          <span className="absolute bottom-[2px] right-[2px] flex h-[30px] w-[30px] sm:h-[34px] sm:w-[34px] lg:h-[38px] lg:w-[38px] items-center justify-center rounded-full bg-[#FF3347] text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-white">
            3
          </span>
        </div>

        <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-extrabold leading-tight text-[#001F3F]">
          Rose <span className="text-[#D92D49]">Gordon</span>
        </h3>

        <p className="mt-3 sm:mt-4 max-w-[270px] text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.55] text-[#5B6475]">
          Head of Administration
          <br />
          (Building &amp; Leading Operations)
        </p>

        <button className="mt-6 sm:mt-7 lg:mt-8 h-[50px] sm:h-[54px] lg:h-[58px] w-full max-w-[300px] rounded-[14px] sm:rounded-[16px] bg-[#D7263D] text-[15px] sm:text-[16px] lg:text-[18px] font-medium text-white transition hover:opacity-95">
          Message Mentor
        </button>
      </div>
    </div>
  );
}