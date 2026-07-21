import { api } from "./api";
import { broadcastGreenImpactUpdate } from "./greenImpactEvents";

export type GreenActionType =
  | "RECYCLING"
  | "TRANSPORT"
  | "ENERGY"
  | "WASTE_REDUCTION"
  | "TREE_PLANTING"
  | "OTHER";

export type GreenStats = {
  totalCo2TrackedKg: number;
  totalPoints: number;
  actionsCount: number;
  badgesEarned: number;
  badgesTotal: number;
  badges: { id: string; label: string; earned: boolean }[];
  ranking: number | null;
};

export async function fetchGreenStats(): Promise<GreenStats> {
  const { data } = await api.get("/green-impact/stats");
  return data?.data ?? data;
}

export async function logGreenAction(input: {
  type: GreenActionType;
  co2OffsetKg: number;
  description?: string;
}) {
  const { data } = await api.post("/green-impact/actions", input);
  // Let every widget showing green-impact numbers (top stat cards, the
  // sidebar profile, anything added later) know to refetch — instead of
  // needing a full page reload to see the new totals.
  broadcastGreenImpactUpdate();
  return data;
}
