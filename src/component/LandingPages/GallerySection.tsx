import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const GALLERY_IMAGES = [
  "Ann.jpg",
  "Gallery_Image (3).jpeg",
  "Gallery_Image (5).jpeg",
] as const;

type GalleryImageMeta = {
  portrait?: boolean;
  objectPosition?: string;
};

const GALLERY_IMAGE_META: Record<(typeof GALLERY_IMAGES)[number], GalleryImageMeta> = {
  "Ann.jpg": { portrait: true, objectPosition: "center top" },
  "Gallery_Image (3).jpeg": {},
  "Gallery_Image (5).jpeg": {},
};

const gallerySrc = (filename: string) =>
  `/gallery/${encodeURIComponent(filename)}`;

const getImageMeta = (src: string): GalleryImageMeta => {
  const filename = decodeURIComponent(src.split("/").pop() ?? "");
  return GALLERY_IMAGE_META[filename as (typeof GALLERY_IMAGES)[number]] ?? {};
};

function GalleryImage({
  src,
  alt,
  className = "",
  hoverScale = false,
}: {
  src: string;
  alt: string;
  className?: string;
  hoverScale?: boolean;
}) {
  const { portrait, objectPosition = "center" } = getImageMeta(src);

  if (portrait) {
    return (
      <div className={`absolute inset-0 bg-[#001F3F] ${className}`}>
        <img
          src={src}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-md"
          style={{ objectPosition }}
        />
        <img
          src={src}
          alt={alt}
          className={`relative h-full w-full object-contain ${
            hoverScale ? "transition-transform duration-500 group-hover:scale-[1.02]" : ""
          }`}
          style={{ objectPosition }}
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`absolute inset-0 h-full w-full object-cover ${
        hoverScale ? "transition-transform duration-500 group-hover:scale-105" : ""
      } ${className}`}
      style={{ objectPosition }}
    />
  );
}

interface GalleryMoment {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
}

interface StoryVideo {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  youtubeId: string;
}

const galleryMoments: GalleryMoment[] = [
  {
    id: "heritage-dining",
    badge: "Heritage Event",
    title: "Heritage Dining at The Portico Library",
    description:
      "An edible history of Manchester, hosted by our CEO with Mayor Andy Burnham in support of the Portico Reunited restoration project.",
    image: gallerySrc("Ann.jpg"),
  },
  {
    id: "portico-visit",
    badge: "Community Impact",
    title: "Portico Library: Reclaiming History",
    description:
      "Proceeds from our heritage events go toward reclaiming all three floors of this historic building for the first time in over a century.",
    image: gallerySrc(GALLERY_IMAGES[1]),
  },
  {
    id: "black-history-month",
    badge: "Black History Month",
    title: "Portico Ubuntu: Be Part of the Offer",
    description:
      "Celebrating Black history and culture through community storytelling, book launches, and shared heritage experiences.",
    image: gallerySrc(GALLERY_IMAGES[1]),
  },
];

const storyVideos: StoryVideo[] = [
  {
    id: "heritage-dining-video",
    title: "Edible history of Manchester",
    subtitle: "Heritage dining with Andy Burnham",
    duration: "1:32",
    youtubeId: "n0FxG3LWjGw",
  },
  {
    id: "book-launch",
    title: "Portico Ubuntu — Black History Month",
    subtitle: "Book Launch",
    duration: "0:29",
    youtubeId: "3GX9KUPwlGw",
  },
];

interface LinkedInStory {
  id: string;
  title: string;
  description: string;
  url: string;
}

// NOTE: LinkedIn blocks automated scraping of individual post captions, so
// these titles/descriptions are inferred from the post URL slugs, not
// copied verbatim from the posts. Swap in the real caption text if you have
// it — this is meant to get the links live now, not to put words in
// The Portico Library's mouth.
const linkedInStories: LinkedInStory[] = [
  {
    id: "reunited-project",
    title: "Reunited Project: Heritage & Library",
    description:
      "The Portico Library shares an update on the Reunited Project restoring the historic building's heritage.",
    url: "https://www.linkedin.com/posts/the-portico-library_reunitedproject-heritage-library-activity-7463634932930760705-l8mw",
  },
  {
    id: "why-join-portico",
    title: "Why Join The Portico?",
    description:
      "The Portico Library on what makes membership worthwhile — from the historic collection to community events.",
    url: "https://www.linkedin.com/posts/the-portico-library_why-join-the-portico-portico-members-activity-7472181527729127424-JXOD",
  },
  {
    id: "portico-milestone",
    title: "Celebrating a Portico Milestone",
    description:
      "The Portico Library marks a milestone anniversary since a key moment in the library's recent history.",
    url: "https://www.linkedin.com/posts/the-portico-library_we-cant-believe-its-already-been-more-than-activity-7475176201196756992-b8iH",
  },
];

