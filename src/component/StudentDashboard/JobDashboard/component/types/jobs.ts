// Shape returned by the backend (GET /opportunities, /opportunities/:id).
// Covers both admin manual entries and API-synced rows — the frontend
// doesn't need to distinguish beyond the `source` badge.
export type OpportunitySource = "MANUAL" | "API";

export type Opportunity = {
  id: string;
  title: string;
  company: string;
  location: string | null;
  category: string | null;
  type: string | null;
  description: string | null;
  applyUrl: string | null;
  imageUrl: string | null;
  source: OpportunitySource;
  provider: string | null;
  postedAt: string;
  isFeatured: boolean;
};

// Shape the card/detail UI actually renders. Kept separate from
// `Opportunity` so display formatting (relative time, fallback text)
// lives in one place (lib/jobs.ts transformOpportunity) instead of being
// duplicated across every component that shows a card.
export type JobCardData = {
  id: string;
  title: string;
  company: string;
  location: string;
  postedAt: string;
  description: string;
  jobType: string;
  category: string;
  tags: string[];
  applyUrl: string;
  isFeatured: boolean;
  source: OpportunitySource | "dummy";
};
