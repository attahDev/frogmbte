import { useMemo, useState } from 'react';
import { useMyEvents, GmbteEvent, EventStatus } from '../hooks/useMyEvents';

const TABS: { key: EventStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'draft', label: 'Drafts' },
  { key: 'pending_review', label: 'Pending review' },
  { key: 'approved', label: 'Approved' },
  { key: 'published', label: 'Live & upcoming' },
  { key: 'rejected', label: 'Needs changes' },
  { key: 'completed', label: 'Past' },
];

const STATUS_STYLES: Record<EventStatus, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'bg-slate-100 text-slate-600' },
  pending_review: { label: 'Pending review', className: 'bg-amber-100 text-amber-700' },
  approved: { label: 'Approved', className: 'bg-blue-100 text-blue-700' },
  published: { label: 'Live', className: 'bg-emerald-100 text-emerald-700' },
  live: { label: 'Happening now', className: 'bg-emerald-100 text-emerald-700' },
  completed: { label: 'Completed', className: 'bg-slate-100 text-slate-500' },
  rejected: { label: 'Needs changes', className: 'bg-rose-100 text-rose-700' },
  cancelled: { label: 'Cancelled', className: 'bg-slate-100 text-slate-400' },
};

function StatusBadge({ status }: { status: EventStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${s.className}`}>
      {s.label}
    </span>
  );
}

function EventCard({
  event,
  onSubmit,
  onCancel,
}: {
  event: GmbteEvent;
  onSubmit: (id: string) => void;
  onCancel: (id: string) => void;
}) {
  const going = event.attendees.filter((a) => a.rsvpStatus === 'going').length;
  const waitlisted = event.attendees.filter((a) => a.rsvpStatus === 'waitlisted').length;
  const canResubmit = event.status === 'draft' || event.status === 'rejected';
  const canCancel = !['completed', 'cancelled'].includes(event.status);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-900">{event.title}</h3>
          <p className="mt-0.5 text-sm text-slate-500">
            {new Date(event.scheduledAt).toLocaleString(undefined, {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
        </div>
        <StatusBadge status={event.status} />
      </div>

      {event.status === 'rejected' && event.rejectionReason && (
        <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          Reviewer feedback: {event.rejectionReason}
        </p>
      )}

      {['published', 'live', 'completed'].includes(event.status) && (
        <p className="mt-3 text-sm text-slate-600">
          {going} going{event.capacity ? ` of ${event.capacity} spots` : ''}
          {waitlisted > 0 ? ` · ${waitlisted} on waitlist` : ''}
        </p>
      )}

      <div className="mt-4 flex gap-2">
        {canResubmit && (
          <button
            onClick={() => onSubmit(event.id)}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
          >
            Submit for review
          </button>
        )}
        {canCancel && (
          <button
            onClick={() => onCancel(event.id)}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel event
          </button>
        )}
      </div>
    </div>
  );
}

export default function MyEvents() {
  const { events, loading, error, submitForReview, cancelEvent } = useMyEvents();
  const [activeTab, setActiveTab] = useState<EventStatus | 'all'>('all');

  const filtered = useMemo(
    () => (activeTab === 'all' ? events : events.filter((e) => e.status === activeTab)),
    [events, activeTab],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    events.forEach((e) => (map[e.status] = (map[e.status] ?? 0) + 1));
    return map;
  }, [events]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h2 className="text-xl font-semibold text-slate-900">My events</h2>
      <p className="mt-1 text-sm text-slate-500">
        Track everything you've created, from first draft to the day it happens.
      </p>

      <div className="mt-5 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              activeTab === tab.key
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
            {tab.key !== 'all' && counts[tab.key] ? (
              <span className="ml-1.5 text-xs opacity-70">{counts[tab.key]}</span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {loading && <p className="text-sm text-slate-400">Loading your events…</p>}
        {error && <p className="text-sm text-rose-600">{error}</p>}
        {!loading && filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
            Nothing here yet. Create an event to get started.
          </div>
        )}
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} onSubmit={submitForReview} onCancel={cancelEvent} />
        ))}
      </div>
    </div>
  );
}
