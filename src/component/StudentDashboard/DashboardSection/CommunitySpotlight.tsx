import { Heart, MessageCircle, Share2, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApiGet } from '../hooks/useApiGet';
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
                <div key={story.id} className="border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {/* Image */}
                    {story.imageUrl && (
                      <div className="flex-shrink-0">
                        <img
                          src={story.imageUrl}
                          alt={story.title}
                          className="w-full sm:w-28 md:w-32 h-48 sm:h-28 md:h-32 rounded-xl object-cover"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-1 sm:gap-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{story.title}</h3>
                        <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap sm:ml-4">{timeAgo(story.createdAt)}</span>
                      </div>

                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">{story.description}</p>

                      {/* Author and Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 ${story.avatarColor ?? 'bg-red-600'} rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm`}>
                            {initials(story.authorName)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-xs sm:text-sm">{story.authorName}</p>
                            <p className="text-gray-600 text-[10px] sm:text-xs">{story.authorRole}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 sm:gap-6">
                          <span className="flex items-center gap-1.5 sm:gap-2 text-gray-600">
                            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm font-medium">{story.likes}</span>
                          </span>
                          <span className="flex items-center gap-1.5 sm:gap-2 text-gray-600">
                            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm font-medium">{story.comments}</span>
                          </span>
                          <button className="text-gray-600 hover:text-gray-900 transition" aria-label="Share">
                            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
