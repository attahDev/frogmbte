import { api } from "../../../lib/api";

export type MentorChatResponse = {
  reply: string;
  chatId: string;
};

/**
 * POST /mentor-ai/chat — the Business Mentor AI.
 * Pass the previous chatId to continue the same conversation (server keeps
 * history); omit it to start a new one. If the server rejects a stale/
 * foreign chatId (e.g. cached from a previous login), retry once fresh.
 */
export const sendMentorMessage = async (
  message: string,
  chatId?: string
): Promise<MentorChatResponse> => {
  try {
    const response = await api.post<{ reply: string; chatId: string }>(
      "/mentor-ai/chat",
      { message, chatId }
    );
    return response.data;
  } catch (err: any) {
    const isStaleChat =
      err?.response?.status === 400 && chatId && /chat not found/i.test(err?.response?.data?.message ?? "");

    if (isStaleChat) {
      const response = await api.post<{ reply: string; chatId: string }>(
        "/mentor-ai/chat",
        { message }
      );
      return response.data;
    }
    throw err;
  }
};