function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#001F3F]/90 p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-[#FFD700] text-[#001F3F] rounded-full p-2 hover:scale-105 transition shadow-lg z-10"
        aria-label="Close preview"
      >
        <X size={22} />
      </button>
      <motion.img
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        src={src}
        alt={alt}
        className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
}

export default function ImpactGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(
    storyVideos[0].youtubeId
  );
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null
  );

  const currentMoment = galleryMoments[activeIndex] ?? galleryMoments[0];
  const totalSlides = galleryMoments.length;
  const activeVideo =
    storyVideos.find((v) => v.youtubeId === activeVideoId) ?? storyVideos[0];

  const handlePrev = () =>
    setActiveIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));

  const handleNext = () =>
    setActiveIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightbox({ src, alt });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  if (!currentMoment) return null;

  return (
    <>
      <section className="bg-[#FFFDF7] py-12 sm:py-16 md:py-20 mb-16 sm:mb-20 md:mb-24">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
       
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm sm:text-base font-medium text-[#001F3F] bg-[#F5F5F5] inline-block px-3 py-1 rounded-full mb-4">
              Impact Gallery
            </p>
            <h2 className="font-montserrat text-2xl sm:text-[32px] md:text-[35px] font-bold text-[#001F3F] leading-tight">
              Seeing Our Impact in Action
            </h2>
            <p className="font-montserrat text-base sm:text-lg md:text-2xl text-[#6B7280] mt-2 px-2">
              From heritage dining at The Portico Library to community celebrations
              — explore the moments shaping Greater Manchester&apos;s Black tech
              ecosystem.
            </p>
          </div>


          <div className="mt-10 sm:mt-14 relative">
            <div className="relative flex items-center justify-center min-h-[280px] sm:min-h-[380px] md:min-h-[440px]">
              {galleryMoments.length > 1 && (
                <>
                  <div className="absolute w-[88%] sm:w-[78%] md:w-[72%] h-[240px] sm:h-[340px] md:h-[400px] rounded-2xl overflow-hidden opacity-40 scale-90 -translate-x-6 sm:-translate-x-10 shadow-lg pointer-events-none bg-[#001F3F]">
                    <GalleryImage
                      src={
                        galleryMoments[
                          (activeIndex - 1 + totalSlides) % totalSlides
                        ].image
                      }
                      alt=""
                    />
                  </div>
                  <div className="absolute w-[88%] sm:w-[78%] md:w-[72%] h-[240px] sm:h-[340px] md:h-[400px] rounded-2xl overflow-hidden opacity-40 scale-90 translate-x-6 sm:translate-x-10 shadow-lg pointer-events-none bg-[#001F3F]">
                    <GalleryImage
                      src={
                        galleryMoments[(activeIndex + 1) % totalSlides].image
                      }
                      alt=""
                    />
                  </div>
                </>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45 }}
                  className="relative z-10 w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl h-[280px] sm:h-[380px] md:h-[420px] group"
                >
                  <button
                    type="button"
                    onClick={() =>
                      openLightbox(currentMoment.image, currentMoment.title)
                    }
                    className="absolute inset-0 w-full h-full cursor-zoom-in"
                    aria-label={`View full image: ${currentMoment.title}`}
                  >
                    <GalleryImage
                      src={currentMoment.image}
                      alt={currentMoment.title}
                      hoverScale
                    />
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/95 via-[#001F3F]/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10 text-left text-white pointer-events-none">
                    <span className="inline-block bg-[#D7263D] text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-md mb-3">
                      {currentMoment.badge}
                    </span>
                    <h3 className="font-montserrat text-xl sm:text-2xl md:text-3xl font-bold leading-snug max-w-2xl">
                      {currentMoment.title}
                    </h3>
                    <p className="font-montserrat text-sm sm:text-base text-white/85 mt-2 max-w-xl line-clamp-2 sm:line-clamp-none">
                      {currentMoment.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous moment"
                className="bg-[#001F3F]/95 text-white rounded-full p-2.5 sm:p-3 hover:scale-105 transition shadow-md"
              >
                <ArrowLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                <div className="hidden sm:block w-16 h-0.5 bg-[#FFD700] rounded-full" />
                {galleryMoments.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setActiveIndex(i)}
                    className={`rounded-full transition-all ${
                      i === activeIndex
                        ? "w-6 h-2 bg-[#D7263D]"
                        : "w-2 h-2 bg-[#001F3F]/30"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next moment"
                className="bg-[#001F3F]/95 text-white rounded-full p-2.5 sm:p-3 hover:scale-105 transition shadow-md"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

        
          <div className="mt-16 sm:mt-20 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
           
              <div>
                <div className="flex gap-5 sm:gap-4">
                  <div className="w-1 shrink-0 bg-[#FFD700] rounded-full" />
                  <div>
                    <h4 className="font-montserrat text-xl sm:text-2xl font-bold text-[#001F3F] mb-3">
                      A Legacy of Empowerment
                    </h4>
                    <p className="font-montserrat text-lg sm:text-base text-[#6B7280] leading-relaxed">
                      An edible history of Manchester, hosted with Mayor Andy Burnham
                      at The Portico Library, in support of the Portico Reunited
                      restoration project. Proceeds go toward reclaiming all three
                      floors of this historic building for the first time in over a
                      century.
                    </p>
                    <p className="font-montserrat text-sm sm:text-base text-[#6B7280] leading-relaxed mt-3">
                      Our Chief Heritage Officer role advises on curating the history
                      and culture of our membership — preserving physical archives,
                      historical collections, and digital assets that belong to our
                      members and partners.
                    </p>
                  </div>
                </div>

                <div className="mt-12 grid grid-cols-4 gap-2 sm:gap-3">
                  {GALLERY_IMAGES.map((filename) => (
                    <button
                      key={filename}
                      type="button"
                      onClick={() =>
                        openLightbox(
                          gallerySrc(filename),
                          "Portico Library gallery"
                        )
                      }
                      className="group relative aspect-square rounded-xl overflow-hidden shadow-sm ring-2 ring-transparent hover:ring-[#FFD700] transition focus:outline-none focus:ring-[#D7263D] cursor-zoom-in bg-[#001F3F]"
                      aria-label="View full image"
                    >
                      <GalleryImage
                        src={gallerySrc(filename)}
                        alt="Portico Library gallery"
                        hoverScale
                      />
                    </button>
                  ))}
                </div>
              </div>

              
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-[#001F3F]/5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-montserrat text-lg sm:text-xl font-bold text-[#001F3F]">
                    Story Highlights
                  </h4>
                  <span className="font-montserrat text-xs sm:text-sm text-[#6B7280] uppercase tracking-wide">
                    {storyVideos.length} Videos
                  </span>
                </div>

                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#001F3F] mb-4 shadow-md">
                  <iframe
                    key={activeVideo.youtubeId}
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?rel=0&modestbranding=1`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
                <p className="font-montserrat text-sm font-semibold text-[#001F3F] mb-1">
                  {activeVideo.title}
                </p>
                <p className="font-montserrat text-xs sm:text-sm text-[#6B7280] mb-4">
                  {activeVideo.subtitle} · {activeVideo.duration}
                </p>

                <ul className="space-y-2 sm:space-y-3">
                  {storyVideos.map((video) => {
                    const isActive = video.youtubeId === activeVideoId;
                    return (
                      <li key={video.id}>
                        <button
                          type="button"
                          onClick={() => setActiveVideoId(video.youtubeId)}
                          className={`flex w-full items-center gap-3 sm:gap-4 p-3 rounded-xl border transition text-left ${
                            isActive
                              ? "bg-[#FFFDF7] border-[#D7263D]/50 shadow-sm"
                              : "bg-[#F5F5F5] border-transparent hover:border-[#001F3F]/10 hover:bg-white"
                          }`}
                        >
                          <div className="relative shrink-0 w-16 sm:w-20 aspect-video rounded-lg overflow-hidden bg-[#001F3F]">
                            <img
                              src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-[#001F3F]/30 flex items-center justify-center">
                              <div
                                className={`rounded-full p-1.5 ${
                                  isActive ? "bg-[#D7263D]" : "bg-[#FFD700]"
                                }`}
                              >
                                <Play
                                  size={12}
                                  className={`ml-0.5 fill-current ${
                                    isActive ? "text-white fill-white" : "text-[#001F3F] fill-[#001F3F]"
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`font-montserrat text-sm font-semibold line-clamp-2 ${
                                isActive ? "text-[#D7263D]" : "text-[#001F3F]"
                              }`}
                            >
                              {video.title}
                            </p>
                            <p className="font-montserrat text-xs text-[#6B7280] mt-0.5 line-clamp-1">
                              {video.subtitle}
                            </p>
                          </div>
                          <span className="shrink-0 font-montserrat text-xs text-[#6B7280]">
                            {video.duration}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Featured on LinkedIn — external stories from The Portico Library */}
            <div className="mt-10">
              <h4 className="font-montserrat text-lg sm:text-xl font-bold text-[#001F3F] mb-4">
                Featured on LinkedIn
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {linkedInStories.map((story) => (
                  <a
                    key={story.id}
                    href={story.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-white rounded-2xl p-5 shadow-sm border border-[#001F3F]/10 hover:border-[#FFD700] hover:shadow-md transition"
                  >
                    <p className="font-montserrat text-sm font-bold text-[#001F3F] group-hover:text-[#D7263D] transition">
                      {story.title}
                    </p>
                    <p className="font-montserrat text-xs text-[#6B7280] mt-2 leading-relaxed">
                      {story.description}
                    </p>
                    <span className="inline-block mt-3 text-xs font-semibold text-[#001F3F]/60 group-hover:text-[#FFD700] transition">
                      View on LinkedIn →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <ImageLightbox
            src={lightbox.src}
            alt={lightbox.alt}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
}
