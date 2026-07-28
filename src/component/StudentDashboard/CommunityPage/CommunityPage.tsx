import CommunitySpotlight from "../DashboardSection/CommunitySpotlight";

/** Dedicated /dashboard/community page. Previously this route just held the
 *  Mentor hub as a placeholder ("My Mentors" pointed here) — now it's a real
 *  Community page built on the existing spotlight feed, and Mentors has its
 *  own /dashboard/mentors route. */
export default function CommunityPage() {
  return (
    <div className="min-w-0 overflow-x-hidden bg-[#FFFDF7] pb-20 lg:pb-8 px-4 sm:px-6 lg:px-8 pt-6">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001F3F] mb-2 sm:mb-4">
        Community
      </h1>
      <p className="text-sm text-gray-500 mb-6 max-w-2xl">
        Stories, wins, and updates shared by the GMBTE community.
      </p>
      <CommunitySpotlight />
    </div>
  );
}
