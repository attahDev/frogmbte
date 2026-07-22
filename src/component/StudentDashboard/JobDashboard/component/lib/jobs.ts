import { api } from "../../../../../lib/api";
import type { JobCardData, Opportunity } from "../types/jobs";

function timeAgo(dateString: string) {
  const now = new Date().getTime();
  const then = new Date(dateString).getTime();
  const diffMs = Math.max(now - then, 0);

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (hours < 1) return "Just posted";
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
}

export function transformOpportunity(op: Opportunity): JobCardData {
  const tags = [op.type, op.category, op.source === "API" ? "External" : "GMBTE"].filter(
    (t): t is string => Boolean(t),
  );

  return {
    id: op.id,
    title: op.title || "Untitled opportunity",
    company: op.company || "Unknown organisation",
    location: op.location || "Location not specified",
    postedAt: timeAgo(op.postedAt),
    description: op.description || "No description available",
    jobType: op.type || "Not specified",
    category: op.category || "General",
    tags: Array.from(new Set(tags)).slice(0, 3),
    applyUrl: op.applyUrl || "#",
    isFeatured: op.isFeatured,
    source: op.source,
  };
}

type FetchOpportunitiesParams = {
  search?: string;
  category?: string;
};

/** Backed by the DB now (manual admin entries + Adzuna-synced rows), not a
 *  direct client-side call to Adzuna — keeps the provider API key
 *  server-side and lets search/category filter across both sources at
 *  once. */
export async function fetchOpportunities(params: FetchOpportunitiesParams = {}) {
  const { data } = await api.get<Opportunity[]>("/opportunities", {
    params: {
      search: params.search || undefined,
      category: params.category || undefined,
    },
  });
  return (data ?? []).map(transformOpportunity);
}

export async function fetchOpportunityCategories() {
  const { data } = await api.get<string[]>("/opportunities/categories");
  return data ?? [];
}

/** Fallback for direct/refreshed links to a detail page — JobCard passes
 *  the job via router state for the normal click-through, but a shared
 *  link or a page refresh has no state to read. */
export async function fetchOpportunity(id: string) {
  const { data } = await api.get<Opportunity>(`/opportunities/${id}`);
  return transformOpportunity(data);
}
