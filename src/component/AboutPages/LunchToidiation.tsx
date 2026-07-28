import React, { useState } from 'react';

const BeeIcon = () => (
  <svg width="49" height="46" viewBox="0 0 49 46" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-11 flex-shrink-0">
    <path fillRule="evenodd" clipRule="evenodd" d="M18.7937 36.7801L30.0567 36.7546C29.9079 38.6105 25.9453 42.092 24.316 42.7385C23.9511 42.3282 23.2079 41.8564 22.7206 41.4936C21.3273 40.4566 19.1234 38.4858 18.7937 36.7801ZM31.2596 32.8657L17.9949 32.814C17.0303 32.5372 17.3957 31.2494 17.5257 29.7179L31.3662 29.7394C31.5378 30.7811 31.4827 31.9778 31.2596 32.8657ZM18.2625 25.7826C18.5922 24.2221 19.9404 23.0608 20.8594 22.3714C24.2023 19.8631 25.2319 20.046 28.4004 22.5002C29.3673 23.2494 30.5451 24.1594 30.8912 25.7815L18.2625 25.7826ZM30.4525 20.4336C33.3329 18.927 34.9276 17.406 38.6079 16.1652C40.2127 15.6237 42.4247 15.3046 44.0265 15.9232C48.7997 17.7664 45.284 24.2006 38.6589 24.5314C37.0846 24.6103 34.079 24.615 33.2257 23.716L30.4531 20.4336H30.4525ZM18.7427 20.7C15.7705 22.6175 17.7125 24.9905 10.151 24.5204C3.63197 24.1153 0.0582462 17.3979 5.27009 15.8275C9.86815 14.4422 18.0569 19.5678 18.7427 20.7ZM26.7629 12.7325C28.6042 15.0295 27.731 13.6674 28.6809 14.6679C27.4604 18.5713 21.1147 18.0467 20.2503 14.6679L21.5926 13.5647C22.1039 11.8852 22.6327 11.6554 21.8403 9.79422C23.8486 8.88018 24.5865 8.82678 26.7459 9.64449C26.805 10.9032 26.3687 11.0733 26.7629 12.7325ZM19.5264 8.33231C18.4757 8.99738 17.5913 10.3914 17.2798 12.0488C16.8387 14.3934 17.6376 15.4537 18.317 16.9597C14.3098 14.8345 7.77616 10.7599 2.61117 14.1601C-1.54589 16.897 -0.588311 22.2425 4.41035 25.3845C7.11437 27.0843 9.85643 27.2236 13.4758 27.0507C12.8621 28.5021 9.63154 30.7103 7.21977 30.9529C6.07479 31.0678 5.02294 30.9744 5.05163 32.2616C5.09849 34.3305 8.7753 33.4321 10.1967 32.9011C12.3039 32.1142 13.0876 31.0365 14.4832 30.1352C14.5055 38.556 19.2365 43.1517 24.4026 46C26.4109 45.2142 29.9594 42.1251 31.3685 40.1415C33.4418 37.2223 34.2131 34.641 34.3783 30.1509C34.9347 30.4399 35.583 31.1061 36.2372 31.5698C38.5529 33.2104 43.2657 34.6421 43.7425 32.626C44.088 31.1647 43.059 31.0742 41.9656 30.9744C40.8493 30.8722 40.126 30.6604 39.2018 30.1845C37.7546 29.4388 35.9736 28.1034 35.3382 26.9979C41.9609 27.6717 48.9971 24.7334 49 18.5376C49.0018 14.9523 45.0555 12.5009 40.625 12.9571C38.0223 13.2252 35.207 14.607 32.9539 15.7891C32.1141 16.2296 31.4728 16.7374 30.5796 17.0107C32.3665 13.7597 32.1229 10.4866 29.4546 8.36889C29.7415 6.73755 31.9477 4.69241 32.8954 3.92636C33.8225 3.17598 34.2658 3.05875 35.3909 2.53702C36.653 1.95146 36.7924 0.69966 35.7124 0.15762C34.1733 -0.614815 31.341 1.73153 30.596 2.42503C29.8329 3.13537 29.3884 3.62866 28.7049 4.42605C28.0507 5.1892 27.4499 6.2396 26.9403 6.75553C24.2246 6.26746 24.4963 6.44622 21.8579 6.73291C21.2793 5.2542 15.3904 -1.15396 12.9101 0.18199C12.4796 0.414127 11.5959 1.64272 13.2375 2.51265C14.287 3.06804 14.9289 3.21487 15.8911 3.95365C17.0226 4.82242 19.11 6.78978 19.5258 8.33407L19.5264 8.33231Z" fill="#001F3F" fillOpacity="0.7" />
  </svg>
);

