// @ts-nocheck
import React, { useState } from "react";
import { Download } from "lucide-react";
import { downloadDeck } from "../api/pitchDeckApi";

const SLIDE_ACCENT_COLORS = [
  "#001F3F", "#FFD700", "#D7263D", "#0A3361",
  "#E0BD00", "#001F3F", "#D7263D", "#0A3361", "#FFD700", "#001F3F",
];

function SlideCard({ slide, index, isActive, onClick }) {
  const accent = SLIDE_ACCENT_COLORS[index] || "#001F3F";
  return (
    <button
      className={`relative flex w-full items-center gap-2.5 overflow-hidden rounded-lg border px-2.5 py-2.5 text-left transition ${
        isActive
          ? "border-[#001F3F]/20 bg-[#001F3F]/5"
          : "border-transparent hover:bg-[#F4F6F9]"
      }`}
      onClick={onClick}
      type="button"
    >
      <span
        className={`absolute bottom-0 left-0 top-0 w-0.5 rounded-full transition-opacity ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: accent }}
      />
      <span className="min-w-[14px] font-mono text-[10px] text-[#B7C0CF]">{slide.slide_number}</span>
      <span
        className={`truncate text-xs ${
          isActive ? "font-medium text-[#001F3F]" : "text-[#8A94A6]"
        }`}
      >
        {slide.title}
      </span>
    </button>
  );
}

function SlideDetail({ slide, index }) {
  const accent = SLIDE_ACCENT_COLORS[index] || "#001F3F";
  const isCover = slide.slide_number === 1;

  return (
    <div className={`relative flex-1 pl-4 ${isCover ? "" : ""}`}>
      <div
        className="absolute bottom-1 left-0 top-1 w-0.5 rounded-full"
        style={{ background: accent }}
      />
      <div className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.1em]" style={{ color: accent }}>
        {slide.title.toUpperCase()}
      </div>
      <h2 className="mb-2.5 text-2xl font-bold leading-tight text-[#001F3F] sm:text-[26px]">
        {slide.heading}
      </h2>
      {slide.subheading && (
        <p className="mb-6 text-[15px] font-light" style={{ color: accent }}>
          {slide.subheading}
        </p>
      )}
      {slide.bullets && slide.bullets.length > 0 && (
        <ul className="mt-1 flex list-none flex-col gap-3">
          {slide.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-[#33414F]">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: accent }}
              />
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function SlidePreview({ deck }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [dlError, setDlError] = useState(null);

  const slidesData = deck.slides_json;
  const slides = slidesData?.slides || [];
  const companyName = slidesData?.company_name || deck.title;
  const tagline = slidesData?.tagline || "";

  async function handleDownload() {
    setDownloading(true);
    setDlError(null);
    try {
      await downloadDeck(deck.id, deck.title);
    } catch (err) {
      setDlError("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E0E5EC] bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-[#E0E5EC] p-6 sm:flex-row sm:items-start sm:justify-between sm:px-7">
        <div>
          <h2 className="text-xl font-extrabold text-[#001F3F] sm:text-[22px]">{companyName}</h2>
          {tagline && <p className="mt-1 text-sm text-[#D7263D]">{tagline}</p>}
          <span className="mt-1.5 block font-mono text-[11px] text-[#B7C0CF]">
            {slides.length} slides
          </span>
        </div>
        <button
          className="flex shrink-0 items-center gap-2 rounded-xl border border-[#1A8F5E]/30 bg-[#1A8F5E]/10 px-5 py-2.5 text-sm font-semibold text-[#1A8F5E] transition hover:border-[#1A8F5E] hover:bg-[#1A8F5E]/15 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={handleDownload}
          disabled={downloading}
          type="button"
        >
          {downloading ? (
            <>
              <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#1A8F5E]/20 border-t-[#1A8F5E]" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download PPTX
            </>
          )}
        </button>
      </div>

      {dlError && <p className="px-7 py-2 text-xs text-red-600">{dlError}</p>}

      <div className="grid min-h-[480px] grid-cols-1 md:grid-cols-[200px_1fr]">
        <div className="hidden flex-col gap-1 overflow-y-auto border-r border-[#E0E5EC] bg-[#F4F6F9] p-2 md:flex">
          {slides.map((slide, i) => (
            <SlideCard
              key={i}
              slide={slide}
              index={i}
              isActive={i === activeIndex}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>

        <div className="relative flex flex-col px-6 py-8 sm:px-10 sm:py-9">
          {slides[activeIndex] && (
            <SlideDetail slide={slides[activeIndex]} index={activeIndex} />
          )}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#E0E5EC] pt-4">
            <button
              className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-[#E0E5EC] text-sm text-[#8A94A6] transition hover:border-[#001F3F]/30 hover:text-[#001F3F] disabled:cursor-not-allowed disabled:opacity-30"
              onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
              disabled={activeIndex === 0}
              type="button"
            >
              ←
            </button>
            <span className="font-mono text-xs text-[#B7C0CF]">
              {activeIndex + 1} / {slides.length}
            </span>
            <button
              className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-[#E0E5EC] text-sm text-[#8A94A6] transition hover:border-[#001F3F]/30 hover:text-[#001F3F] disabled:cursor-not-allowed disabled:opacity-30"
              onClick={() => setActiveIndex((i) => Math.min(slides.length - 1, i + 1))}
              disabled={activeIndex === slides.length - 1}
              type="button"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
