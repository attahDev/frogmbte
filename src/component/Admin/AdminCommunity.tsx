import { useEffect, useState } from "react";
import {
  fetchPendingPosts,
  approvePost,
  deletePost,
  fetchFlaggedComments,
  approveComment,
  deleteCommentAdmin,
  type CommunityPost,
  type CommunityComment,
} from "../../lib/communityApi";

export default function AdminCommunity() {
  const [flagged, setFlagged] = useState<CommunityPost[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [flaggedComments, setFlaggedComments] = useState<CommunityComment[] | null>(null);
  const [commentLoadError, setCommentLoadError] = useState(false);
  const [busyCommentId, setBusyCommentId] = useState<string | null>(null);

  const load = () => {
    setLoadError(false);
    fetchPendingPosts()
      .then(setFlagged)
      .catch(() => {
        setLoadError(true);
        setFlagged([]);
      });
  };

  const loadComments = () => {
    setCommentLoadError(false);
    fetchFlaggedComments()
      .then(setFlaggedComments)
      .catch(() => {
        setCommentLoadError(true);
        setFlaggedComments([]);
      });
  };

  useEffect(load, []);
  useEffect(loadComments, []);

  const handleApprove = async (id: string) => {
    setBusyId(id);
    try {
      await approvePost(id);
      setFlagged((prev) => (prev ?? []).filter((p) => p.id !== id));
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: string) => {
    const reason = window.prompt("Optional: reason to show the author (leave blank to skip)") || undefined;
    setBusyId(id);
    try {
      await deletePost(id, reason);
      setFlagged((prev) => (prev ?? []).filter((p) => p.id !== id));
    } finally {
      setBusyId(null);
    }
  };

  const handleApproveComment = async (id: string) => {
    setBusyCommentId(id);
    try {
      await approveComment(id);
      setFlaggedComments((prev) => (prev ?? []).filter((c) => c.id !== id));
    } finally {
      setBusyCommentId(null);
    }
  };

  const handleDeleteComment = async (id: string) => {
    setBusyCommentId(id);
    try {
      await deleteCommentAdmin(id);
      setFlaggedComments((prev) => (prev ?? []).filter((c) => c.id !== id));
    } finally {
      setBusyCommentId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Community posts — flagged for review</h2>
        <p className="mt-1 text-xs text-gray-400">
          Posts publish immediately; these were flagged by the automated content check and pulled from
          the feed pending your review.
        </p>

        {flagged === null ? (
          <p className="mt-3 text-sm text-gray-500">Loading…</p>
        ) : loadError ? (
          <div className="mt-3 text-sm text-[#8A1F1F]">
            Couldn't load flagged posts — the request failed.{" "}
            <button onClick={load} className="underline">
              Retry
            </button>
          </div>
        ) : flagged.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">Nothing flagged — you're caught up.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {flagged.map((post) => (
              <div key={post.id} className="rounded border border-gray-200 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#001F3F]">{post.title}</p>
                    <p className="text-xs text-gray-400">
                      {post.authorName} · {new Date(post.createdAt).toLocaleString()}
                    </p>
                    {post.flagReason && (
                      <p className="mt-1 text-xs text-[#8A1F1F]">Flagged: {post.flagReason}</p>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => handleApprove(post.id)}
                      disabled={busyId === post.id}
                      className="rounded border border-emerald-300 px-2 py-1 text-xs text-emerald-700 disabled:opacity-50"
                    >
                      Restore
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      disabled={busyId === post.id}
                      className="rounded border border-red-300 px-2 py-1 text-xs text-red-600 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm text-gray-600">{post.description}</p>
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="mt-2 h-32 w-32 rounded object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Comments — flagged for review</h2>
        <p className="mt-1 text-xs text-gray-400">
          Hidden from the public thread until you restore or delete them.
        </p>

        {flaggedComments === null ? (
          <p className="mt-3 text-sm text-gray-500">Loading…</p>
        ) : commentLoadError ? (
          <div className="mt-3 text-sm text-[#8A1F1F]">
            Couldn't load flagged comments — the request failed.{" "}
            <button onClick={loadComments} className="underline">
              Retry
            </button>
          </div>
        ) : flaggedComments.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">Nothing flagged — you're caught up.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {flaggedComments.map((comment) => (
              <div key={comment.id} className="rounded border border-gray-200 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-gray-700">{comment.content}</p>
                    <p className="mt-1 text-xs text-gray-400">
                      {comment.author?.firstname} {comment.author?.lastname} ·{" "}
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                    {comment.flagReason && (
                      <p className="mt-1 text-xs text-[#8A1F1F]">Flagged: {comment.flagReason}</p>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => handleApproveComment(comment.id)}
                      disabled={busyCommentId === comment.id}
                      className="rounded border border-emerald-300 px-2 py-1 text-xs text-emerald-700 disabled:opacity-50"
                    >
                      Restore
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      disabled={busyCommentId === comment.id}
                      className="rounded border border-red-300 px-2 py-1 text-xs text-red-600 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
