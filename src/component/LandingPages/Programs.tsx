import React from 'react';
import ProgramCard from './ProgramCard';

const programsData = [
  {
    icon: <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16C0 7.16344 7.16344 0 16 0H49C57.8366 0 65 7.16344 65 16V49C65 57.8366 57.8366 65 49 65H16C7.16344 65 0 57.8366 0 49V16Z" fill="#FFD700" />
      <path d="M41.9198 31.4221C42.0988 31.3431 42.2507 31.2134 42.3567 31.0489C42.4627 30.8845 42.5181 30.6925 42.5161 30.4969C42.5141 30.3012 42.4547 30.1104 42.3454 29.9482C42.236 29.786 42.0814 29.6594 41.9008 29.5841L33.3298 25.6801C33.0692 25.5613 32.7862 25.4998 32.4998 25.4998C32.2134 25.4998 31.9304 25.5613 31.6698 25.6801L23.0998 29.5801C22.9218 29.6581 22.7703 29.7862 22.664 29.9489C22.5576 30.1116 22.501 30.3018 22.501 30.4961C22.501 30.6905 22.5576 30.8806 22.664 31.0433C22.7703 31.206 22.9218 31.3341 23.0998 31.4121L31.6698 35.3201C31.9304 35.439 32.2134 35.5005 32.4998 35.5005C32.7862 35.5005 33.0692 35.439 33.3298 35.3201L41.9198 31.4221Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42.5 30.5V36.5" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26.5 33V36.5C26.5 37.2956 27.1321 38.0587 28.2574 38.6213C29.3826 39.1839 30.9087 39.5 32.5 39.5C34.0913 39.5 35.6174 39.1839 36.7426 38.6213C37.8679 38.0587 38.5 37.2956 38.5 36.5V33" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    title: 'Education & Empowerment',
    count: '120+ Learning Resources',
    description: 'Connect students with mentors, schools with tech professionals, and unlock career pathways through education, mentorship and opportunities that empower the next generation to thrive.',
    links: ['Educational opportunities', 'Personal development', 'Academic support', 'Confidence building tools', 'Training Opportunities', 'Learning Resources'],
    ctaText: 'Start Learning',
    ctaLink: '/login',
  },
  {
    icon: <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16C0 7.16344 7.16344 0 16 0H49C57.8366 0 65 7.16344 65 16V49C65 57.8366 57.8366 65 49 65H16C7.16344 65 0 57.8366 0 49V16Z" fill="#FFD700" />
      <path d="M26.5 42.5V24.5C26.5 23.9696 26.7107 23.4609 27.0858 23.0858C27.4609 22.7107 27.9696 22.5 28.5 22.5H36.5C37.0304 22.5 37.5391 22.7107 37.9142 23.0858C38.2893 23.4609 38.5 23.9696 38.5 24.5V42.5H26.5Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26.5 32.5H24.5C23.9696 32.5 23.4609 32.7107 23.0858 33.0858C22.7107 33.4609 22.5 33.9696 22.5 34.5V40.5C22.5 41.0304 22.7107 41.5391 23.0858 41.9142C23.4609 42.2893 23.9696 42.5 24.5 42.5H26.5" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38.5 29.5H40.5C41.0304 29.5 41.5391 29.7107 41.9142 30.0858C42.2893 30.4609 42.5 30.9696 42.5 31.5V40.5C42.5 41.0304 42.2893 41.5391 41.9142 41.9142C41.5391 42.2893 41.0304 42.5 40.5 42.5H38.5" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30.5 26.5H34.5" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30.5 30.5H34.5" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30.5 34.5H34.5" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30.5 38.5H34.5" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    title: 'Business & Entrepreneurship',
    count: '80+ Startup Tools',
    description: 'This toolkit empowers aspiring founders with practical guidance, startup tools, market insight, and the confidence to build sustainable businesses that thrive in Greater Manchester’s evolving innovation ecosystem',
    links: ['Market research tools', 'Funding and Support', 'Launch guides', 'Investment insights', 'Entrepreneur mentorship', 'Growth strategy'],
    ctaText: 'Start Your Business Journey',
    ctaLink: '/login',
  },
  {
    icon: <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16C0 7.16344 7.16344 0 16 0H49C57.8366 0 65 7.16344 65 16V49C65 57.8366 57.8366 65 49 65H16C7.16344 65 0 57.8366 0 49V16Z" fill="#FFD700" />
      <path d="M36.5 40.5V24.5C36.5 23.9696 36.2893 23.4609 35.9142 23.0858C35.5391 22.7107 35.0304 22.5 34.5 22.5H30.5C29.9696 22.5 29.4609 22.7107 29.0858 23.0858C28.7107 23.4609 28.5 23.9696 28.5 24.5V40.5" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40.5 26.5H24.5C23.3954 26.5 22.5 27.3954 22.5 28.5V38.5C22.5 39.6046 23.3954 40.5 24.5 40.5H40.5C41.6046 40.5 42.5 39.6046 42.5 38.5V28.5C42.5 27.3954 41.6046 26.5 40.5 26.5Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    title: 'Employment & Career',
    count: '150+ Job Pathways',
    description: 'From CV support to industry insights and role matching guidance, this toolkit helps you discover opportunities, prepare confidently, and take the next step toward meaningful work across Greater Manchester',
    links: ['CV & portfolio building', 'Skill gap analysis', 'Market insights', 'Interview preparation', 'Job readiness resources', 'Career guidance'],
    ctaText: 'Explore Career Tools',
    ctaLink: '/login',
  },
  {
    icon: <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16C0 7.16344 7.16344 0 16 0H49C57.8366 0 65 7.16344 65 16V49C65 57.8366 57.8366 65 49 65H16C7.16344 65 0 57.8366 0 49V16Z" fill="#FFD700" />
      <path d="M22.5 30C22.5 28.8872 22.8376 27.8006 23.4681 26.8837C24.0987 25.9668 24.9925 25.2627 26.0316 24.8644C27.0707 24.4662 28.2062 24.3925 29.288 24.6531C30.3699 24.9137 31.3472 25.4963 32.091 26.324C32.1434 26.3801 32.2067 26.4247 32.2771 26.4552C32.3474 26.4858 32.4233 26.5015 32.5 26.5015C32.5767 26.5015 32.6526 26.4858 32.7229 26.4552C32.7933 26.4247 32.8566 26.3801 32.909 26.324C33.6504 25.4909 34.628 24.9034 35.7116 24.6396C36.7952 24.3759 37.9335 24.4484 38.9749 24.8475C40.0163 25.2467 40.9114 25.9535 41.5411 26.8739C42.1708 27.7944 42.5053 28.8848 42.5 30C42.5 32.29 41 34 39.5 35.5L34.008 40.813C33.8217 41.027 33.5919 41.199 33.334 41.3173C33.0762 41.4357 32.796 41.4979 32.5123 41.4997C32.2285 41.5015 31.9476 41.4429 31.6883 41.3278C31.4289 41.2127 31.197 41.0437 31.008 40.832L25.5 35.5C24 34 22.5 32.3 22.5 30Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    title: 'Community Engagement',
    count: '40+ Local Initiatives',
    description: "Stronger communities create stronger futures. This toolkit helps you plug into local events, initiatives, and collaborations that bring people together, and build a more connected and empowered Greater Manchester",
    links: ['Volunteer opportunities', 'Local event discovery', 'Skill Workshops', 'Career Guidance', 'Community initiative', 'Project collaboration'],
    ctaText: 'Get Involved',
    ctaLink: '/login',
  },
  {
    icon: <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16C0 7.16344 7.16344 0 16 0H49C57.8366 0 65 7.16344 65 16V49C65 57.8366 57.8366 65 49 65H16C7.16344 65 0 57.8366 0 49V16Z" fill="#FFD700" />
      <path d="M32.5 27.5V41.5" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23.5 38.5C23.2348 38.5 22.9804 38.3946 22.7929 38.2071C22.6054 38.0196 22.5 37.7652 22.5 37.5V24.5C22.5 24.2348 22.6054 23.9804 22.7929 23.7929C22.9804 23.6054 23.2348 23.5 23.5 23.5H28.5C29.5609 23.5 30.5783 23.9214 31.3284 24.6716C32.0786 25.4217 32.5 26.4391 32.5 27.5C32.5 26.4391 32.9214 25.4217 33.6716 24.6716C34.4217 23.9214 35.4391 23.5 36.5 23.5H41.5C41.7652 23.5 42.0196 23.6054 42.2071 23.7929C42.3946 23.9804 42.5 24.2348 42.5 24.5V37.5C42.5 37.7652 42.3946 38.0196 42.2071 38.2071C42.0196 38.3946 41.7652 38.5 41.5 38.5H35.5C34.7044 38.5 33.9413 38.8161 33.3787 39.3787C32.8161 39.9413 32.5 40.7044 32.5 41.5C32.5 40.7044 32.1839 39.9413 31.6213 39.3787C31.0587 38.8161 30.2956 38.5 29.5 38.5H23.5Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    title: 'Digital Skills & Training',
    count: '90+ Training Modules',
    description: 'Build real, job ready digital skills with structured learning paths designed for today’s tech landscape. Whether you’re starting fresh or upskilling, this toolkit gives you practical tools, and pathways to unlock new opportunities',
    links: ['AI literacy guidance', 'Programming basics', 'Skill Workshops', 'Access to workshops', 'Software/tool proficiency', 'Cybersecurity'],
    ctaText: 'Build Your Skills',
    ctaLink: '/login',
  },
  {
    icon: <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16C0 7.16344 7.16344 0 16 0H49C57.8366 0 65 7.16344 65 16V49C65.8366 57.8366 57.8366 65 49 65H16C7.16344 65 0 57.8366 0 49V16Z" fill="#FFD700" />
      <path d="M30.5934 28.0825L24.5994 36.2725C24.4583 36.4652 24.3909 36.702 24.4092 36.94C24.4275 37.1781 24.5305 37.4017 24.6994 37.5705L25.5164 38.3885C25.6877 38.5597 25.9153 38.6628 26.157 38.6788C26.3987 38.6948 26.6379 38.6226 26.8304 38.4755L34.6834 32.4815" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36.0935 41.6557C35.0935 40.9817 33.9655 40.4817 32.5935 40.4817C30.5355 40.4817 28.6655 42.8377 26.5935 42.4817C24.5215 42.1257 23.8185 39.1127 25.0935 37.9817" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35.5933 32.4817C38.3547 32.4817 40.5933 30.2431 40.5933 27.4817C40.5933 24.7203 38.3547 22.4817 35.5933 22.4817C32.8318 22.4817 30.5933 24.7203 30.5933 27.4817C30.5933 30.2431 32.8318 32.4817 35.5933 32.4817Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    title: 'Mentorship & Networking',
    count: '60+ Active Mentors',
    description: 'Growth is faster with the right people behind you. This toolkit connects you to mentors, peers, and industry voices who guide, support, and open doors, helping you navigate the tech world with real human connection.',
    links: ['Mentor matching', 'Mentorship Programs', 'Skill Workshops', 'Career Guidance', 'Training Opportunities', 'Network building tools'],
    ctaText: 'Find a Mentor',
    ctaLink: '/login',
  },
  {
    icon: <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="65" height="65" rx="16" fill="#FFD700"/>
    <path d="M31.5002 40.5C29.7443 40.5053 28.0505 39.8505 26.7547 38.6654C25.459 37.4803 24.656 35.8515 24.505 34.1021C24.3539 32.3527 24.8659 30.6104 25.9394 29.2207C27.0128 27.8311 28.5694 26.8957 30.3002 26.6C36.0002 25.5 37.5002 24.98 39.5002 22.5C40.5002 24.5 41.5002 26.68 41.5002 30.5C41.5002 36 36.7202 40.5 31.5002 40.5Z" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22.5 41.5C22.5 38.5 24.35 36.14 27.58 35.5C30 35.02 32.5 33.5 33.5 32.5" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
    ,
    title: 'Climate Action & Sustainability',
    count: '30+ Green Actions',
    description: 'The carbon saving insights you need to make environmentally conscious choices helping Greater Manchester build a greener, more sustainable future for everyone. Small actions create big impact.',
    links: ['Eco friendly living tips','Carbon saving habits', 'Green event', 'Sustainable tech insights', 'Local climate initiative', 'Impact tracking tools'],
    ctaText: 'Start Climate Action',
    ctaLink: '/login',
  },
];

