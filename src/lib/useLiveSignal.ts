import { useEffect, useState } from "react";
import { socket } from "./socket";

/**
 * Ticks whenever data should be refetched — either because the backend
 * pushed one of the given socket events (instant), or because the fallback
 * poll interval elapsed (covers the socket being disconnected, e.g. a cold
 * Render backend). Consumers just fold the returned tick into whatever
 * effect already does the actual fetching.
 *
 * Pass an empty array (or omit) to disable — used by useApiGet so existing
 * callers that don't care about live updates get zero behavior change.
 */
export function useLiveSignal(events: string[] = [], pollMs = 60000) {
  const [tick, setTick] = useState(0);
  const eventsKey = events.join(",");

  useEffect(() => {
    if (!eventsKey) return;
    const list = eventsKey.split(",");
    const bump = () => setTick((n) => n + 1);

    list.forEach((event) => socket.on(event, bump));
    const pollId = pollMs > 0 ? setInterval(bump, pollMs) : undefined;

    return () => {
      list.forEach((event) => socket.off(event, bump));
      if (pollId) clearInterval(pollId);
    };
  }, [eventsKey, pollMs]);

  return tick;
}
