import { api } from "./api";
import { broadcastGreenImpactUpdate } from "./greenImpactEvents";

export type GreenActionType =
  | "RECYCLING"
  | "TRANSPORT"
  | "ENERGY"
  | "WASTE_REDUCTION"
  | "TREE_PLANTING"
  | "OTHER";

export type GreenBadge = {
  id: string;
  label: string;
  description: string;
  earned: boolean;
  progress: number; // 0-100
  current: number;
  target: number;
  remaining: number;
};

export type GreenStats = {
  totalCo2TrackedKg: number;
  totalPoints: number;
  balance: number;
  pointsToBalanceRate: number;
  actionsCount: number;
  badgesEarned: number;
  badgesTotal: number;
  badges: GreenBadge[];
  ranking: number | null;
};

export type LeaderboardEntry = {
  rank: number;
  userId: string;
  displayName: string;
  points: number;
  isCurrentUser: boolean;
};

export type Leaderboard = {
  top: LeaderboardEntry[];
  totalRankedUsers: number;
  me: { rank: number | null; points: number };
  greenChampionRankThreshold: number;
  greenChampionUnlocked: boolean;
};

export type ClimateReport = {
  id: string;
  title: string;
  description: string | null;
  link: string | null;
};

export type ClimateInsights = {
  avgTemperatureRiseC: number | null;
  renewableEnergyPct: number | null;
  treesPlanted: number;
  trend: { month: string; emissionsGCO2PerKWh: number | null; offsetKg: number }[];
  impactByArea: { area: string; co2OffsetKg: number }[];
  reports: ClimateReport[];
  updatedAt: string;
};

export async function fetchGreenStats(): Promise<GreenStats> {
  const { data } = await api.get("/green-impact/stats");
  return data?.data ?? data;
}

export async function fetchLeaderboard(limit = 10): Promise<Leaderboard> {
  const { data } = await api.get(`/green-impact/leaderboard?limit=${limit}`);
  return data?.data ?? data;
}

export async function fetchClimateInsights(): Promise<ClimateInsights> {
  const { data } = await api.get("/green-impact/climate-insights");
  return data?.data ?? data;
}

export type CreditListing = {
  id: string;
  title: string;
  description: string | null;
  pointsPerCredit: number;
  availableQuantity: number;
  ownedByMe: number;
};

export type Transaction = {
  id: string;
  title: string;
  date: string;
  points: number;
  type: "buy" | "sell";
};

export async function fetchListings(): Promise<CreditListing[]> {
  const { data } = await api.get("/green-exchange/listings");
  return data?.data ?? data;
}

export async function fetchTransactions(): Promise<{ balance: number; transactions: Transaction[] }> {
  const { data } = await api.get("/green-exchange/transactions");
  return data?.data ?? data;
}

export async function buyCredits(listingId: string, quantity: number) {
  const { data } = await api.post(`/green-exchange/listings/${listingId}/buy`, { quantity });
  broadcastGreenImpactUpdate();
  return data;
}

export async function sellCredits(listingId: string, quantity: number) {
  const { data } = await api.post(`/green-exchange/listings/${listingId}/sell`, { quantity });
  broadcastGreenImpactUpdate();
  return data;
}

export async function logGreenAction(input: {
  type: GreenActionType;
  co2OffsetKg: number;
  description?: string;
  area?: string;
}) {
  const { data } = await api.post("/green-impact/actions", input);
  // Let every widget showing green-impact numbers (top stat cards, the
  // sidebar profile, the leaderboard, achievements) know to refetch —
  // instead of needing a full page reload to see the new totals.
  broadcastGreenImpactUpdate();
  return data;
}
