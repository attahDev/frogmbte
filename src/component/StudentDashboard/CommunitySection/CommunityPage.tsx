import { useEffect, useMemo, useState } from "react";
import { Heart, MessageCircle, ImagePlus, X, Clock, CheckCircle2, XCircle } from "lucide-react";
import { useAuth } from "../../../contexts/mainuseAuth";
import {
  fetchCommunityFeed,
  fetchMyPosts,
  likePost,
  unlikePost,
  createCommunityPost,
  fetchComments,
  addComment,
  type CommunityPost,
  type CommunityComment,
} from "../../../lib/communityApi";
import CardSkeleton from "../shared/CardSkeleton";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / 3600000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export default function CommunityPage() {
  const { user } = useAuth();
  const [feed, setFeed] = useState<CommunityPost[] | null>(null);
  const [mine, setMine] = useState<CommunityPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    fetchCommunityFeed()
      .then(setFeed)
      .catch(() => setError("Couldn't load the community feed. Try refreshing."));
    fetchMyPosts()
      .then(setMine)
      .catch(() => {});
  };

  useEffect(load, []);

  const pendingOrRejected = useMemo(
    () => (mine ?? []).filter((p) => p.status !== "APPROVED"),
    [mine]
  );

  return (
    <div className="min-w-0 overflow-x-hidden bg-[#FFFDF7] pb-20 lg:pb-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001F3F]">Community</h1>
        <p className="text-sm text-gray-500 mt-1">
          Share a win, post a photo from an event, and celebrate what everyone's building.
        </p>

        <Composer
          authorName={user ? `${user.firstname} ${user.lastname}` : "You"}
          onPosted={load}
        />

        {pendingOrRejected.length > 0 && (
          <div className="mt-6 space-y-2">
            {pendingOrRejected.map((p) => (
              <div
                key={p.id}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${
                  p.status === "PENDING"
                    ? "bg-amber-50 text-amber-800"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {p.status === "PENDING" ? (
                  <Clock className="h-4 w-4 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 shrink-0" />
                )}
                <span className="font-medium">{p.title}</span>
                <span className="text-xs opacity-75">
                  {p.status === "PENDING" ? "— awaiting admin approval" : "— not approved"}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 space-y-4 sm:space-y-6">
          {!feed && !error && (
            <>
              <CardSkeleton />
              <CardSkeleton />
            </>
          )}

          {error && <div className="rounded-2xl bg-white shadow-sm p-6 text-sm text-gray-500">{error}</div>}

          {feed && feed.length === 0 && (
            <p className="text-sm text-gray-600 py-8 text-center">
              No community posts yet — be the first to share something.
            </p>
          )}

          {feed?.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  );
}

function Composer({ authorName, onPosted }: { authorName: string; onPosted: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const pickImage = (file: File | null) => {
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const reset = () => {
    setTitle("");
    setDescription("");
    pickImage(null);
    setOpen(false);
  };

  const submit = async () => {
    if (!title.trim() || !description.trim() || submitting) return;
    setSubmitting(true);
    try {
      await createCommunityPost({ title, description, image });
      setMessage("Posted! It'll show up in the feed once an admin approves it.");
      reset();
      onPosted();
    } catch {
      setMessage("Couldn't submit your post — try again.");
    } finally {
      setSubmitting(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div className="mt-6 rounded-2xl bg-white shadow-sm p-4 sm:p-5">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-left text-sm text-gray-400 hover:border-gray-300 transition-colors"
        >
          <div className="h-8 w-8 shrink-0 rounded-full bg-[#001F3F] flex items-center justify-center text-white text-xs font-semibold">
            {initials(authorName)}
          </div>
          Share something with the community…
        </button>
      ) : (
        <div className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={'Give it a headline — e.g. "Wrapped my first AWS deploy!"'}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-[#001F3F]"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell everyone what happened…"
            rows={3}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-[#001F3F] resize-none"
          />

          {preview && (
            <div className="relative inline-block">
              <img src={preview} alt="Preview" className="h-32 rounded-xl object-cover" />
              <button
                type="button"
                onClick={() => pickImage(null)}
                className="absolute -top-2 -right-2 rounded-full bg-white shadow p-1"
                aria-label="Remove image"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-[#001F3F]">
              <ImagePlus className="h-5 w-5" />
              {preview ? "Change photo" : "Add a photo"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
                onChange={(e) => pickImage(e.target.files?.[0] ?? null)}
              />
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={reset}
                className="rounded-full px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={!title.trim() || !description.trim() || submitting}
                className="rounded-full bg-[#D7263D] px-5 py-1.5 text-sm font-semibold text-white hover:bg-[#B81F32] disabled:opacity-50 transition-colors"
              >
                {submitting ? "Posting…" : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}

      {message && <p className="mt-3 text-sm text-gray-500 flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-600" />{message}</p>}
    </div>
  );
}

function PostCard({ post }: { post: CommunityPost }) {
  const [likes, setLikes] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(post.hasLiked);
  const [pending, setPending] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const toggleLike = async () => {
    if (pending) return;
    const next = hasLiked ? { likes: Math.max(0, likes - 1), hasLiked: false } : { likes: likes + 1, hasLiked: true };
    setPending(true);
    setLikes(next.likes);
    setHasLiked(next.hasLiked);
    try {
      const result = hasLiked ? await unlikePost(post.id) : await likePost(post.id);
      setLikes(result.likes);
      setHasLiked(result.hasLiked);
    } catch {
      setLikes(post.likes);
      setHasLiked(post.hasLiked);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-white hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {post.imageUrl && (
          <div className="flex-shrink-0">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full sm:w-28 md:w-32 h-48 sm:h-28 md:h-32 rounded-xl object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-1 sm:gap-0">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{post.title}</h3>
            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap sm:ml-4">
              {timeAgo(post.createdAt)}
            </span>
          </div>

          <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">{post.description}</p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 ${post.avatarColor ?? "bg-red-600"} rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm`}
              >
                {initials(post.authorName)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-xs sm:text-sm">{post.authorName}</p>
                <p className="text-gray-600 text-[10px] sm:text-xs">{post.authorRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={toggleLike}
                disabled={pending}
                className={`flex items-center gap-1.5 sm:gap-2 transition disabled:opacity-60 ${
                  hasLiked ? "text-red-600" : "text-gray-600 hover:text-red-600"
                }`}
                aria-label={hasLiked ? "Unlike" : "Like"}
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" fill={hasLiked ? "currentColor" : "none"} />
                <span className="text-xs sm:text-sm font-medium">{likes}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowComments((v) => !v)}
                className="flex items-center gap-1.5 sm:gap-2 text-gray-600 hover:text-[#001F3F] transition"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">{post.comments}</span>
              </button>
            </div>
          </div>

          {showComments && <CommentThread postId={post.id} />}
        </div>
      </div>
    </div>
  );
}

function CommentThread({ postId }: { postId: string }) {
  const [comments, setComments] = useState<CommunityComment[] | null>(null);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments(postId)
      .then(setComments)
      .catch(() => setComments([]));
  }, [postId]);

  const submit = async () => {
    if (!text.trim() || submitting) return;
    setSubmitting(true);
    try {
      const comment = await addComment(postId, text.trim());
      setComments((prev) => [...(prev ?? []), comment]);
      setText("");
    } catch {
      // best-effort — leave their draft text in place so they can retry
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-4 border-t border-gray-100 pt-4 space-y-3">
      {comments === null && <p className="text-xs text-gray-400">Loading comments…</p>}
      {comments?.length === 0 && <p className="text-xs text-gray-400">No comments yet — say something.</p>}
      {comments?.map((c) => (
        <div key={c.id} className="flex gap-2 text-sm">
          <div className="h-6 w-6 shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-semibold text-gray-600">
            {initials(`${c.author.firstname} ${c.author.lastname}`)}
          </div>
          <div>
            <span className="font-semibold text-gray-900 mr-1.5">
              {c.author.firstname} {c.author.lastname}
            </span>
            <span className="text-gray-600">{c.content}</span>
          </div>
        </div>
      ))}

      <div className="flex items-center gap-2 pt-1">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Write a comment…"
          className="flex-1 rounded-full border border-gray-200 px-3 py-1.5 text-xs focus:outline-none focus:border-[#001F3F]"
        />
        <button
          type="button"
          onClick={submit}
          disabled={!text.trim() || submitting}
          className="rounded-full bg-[#001F3F] px-4 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
