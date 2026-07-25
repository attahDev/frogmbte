import { api } from "./api";

export type AdvisorCard = {
  title: string;
  description: string;
  variant: "danger" | "info" | "neutral";
  badge?: string;
};

/** GET /green-ai/advice — personalized sustainability tips from the user's real green-impact data. */
export async function fetchGreenAdvice(): Promise<AdvisorCard[]> {
  const { data } = await api.get<{ data: { cards: AdvisorCard[] } } | { cards: AdvisorCard[] }>(
    "/green-ai/advice"
  );
  return "data" in data ? data.data.cards : data.cards;
}