interface RoadmapItem {
  text: string;
}

interface PhaseData {
  year: string;
  title: string;
  subtitle: string;
  items: RoadmapItem[];
  color: string;
}

const buildPhases: PhaseData[] = [
  {
    year: '2021',
    title: 'Seed Idea /',
    subtitle: 'Conceptualization',
    color: 'yellow',
    items: [
      { text: 'Brainstorm concept and niche (e.g., tech, community, impact).' },
      { text: 'Map the target audience and early needs.' },
      { text: 'Conduct market research and competitor analysis.' },
      { text: 'Build initial vision, mission, and value proposition' },
      { text: 'Concept notes / whitepaper.' },
      { text: 'Early stakeholder interest / letters of intent.' },
      { text: 'High-level impact hypotheses.' }
    ]
  },
  {
    year: '2022',
    title: 'Validation &',
    subtitle: 'Proof of Concept',
    color: 'red',
    items: [
      { text: 'Pilot small projects or events with core target audience.' },
      { text: 'Gather early feedback, surveys, and usage data.' },
      { text: 'Begin building a small but dedicated community' },
      { text: 'Seek early partnerships or mentorship support.' },
      { text: 'Pilot case studies and testimonials.' },
      { text: 'Early traction metrics.' },
      { text: 'Lessons learned and refinement of concept.' }
    ]
  },
  {
    year: '2023',
    title: 'Iteration &',
    subtitle: 'Expansion',
    color: 'blue',
    items: [
      { text: 'Expand pilot programs, events, or services.' },
      { text: 'Test technology or platform prototypes.' },
      { text: 'Start documenting success stories and early impact.' },
      { text: 'Build brand identity, social presence, and credibility.' },
      { text: 'Refined prototypes / MVP (Minimum Viable Product).' },
      { text: 'Media mentions, community growth & stakeholder support.' },
      { text: 'Documented case studies for credibility.' }
    ]
  }
];

const boomPhases: PhaseData[] = [
  {
    year: '2024',
    title: 'Pilot Consolidation',
    subtitle: '& Proof of Impact',
    color: 'yellow',
    items: [
      { text: 'Run large-scale pilot programs or hybrid events.' },
      { text: 'Measure KPIs: reach, engagement, satisfaction, success outcomes.' },
      { text: 'Engage strategic partners, sponsors, or funders.' },
      { text: 'Begin collecting longitudinal data for impact storytelling.' },
      { text: 'Comprehensive pilot report with quantitative and qualitative data.' },
      { text: 'Testimonials, success stories, and media coverage.' },
      { text: 'Refined roadmap for full launch.' }
    ]
  },
  {
    year: '2025',
    title: 'Pre-Launch /',
    subtitle: 'Scaling Pilot',
    color: 'red',
    items: [
      { text: 'Run full scale pilot events with platform elements.' },
      { text: 'Finalize technology stack and platform features.' },
      { text: 'Start strategic PR and marketing campaigns.' },
      { text: 'Document case studies, success stories, and long term partnerships.' },
      { text: 'Platform beta ready for user onboarding.' },
      { text: 'Strong track record of success and impact stories.' },
      { text: 'Ready to pitch materials for investors or sponsors.' }
    ]
  },
  {
    year: '2026',
    title: 'Full Launch &',
    subtitle: 'Long Term Impact',
    color: 'blue',
    items: [
      { text: 'Public launch of platform with marketing blitz.' },
      { text: 'Showcase accumulated impact: stories, case studies, metrics.' },
      { text: 'Engage press, partners, and influencers for visibility.' },
      { text: 'Establish ongoing support programs, mentorship, and community engagement.' },
      { text: 'Set up continuous monitoring and feedback for scaling.' },
      { text: 'Fully functional platform with robust user base.' },
      { text: 'Documented long standing success, measurable impact, and case studies.' },
      { text: 'Platform recognized as a trusted, scalable solution.' }
    ]
  }
];

