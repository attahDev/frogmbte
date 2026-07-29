const HOF_APP_URL = "https://hofgmbte.vercel.app";

/** Dashboard version — used only inside the authenticated /dashboard shell.
 *  Goes straight to HOF's /dashboard, not its public landing hero (that
 *  content now lives on the main site at /hall-of-fame, see
 *  HallOfFameLandingEmbed.tsx, so it isn't duplicated in two places).
 *
 *  hof has no login of its own — it relies entirely on being iframed
 *  behind this app's auth. To let hof call gmbtebac directly (tributes,
 *  nominations), it needs the current user's token, which a cross-origin
 *  iframe can't read from this app's localStorage on its own. Passed as a
 *  URL query param here — hof reads it once on load and keeps it in memory
 *  for its own API calls.
 *
 *  Tradeoff worth knowing: a token in the URL can end up in browser
 *  history and, if hof ever adds server-side logging of full request
 *  URLs, in those logs too. Acceptable for now given the token already
 *  expires in 7 days and this is an internal dashboard embed, not a
 *  public link — but if that changes, switch to postMessage instead
 *  (hof would listen for a message from the parent frame rather than
 *  reading the URL). */
export default function HallOfFameEmbed() {
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("token") || localStorage.getItem("token")
      : null;

  const src = token
    ? `${HOF_APP_URL}/dashboard?gmbte_token=${encodeURIComponent(token)}`
    : `${HOF_APP_URL}/dashboard`;

  return (
    <iframe
      src={src}
      title="Hall of Fame"
      className="h-[calc(100dvh-97px)] min-h-[500px] w-full border-0"
      allow="clipboard-write"
    />
  );
}
