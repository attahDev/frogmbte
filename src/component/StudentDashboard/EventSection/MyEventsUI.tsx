import { useEffect, useState } from 'react';
import { Calendar, Clock, ArrowRight, Download, Loader2, Plus, X, Trash2, Pencil } from 'lucide-react';
import {
  fetchMyEvents,
  fetchMySubmissions,
  cancelRsvp,
  unsaveEvent,
  submitCommunityEvent,
  updateMySubmission,
  withdrawMySubmission,
  placeholderImageFor,
  type UiEvent,
  type UiSubmission,
  type EventFormat,
  type CommunityEventInput,
} from '../../../lib/eventsApi';

type MyEventsTab = 'hosting' | 'attending' | 'saved';

const EMPTY_HOST_FORM = {
  title: '',
  description: '',
  location: '',
  mode: 'In-Person' as EventFormat,
  link: '',
  eventbriteUrl: '',
  tagsText: '',
  startsAt: '',
  endsAt: '',
};

/** Dedicated "My Events" page — separate from the general Events &
 *  Workshops browsing page. This is deliberately just the personal
 *  buckets (what you're hosting, attending, and have saved) with real
 *  management actions on each, rather than one tab among a "discover
 *  everything" grid. */
const MyEventsUI = () => {
  const [activeTab, setActiveTab] = useState<MyEventsTab>('hosting');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [upcomingAttending, setUpcomingAttending] = useState<UiEvent[]>([]);
  const [pastAttended, setPastAttended] = useState<UiEvent[]>([]);
  const [savedEvents, setSavedEvents] = useState<UiEvent[]>([]);
  const [submissions, setSubmissions] = useState<UiSubmission[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);

  // Shared create/edit modal — editingId set = editing an existing
  // submission (PATCH), unset = "Host an Event" (POST).
  const [showHostModal, setShowHostModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [hostForm, setHostForm] = useState(EMPTY_HOST_FORM);
  const [hostImage, setHostImage] = useState<File | null>(null);
  const [hostImagePreview, setHostImagePreview] = useState<string | null>(null);
  const [hostSubmitting, setHostSubmitting] = useState(false);
  const [hostError, setHostError] = useState<string | null>(null);

  const [withdrawingId, setWithdrawingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [mine, mySubmissions] = await Promise.all([fetchMyEvents(), fetchMySubmissions()]);
      setUpcomingAttending(mine.upcoming);
      setPastAttended(mine.attended);
      setSavedEvents(mine.saved);
      setSubmissions(mySubmissions);
    } catch {
      setError("Couldn't load your events right now. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const closeModal = () => {
    setShowHostModal(false);
    setEditingId(null);
    setHostForm(EMPTY_HOST_FORM);
    setHostImagePreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setHostImage(null);
    setHostError(null);
  };

  const openEdit = (submission: UiSubmission) => {
    setEditingId(submission.id);
    setHostForm({
      title: submission.title,
      description: submission.description ?? '',
      location: submission.location ?? '',
      mode: submission.format,
      link: submission.link ?? '',
      eventbriteUrl: submission.eventbriteEventId ?? '',
      tagsText: submission.tags.join(', '),
      startsAt: submission.startsAt.slice(0, 16),
      endsAt: '',
    });
    setShowHostModal(true);
  };

  const handleHostImageChange = (file: File | null) => {
    setHostImage(file);
    setHostImagePreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return file ? URL.createObjectURL(file) : null;
    });
  };

  const handleHostSubmit = async () => {
    if (!hostForm.title || !hostForm.startsAt) return;
    setHostSubmitting(true);
    setHostError(null);
    try {
      const tags = hostForm.tagsText.split(',').map((t) => t.trim()).filter(Boolean);
      if (editingId) {
        await updateMySubmission(editingId, {
          title: hostForm.title,
          description: hostForm.description || undefined,
          location: hostForm.location || undefined,
          mode: hostForm.mode,
          link: hostForm.link || undefined,
          eventbriteUrl: hostForm.eventbriteUrl || undefined,
          tags,
          startsAt: new Date(hostForm.startsAt).toISOString(),
          endsAt: hostForm.endsAt ? new Date(hostForm.endsAt).toISOString() : undefined,
          image: hostImage || undefined,
        });
      } else {
        const input: CommunityEventInput = {
          title: hostForm.title,
          description: hostForm.description || undefined,
          location: hostForm.location || undefined,
          mode: hostForm.mode,
          link: hostForm.link || undefined,
          eventbriteUrl: hostForm.eventbriteUrl || undefined,
          tags,
          startsAt: new Date(hostForm.startsAt).toISOString(),
          endsAt: hostForm.endsAt ? new Date(hostForm.endsAt).toISOString() : undefined,
          image: hostImage || undefined,
        };
        await submitCommunityEvent(input);
      }
      closeModal();
      setActiveTab('hosting');
      await load();
    } catch {
      setHostError(
        editingId
          ? "Couldn't save your changes. Double-check the fields and try again."
          : "Couldn't submit your event. Double-check the fields and try again.",
      );
    } finally {
      setHostSubmitting(false);
    }
  };

  const handleWithdraw = async (eventId: string) => {
    setWithdrawingId(eventId);
    try {
      await withdrawMySubmission(eventId);
      await load();
    } catch {
      setError("Couldn't withdraw that event. Try again in a moment.");
    } finally {
      setWithdrawingId(null);
    }
  };

  const handleCancelRsvp = async (eventId: string) => {
    setBusyId(eventId);
    try {
      await cancelRsvp(eventId);
      await load();
    } catch {
      setError("Couldn't cancel that RSVP. Try again in a moment.");
    } finally {
      setBusyId(null);
    }
  };

  const handleUnsave = async (eventId: string) => {
    setBusyId(eventId);
    try {
      await unsaveEvent(eventId);
      await load();
    } catch {
      setError("Couldn't remove that saved event.");
    } finally {
      setBusyId(null);
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

  const BaseCard = ({
    event,
    badge,
    footer,
  }: {
    event: UiEvent;
    badge: React.ReactNode;
    footer: React.ReactNode;
  }) => (
    <div className="bg-[#FFFDF7] rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 hover:border-red-100">
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img
          src={placeholderImageFor(event.id)}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${getImageGradient(event.id)} mix-blend-overlay`} />
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">{badge}</div>
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-base sm:text-xl font-bold text-gray-900 line-clamp-2 mb-2 sm:mb-3">{event.title}</h3>
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
        {footer}
      </div>
    </div>
  );

  const HostingCard = ({ submission }: { submission: UiSubmission }) => (
    <BaseCard
      event={submission}
      badge={<SubmissionStatusBadge status={submission.reviewStatus} />}
      footer={
        <div className="space-y-2">
          <p className="text-xs sm:text-sm text-gray-500">
            {submission.reviewStatus === 'PENDING' && "An admin will review this before it's visible to other members."}
            {submission.reviewStatus === 'APPROVED' && 'Live and visible to everyone on Upcoming Events.'}
            {submission.reviewStatus === 'REJECTED' && "This wasn't approved — edit and resubmit, or withdraw it."}
          </p>
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => openEdit(submission)}
              className="flex-1 bg-white border-2 border-gray-200 text-gray-900 py-2 sm:py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              onClick={() => handleWithdraw(submission.id)}
              disabled={withdrawingId === submission.id}
              className="flex-1 bg-white border-2 border-red-200 text-[#D7263D] py-2 sm:py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-red-50 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {withdrawingId === submission.id ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <Trash2 className="w-3.5 h-3.5" />
                  Withdraw
                </>
              )}
            </button>
          </div>
        </div>
      }
    />
  );

  const AttendingCard = ({ event, isPast }: { event: UiEvent; isPast: boolean }) => (
    <BaseCard
      event={event}
      badge={
        <div className="bg-white/90 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium text-gray-700">
          {isPast ? 'Attended' : "You're going"}
        </div>
      }
      footer={
        isPast ? (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button className="flex-1 bg-white border-2 border-gray-200 text-gray-900 py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2">
              View Recap
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button className="flex-1 bg-[#FFD700] text-gray-900 py-2.5 px-3 rounded-lg text-sm font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 border-2 border-[#FFD700]">
              Certificate
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleCancelRsvp(event.id)}
            disabled={busyId === event.id}
            className="w-full bg-white border-2 border-red-200 text-[#D7263D] py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-red-50 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {busyId === event.id ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Cancel RSVP'}
          </button>
        )
      }
    />
  );

  const SavedCard = ({ event }: { event: UiEvent }) => (
    <BaseCard
      event={event}
      badge={
        <div className="bg-white/90 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium text-gray-700">
          Saved
        </div>
      }
      footer={
        <button
          onClick={() => handleUnsave(event.id)}
          disabled={busyId === event.id}
          className="w-full bg-white border-2 border-gray-200 text-gray-900 py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {busyId === event.id ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Remove from Saved'}
        </button>
      }
    />
  );

  const attendingCombined = [
    ...upcomingAttending.map((e) => ({ event: e, isPast: false })),
    ...pastAttended.map((e) => ({ event: e, isPast: true })),
  ];

  const emptyState = () => {
    if (activeTab === 'hosting') {
      return {
        title: "You haven't submitted any events yet",
        body: 'Hosting a meetup or workshop? Submit it for review.',
        action: (
          <button
            onClick={() => setShowHostModal(true)}
            className="inline-flex items-center gap-2 bg-[#D7263D] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Host an Event
          </button>
        ),
      };
    }
    if (activeTab === 'attending') {
      return {
        title: "You're not attending any events yet",
        body: 'Browse Events & Workshops to RSVP to something.',
        action: null,
      };
    }
    return {
      title: 'No saved events yet',
      body: 'Bookmark an event from Events & Workshops to find it here later.',
      action: null,
    };
  };

  const empty = emptyState();
  const isEmpty =
    (activeTab === 'hosting' && submissions.length === 0) ||
    (activeTab === 'attending' && attendingCombined.length === 0) ||
    (activeTab === 'saved' && savedEvents.length === 0);

  return (
    <div className="bg-gradient-to-b from-[#FFFDF7] to-gray-50/50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-full lg:max-w-[1400px]">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4 sm:mb-8 md:mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">My Events</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage what you're hosting, attending, and have saved — all in one place.
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

        <div className="mb-6 overflow-x-auto pb-2 scrollbar-hide sm:mb-8 lg:mb-10">
          <div className="flex w-max min-w-full gap-2 sm:w-auto sm:min-w-0 sm:gap-4">
            {(['hosting', 'attending', 'saved'] as MyEventsTab[]).map((tab) => (
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
                {tab === 'hosting' && 'Hosting'}
                {tab === 'attending' && 'Attending'}
                {tab === 'saved' && 'Saved'}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : isEmpty ? (
          <div className="text-center py-12 sm:py-16 bg-white/50 rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">{empty.title}</h3>
            <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 px-4">{empty.body}</p>
            {empty.action}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {activeTab === 'hosting' &&
              submissions.map((s) => <HostingCard key={s.id} submission={s} />)}
            {activeTab === 'attending' &&
              attendingCombined.map(({ event, isPast }) => (
                <AttendingCard key={event.id} event={event} isPast={isPast} />
              ))}
            {activeTab === 'saved' && savedEvents.map((e) => <SavedCard key={e.id} event={e} />)}
          </div>
        )}
      </div>

      {showHostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-xl sm:rounded-2xl bg-white p-5 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {editingId ? 'Edit Event' : 'Host an Event'}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {editingId
                    ? 'Changes go back under admin review before this is public again.'
                    : "Submitted for admin review — it'll go live once approved."}
                </p>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600" aria-label="Close">
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
                placeholder="Eventbrite event URL/ID (optional)"
                value={hostForm.eventbriteUrl}
                onChange={(e) => setHostForm({ ...hostForm, eventbriteUrl: e.target.value })}
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
                onClick={closeModal}
                className="flex-1 rounded-lg border-2 border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleHostSubmit}
                disabled={hostSubmitting || !hostForm.title || !hostForm.startsAt}
                className="flex-1 rounded-lg bg-[#D7263D] py-2.5 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {hostSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : editingId ? (
                  'Save Changes'
                ) : (
                  'Submit for Review'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEventsUI;
