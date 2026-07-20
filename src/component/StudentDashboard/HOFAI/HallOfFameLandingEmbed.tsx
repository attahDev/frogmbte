/**
 * Public Hall of Fame landing page — reachable from the main navbar without
 * logging in. Deliberately a *different* component from the dashboard's
 * HallOfFameEmbed: this one points at HOF's public root, that one points at
 * HOF's /dashboard. Keeping the landing content itself only in the `hof`
 * repo (rather than copy-pasting the hero/stats/timeline into gmbtefro) is
 * the whole point — the earlier audit found the same "Carol Ann Whitehead"
 * bio hardcoded in 4 separate hof components; duplicating it into a 5th
 * (this repo) would make that worse, not better.
 *
 * CAVEAT — iframing a public marketing page has real costs an iframe on an
 * authenticated dashboard page doesn't: search engines don't index iframed
 * content, and social share links (Twitter/LinkedIn previews) won't pick up
 * HOF's Open Graph tags because the crawler sees gmbtefro's shell, not
 * hof's <head>. For a page whose job is nomination sign-ups and public
 * reach, that's a real cost.
 *
 * The SEO-correct fix is a Vercel rewrite (Next.js "Multi Zones" pattern)
 * so /hall-of-fame is served natively from gmbtefro's domain. Deliberately
 * NOT wired up here: Next's `basePath` applies to hof's whole app, not one
 * route, so scoping it to just the public landing page — without also
 * shifting (and needing to retest) the /dashboard iframe used elsewhere —
 * needs a real deploy-and-verify cycle, not a config guess. Two honest
 * paths forward when ready: (a) split hof's public landing into its own
 * small Vercel deployment so basePath only ever touches that, or (b) accept
 * the coordinated basePath change and update both this component and
 * HallOfFameEmbed.tsx's dashboard URL together, then test both live.
 * Also worth fixing alongside whichever path you pick: hof's /dashboard
 * routes currently have no auth of their own — it's only protected today
 * because it's iframed behind gmbtefro's login wall.
 */
const HOF_APP_URL = "https://hofgmbte.vercel.app";

export default function HallOfFameLandingEmbed() {
  return (
    <iframe
      src={HOF_APP_URL}
      title="GMBTE Hall of Fame"
      className="min-h-[2400px] w-full border-0"
      allow="clipboard-write"
    />
  );
}
