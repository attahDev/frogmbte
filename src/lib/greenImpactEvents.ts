// SustainabilityStats (top stat cards) and GreenImpactProfile (right-rail
// sidebar) each fetch /green-impact/stats independently, and used to only
// refresh on mount. Logging a green action updated the sidebar (it owns the
// form) but left the top cards stale until a full page reload.
//
// Rather than lifting state up through ClimateActionIndex -> two separate
// subtrees (a bigger refactor), this is a tiny pub/sub: logGreenAction()
// broadcasts once on success, and any component showing green-impact
// numbers can subscribe to refetch itself. No prop drilling, no new deps.
const EVENT_NAME = "green-impact:updated";

export function broadcastGreenImpactUpdate() {
  window.dispatchEvent(new Event(EVENT_NAME));
}

/** Call inside a useEffect; returns the cleanup function. */
export function onGreenImpactUpdate(handler: () => void): () => void {
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
