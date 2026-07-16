import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function EventsSection() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // October 2025

  const events = [
    {
      id: 1,
      title: "Tech Career Panel Discussion",
      description: "Join industry leaders discussing career paths in technology",
      date: "Nov 15, 2025",
      time: "6:00 PM - 9:00 PM",
      type: "Virtual",
      image: "/dashboard/events/im4.jpg"
    },
    {
      id: 2,
      title: "Networking Mixer",
      description: "Build your professional network with Manchester tech community",
      date: "Nov 18 2025",
      time: "10:00 AM - 2:30 PM",
      type: "In-Person",
      image: "/dashboard/events/im3.jpg"
    },
    {
      id: 3,
      title: "Hackathon: Build the Future",
      description: "Join industry leaders discussing career paths in technology",
      date: "Nov 25, 2025",
      time: "12:00 PM - 7:00 PM",
      type: "Hybrid",
      image: "/dashboard/events/im2.jpg"
    },
    {
      id: 4,
      title: "Women in Tech",
      description: "Build your professional network with Manchester tech community",
      date: "Dec 31, 2025",
      time: "8:00 AM - 12:00 PM",
      type: "In-Person",
      image: "/dashboard/events/im1.jpg"
    }
  ];

  const savedEvents = [
    {
      id: 1,
      title: "UX Design & Code Mastery",
      description: "Bridge creativity as you learn to design and bring ideas to life through code.",
      date: "Dec 8, 2025",
      time: "8:00 AM - 12:00 PM",
      location: "Innovation Centre",
      image: "/dashboard/events/s11.jpg"
    },
    {
      id: 2,
      title: "Leadership Workshop",
      description: "Session to help you lead with vision and impact in today's technology world.",
      date: "Oct 24, 2025",
      time: "9:00 AM - 1:00 PM",
      location: "Tech Hub Central",
      image: "/dashboard/events/s12.jpg"
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Generate calendar days
  const calendarDays = [];
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Previous month days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({ day: prevMonthDays - i, isCurrentMonth: false });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, isCurrentMonth: true });
  }

  // Next month days
  const remainingDays = 42 - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({ day: i, isCurrentMonth: false });
  }

  const specialDates = [1, 8, 24];

  return (
    <div className="w-full bg-[#FFFDF7] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Left Section - Recommended Events */}
        <div className="lg:col-span-2 border rounded-xl sm:rounded-2xl border-[#001F3F1A] p-4 sm:p-5">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#001F3F] mb-2 mt-2 sm:mt-3">Recommended for You</h2>
            <p className="text-sm sm:text-base mt-2 sm:mt-3 text-[#6B7280] mb-2">Handpicked events and earning opportunities designed to help you level up in your tech journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-[#FFFDF7] rounded-xl sm:rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-40 sm:h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <span className={`absolute top-3 sm:top-4 flex gap-1 items-center justify-center right-3 sm:right-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium ${event.type === 'Virtual' ? 'bg-blue-100 text-blue-700' :
                    event.type === 'In-Person' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                    {event.type === 'Virtual' && (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_1103_5241)">
                        <path d="M9.3335 7.58333L12.3802 9.61449C12.4242 9.64372 12.4752 9.66049 12.5279 9.66301C12.5806 9.66553 12.633 9.65371 12.6795 9.62881C12.726 9.60391 12.7649 9.56685 12.792 9.5216C12.8191 9.47635 12.8335 9.42458 12.8335 9.37183V4.59083C12.8335 4.53951 12.82 4.48909 12.7943 4.44467C12.7686 4.40025 12.7316 4.3634 12.6871 4.33783C12.6426 4.31227 12.5922 4.2989 12.5408 4.29907C12.4895 4.29925 12.4392 4.31296 12.3948 4.33883L9.3335 6.12499" stroke="#193CB8" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.1665 3.5H2.33317C1.68884 3.5 1.1665 4.02233 1.1665 4.66667V9.33333C1.1665 9.97767 1.68884 10.5 2.33317 10.5H8.1665C8.81084 10.5 9.33317 9.97767 9.33317 9.33333V4.66667C9.33317 4.02233 8.81084 3.5 8.1665 3.5Z" stroke="#193CB8" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_1103_5241">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    )}
                    {event.type === 'In-Person' && (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_1103_5274)">
                        <path d="M11.6668 5.83341C11.6668 8.746 8.43575 11.7793 7.35075 12.7162C7.24967 12.7922 7.12663 12.8333 7.00016 12.8333C6.8737 12.8333 6.75066 12.7922 6.64958 12.7162C5.56458 11.7793 2.3335 8.746 2.3335 5.83341C2.3335 4.59574 2.82516 3.40875 3.70033 2.53358C4.5755 1.65841 5.76249 1.16675 7.00016 1.16675C8.23784 1.16675 9.42482 1.65841 10.3 2.53358C11.1752 3.40875 11.6668 4.59574 11.6668 5.83341Z" stroke="#016630" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 7.58325C7.9665 7.58325 8.75 6.79975 8.75 5.83325C8.75 4.86675 7.9665 4.08325 7 4.08325C6.0335 4.08325 5.25 4.86675 5.25 5.83325C5.25 6.79975 6.0335 7.58325 7 7.58325Z" stroke="#016630" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_1103_5274">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    )}
                    {event.type === 'Hybrid' && (<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_1103_5308)">
                        <path d="M9.33317 12.25V11.0833C9.33317 10.4645 9.08734 9.871 8.64975 9.43342C8.21217 8.99583 7.61868 8.75 6.99984 8.75H3.49984C2.881 8.75 2.28751 8.99583 1.84992 9.43342C1.41234 9.871 1.1665 10.4645 1.1665 11.0833V12.25" stroke="#6E11B0" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.3335 1.82471C9.83385 1.95442 10.277 2.24661 10.5933 2.65541C10.9096 3.06421 11.0813 3.56648 11.0813 4.08337C11.0813 4.60027 10.9096 5.10254 10.5933 5.51134C10.277 5.92014 9.83385 6.21232 9.3335 6.34204" stroke="#6E11B0" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.8335 12.2501V11.0834C12.8331 10.5664 12.661 10.0642 12.3443 9.65561C12.0275 9.24701 11.5841 8.95518 11.0835 8.82593" stroke="#6E11B0" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.24984 6.41667C6.5385 6.41667 7.58317 5.372 7.58317 4.08333C7.58317 2.79467 6.5385 1.75 5.24984 1.75C3.96117 1.75 2.9165 2.79467 2.9165 4.08333C2.9165 5.372 3.96117 6.41667 5.24984 6.41667Z" stroke="#6E11B0" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_1103_5308">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    )}
                    {' '}{event.type}
                  </span>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-[#001F3F] mb-2">{event.title}</h3>
                  <p className="text-[#001F3F99] text-xs sm:text-sm mb-3 sm:mb-4">{event.description}</p>

                  <div className="space-y-2 mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 text-[#4A5565]">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D7263D]" />
                      <span className="text-xs sm:text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D7263D]" />
                      <span className="text-xs sm:text-sm">{event.time}</span>
                    </div>
                  </div>

                  <Link
                    to="/dashboard/events"
                    className="w-full bg-[#D7263D] hover:bg-[#D7263D] text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Calendar & Saved Events */}
        <div className="space-y-4 sm:space-y-6 border rounded-xl sm:rounded-2xl border-[#001F3F1A] p-3 sm:p-4">
          {/* Calendar */}
          <div className="bg-[#FFFDF7] rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Your Saved Event</h3>

            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <button onClick={previousMonth} className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition">
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
                <h4 className="font-bold text-sm sm:text-base text-gray-900">{monthNames[month]} {year}</h4>
                <button onClick={nextMonth} className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition">
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-xs sm:text-sm font-semibold text-gray-600">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {calendarDays.map((item, index) => {
                  const isSpecial = item.isCurrentMonth && specialDates.includes(item.day);
                  const isToday = item.isCurrentMonth && item.day === 8;

                  return (
                    <button
                      key={index}
                      className={`
                        aspect-square flex items-center justify-center rounded-lg text-xs sm:text-sm font-medium transition
                        ${!item.isCurrentMonth ? 'text-gray-300' : 'text-gray-900'}
                        ${isToday ? 'bg-[#FFD70033] rounded-full text-gray-900 font-bold' : 'text-[#D7263D]'}
                        ${isSpecial && !isToday ? 'bg-[#FFD70033] rounded-full text-gray-900' : 'text-[#D7263D'}
                        ${item.isCurrentMonth && !isSpecial ? 'hover:bg-gray-100' : 'text-[#D7263D'}
                      `}
                    >
                      {item.day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Saved Events Cards */}
          {savedEvents.map((event) => (
            <div key={event.id} className="bg-[#FFFDF7] rounded-xl sm:rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-36 sm:h-44 object-cover"
              />

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">{event.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D7263D]" />
                    <span className="text-xs sm:text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D7263D]" />
                    <span className="text-xs sm:text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D7263D]" />
                    <span className="text-xs sm:text-sm">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}