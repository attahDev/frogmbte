import { Heart, Rocket, Users } from "lucide-react";

type ProjectCardProps = {
  title: string;
  description: string;
  raised: string;
  goal: string;
  fundedText: string;
  supporters: number;
  image: string;
  progress: number;
};

const projects: ProjectCardProps[] = [
  {
    title: "Solar Community Gardens",
    description: "Urban farming powered by renewable energy",
    raised: "£37,500",
    goal: "£50,000",
    fundedText: "75% funded",
    supporters: 234,
    image:
      "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=1200&auto=format&fit=crop",
    progress: 72,
  },
  {
    title: "Zero Waste Packaging Startup",
    description: "Biodegradable packaging for local businesses",
    raised: "£18,000",
    goal: "£30,000",
    fundedText: "60% funded",
    supporters: 156,
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop",
    progress: 72,
  },
  {
    title: "Electric Bike Share Network",
    description: "Expanding green transport across Manchester",
    raised: "£22,500",
    goal: "£30,000",
    fundedText: "45% funded",
    supporters: 189,
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1200&auto=format&fit=crop",
    progress: 72,
  },
];

function ProjectCard({
  title,
  description,
  raised,
  goal,
  fundedText,
  supporters,
  image,
  progress,
}: ProjectCardProps) {
  return (
    <article className="rounded-[18px] border border-[#D9DEE8] bg-[#FFFDF7] p-4 sm:p-[18px] lg:rounded-[20px]">
      <div className="flex flex-col gap-5 lg:flex-row">
        <img
          src={image}
          alt={title}
          className="h-[180px] w-full rounded-[16px] object-cover sm:h-[210px] lg:h-[236px] lg:w-[224px] lg:shrink-0 lg:rounded-[18px]"
        />

        <div className="min-w-0 flex-1 lg:pt-[6px]">
          <div className="flex items-start justify-between gap-4">
            <h3 className="min-w-0 text-[17px] font-semibold leading-[1.25] tracking-[-0.03em] text-[#001F3F] sm:text-[19px] md:text-[20px]">
              {title}
            </h3>

            <div className="flex shrink-0 items-center gap-2 pt-1 text-[12px] text-[#4A5565] sm:text-[14px]">
              <Users size={18} strokeWidth={2.1} />
              <span>{supporters}</span>
            </div>
          </div>

          <p className="mt-3 text-[13px] leading-[1.45] text-[#5F6C80] sm:mt-4 sm:text-[14px]">
            {description}
          </p>

          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-[15px] font-semibold leading-none text-[#001F3F] sm:text-[16px]">
              {raised} raised
            </p>

            <p className="text-[12px] leading-none text-[#5F6C80] sm:text-[14px]">
              of {goal} goal
            </p>
          </div>

          <div className="mt-3 h-[14px] w-full rounded-full bg-[#E9EDF3] p-[2px] sm:h-[16px]">
            <div
              className="h-full rounded-full bg-[#FFD700]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-3 text-[13px] leading-none text-[#6A7282] sm:text-[14px]">
            {fundedText}
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <button
              type="button"
              className="flex h-[46px] w-full items-center justify-center gap-2.5 rounded-[14px] bg-[#D7263D] px-5 text-[14px] font-medium text-white transition hover:opacity-95 sm:rounded-[16px]"
            >
              <Rocket size={20} strokeWidth={2.1} />
              Invest
            </button>

            <button
              type="button"
              className="flex h-[46px] w-full items-center justify-center gap-2.5 rounded-[14px] border border-[#D7263D] bg-transparent px-5 text-[14px] font-medium text-[#001F3F] transition hover:bg-[#fff7f8] sm:rounded-[16px] sm:border-[1.5px]"
            >
              <Heart size={20} strokeWidth={2.1} />
              Support
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function GreenInnovationProjects() {
  return (
    <section className="w-full rounded-[20px] border-[0.3px] border-[#001F3F73] bg-[#FFFDF7] px-4 py-5 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:px-5 sm:py-6 lg:rounded-[24px] lg:px-[34px] lg:pb-[34px] lg:pt-[30px]">
      <h2 className="text-[21px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#001F3F] md:text-[25px]">
        Green Innovation Projects
      </h2>

      <p className="mt-3 max-w-2xl text-[14px] leading-[1.45] text-[#6B7280] sm:mt-4 sm:text-base">
        Support eco-startups and community sustainability initiatives
      </p>

      <div className="mt-6 space-y-5 sm:space-y-6 lg:mt-[34px] lg:space-y-[28px]">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}