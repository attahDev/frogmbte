// @ts-nocheck
const BASE = "https://gmbtpitch.onrender.com";

const PAGE_SIZE = 5;

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

async function parseError(res: Response, fallback: string) {
  const err = await res.json().catch(() => ({}));
  return err.detail || fallback;
}

export type ProposalContent = {
  executive_summary?: string;
  project_overview?: string;
  scope_of_work?: string;
  qualifications?: string;
  timeline?: string;
  pricing?: string;
  terms_and_conditions?: string;
  agreement?: string;
  [key: string]: string | undefined;
};

export type Proposal = {
  id: string;
  title: string;
  client_name?: string;
  estimated_budget?: string;
  total_value?: string;
  user_name?: string;
  content: ProposalContent;
  created_at?: string;
};

export type ProposalListResponse = {
  total: number;
  proposals: Proposal[];
  page: number;
  limit: number;
};

export async function generateProposal(payload: {
  prompt: string;
  client_name: string;
  estimated_budget: string;
}): Promise<Proposal> {
  const res = await fetch(`${BASE}/api/proposals/generate`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(await parseError(res, `Generation failed (${res.status})`));
  }
  return res.json();
}

export async function getProposal(id: string): Promise<Proposal> {
  const res = await fetch(`${BASE}/api/proposals/${id}`, {
    headers: headers(false),
  });
  if (!res.ok) throw new Error("Could not load proposal.");
  return res.json();
}

export async function updateProposal(
  id: string,
  payload: { title?: string; content?: ProposalContent }
): Promise<Proposal> {
  const res = await fetch(`${BASE}/api/proposals/${id}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(await parseError(res, `Save failed (${res.status})`));
  }
  return res.json();
}

export async function deleteProposal(id: string): Promise<void> {
  const res = await fetch(`${BASE}/api/proposals/${id}`, {
    method: "DELETE",
    headers: headers(false),
  });
  if (!res.ok) throw new Error("Delete failed");
}

export async function listProposals(
  page = 1,
  limit = PAGE_SIZE
): Promise<ProposalListResponse> {
  const res = await fetch(
    `${BASE}/api/proposals/?page=${page}&limit=${limit}`,
    { headers: headers(false) }
  );
  if (!res.ok) throw new Error("Could not load proposals.");
  return res.json();
}

export async function downloadProposal(
  id: string,
  format: "pdf" | "docx"
): Promise<void> {
  const res = await fetch(`${BASE}/api/proposals/${id}/download/${format}`, {
    headers: headers(false),
  });
  if (!res.ok) throw new Error(`Download failed (${res.status})`);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `proposal-${id.slice(0, 8)}.${format === "pdf" ? "pdf" : "docx"}`;
  a.click();
  URL.revokeObjectURL(url);
}

export { PAGE_SIZE };
