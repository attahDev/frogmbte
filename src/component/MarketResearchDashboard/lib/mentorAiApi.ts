import { api } from "../../../lib/api";

export type MentorChatResponse = {
  reply: string;
  chatId: string;
};

type WrappedResponse = { success: boolean; data: MentorChatResponse; message: string };

// Distinct from Mentor AI's own storage key — these are two separate
// agents (Business Mentor lives in AI Studio; Mentor AI lives in My
// Mentor / its standalone page) and must never share a conversation.
export const BUSINESS_MENTOR_CHAT_ID_KEY = 'gmbte_business_mentor_chat_id';

/** Ignores a previously-poisoned literal "undefined" string from an older, buggy build. */
export const readStoredBusinessMentorChatId = (): string | undefined => {
  if (typeof window === 'undefined') return undefined;
  const stored = sessionStorage.getItem(BUSINESS_MENTOR_CHAT_ID_KEY);
  return stored && stored !== 'undefined' ? stored : undefined;
};

/**
 * POST /mentor-ai/chat — the Business Mentor AI.
 * Pass the previous chatId to continue the same conversation (server keeps
 * history); omit it to start a new one. If the server rejects a stale/
 * foreign chatId (e.g. cached from a previous login), clear it and retry
 * once fresh.
 *
 * The backend wraps every success response as {success, data, message,
 * timestamp} (global ResponseInterceptor) — {reply, chatId} live under
 * .data, not at the top level.
 */
export const sendMentorMessage = async (
  message: string,
  chatId?: string,
  persona?: 'sam' | 'business_mentor'
): Promise<MentorChatResponse> => {
  try {
    const response = await api.post<WrappedResponse | MentorChatResponse>(
      "/mentor-ai/chat",
      { message, chatId, persona }
    );
    return unwrap(response.data);
  } catch (err: any) {
    const isStaleChat =
      err?.response?.status === 400 && chatId && /chat not found/i.test(err?.response?.data?.message ?? "");

    if (isStaleChat) {
      if (typeof window !== 'undefined') sessionStorage.removeItem(BUSINESS_MENTOR_CHAT_ID_KEY);
      const response = await api.post<WrappedResponse | MentorChatResponse>(
        "/mentor-ai/chat",
        { message, persona }
      );
      return unwrap(response.data);
    }
    throw err;
  }
};

export type MentorChatSummary = { id: string; title: string | null; createdAt: string; updatedAt: string };
export type MentorMessage = { id: string; role: 'USER' | 'ASSISTANT'; content: string; createdAt: string };
export type MentorChatDetail = MentorChatSummary & { messages: MentorMessage[] };

/** GET /mentor-ai/chats — past conversations for the resume list. */
export const listMentorChats = async (): Promise<MentorChatSummary[]> => {
  const response = await api.get<{ success: boolean; data: MentorChatSummary[] }>("/mentor-ai/chats");
  return unwrapList(response.data);
};

/** GET /mentor-ai/chats/:id — full message history, for hydrating the UI
 *  instead of always starting from a blank slate. */
export const getMentorChat = async (chatId: string): Promise<MentorChatDetail> => {
  const response = await api.get<{ success: boolean; data: MentorChatDetail } | MentorChatDetail>(
    `/mentor-ai/chats/${chatId}`
  );
  const body = response.data as any;
  return "data" in body ? body.data : body;
};

function unwrapList<T>(body: { success: boolean; data: T } | T): T {
  return (body as any)?.data ?? body;
}

function unwrap(body: WrappedResponse | MentorChatResponse): MentorChatResponse {
  return "data" in body ? body.data : body;
}
