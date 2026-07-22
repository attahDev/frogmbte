import { useEffect, useState } from "react";
import { fetchPendingPosts, approvePost, rejectPost, type CommunityPost } from "../../lib/communityApi";

export default function AdminCommunity() {
  const [pending, setPending] = useState<CommunityPost[] | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = () => {
    fetchPendingPosts()
      .then(setPending)
      .catch(() => setPending([]));
  };

  useEffect(load, []);

  const handleApprove = async (id: string) => {
    setBusyId(id);
    try {
      await approvePost(id);
      setPending((prev) => (prev ?? []).filter((p) => p.id !== id));
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (id: string) => {
    const reason = window.prompt("Optional: reason to show the author (leave blank to skip)") || undefined;
    setBusyId(id);
    try {
      await rejectPost(id, reason);
      setPending((prev) => (prev ?? []).filter((p) => p.id !== id));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-gray-300 bg-white p-4">
        <h2 className="text-base font-semibold text-[#001F3F]">Community posts — pending approval</h2>
        <p className="mt-1 text-xs text-gray-400">
          User-submitted shoutouts only appear in the community feed once approved here.
        </p>

        {pending === null ? (
          <p className="mt-3 text-sm text-gray-500">Loading…</p>
        ) : pending.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">Nothing pending — you're caught up.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {pending.map((post) => (
              <div key={post.id} className="rounded border border-gray-200 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#001F3F]">{post.title}</p>
                    <p className="text-xs text-gray-400">
                      {post.authorName} · {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => handleApprove(post.id)}
                      disabled={busyId === post.id}
                      className="rounded border border-emerald-300 px-2 py-1 text-xs text-emerald-700 disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(post.id)}
                      disabled={busyId === post.id}
                      className="rounded border border-red-300 px-2 py-1 text-xs text-red-600 disabled:opacity-50"
                    >
                      Reject
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
    </div>
  );
}
