import { api } from "./api";

export type Mentor = {
  id: string;
  name: string;
  role: string;
  company: string | null;
  avatarUrl: string | null;
  bio: string | null;
  skills: string[];
};

/** GET /mentors — the public mentor directory. */
export async function fetchMentors(skill?: string): Promise<Mentor[]> {
  const { data } = await api.get("/mentors", { params: skill ? { skill } : undefined });
  return data?.data ?? data;
}
