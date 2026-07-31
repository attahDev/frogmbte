import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

export type EventStatus =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'published'
  | 'live'
  | 'completed'
  | 'rejected'
  | 'cancelled';

export interface GmbteEvent {
  id: string;
  title: string;
  description: string;
  status: EventStatus;
  scheduledAt: string;
  capacity?: number;
  rejectionReason?: string;
  bookingUrl?: string;
  videoRoomUrl?: string;
  attendees: { id: string; userId: string; rsvpStatus: string }[];
}

const API_BASE = import.meta.env.VITE_API_URL;

async function apiFetch(path: string, options?: RequestInit) {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message ?? 'Request failed');
  return res.status === 204 ? null : res.json();
}

export function useMyEvents() {
  const [events, setEvents] = useState<GmbteEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/events/mine');
      setEvents(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Live status updates: a status change (approved/rejected/new RSVP) lands
  // over this socket and just patches local state — no refetch, no reload.
  useEffect(() => {
    refresh();
    const token = localStorage.getItem('accessToken');
    const socket: Socket = io(API_BASE, { auth: { token } });

    socket.on('event:status_changed', (payload: { eventId: string; status: EventStatus; rejectionReason?: string }) => {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === payload.eventId ? { ...e, status: payload.status, rejectionReason: payload.rejectionReason } : e,
        ),
      );
    });

    socket.on('event:new_rsvp', () => refresh());
    socket.on('event:waitlist_promoted', () => refresh());

    return () => {
      socket.disconnect();
    };
  }, [refresh]);

  const createEvent = (payload: Partial<GmbteEvent> & { scheduledAt: string; saveAsDraft?: boolean }) =>
    apiFetch('/events', { method: 'POST', body: JSON.stringify(payload) }).then(refresh);

  const updateEvent = (id: string, payload: Partial<GmbteEvent>) =>
    apiFetch(`/events/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }).then(refresh);

  const submitForReview = (id: string) => apiFetch(`/events/${id}/submit`, { method: 'POST' }).then(refresh);

  const cancelEvent = (id: string) => apiFetch(`/events/${id}`, { method: 'DELETE' }).then(refresh);

  return { events, loading, error, refresh, createEvent, updateEvent, submitForReview, cancelEvent };
}
