// Tracks which generated idea the Dashboard, Idea Generator, Opportunity
// Insights, and Build Plan screens are currently looking at. sessionStorage
// (not React context) so it survives a full navigation between routes
// without threading props through the whole router tree.

const KEY = "gmbte_current_idea_id";

export function setCurrentIdeaId(id: string) {
  sessionStorage.setItem(KEY, id);
}

export function getCurrentIdeaId(): string | null {
  return sessionStorage.getItem(KEY);
}

export function clearCurrentIdeaId() {
  sessionStorage.removeItem(KEY);
}