const LaunchIdeationRoadmap: React.FC = () => {
  const [activeView, setActiveView] = useState<'build' | 'boom'>('build');
  const phases = activeView === 'build' ? buildPhases : boomPhases;

  const getColorClasses = (color: string) => {
    const colors = {
      yellow: 'bg-[#FFD7000F] border-[#FFD700]',
      red: 'bg-[#D7263D0F] border-[#D7263D]',
      blue: 'bg-[#001A330D] border-[#001A33]'
    };
    return colors[color as keyof typeof colors] || colors.yellow;
  };

  const getLineColor = (color: string) => {
    const colors = {
      yellow: '#E0BE09',
      red: '#D7263D',
      blue: '#001A33'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-[#F7F5EE] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto mb-[100px]">
        {/* Header */}
        <div className="text-center mb-8 mt-10 sm:mt-16 lg:mt-20 lg:mb-12">
          <h2 className="font-montserrat text-xl mb-3 font-bold text-[#001F3F] sm:text-[27px] md:text-[30px]">
            Launch Ideation & Roadmap
          </h2>
          <p className="text-[#001F3F] text-base sm:text-md px-4 max-w-2xl mx-auto leading-relaxed">
          From a simple idea to a thriving community that's transforming
            <br className="hidden sm:block" />
            {" "}Greater Manchester's tech landscape
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex flex-wrap justify-center gap-3 py-3 sm:gap-4 lg:gap-6 mb-8 lg:mb-16 px-2">
          {/* BUILD */}
          <button
            onClick={() => setActiveView('build')}
            className="relative group"
          >
            {activeView === 'build' && (
              <span className="absolute inset-0 translate-y-1 rounded-full bg-[#D7263D]" />
            )}
            <span
              className={`relative inline-flex items-center justify-center px-6 sm:px-8 lg:px-18 py-2 sm:py-3 lg:py-4 rounded-full font-bold text-base sm:text-lg lg:text-xl transition-all
                ${activeView === 'build'
                  ? 'bg-[#FFD700] text-gray-900'
                  : 'bg-white text-[#001F3F] border border-[#DEDFE2]'
                }
              `}
            >
              Build
            </span>
          </button>

          {/* BOOM */}
          <button
            onClick={() => setActiveView('boom')}
            className="relative group"
          >
            {activeView === 'boom' && (
              <span className="absolute inset-0 translate-y-1 rounded-full py-2 bg-red-500" />
            )}
            <span
              className={`relative inline-flex items-center justify-center px-6 sm:px-8 lg:px-18 py-2 sm:py-3 lg:py-4 rounded-full font-bold text-base sm:text-lg lg:text-xl transition-all
                ${activeView === 'boom'
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-white text-gray-800 border-2 border-gray-300'
                }
              `}
            >
              Boom
            </span>
          </button>
        </div>

        {/* Timeline Container */}
        <div className="relative px-2 sm:px-4 lg:px-8">
          {/* SVG Timeline - Only visible on large screens */}
          <svg
            className="hidden lg:block absolute left-0 top-44 w-full h-32 pointer-events-none overflow-visible"
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
            style={{ zIndex: 0 }}
          >
            <line
              x1="0"
              y1="20"
              x2="33.33"
              y2="13.33"
              stroke={getLineColor(phases[0].color)}
              strokeWidth="0.6"
            />
            <line
              x1="33.33"
              y1="13.33"
              x2="66.66"
              y2="6.66"
              stroke={getLineColor(phases[1].color)}
              strokeWidth="0.6"
            />
            <line
              x1="66.66"
              y1="6.66"
              x2="100"
              y2="0"
              stroke={getLineColor(phases[2].color)}
              strokeWidth="0.6"
            />
            <line x1="33.33" y1="11" x2="33.33" y2="18" stroke={getLineColor(phases[0].color)} strokeWidth="0.6" />
            <line x1="66.66" y1="4" x2="66.66" y2="11" stroke={getLineColor(phases[1].color)} strokeWidth="0.6" />
          </svg>

          {/* Phases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 relative" style={{ zIndex: 1 }}>
            {phases.map((phase, idx) => {
              const verticalOffsets = ['lg:mt-56', 'lg:mt-44', 'lg:mt-32'];

              return (
                <div key={idx} className="w-full">
                  <div className="mb-3 sm:mb-3">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                      {phase.year}
                    </h2>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
                      {phase.title}
                    </h3>
                    <h4 className="text-base sm:text-xl text-gray-500">
                      {phase.subtitle}
                    </h4>
                  </div>

                  <div className={`space-y-3 ${verticalOffsets[idx]}`}>
                    {phase.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className={`${getColorClasses(
                          phase.color
                        )} border-2 rounded-xl p-3 sm:p-4 hover:shadow-md transition`}
                      >
                        <div className="flex gap-2 sm:gap-3">
                          <BeeIcon />
                          <p className="text-sm sm:text-base text-[#001F3F99] leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchIdeationRoadmap;