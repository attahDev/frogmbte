// Idea Engine API client — the shared brain behind the Dashboard's
// "Generate ideas for me" / "Validate Idea" actions, the Idea Generator
// page, and the Opportunity Insights page. One generated Idea record
// feeds all three; Business Plan links back to it via sourceIdeaId.

const BASE = "https://gmbte-idea-engine.onrender.com".replace(/\/+$/, "");

console.log("Idea Engine API:", BASE);

function getToken() {
  return (
    sessionStorage.getItem("token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("gmbte_token") ||
    ""
  );
}

function headers(json = true): HeadersInit {
  const h: Record<string, string> = {};
  const token = getToken();
  if (token) h.Authorization = `Bearer ${token}`;
  if (json) h["Content-Type"] = "application/json";
  return h;
}

export type GenerateIdeaPayload = {
  business_idea: string;
  industry?: string;
  target_audience?: string;
  skills?: string;
  budget?: string;
  location?: string;
  experience_level?: string;
  goal?: string;
};

export type ScoredLabel = { label: string; score: number };

export type IdeaContent = {
  summary_card: { title: string; description: string; confidence_score: number };
  market_insights: {
    demand: ScoredLabel;
    competition: ScoredLabel;
    startup_cost: string;
    profit_potential: string;
    opportunity: string;
  };
  feasibility_card: {
    fit_score: number;
    difficulty: string;
    strengths: string[];
    risks: string[];
  };
  revenue_chart: {
    model: string;
    scalability: string;
    projection: { month: string; revenue: number }[];
  };
  score_breakdown: { market: number; profit: number; execution: number; scalability: number };
  next_steps: string[];
  competitors: { name: string; description: string; score: number }[];
  target_audience: { text: string; segment: string }[];
  competitive_edge: string[];
  roadmap: { phases: { tag: string; title: string; items: { text: string; done: boolean }[] }[] };
  financials: {
    stats: { label: string; value: string; sub: string; badge?: string | null }[];
    chart: { label: string; amount: string; value: number }[];
  };
  business_model: { label: string; value: string }[];
  executive_summary: string;
  next_actions: string[];
};

export type IdeaResponse = {
  id: string;
  user_id: string;
  business_idea: string;
  industry: string;
  content: IdeaContent;
  created_at: string;
};

export type IdeaListItem = {
  id: string;
  business_idea: string;
  industry: string;
  confidence_score: number;
  created_at: string;
};

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let detail = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      detail = body?.detail || detail;
    } catch {
      /* ignore */
    }
    throw new Error(detail);
  }
  return res.json();
}

export async function generateIdea(payload: GenerateIdeaPayload): Promise<IdeaResponse> {
  const res = await fetch(`${BASE}/api/ideas/generate`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload),
  });
  return handle<IdeaResponse>(res);
}

export async function listIdeas(): Promise<IdeaListItem[]> {
  const res = await fetch(`${BASE}/api/ideas`, { headers: headers(false) });
  return handle<IdeaListItem[]>(res);
}

export async function getIdea(ideaId: string): Promise<IdeaResponse> {
  const res = await fetch(`${BASE}/api/ideas/${ideaId}`, { headers: headers(false) });
  return handle<IdeaResponse>(res);
}
