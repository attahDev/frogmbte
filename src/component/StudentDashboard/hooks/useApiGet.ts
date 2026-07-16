import { useEffect, useState, useCallback } from "react";
import { api } from "../../../lib/api";

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
 */
export function useApiGet<T>(url: string | null, fallback: T): UseApiGetResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!!url);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

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
  }, [url, refetchIndex]);

  return { data, loading, error, refetch };
}
