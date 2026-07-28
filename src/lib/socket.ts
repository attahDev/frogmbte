import { io } from "socket.io-client";

/**
 * One socket connection for the whole app. Mirrors lib/api.ts exactly:
 * same backend URL (it's hardcoded there too, no VITE_API_URL in this repo),
 * same token lookup (sessionStorage checked before localStorage). Update
 * both places together if that ever changes.
 *
 * Logged-out visitors still connect fine (see RealtimeGateway on the
 * backend) — they just don't get private events, only broadcasts like
 * "opportunities:updated".
 */
const API_URL = "https://gmbtebac.onrender.com";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("token") || localStorage.getItem("token");
}

export const socket = io(API_URL, {
  autoConnect: true,
  reconnection: true,
  auth: (cb) => cb({ token: getToken() }),
});

/** Call after login/logout so the next (re)connect picks up the new auth
 *  state — e.g. from your login success handler and from logout. */
export function refreshSocketAuth() {
  socket.auth = { token: getToken() };
  if (socket.connected) {
    socket.disconnect().connect();
  }
}

