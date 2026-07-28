import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Award, Briefcase, Calendar, GraduationCap, Loader2, SearchX, Users } from "lucide-react";
import { searchPlatform, type SearchResult } from "../../lib/searchApi";

const typeMeta: Record<
  SearchResult["type"],
  { label: string; icon: typeof Briefcase; badgeClass: string }
> = {
  opportunity: { label: "Opportunity", icon: Briefcase, badgeClass: "bg-blue-50 text-blue-700" },
  event: { label: "Event", icon: Calendar, badgeClass: "bg-purple-50 text-purple-700" },
  course: { label: "Course", icon: GraduationCap, badgeClass: "bg-emerald-50 text-emerald-700" },
  mentor: { label: "Mentor", icon: Users, badgeClass: "bg-amber-50 text-amber-700" },
  hofNominee: { label: "Hall of Fame", icon: Award, badgeClass: "bg-rose-50 text-rose-700" },
};

function resultHref(result: SearchResult): string {
  switch (result.type) {
    case "opportunity":
      return `/dashboard/opportunities/${result.id}`;
    case "event":
      return `/dashboard/events`;
    case "mentor":
      return `/dashboard/mentors`;
    case "hofNominee":
      return `/dashboard/hall-of-fame`;
    case "course":
      return result.subtitle === "climate"
        ? `/dashboard/green-impact/${result.slug}`
        : `/dashboard/academy/courses/${result.slug}`;
  }
}

function ResultCard({ result }: { result: SearchResult }) {
  const meta = typeMeta[result.type];
  const Icon = meta.icon;

  return (
    <Link
      to={resultHref(result)}
      className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-[#001F3F]/30 hover:shadow-sm"
    >
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50">
        <Icon className="h-4 w-4 text-slate-500" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate text-sm font-semibold text-[#001F3F] sm:text-base">{result.title}</h3>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${meta.badgeClass}`}>
            {meta.label}
          </span>
        </div>
        {result.subtitle && result.type !== "course" && (
          <p className="mt-0.5 text-xs text-slate-500">{result.subtitle}</p>
        )}
        {result.description && (
          <p className="mt-1.5 line-clamp-2 text-sm text-slate-600">{result.description}</p>
        )}
      </div>
    </Link>
  );
}

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError("");

    searchPlatform(query)
      .then((data) => {
        if (!cancelled) setResults(data);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load search results right now — please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div className="mx-auto min-h-screen w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-xl font-semibold text-[#001F3F] sm:text-2xl">
        {query ? (
          <>
            Results for <span className="text-[#D7263D]">&ldquo;{query}&rdquo;</span>
          </>
        ) : (
          "Search"
        )}
      </h1>

      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="flex items-center gap-2 py-12 text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            Searching opportunities, events, courses, mentors, and Hall of Fame...
          </div>
        ) : error ? (
          <p className="py-12 text-center text-sm text-red-500">{error}</p>
        ) : !query ? (
          <p className="py-12 text-center text-sm text-slate-500">
            Type something in the search bar to get started.
          </p>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <SearchX className="h-8 w-8 text-slate-300" />
            <p className="text-sm text-slate-500">
              No matches for &ldquo;{query}&rdquo; across opportunities, events, courses, mentors, or Hall of Fame.
            </p>
          </div>
        ) : (
          results.map((result) => <ResultCard key={`${result.type}-${result.id}`} result={result} />)
        )}
      </div>
    </div>
  );
}
