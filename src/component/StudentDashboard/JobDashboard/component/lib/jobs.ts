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
  const tags = [
    op.type,
    op.category,
    op.source === "API" ? "External" : "GMBTE",
  ].filter((t): t is string => Boolean(t));

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

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
};

export async function fetchOpportunities(
  params: FetchOpportunitiesParams = {}
): Promise<JobCardData[]> {
  const { data } = await api.get<ApiResponse<Opportunity[]>>(
    "/opportunities",
    {
      params: {
        search: params.search || undefined,
        category: params.category || undefined,
      },
    }
  );

  const opportunities = Array.isArray(data.data) ? data.data : [];

  return opportunities.map(transformOpportunity);
}

export async function fetchOpportunityCategories(): Promise<string[]> {
  const { data } = await api.get<ApiResponse<string[]>>(
    "/opportunities/categories"
  );

  return Array.isArray(data.data) ? data.data : [];
}

export async function fetchOpportunity(
  id: string
): Promise<JobCardData> {
  const { data } = await api.get<ApiResponse<Opportunity>>(
    `/opportunities/${id}`
  );

  return transformOpportunity(data.data);
}
