// @ts-nocheck
const BASE = "https://gmbtemrkt.onrender.com/api/v1";

function getToken() {
  return (
    sessionStorage.getItem("token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("gmbte_token") ||
    ""
  );
}

function headers(json = true): HeadersInit {
  const h: Record<string, string> = {};
  const token = getToken();
  if (token) h.Authorization = `Bearer ${token}`;
  if (json) h["Content-Type"] = "application/json";
  return h;
}

export async function submitQuery(query: string) {
  const res = await fetch(`${BASE}/research`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ query }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error?.message || "Submission failed");
  return data.data.job_id;
}

export async function pollJob(jobId: string) {
  const res = await fetch(`${BASE}/research/${jobId}`, { headers: headers(false) });
  const data = await res.json();
  if (!data.success) throw new Error(data.error?.message || "Poll failed");
  if (!data.data) throw new Error("Empty response from server");
  return data.data;
}

export async function cancelJob(jobId: string) {
  const res = await fetch(`${BASE}/research/${jobId}`, {
    method: "DELETE",
    headers: headers(false),
  });
  return await res.json();
}

const RECENT_KEY = "mr_recent_searches";
const MAX_RECENT = 8;

export function getRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addRecentSearch(query: string) {
  const recent = getRecentSearches().filter((q: string) => q !== query);
  recent.unshift(query);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
}

export function removeRecentSearch(query: string) {
  const recent = getRecentSearches().filter((q: string) => q !== query);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
}

export function clearRecentSearches() {
  localStorage.removeItem(RECENT_KEY);
}
