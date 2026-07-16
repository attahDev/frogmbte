import React from "react";
import { ServiceCard } from "./ServiceCard";

// You can replace icons with Lucide / HeroIcons later
// const Icon = ({ text }: { text: string }) => (
//   <span className="text-sm font-bold">{text}</span>
// );

const OurServices: React.FC = () => {
  return (
    <section className="w-full bg-[#FFFDF7] py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-8xl p-3 sm:p-5">
        {/* Header */}
        <h2 className="text-2xl sm:text-[25px] font-bold text-[#001F3F]">
          Our Services
        </h2>
        <p className="font-open-sans mt-2 max-w-5xl text-sm sm:text-base text-[#6B7280]">
          Explore GMBTE&apos;s toolkits designed to empower Greater Manchester&apos;s growing tech community.
        </p>

        {/* Grid */}
        <div className="mt-8 sm:mt-10 lg:mt-12 grid gap-5 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2">
          <ServiceCard
            icon={<svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.4198 10.9221C21.5988 10.8431 21.7507 10.7134 21.8567 10.5489C21.9627 10.3845 22.0181 10.1925 22.0161 9.99685C22.0141 9.8012 21.9547 9.61044 21.8454 9.4482C21.736 9.28596 21.5814 9.15937 21.4008 9.08411L12.8298 5.18011C12.5692 5.06126 12.2862 4.99976 11.9998 4.99976C11.7134 4.99976 11.4304 5.06126 11.1698 5.18011L2.5998 9.08011C2.42177 9.15809 2.27031 9.28625 2.16396 9.44893C2.05761 9.61161 2.00098 9.80176 2.00098 9.99611C2.00098 10.1905 2.05761 10.3806 2.16396 10.5433C2.27031 10.706 2.42177 10.8341 2.5998 10.9121L11.1698 14.8201C11.4304 14.939 11.7134 15.0005 11.9998 15.0005C12.2862 15.0005 12.5692 14.939 12.8298 14.8201L21.4198 10.9221Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 10V16" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 12.5V16C6 16.7956 6.63214 17.5587 7.75736 18.1213C8.88258 18.6839 10.4087 19 12 19C13.5913 19 15.1174 18.6839 16.2426 18.1213C17.3679 17.5587 18 16.7956 18 16V12.5" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}
            badge="120+ Learning Resources"
            title="Education & Empowerment"
            description="Connect students with mentors, schools with tech professionals and unlock career pathways..."
            features={[
              "Educational opportunities",
              "Personal development",
              "Academic support",
              "Confidence building tools",
              "Training Opportunities",
              "Learning Resources",
            ]}
            buttonText="Start Learning"
            link="/dashboard/services/toolkits/education"
           
          />

          <ServiceCard
            icon={<svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 22V4C6 3.46957 6.21071 2.96086 6.58579 2.58579C6.96086 2.21071 7.46957 2 8 2H16C16.5304 2 17.0391 2.21071 17.4142 2.58579C17.7893 2.96086 18 3.46957 18 4V22H6Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 12H4C3.46957 12 2.96086 12.2107 2.58579 12.5858C2.21071 12.9609 2 13.4696 2 14V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H6" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22H18" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 6H14" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 10H14" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 14H14" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 18H14" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}
            badge="80+ Startup Tools"
            title="Business & Entrepreneurship"
            description="This toolkit empowers aspiring founders with practical guidance, startup tools..."
            features={[
              "Market research tools",
              "Funding and Support",
              "Launch guides",
              "Investment insights",
              "Entrepreneur mentorship",
              "Growth strategy",
            ]}
            buttonText="Start Your Business Journey"
            link="#"
          />

          <ServiceCard
            icon={<svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 20V4C16 3.46957 15.7893 2.96086 15.4142 2.58579C15.0391 2.21071 14.5304 2 14 2H10C9.46957 2 8.96086 2.21071 8.58579 2.58579C8.21071 2.96086 8 3.46957 8 4V20" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 6H4C2.89543 6 2 6.89543 2 8V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V8C22 6.89543 21.1046 6 20 6Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}
            badge="150+ Job Pathways"
            title="Employment & Career"
            description="From CV support to industry insights and role matching guidance..."
            features={[
              "CV & portfolio building",
              "Skill gap analysis",
              "Market insights",
              "Interview preparation",
              "Job readiness resources",
              "Career guidance",
            ]}
            buttonText="Explore Career Tools"
            link="/dashboard/services/toolkits/jobs"
          />

          <ServiceCard
            icon={<svg width="17" height="20" className="sm:w-5 sm:h-6" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.1871 6.60083L1.1931 14.7908C1.05206 14.9835 0.984615 15.2203 1.00296 15.4583C1.0213 15.6964 1.12422 15.92 1.2931 16.0888L2.1101 16.9068C2.28145 17.078 2.50909 17.1812 2.75076 17.1972C2.99242 17.2132 3.23168 17.1409 3.4241 16.9938L11.2771 10.9998" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.6873 20.174C11.6873 19.5 10.5593 19 9.18729 19C7.12929 19 5.25929 21.356 3.18729 21C1.11529 20.644 0.412294 17.631 1.68729 16.5" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.1875 11C14.9489 11 17.1875 8.76142 17.1875 6C17.1875 3.23858 14.9489 1 12.1875 1C9.42608 1 7.1875 3.23858 7.1875 6C7.1875 8.76142 9.42608 11 12.1875 11Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}
            badge="60+ Active Mentors"
            title="Mentorship & Networking"
            description="Growth is faster with the right people behind you..."
            features={[
              "Mentor matching",
              "Mentorship Programs",
              "Skill Workshops",
              "Career Guidance",
              "Training Opportunities",
              "Network building tools",
            ]}
            buttonText="Find a Mentor"
            link="#"
          />

          <ServiceCard
            icon={<svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 7V21" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 18C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7C12 5.93913 12.4214 4.92172 13.1716 4.17157C13.9217 3.42143 14.9391 3 16 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V17C22 17.2652 21.8946 17.5196 21.7071 17.7071C21.5196 17.8946 21.2652 18 21 18H15C14.2044 18 13.4413 18.3161 12.8787 18.8787C12.3161 19.4413 12 20.2044 12 21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H3Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}
            badge="90+ Training Modules"
            title="Digital Skills & Training"
            description="Build real, job-ready digital skills with structured learning paths..."
            features={[
              "AI literacy guidance",
              "Programming basics",
              "Skill Workshops",
              "Access to workshops",
              "Software proficiency",
              "Cybersecurity",
            ]}
            buttonText="Build Your Skills"
            link="#"
          />

          <ServiceCard
            icon={<svg width="19" height="17" className="sm:w-6 sm:h-5" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6.51615C1.00002 5.40335 1.33759 4.31674 1.96813 3.39982C2.59867 2.4829 3.49252 1.77881 4.53161 1.38055C5.5707 0.982294 6.70616 0.908598 7.78801 1.1692C8.86987 1.4298 9.84722 2.01243 10.591 2.84015C10.6434 2.89617 10.7067 2.94082 10.7771 2.97135C10.8474 3.00188 10.9233 3.01764 11 3.01764C11.0767 3.01764 11.1526 3.00188 11.2229 2.97135C11.2933 2.94082 11.3566 2.89617 11.409 2.84015C12.1504 2.00705 13.128 1.41952 14.2116 1.15575C15.2952 0.891989 16.4335 0.9645 17.4749 1.36364C18.5163 1.76277 19.4114 2.46961 20.0411 3.39006C20.6708 4.3105 21.0053 5.40091 21 6.51615C21 8.80615 19.5 10.5162 18 12.0162L12.508 17.3292C12.3217 17.5432 12.0919 17.7151 11.834 17.8335C11.5762 17.9518 11.296 18.014 11.0123 18.0158C10.7285 18.0176 10.4476 17.959 10.1883 17.8439C9.92893 17.7288 9.69703 17.5598 9.508 17.3482L4 12.0162C2.5 10.5162 1 8.81615 1 6.51615Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}
            badge="40+ Local Initiatives"
            title="Community Engagement"
            description="Stronger communities create stronger futures..."
            features={[
              "Volunteer opportunities",
              "Local event discovery",
              "Skill Workshops",
              "Career Guidance",
              "Community initiative",
              "Project collaboration",
            ]}
            buttonText="Get Involved"
            link="#"
          />

          <ServiceCard
            icon={<svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.9997 20C9.24379 20.0053 7.54999 19.3505 6.25425 18.1654C4.95852 16.9803 4.1555 15.3515 4.00447 13.6021C3.85344 11.8527 4.36543 10.1104 5.43888 8.72074C6.51234 7.33112 8.06886 6.3957 9.79974 6.1C15.4997 5 16.9997 4.48 18.9997 2C19.9997 4 20.9997 6.18 20.9997 10C20.9997 15.5 16.2197 20 10.9997 20Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 21C2 18 3.85 15.64 7.08 15C9.5 14.52 12 13 13 12" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>}
            badge="30+ Green Actions"
            title="Climate Action & Sustainability"
            description="The carbon saving insights you need to make environmentally conscious choices..."
            features={[
              "Eco friendly living tips",
              "Carbon saving habits",
              "Green event",
              "Sustainable tech insights",
              "Local climate initiative",
              "Impact tracking tools",
            ]}
            buttonText="Start Climate Action"
          link="/dashboard/services/toolkits/climate-action"
          />
        </div>
      </div>
    </section>
  );
};

export default OurServices;