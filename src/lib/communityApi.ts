import { api } from "./api";

export type PostStatus = "PENDING" | "APPROVED" | "FLAGGED" | "REJECTED";

export type CommunityPost = {
  id: string;
  title: string;
  description: string;
  authorName: string;
  authorRole: string;
  avatarColor: string | null;
  imageUrl: string | null;
  likes: number;
  comments: number;
  status: PostStatus;
  flagReason?: string | null;
  createdAt: string;
  hasLiked: boolean;
};

export type CommunityComment = {
  id: string;
  postId: string;
  content: string;
  flagged?: boolean;
  flagReason?: string | null;
  createdAt: string;
  author: { firstname: string; lastname: string };
};

/** GET /community/spotlight — the public, live feed (approved posts only —
 *  flagged posts are pulled until an admin reviews them). */
export async function fetchCommunityFeed(): Promise<CommunityPost[]> {
  const { data } = await api.get("/community/spotlight");
  return data?.data ?? data;
}

/** GET /community/mine — the current user's own submissions, any status,
 *  so a flagged/removed post doesn't just silently disappear on them. */
export async function fetchMyPosts(): Promise<CommunityPost[]> {
  const { data } = await api.get("/community/mine");
  return data?.data ?? data;
}

export async function likePost(id: string) {
  const { data } = await api.post(`/community/spotlight/${id}/like`);
  return (data?.data ?? data) as { likes: number; hasLiked: boolean };
}

export async function unlikePost(id: string) {
  const { data } = await api.delete(`/community/spotlight/${id}/like`);
  return (data?.data ?? data) as { likes: number; hasLiked: boolean };
}

/** Multipart submission — publishes immediately; an automated check flags
 *  it afterward if needed, pulling it from the feed pending admin review. */
export async function createCommunityPost(input: {
  title: string;
  description: string;
  image?: File | null;
}) {
  const form = new FormData();
  form.append("title", input.title);
  form.append("description", input.description);
  if (input.image) form.append("image", input.image);

  const { data } = await api.post("/community/posts", form);
  return (data?.data ?? data) as CommunityPost;
}

export async function fetchComments(postId: string): Promise<CommunityComment[]> {
  const { data } = await api.get(`/community/spotlight/${postId}/comments`);
  return data?.data ?? data;
}

export async function addComment(postId: string, content: string): Promise<CommunityComment> {
  const { data } = await api.post(`/community/spotlight/${postId}/comments`, { content });
  return (data?.data ?? data) as CommunityComment;
}

export async function deleteOwnComment(commentId: string) {
  const { data } = await api.delete(`/community/comments/${commentId}`);
  return data;
}

// --- Admin moderation -------------------------------------------------------

/** Posts the moderation bot flagged post-publish, awaiting admin review. */
export async function fetchPendingPosts(): Promise<CommunityPost[]> {
  const { data } = await api.get("/community/admin/pending");
  return data?.data ?? data;
}

/** Restores a flagged post to the live feed. */
export async function approvePost(id: string) {
  const { data } = await api.patch(`/community/admin/${id}/approve`);
  return data?.data ?? data;
}

/** Permanently removes a flagged post (and its comments/likes). */
export async function deletePost(id: string, reason?: string) {
  const { data } = await api.delete(`/community/admin/${id}`, { data: { reason } });
  return data?.data ?? data;
}

export async function fetchFlaggedComments(): Promise<CommunityComment[]> {
  const { data } = await api.get("/community/admin/comments/flagged");
  return data?.data ?? data;
}

/** Restores a flagged comment. */
export async function approveComment(id: string) {
  const { data } = await api.patch(`/community/admin/comments/${id}/approve`);
  return data?.data ?? data;
}

/** Permanently removes a flagged comment. */
export async function deleteCommentAdmin(id: string) {
  const { data } = await api.delete(`/community/admin/comments/${id}`);
  return data?.data ?? data;
}
