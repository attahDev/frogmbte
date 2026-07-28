import React from "react";

interface TeamMember {
  name: string;
  lname: string;
  title: string;
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
  {
    name: "Rose",
    lname: "Gordon",
    title: "Head of Administration | Building & Leading Operations",
    role: "Connecting startups with corporate partners across the UK",
    image: "/about/team/newrose4.png",
    imagePosition: "object-[50%_22%] sm:object-[50%_18%] lg:object-[30%_10%]",
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
    name: "Sodeeq Ipadeola",
    lname: "Olalekan",
    title: "Head of Digital Trust, Policy and Compliance",
    role: "Building bridges between academia and industry",
    image: "/about/team/sadiq.png",
  },
];

const MeetTheTeam: React.FC = () => {
  return (
    <section className="bg-[#FFFDF7] py-14 sm:py-16 lg:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto mb-12 max-w-[800px] text-center sm:mb-14 lg:mb-16">
          <h2 className="font-montserrat text-[28px] font-semibold leading-tight text-[#001F3F] sm:text-[32px] lg:text-[36px]">
            Meet the Team
          </h2>

          <p className="mt-4 font-open-sans text-[15px] leading-6 text-[#001F3F] sm:text-[17px] lg:text-[18px]">
            The passionate individuals driving GMBTE&apos;s mission across Greater Manchester
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-[1480px] grid-cols-1 justify-items-center gap-x-5 gap-y-14 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-16 2xl:gap-x-6 2xl:gap-y-20">
          {teamMembers.map((member) => (
            <article
              key={`${member.name}-${member.lname}`}
              className="group relative w-full max-w-[320px] pb-[80px]"
            >
              <div className="relative aspect-square w-full overflow-hidden border border-[#F7F5EE] bg-[#EBEBEB] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10),0px_10px_15px_-3px_rgba(0,0,0,0.10)]">
                <img
                  src={member.image}
                  alt={`${member.name} ${member.lname}`}
                  className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] ${member.imagePosition ?? "object-[50%_10%]"}`}
                />
              </div>

              <div className="absolute bottom-[0px] left-1/2 z-10 flex min-h-[100px] w-[90%] -translate-x-1/2 flex-col items-center justify-center rounded-[16px] bg-white px-3 py-3 text-center shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10),0px_10px_15px_-3px_rgba(0,0,0,0.10)] sm:w-[90%] sm:px-4">
                <h3 className="font-montserrat text-[15px] font-semibold leading-[20px] text-[#001F3F] sm:text-[17px] lg:text-[15px] xl:text-[16px]">
                  <span>{member.name}</span>{" "}
                  <span className="text-[#D7263D]">{member.lname}</span>
                </h3>

                <p className="mt-2 max-w-[260px] font-open-sans text-[11px] font-normal leading-[16px] text-[#B69A00] sm:text-[13px] lg:text-[11px] lg:leading-[16px] xl:text-[12px] xl:leading-[18px]">
                  {member.title}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex justify-center px-2 sm:mt-16 lg:mt-20">
          <div className="flex w-fit max-w-full items-center justify-center gap-3 rounded-full border border-[#C1A301] bg-[#C1A3011A] px-5 py-3 text-center font-open-sans text-[13px] leading-5 text-[#4C4000] sm:px-7 sm:text-[15px]">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#D7263D]" />
            <span>Supported by an advisory board of 12+ industry leaders</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;