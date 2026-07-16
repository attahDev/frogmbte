import { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Video, ArrowRight, Download } from 'lucide-react';

type EventType = 'upcoming' | 'attended' | 'saved';
type EventFormat = 'Virtual' | 'In-Person' | 'Hybrid';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  format: EventFormat;
  image: string;
  attending?: string;
  imageType?: string;
}

const EventsUI = () => {
  const [activeTab, setActiveTab] = useState<EventType>('upcoming');

  const sampleImages = {
    event1: '/dashboard/envent/plannede/imm1.jpg',
    event2: '/dashboard/envent/plannede/imm2.jpg',
    event3: '/dashboard/envent/plannede/imm3.jpg',
    event4: '/dashboard/envent/plannede/imm4.jpg',
    event5: '/dashboard/envent/plannede/imm5.jpg',
  };

  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'Tech Career Panel Discussion',
      description: 'Join industry leaders discussing career paths in technology',
      date: 'Nov 15, 2025',
      time: '6:00 PM - 9:00 PM',
      format: 'Virtual',
      image: sampleImages.event1,
      imageType: 'auditorium'
    },
    {
      id: '2',
      title: 'Networking Mixer',
      description: 'Build your professional network with Manchester tech community',
      date: 'Nov 18, 2025',
      time: '10:00 AM - 2:30 PM',
      format: 'In-Person',
      image: sampleImages.event2,
      imageType: 'networking'
    },
    {
      id: '3',
      title: 'Hackathon: Build the Future',
      description: 'Come Collaborate, code and create real world tech solutions that shape tomorrow.',
      date: 'Nov 25, 2025',
      time: '12:00 PM - 7:00 PM',
      format: 'Hybrid',
      image: sampleImages.event3,
      imageType: 'hackathon'
    },
    {
      id: '4',
      title: 'Women in Tech',
      description: 'Empowering Women in tech through workshops, panel discussions and networking opportunities.',
      date: 'Dec 31, 2025',
      time: '8:00 AM - 12:00 PM',
      format: 'In-Person',
      image: sampleImages.event4,
      imageType: 'women-tech'
    },
    {
      id: '5',
      title: 'Coding Bootcamp Session',
      description: 'Master the fundamentals of web development with experienced instructors',
      date: 'Dec 31, 2025',
      time: '8:00 AM - 12:00 PM',
      format: 'In-Person',
      image: sampleImages.event5,
      imageType: 'bootcamp'
    }
  ];

  const attendedEvents: Event[] = [
    {
      id: '6',
      title: 'Diversity in Tech Panel',
      description: 'Join thought leaders discussing pathways to a more inclusive tech industry.',
      date: 'Nov 15, 2025',
      time: '6:00 PM - 9:00 PM',
      format: 'Virtual',
      image: sampleImages.event1,
      imageType: 'diversity',
      attending: '150 attended'
    }
  ];

  const savedEvents: Event[] = [
    {
      id: '7',
      title: 'UX Design & Code Mastery',
      description: 'Bridge creativity as you learn to design and bring ideas to life through code.',
      date: 'Dec 31, 2025',
      time: '8:00 AM - 12:00 PM',
      format: 'In-Person',
      image: sampleImages.event2,
      imageType: 'ux-design',
      attending: '75 attending'
    },
    {
      id: '8',
      title: 'Leadership Workshop',
      description: 'Session to help you lead with vision and impact in today\'s tech driven world',
      date: 'Dec 31, 2025',
      time: '8:00 AM - 12:00 PM',
      format: 'In-Person',
      image: sampleImages.event3,
      imageType: 'leadership',
      attending: '42 attending'
    }
  ];

  const getEvents = () => {
    switch (activeTab) {
      case 'upcoming':
        return upcomingEvents;
      case 'attended':
        return attendedEvents;
      case 'saved':
        return savedEvents;
      default:
        return upcomingEvents;
    }
  };

  const getImageGradient = (imageType?: string) => {
    const gradients: Record<string, string> = {
      'auditorium': 'from-blue-900/80 to-gray-900/80',
      'networking': 'from-amber-900/60 to-gray-800/60',
      'hackathon': 'from-yellow-400/20 to-blue-400/20',
      'women-tech': 'from-green-600/30 to-yellow-500/30',
      'bootcamp': 'from-green-700/40 to-lime-600/40',
      'diversity': 'from-amber-800/50 to-gray-700/50',
      'ux-design': 'from-gray-400/60 to-pink-300/60',
      'leadership': 'from-teal-200/60 to-gray-300/60'
    };
    return gradients[imageType || ''] || 'from-gray-600/60 to-gray-800/60';
  };

  const FormatBadge = ({ format }: { format: EventFormat }) => {
    const colors = {
      Virtual: 'bg-blue-100 text-blue-700',
      'In-Person': 'bg-green-100 text-green-700',
      Hybrid: 'bg-purple-100 text-purple-700'
    };

    const icons = {
      Virtual: <Video className="w-3 h-3 sm:w-3.5 sm:h-3.5" />,
      'In-Person': <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />,
      Hybrid: <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
    };

    return (
      <div className={`${colors[format]} px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-1.5`}>
        {icons[format]}
        <span className="hidden sm:inline">{format}</span>
      </div>
    );
  };

  const EventCard = ({ event, isAttended }: { event: Event; isAttended?: boolean }) => (
    <div className="bg-[#FFFDF7] rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 hover:border-red-100">
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${getImageGradient(event.imageType)} mix-blend-overlay`} />
        <div className={`absolute inset-0 bg-gradient-to-br ${getImageGradient(event.imageType)} ${!event.image ? 'block' : 'hidden'}`} />

        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <FormatBadge format={event.format} />
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <h3 className="text-base sm:text-xl font-bold text-gray-900 line-clamp-2 pr-2">
            {event.title}
          </h3>
          {event.attending && (
            <span className="flex-shrink-0 bg-red-50 text-[#D7263D] text-xs font-semibold px-2 py-1 sm:px-2.5 sm:py-1 rounded-full">
              {event.attending}
            </span>
          )}
        </div>

        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-2 sm:line-clamp-3">
          {event.description}
        </p>

        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D7263D] flex-shrink-0" />
            <span className="text-xs sm:text-sm">{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D7263D] flex-shrink-0" />
            <span className="text-xs sm:text-sm">{event.time}</span>
          </div>
        </div>

        {isAttended ? (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button className="flex-1 bg-white border-2 border-gray-200 text-gray-900 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-2">
              View Recap
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button className="flex-1 bg-[#FFD700] text-gray-900 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-sm font-semibold hover:bg-[#FFD700] hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 border-2 border-[#FFD700]">
              Certificate
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        ) : (
          <button className="w-full bg-gradient-to-r from-[#D7263D] to-[#D7263D] text-white py-2.5 sm:py-3.5 px-3 sm:px-4 rounded-lg sm:rounded-xl text-sm font-semibold hover:from-[#D7263D] hover:to-[#D7263D] hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group">
            View Details
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-[#FFFDF7] to-gray-50/50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
            Events & Workshops
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Discover, attend, and grow with our curated tech events
          </p>
        </div>

        {/* Tabs - Horizontal scroll on mobile */}
        <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide sm:mb-8 lg:mb-10">
          <div className="flex w-max min-w-full gap-2 sm:w-auto sm:min-w-0 sm:gap-4">
            {(['upcoming', 'attended', 'saved'] as EventType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-4 py-2 sm:px-6 md:px-8 sm:py-2.5 md:py-3 rounded-full font-semibold text-sm sm:text-base 
                  transition-all duration-300 whitespace-nowrap border flex-shrink-0
                  ${activeTab === tab
                    ? 'bg-[#FFD700] text-[#001F3F] border-transparent shadow-[0_4px_0_0_#D7263D] sm:shadow-[0_6px_0_0_#D7263D]'
                    : 'bg-white text-[#001F3F] border-gray-200 hover:bg-gray-50'
                  }
                `}
              >
                {tab === 'upcoming' && (
                  <>
                    <span className="sm:hidden">Upcoming</span>
                    <span className="hidden sm:inline">Upcoming Events</span>
                  </>
                )}
                {tab === 'attended' && (
                  <>
                    <span className="sm:hidden">Attended</span>
                    <span className="hidden sm:inline">Attended Events</span>
                  </>
                )}
                {tab === 'saved' && (
                  <>
                    <span className="sm:hidden">Saved</span>
                    <span className="hidden sm:inline">Saved Events</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {getEvents().length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {getEvents().map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isAttended={activeTab === 'attended'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 bg-white/50 rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No events found</h3>
            <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 px-4">
              There are no {activeTab} events at the moment
            </p>
            {activeTab !== 'upcoming' && (
              <button
                onClick={() => setActiveTab('upcoming')}
                className="inline-flex items-center gap-2 bg-[#D7263D] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                Browse Upcoming Events
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsUI;