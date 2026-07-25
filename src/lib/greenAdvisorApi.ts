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

/** POST /green-ai/chat — ask the Green Advisor a free-form question, grounded in the same real data. */
export async function askGreenAdvisor(message: string): Promise<string> {
  const { data } = await api.post<{ data: { reply: string } } | { reply: string }>(
    "/green-ai/chat",
    { message }
  );
  return "data" in data ? data.data.reply : data.reply;
}
