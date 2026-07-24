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

export type SkillLog = {
  id: string;
  connectionId: string;
  menteeId: string;
  skillName: string;
  notes: string | null;
  confirmedByMentor: boolean;
  createdAt: string;
};

/** Either party on a connection can view the skills logged so far. */
export async function fetchSkillLogs(connectionId: string): Promise<SkillLog[]> {
  const { data } = await api.get(`/mentors/mentees/${connectionId}/skills`);
  return data?.data ?? data;
}

/** Mentee logs a skill they learned within this mentorship. */
export async function logSkill(connectionId: string, skillName: string, notes?: string): Promise<SkillLog> {
  const { data } = await api.post(`/mentors/mentees/${connectionId}/skills`, { skillName, notes });
  return data?.data ?? data;
}

/** Mentor confirms a mentee's self-reported skill. */
export async function confirmSkillLog(skillLogId: string): Promise<SkillLog> {
  const { data } = await api.patch(`/mentors/skills/${skillLogId}/confirm`);
  return data?.data ?? data;
}

export type SessionStatus = "PENDING" | "SCHEDULED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";

export type MentorSession = {
  id: string;
  connectionId: string;
  status: SessionStatus;
  proposedFor: string;
  scheduledFor: string | null;
  durationMins: number | null;
  agenda: string | null;
  mentorNotes: string | null;
  menteeNotes: string | null;
  createdAt: string;
};

export async function fetchSessions(connectionId: string): Promise<MentorSession[]> {
  const { data } = await api.get(`/mentors/mentees/${connectionId}/sessions`);
  return data?.data ?? data;
}

/** Mentee proposes a session time. proposedFor is an ISO datetime string. */
export async function requestSession(
  connectionId: string,
  payload: { proposedFor: string; durationMins?: number; agenda?: string },
): Promise<MentorSession> {
  const { data } = await api.post(`/mentors/mentees/${connectionId}/sessions`, payload);
  return data?.data ?? data;
}

export async function updateSession(
  sessionId: string,
  updates: Partial<{
    status: SessionStatus;
    scheduledFor: string;
    mentorNotes: string;
    menteeNotes: string;
  }>,
): Promise<MentorSession> {
  const { data } = await api.patch(`/mentors/sessions/${sessionId}`, updates);
  return data?.data ?? data;
}

// ───────────────────────── Career paths ─────────────────────────

export type CareerPathSkill = { id: string; skillName: string; weight: number };

export type CareerPath = {
  id: string;
  title: string;
  description: string | null;
  isActive: boolean;
  requiredSkills: CareerPathSkill[];
};

export type CareerReadiness =
  | { hasGoal: false }
  | {
      hasGoal: true;
      careerPath: { id: string; title: string; description: string | null };
      readinessPercent: number;
      matched: { skillName: string; weight: number; confirmed: boolean }[];
      missing: { skillName: string; weight: number }[];
      aiSummary: { summary: string; priorities: string[] } | null;
    };

export async function fetchActiveCareerPaths(): Promise<CareerPath[]> {
  const { data } = await api.get("/career-paths");
  return data?.data ?? data;
}

export async function fetchMyReadiness(): Promise<CareerReadiness> {
  const { data } = await api.get("/career-paths/my-goal/readiness");
  return data?.data ?? data;
}

export async function setMyCareerGoal(careerPathId: string): Promise<void> {
  await api.post("/career-paths/my-goal", { careerPathId });
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
