import { api } from "../../../lib/api";

export type MentorChatResponse = {
  reply: string;
  chatId: string;
};

/**
 * POST /mentor-ai/chat — the Business Mentor AI.
 * Pass the previous chatId to continue the same conversation (server keeps
 * history); omit it to start a new one.
 */
export const sendMentorMessage = async (
  message: string,
  chatId?: string
): Promise<MentorChatResponse> => {
  const response = await api.post<{ reply: string; chatId: string }>(
    "/mentor-ai/chat",
    { message, chatId }
  );
  return response.data;
};
