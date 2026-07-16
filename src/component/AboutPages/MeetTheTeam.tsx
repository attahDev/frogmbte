import React from "react";

interface TeamMember {
  name: string;
  title: string;
  lname: string;
  role: string;
  image: string;
  imagePosition?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Michael",
    lname: "Ekpechue",
    title: "Founder, Director & Advocate for Innovation & Impact",
    role: "Tech entrepreneur with 15+ years in Manchester's startup ecosystem",
    image: "/about/founders/mrmike.png",
  },
  // {
  //   name: "Ogechukwu",
  //   lname: "Uboma",
  //   title: "Head of Marketing & Communications | Brand & Engagement Lead",
  //   role: "Former Microsoft PM, passionate about diversity in tech",
  //   image: "/about/founders/mrsuboma.png",
  // },
  {
    name: "Rose",
    lname: "Gordon",
    title: "Head of Administration | Building & Leading Operations",
    role: "Connecting startups with corporate partners across the UK",
    image: "/about/founders/mrs.png",
    imagePosition:
      "object-[50%_22%] sm:object-[50%_18%] md:object-[50%_10%]",
  },
  {
    name: "Carol Ann",
    lname: "Whitehead",
    title: "Executive Director Heritage and Legacy",
    role: "Building bridges between academia and industry",
    image: "/about/team/carol-ann.png",
    imagePosition: "object-[50%_18%]",
  },
  {
    name: "Sodeeq",
    lname: "Olalekan",
    title: "Head of Digital Trust, Policy and Compliance",
    role: "Building bridges between academia and industry",
    image: "/about/team/sadiq.png",
  },
];

const MeetTheTeam: React.FC = () => {
  return (
    <section className="bg-[#FFFDF7] py-12 text-center sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="mb-3 text-2xl font-semibold text-[#001F3F] sm:text-3xl lg:text-[36px]">
          Meet the Team
        </h2>
        <p className="mx-auto mb-10 max-w-2xl px-2 text-base text-[#001F3F] sm:mb-12 sm:text-lg lg:mb-14">
          The passionate individuals driving GMBTE&apos;s mission across Greater
          Manchester
        </p>

        <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-y-12 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-4 md:gap-x-4 md:gap-y-0 lg:gap-x-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative w-full max-w-[340px] md:mb-14 md:max-w-none"
            >
              <div className="overflow-hidden rounded-xl bg-[#EBEBEB] shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                <img
                  src={member.image}
                  alt={`Headshot of ${member.name} ${member.lname}`}
                  className={`h-[260px] w-full object-cover transition duration-500 group-hover:scale-[1.02] sm:h-[300px] md:h-[240px] lg:h-[280px] ${
                    member.imagePosition ?? "object-[50%_10%]"
                  }`}
                />
              </div>

              <div
                className="relative z-10 mx-auto mt-3 w-[92%] rounded-2xl bg-white px-4 py-3 text-left shadow-[0_6px_20px_rgba(0,31,63,0.08)]
                           sm:mt-4 sm:px-5 sm:py-3.5
                           md:absolute md:bottom-0 md:left-1/2 md:mt-0 md:w-[94%] md:-translate-x-1/2 md:translate-y-1/2 md:px-3 md:py-3 lg:px-4"
              >
                <h3 className="mb-1 text-base font-bold leading-snug text-[#001F3F] sm:text-[18px] lg:text-[17px]">
                  {member.name}{" "}
                  <span className="text-[#D7263D]">{member.lname}</span>
                </h3>
                <p className="text-[11px] font-medium leading-[1.45] text-[#C1A301] sm:text-xs lg:text-[11px]">
                  {member.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center px-4 sm:mt-16 lg:mt-20">
          <div className="flex max-w-lg flex-wrap items-center justify-center gap-2 rounded-full border-[0.6px] border-[#C1A301] bg-[#C1A3011A] px-4 py-3 text-sm text-[#4C4000] shadow-sm sm:gap-3 sm:px-6 sm:text-[15px]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#D7263D]" />
            Supported by an advisory board of 12+ industry leaders
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
