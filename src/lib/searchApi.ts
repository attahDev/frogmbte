import { api } from "./api";

export type SearchResultType = "opportunity" | "event" | "course" | "mentor" | "hofNominee";

export type SearchResult = {
  type: SearchResultType;
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  slug?: string;
  score: number;
};

export async function searchPlatform(query: string): Promise<SearchResult[]> {
  const { data } = await api.get<{ data: { results: SearchResult[] } } | { results: SearchResult[] }>(
    "/search",
    { params: { q: query } }
  );
  return "data" in data ? data.data.results : data.results;
}
