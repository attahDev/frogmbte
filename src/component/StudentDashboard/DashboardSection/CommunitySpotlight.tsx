import { useEffect, useState } from 'react';
import { Heart, MessageCircle, Share2, ArrowRight, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApiGet } from '../hooks/useApiGet';
import { api } from '../../../lib/api';
import CardSkeleton from '../shared/CardSkeleton';

interface SpotlightStory {
  id: string;
  title: string;
  description: string;
  authorName: string;
  authorRole: string;
  avatarColor: string | null;
  imageUrl: string | null;
  likes: number;
  comments: number;
  createdAt: string;
  hasLiked: boolean;
}

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diffMs / 3600000);
  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

export default function CommunitySpotlight() {
  const { data: stories, loading } = useApiGet<SpotlightStory[]>('/community/spotlight', []);
  const list = stories ?? [];

  // The list itself only refetches on mount/route change — liking shouldn't
  // require a full refetch, so track per-story overrides locally and fall
  // back to whatever the API returned.
  const [overrides, setOverrides] = useState<Record<string, { likes: number; hasLiked: boolean }>>({});
  const [pending, setPending] = useState<Record<string, boolean>>({});

  const toggleLike = async (story: SpotlightStory) => {
    if (pending[story.id]) return;
    const current = overrides[story.id] ?? { likes: story.likes, hasLiked: story.hasLiked };
    const next = current.hasLiked
      ? { likes: Math.max(0, current.likes - 1), hasLiked: false }
      : { likes: current.likes + 1, hasLiked: true };

    setPending((p) => ({ ...p, [story.id]: true }));
    setOverrides((o) => ({ ...o, [story.id]: next })); // optimistic

    try {
      const { data } = current.hasLiked
        ? await api.delete(`/community/spotlight/${story.id}/like`)
        : await api.post(`/community/spotlight/${story.id}/like`);
      const result = data?.data ?? data;
      if (result && typeof result.likes === 'number') {
        setOverrides((o) => ({ ...o, [story.id]: { likes: result.likes, hasLiked: result.hasLiked } }));
      }
    } catch {
      setOverrides((o) => ({ ...o, [story.id]: current })); // revert on failure
    } finally {
      setPending((p) => ({ ...p, [story.id]: false }));
    }
  };

  return (
    <div className="w-full bg-[#FFFDF7] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="bg-[#FFFDF7] rounded-2xl sm:rounded-3xl shadow-sm p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" fill="currentColor" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Community Spotlight</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600">Celebrating our community's achievements and milestones</p>
          </div>

          {/* Stories */}
          {loading ? (
            <div className="space-y-4 sm:space-y-6">
              {[0, 1].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : list.length === 0 ? (
            <p className="text-sm text-gray-600 py-8 text-center">
              No spotlight stories yet — check back soon for community wins and milestones.
            </p>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {list.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  likes={overrides[story.id]?.likes ?? story.likes}
                  hasLiked={overrides[story.id]?.hasLiked ?? story.hasLiked}
                  pending={!!pending[story.id]}
                  onToggleLike={() => toggleLike(story)}
                />
              ))}
            </div>
          )}

          {/* View All Button */}
          <div className="mt-6 sm:mt-8 text-center">
            <Link
              to="/dashboard/community"
              className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-700 font-semibold text-sm sm:text-base transition"
            >
              View All Stories
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryCard({
  story,
  likes,
  hasLiked,
  pending,
  onToggleLike,
}: {
  story: SpotlightStory;
  likes: number;
  hasLiked: boolean;
  pending: boolean;
  onToggleLike: () => void;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="rounded-xl sm:rounded-2xl bg-white border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-4 sm:p-6 pb-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 ${story.avatarColor ?? 'bg-red-600'} rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm`}>
              {initials(story.authorName)}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{story.authorName}</p>
              <p className="text-gray-500 text-[10px] sm:text-xs truncate">{story.authorRole}</p>
            </div>
          </div>
          <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap shrink-0">{timeAgo(story.createdAt)}</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-3">{story.title}</h3>
        <p className="text-gray-600 text-xs sm:text-sm mt-1 leading-relaxed">{story.description}</p>
      </div>

      {story.imageUrl && (
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="mt-4 block w-full group"
          aria-label="View full-size photo"
        >
          <img
            src={story.imageUrl}
            alt={story.title}
            loading="lazy"
            className="w-full h-64 sm:h-80 object-cover group-hover:brightness-95 transition"
          />
        </button>
      )}

      <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-3 sm:py-4">
        <button
          type="button"
          onClick={onToggleLike}
          disabled={pending}
          className={`flex items-center gap-1.5 sm:gap-2 transition disabled:opacity-60 ${
            hasLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
          }`}
          aria-label={hasLiked ? 'Unlike' : 'Like'}
        >
          <Heart className="w-4 h-4 sm:w-5 sm:h-5" fill={hasLiked ? 'currentColor' : 'none'} />
          <span className="text-xs sm:text-sm font-medium">{likes}</span>
        </button>
        <span className="flex items-center gap-1.5 sm:gap-2 text-gray-600">
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm font-medium">{story.comments}</span>
        </span>
        <button className="text-gray-600 hover:text-gray-900 transition ml-auto" aria-label="Share">
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {lightboxOpen && story.imageUrl && (
        <Lightbox src={story.imageUrl} alt={story.title} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
}

/** Full-screen click-to-view for a story photo — uncropped (object-contain),
 *  since the card thumbnail above is deliberately cropped to a fixed height
 *  for a consistent grid. Closes on backdrop click or Escape. */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full rounded-lg object-contain"
      />
    </div>
  );
}