const ProgramSection: React.FC = () => {
  return (
    <section className="bg-[#FFFDF7] py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 font-sans">
      {/* Responsive container with proper padding */}
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1600px]">

        {/* Header Section - Responsive typography and spacing */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          {/* Badge */}
          <p className="text-base sm:text-base  text-[#001F3F] bg-[#F5F5F5] inline-block px-3 py-1 rounded-full mb-3 sm:mb-4 border-[#00000000]">
            Our Services
          </p>

          {/* Main Heading - Scales from mobile to desktop */}
          <h2 className="font-open-sans text-2xl sm:text-3xl md:text-[40px] font-bold text-[#001F3F] mb-4 sm:mb-5 md:mb-6 max-w-4xl mx-auto leading-snug px-4">
            Building a connected, innovative community{" "}
            <br className="hidden sm:block" />
            where everyone can thrive in tech.
          </h2>

          {/* Description - Responsive text size */}
          <p className="font-open-sans text-base sm:text-lg md:text-2xl text-[#6B7280] max-w-4xl mx-auto px-4 leading-relaxed">
            From students to seasoned professionals, from startups to established{" "}
            <br className="hidden md:block" />
            businesses, we provide tailored support for every member of our community.
          </p>
        </div>

        {/* Programs Grid - Responsive grid system with proper gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20">
          {programsData.map((program, index) => (
            <ProgramCard key={index} {...program} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;

