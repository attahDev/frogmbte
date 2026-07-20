// @ts-nocheck
// @ts-nocheck
import { api } from "../../../lib/api";

const BASE = (
  import.meta.env.VITE_PITCH_DECK_API_URL ||
  "https://pitchdeckk.onrender.com"
).replace(/\/+$/, "");

if (!BASE) {
  console.error(
    "VITE_PITCH_DECK_API_URL is not set. Set it in your Vercel project's Environment Variables and redeploy."
  );
}

function getToken() {
  return (
    sessionStorage.getItem("token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("gmbte_token") ||
    ""
  );
}

function authHeaders(json = true): HeadersInit {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${getToken()}`,
  };
  if (json) headers["Content-Type"] = "application/json";
  return headers;
}

async function handleResponse(res: Response) {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

/** Prefer shared Nest API when available, otherwise the pitch-deck service. */
function pitchUrl(path: string) {
  return `${BASE}${path}`;
}

export async function generateDeck(inputType: string, data: object, theme = "gmbte") {
  const res = await fetch(pitchUrl("/api/v1/pitch-deck/generate"), {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ input_type: inputType, data, theme }),
  });
  return handleResponse(res);
}

export async function getThemes() {
  const res = await fetch(pitchUrl("/api/v1/pitch-deck/themes"), {
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function getJobStatus(jobId: string) {
  const res = await fetch(pitchUrl(`/api/v1/pitch-deck/status/${jobId}`), {
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function getDeck(deckId: string) {
  const res = await fetch(pitchUrl(`/api/v1/pitch-deck/${deckId}`), {
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function getDeckHistory(skip = 0, limit = 20) {
  const res = await fetch(
    pitchUrl(`/api/v1/pitch-deck/history?skip=${skip}&limit=${limit}`),
    { headers: authHeaders() }
  );
  return handleResponse(res);
}

export async function deleteDeck(deckId: string) {
  const res = await fetch(pitchUrl(`/api/v1/pitch-deck/${deckId}`), {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (res.status === 204) return true;
  return handleResponse(res);
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(pitchUrl("/api/v1/pitch-deck/upload-image"), {
    method: "POST",
    headers: authHeaders(false),
    body: formData,
  });
  return handleResponse(res);
}

export async function exportDeck(payload: object) {
  const res = await fetch(pitchUrl("/api/v1/pitch-deck/export"), {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Export failed" }));
    throw new Error(err.detail || "Export failed");
  }
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const disposition = res.headers.get("content-disposition") || "";
  const match = disposition.match(/filename="?([^"]+)"?/);
  a.download = match ? match[1] : "pitch_deck.pptx";
  a.click();
  window.URL.revokeObjectURL(url);
}

export function getDownloadUrl(deckId: string) {
  return pitchUrl(`/api/v1/pitch-deck/${deckId}/download`);
}

export async function downloadDeck(deckId: string, title: string) {
  const res = await fetch(getDownloadUrl(deckId), {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error("Download failed");
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.replace(/\s+/g, "_")}.pptx`;
  a.click();
  window.URL.revokeObjectURL(url);
}

// Keep Nest client available for future unified backend
export { api };
