import { useEffect, useState } from 'react';
import { Calendar, Clock, Users, MapPin, Video, ArrowRight, Download, Loader2, Plus, X } from 'lucide-react';
import {
  fetchUpcomingEvents,
  fetchMyEvents,
  fetchMySubmissions,
  rsvpToEvent,
  saveEvent,
  unsaveEvent,
  submitCommunityEvent,
  placeholderImageFor,
  type UiEvent,
  type UiSubmission,
  type EventFormat,
  type CommunityEventInput,
} from '../../../lib/eventsApi';

type EventTab = 'upcoming' | 'attended' | 'saved' | 'submissions';

const EMPTY_HOST_FORM = {
  title: '',
  description: '',
  location: '',
  mode: 'In-Person' as EventFormat,
  link: '',
  tagsText: '',
  startsAt: '',
  endsAt: '',
};

const EventsUI = () => {
  const [activeTab, setActiveTab] = useState<EventTab>('upcoming');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [upcomingEvents, setUpcomingEvents] = useState<UiEvent[]>([]);
  const [attendedEvents, setAttendedEvents] = useState<UiEvent[]>([]);
  const [savedEvents, setSavedEvents] = useState<UiEvent[]>([]);
  const [submissions, setSubmissions] = useState<UiSubmission[]>([]);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [busyId, setBusyId] = useState<string | null>(null);

  const [showHostModal, setShowHostModal] = useState(false);
  const [hostForm, setHostForm] = useState(EMPTY_HOST_FORM);
  const [hostImage, setHostImage] = useState<File | null>(null);
  const [hostImagePreview, setHostImagePreview] = useState<string | null>(null);
  const [hostSubmitting, setHostSubmitting] = useState(false);
  const [hostError, setHostError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [all, mine, mySubmissions] = await Promise.all([
        fetchUpcomingEvents(),
        fetchMyEvents(),
        fetchMySubmissions(),
      ]);
      // "Upcoming" tab = everything open, not just what the user registered
      // for, so people can discover events they haven't RSVP'd to yet.
      setUpcomingEvents(all);
      setAttendedEvents(mine.attended);
      setSavedEvents(mine.saved);
      setSavedIds(new Set(mine.saved.map((e) => e.id)));
      setSubmissions(mySubmissions);
    } catch {
      setError("Couldn't load events right now. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleHostSubmit = async () => {
    if (!hostForm.title || !hostForm.startsAt) return;
    setHostSubmitting(true);
    setHostError(null);
    try {
      const input: CommunityEventInput = {
        title: hostForm.title,
        description: hostForm.description || undefined,
        location: hostForm.location || undefined,
        mode: hostForm.mode,
        link: hostForm.link || undefined,
        tags: hostForm.tagsText.split(',').map((t) => t.trim()).filter(Boolean),
        startsAt: new Date(hostForm.startsAt).toISOString(),
        endsAt: hostForm.endsAt ? new Date(hostForm.endsAt).toISOString() : undefined,
        image: hostImage || undefined,
      };
      await submitCommunityEvent(input);
      setShowHostModal(false);
      setHostForm(EMPTY_HOST_FORM);
      setHostImage(null);
      setHostImagePreview(null);
      setActiveTab('submissions');
      await load();
    } catch {
      setHostError("Couldn't submit your event. Double-check the fields and try again.");
    } finally {
      setHostSubmitting(false);
    }
  };

  const handleHostImageChange = (file: File | null) => {
    setHostImage(file);
    setHostImagePreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return file ? URL.createObjectURL(file) : null;
    });
  };

  const handleRsvp = async (eventId: string) => {
    setBusyId(eventId);
    try {
      await rsvpToEvent(eventId);
      await load();
    } catch {
      setError("Couldn't register for that event. It may already be full or you're already registered.");
    } finally {
      setBusyId(null);
    }
  };

  const handleToggleSave = async (eventId: string) => {
    setBusyId(eventId);
    try {
      if (savedIds.has(eventId)) {
        await unsaveEvent(eventId);
      } else {
        await saveEvent(eventId);
      }
      await load();
    } catch {
      setError("Couldn't update saved events.");
    } finally {
      setBusyId(null);
    }
  };

  const getEvents = () => {
    switch (activeTab) {
      case 'upcoming':
        return upcomingEvents;
      case 'attended':
        return attendedEvents;
      case 'saved':
        return savedEvents;
      case 'submissions':
        return submissions;
      default:
        return upcomingEvents;
    }
  };

  const getImageGradient = (id: string) => {
    const gradients = [
      'from-blue-900/80 to-gray-900/80',
      'from-amber-900/60 to-gray-800/60',
      'from-yellow-400/20 to-blue-400/20',
      'from-green-600/30 to-yellow-500/30',
      'from-green-700/40 to-lime-600/40',
    ];
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
    return gradients[hash % gradients.length];
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

  const SubmissionStatusBadge = ({ status }: { status: UiSubmission['reviewStatus'] }) => {
    const styles = {
      PENDING: 'bg-amber-100 text-amber-700',
      APPROVED: 'bg-green-100 text-green-700',
      REJECTED: 'bg-red-100 text-red-700',
    };
    const labels = { PENDING: 'Under review', APPROVED: 'Live', REJECTED: 'Not approved' };
    return (
      <div className={`${styles[status]} px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium`}>
        {labels[status]}
      </div>
    );
  };

  const EventCard = ({ event, isAttended }: { event: UiEvent; isAttended?: boolean }) => (
    <div className="bg-[#FFFDF7] rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 hover:border-red-100">
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img
          src={placeholderImageFor(event.id)}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${getImageGradient(event.id)} mix-blend-overlay`} />

        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          {activeTab === 'submissions' ? (
            <SubmissionStatusBadge status={(event as UiSubmission).reviewStatus} />
          ) : (
            <FormatBadge format={event.format} />
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <h3 className="text-base sm:text-xl font-bold text-gray-900 line-clamp-2 pr-2">
            {event.title}
          </h3>
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

        {activeTab === 'submissions' ? (
          <p className="text-xs sm:text-sm text-gray-500">
            {(event as UiSubmission).reviewStatus === 'PENDING' &&
              "An admin will review this before it's visible to other members."}
            {(event as UiSubmission).reviewStatus === 'APPROVED' && 'Now visible to everyone on Upcoming Events.'}
            {(event as UiSubmission).reviewStatus === 'REJECTED' && "This wasn't approved for the public listing."}
          </p>
        ) : isAttended ? (
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
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={() => handleRsvp(event.id)}
              disabled={busyId === event.id}
              className="flex-1 bg-gradient-to-r from-[#D7263D] to-[#D7263D] text-white py-2.5 sm:py-3.5 px-3 sm:px-4 rounded-lg sm:rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-60"
            >
              {busyId === event.id ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <>
                  RSVP
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            <button
              onClick={() => handleToggleSave(event.id)}
              disabled={busyId === event.id}
              className="px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl text-sm font-semibold border-2 border-gray-200 text-gray-900 hover:bg-gray-50 transition-all duration-200 disabled:opacity-60"
            >
              {savedIds.has(event.id) ? 'Saved' : 'Save'}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-[#FFFDF7] to-gray-50/50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-full lg:max-w-[1400px]">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4 sm:mb-8 md:mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
              Events & Workshops
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Discover, attend, and grow with our curated tech events
            </p>
          </div>
          <button
            onClick={() => setShowHostModal(true)}
            className="inline-flex items-center gap-2 bg-[#D7263D] text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            Host an Event
          </button>
        </div>

        {/* Tabs - Horizontal scroll on mobile */}
        <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide sm:mb-8 lg:mb-10">
          <div className="flex w-max min-w-full gap-2 sm:w-auto sm:min-w-0 sm:gap-4">
            {(['upcoming', 'attended', 'saved', 'submissions'] as EventTab[]).map((tab) => (
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
                {tab === 'submissions' && (
                  <>
                    <span className="sm:hidden">Mine</span>
                    <span className="hidden sm:inline">My Submissions</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Events Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : getEvents().length > 0 ? (
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
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
              {activeTab === 'submissions' ? "You haven't submitted any events yet" : 'No events found'}
            </h3>
            <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 px-4">
              {activeTab === 'submissions'
                ? 'Hosting a meetup or workshop? Submit it for review.'
                : `There are no ${activeTab} events at the moment`}
            </p>
            {activeTab === 'submissions' ? (
              <button
                onClick={() => setShowHostModal(true)}
                className="inline-flex items-center gap-2 bg-[#D7263D] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Host an Event
              </button>
            ) : (
              activeTab !== 'upcoming' && (
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className="inline-flex items-center gap-2 bg-[#D7263D] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                  Browse Upcoming Events
                  <ArrowRight className="w-4 h-4" />
                </button>
              )
            )}
          </div>
        )}
      </div>

      {showHostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-xl sm:rounded-2xl bg-white p-5 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Host an Event</h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Submitted for admin review — it'll go live once approved.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowHostModal(false);
                  handleHostImageChange(null);
                }}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {hostError && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {hostError}
              </div>
            )}

            <div className="space-y-3">
              <input
                placeholder="Event title"
                value={hostForm.title}
                onChange={(e) => setHostForm({ ...hostForm, title: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              <textarea
                placeholder="Description (optional)"
                value={hostForm.description}
                onChange={(e) => setHostForm({ ...hostForm, description: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="Location (blank = virtual)"
                  value={hostForm.location}
                  onChange={(e) => setHostForm({ ...hostForm, location: e.target.value })}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
                <select
                  value={hostForm.mode}
                  onChange={(e) => setHostForm({ ...hostForm, mode: e.target.value as EventFormat })}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="Virtual">Virtual</option>
                  <option value="In-Person">In-Person</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="text-xs text-gray-500">
                  Starts
                  <input
                    type="datetime-local"
                    value={hostForm.startsAt}
                    onChange={(e) => setHostForm({ ...hostForm, startsAt: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </label>
                <label className="text-xs text-gray-500">
                  Ends (optional)
                  <input
                    type="datetime-local"
                    value={hostForm.endsAt}
                    onChange={(e) => setHostForm({ ...hostForm, endsAt: e.target.value })}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </label>
              </div>
              <input
                placeholder="Link — registration page, Zoom/Meet (optional)"
                value={hostForm.link}
                onChange={(e) => setHostForm({ ...hostForm, link: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              <input
                placeholder="Tags, comma-separated (e.g. AI/ML, Networking)"
                value={hostForm.tagsText}
                onChange={(e) => setHostForm({ ...hostForm, tagsText: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Cover photo (optional)</label>
                <div className="flex items-center gap-3">
                  {hostImagePreview && (
                    <img
                      src={hostImagePreview}
                      alt="Preview"
                      className="w-14 h-14 rounded-lg object-cover border border-gray-200"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    onChange={(e) => handleHostImageChange(e.target.files?.[0] ?? null)}
                    className="flex-1 text-xs text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => {
                  setShowHostModal(false);
                  handleHostImageChange(null);
                }}
                className="flex-1 rounded-lg border-2 border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleHostSubmit}
                disabled={hostSubmitting || !hostForm.title || !hostForm.startsAt}
                className="flex-1 rounded-lg bg-[#D7263D] py-2.5 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {hostSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit for Review'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsUI;
