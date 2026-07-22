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

export type MentorConnectionStatus = "PENDING" | "ACTIVE" | "COMPLETED" | "DECLINED";

export type Mentee = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  organization: string | null;
};

export type MenteeConnection = {
  connectionId: string;
  status: MentorConnectionStatus;
  sessionsCompleted: number;
  nextSessionAt: string | null;
  updatedAt: string;
  mentee: Mentee;
};

export type MenteeMessage = {
  id: string;
  connectionId: string;
  senderId: string;
  content: string;
  createdAt: string;
};

/** GET /mentors/my-mentees — mentor's own dashboard list, 403s for non-mentors. */
export async function fetchMyMentees(): Promise<MenteeConnection[]> {
  const { data } = await api.get("/mentors/my-mentees");
  return data?.data ?? data;
}

export async function updateMenteeConnection(
  connectionId: string,
  updates: Partial<{ status: MentorConnectionStatus; sessionsCompleted: number; nextSessionAt: string }>,
): Promise<MenteeConnection> {
  const { data } = await api.patch(`/mentors/mentees/${connectionId}`, updates);
  return data?.data ?? data;
}

export async function fetchMenteeMessages(connectionId: string): Promise<MenteeMessage[]> {
  const { data } = await api.get(`/mentors/mentees/${connectionId}/messages`);
  return data?.data ?? data;
}

export async function sendMenteeMessage(connectionId: string, content: string): Promise<MenteeMessage> {
  const { data } = await api.post(`/mentors/mentees/${connectionId}/messages`, { content });
  return data?.data ?? data;
}

/** Admin: promote an existing user to mentor (keeps their own login). */
export async function promoteToMentor(payload: {
  userId: string;
  roleTitle: string;
  company?: string;
  avatarUrl?: string;
  bio?: string;
  skills?: string[];
}): Promise<Mentor> {
  const { data } = await api.post("/mentors/promote", payload);
  return data?.data ?? data;
}

export async function demoteMentor(userId: string): Promise<{ message: string }> {
  const { data } = await api.post(`/mentors/demote/${userId}`);
  return data?.data ?? data;
}
