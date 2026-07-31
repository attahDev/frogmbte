import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL;

interface QueuedEvent {
  id: string;
  title: string;
  description: string;
  scheduledAt: string;
  creatorId: string;
}

async function apiFetch(path: string, options?: RequestInit) {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...options?.headers },
  });
  if (!res.ok) throw new Error('Request failed');
  return res.status === 204 ? null : res.json();
}

export default function AdminEventQueue() {
  const [queue, setQueue] = useState<QueuedEvent[]>([]);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [reason, setReason] = useState('');

  const load = () => apiFetch('/events/admin/queue').then(setQueue);

  useEffect(() => {
    load();
  }, []);

  const approve = async (id: string) => {
    await apiFetch(`/events/admin/${id}/review`, { method: 'POST', body: JSON.stringify({ action: 'approved' }) });
    load();
  };

  const reject = async (id: string) => {
    if (!reason.trim()) return;
    await apiFetch(`/events/admin/${id}/review`, {
      method: 'POST',
      body: JSON.stringify({ action: 'rejected', reason }),
    });
    setRejectingId(null);
    setReason('');
    load();
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h2 className="text-xl font-semibold text-slate-900">Event review queue</h2>
      <p className="mt-1 text-sm text-slate-500">{queue.length} awaiting review, oldest first.</p>

      <div className="mt-5 space-y-3">
        {queue.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
            Queue is empty. Nothing waiting on you.
          </div>
        )}
        {queue.map((event) => (
          <div key={event.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">{event.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{event.description}</p>
            <p className="mt-2 text-xs text-slate-400">
              Scheduled for {new Date(event.scheduledAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
            </p>

            {rejectingId === event.id ? (
              <div className="mt-3 space-y-2">
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explain what needs to change…"
                  className="w-full rounded-lg border border-slate-200 p-2 text-sm"
                  rows={2}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => reject(event.id)}
                    className="rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-500"
                  >
                    Send rejection
                  </button>
                  <button
                    onClick={() => setRejectingId(null)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => approve(event.id)}
                  className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-500"
                >
                  Approve
                </button>
                <button
                  onClick={() => setRejectingId(event.id)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Request changes
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
