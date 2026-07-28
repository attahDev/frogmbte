import { useEffect, useState, useCallback } from "react";
import { api } from "../../../lib/api";
import { useLiveSignal } from "../../../lib/useLiveSignal";

interface UseApiGetResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Shared fetch hook for the Student Dashboard. Every widget that used to
 * hold a hardcoded mock array (mentors, courses, events, activity...) now
 * pulls through this instead, so:
 *  - a brand-new user genuinely sees 0 / empty, not fabricated numbers
 *  - loading and error states are handled once, consistently
 *
 * The backend wraps responses as { success, data, message, timestamp }
 * (see ResponseInterceptor) — this unwraps that the same way
 * mainuserContext.tsx already does for the user profile call.
 *
 * `liveEvents` is optional: pass the socket event name(s) this data should
 * refetch on (e.g. ["mentors:updated"]) to get instant updates instead of
 * making users manually refresh — falls back to a 60s poll automatically
 * if the socket ever drops. Omit it and this behaves exactly as before.
 */
export function useApiGet<T>(url: string | null, fallback: T, liveEvents: string[] = []): UseApiGetResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!!url);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);
  const liveTick = useLiveSignal(liveEvents);

  const refetch = useCallback(() => setRefetchIndex((n) => n + 1), []);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;

    setLoading(true);
    setError(null);

    api
      .get(url)
      .then((res) => {
        if (cancelled) return;
        const body = res.data;
        const unwrapped = body && typeof body === "object" && "data" in body ? body.data : body;
        setData((unwrapped ?? fallback) as T);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(`Failed to load ${url}:`, err);
        setError("We couldn't load this right now. Please try again.");
        setData(fallback);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, refetchIndex, liveTick]);

  return { data, loading, error, refetch };
}
