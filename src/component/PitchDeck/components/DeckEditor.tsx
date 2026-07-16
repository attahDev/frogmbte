// @ts-nocheck
import React, { useState, useRef } from "react";
import { Download } from "lucide-react";
import { uploadImage, exportDeck } from "../api/pitchDeckApi";
import ThemePicker from "./ThemePicker";

const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.07em] text-[#8A94A6]";
const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#1A2332] outline-none transition focus:border-[#001F3F] focus:ring-4 focus:ring-[#001F3F]/10";

function BulletEditor({ bullets, onChange }) {
  function update(i, val) {
    const next = [...bullets];
    next[i] = val;
    onChange(next);
  }
  function remove(i) {
    onChange(bullets.filter((_, idx) => idx !== i));
  }
  function add() {
    onChange([...bullets, ""]);
  }
  function move(i, dir) {
    const next = [...bullets];
    const swap = i + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[i], next[swap]] = [next[swap], next[i]];
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-1.5">
      {bullets.map((b, i) => (
        <div key={i} className="flex items-start gap-1.5">
          <div className="flex flex-col gap-1 pt-1.5">
            <button
              type="button"
              className="flex h-[26px] w-[26px] items-center justify-center rounded border border-[#E0E5EC] text-[11px] text-[#B7C0CF] transition hover:border-[#001F3F]/30 hover:text-[#001F3F] disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => move(i, -1)}
              disabled={i === 0}
            >
              ↑
            </button>
            <button
              type="button"
              className="flex h-[26px] w-[26px] items-center justify-center rounded border border-[#E0E5EC] text-[11px] text-[#B7C0CF] transition hover:border-[#001F3F]/30 hover:text-[#001F3F] disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => move(i, 1)}
              disabled={i === bullets.length - 1}
            >
              ↓
            </button>
          </div>
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#001F3F]" />
          <textarea
            className="min-h-[40px] flex-1 resize-y rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-[13px] leading-relaxed text-[#1A2332] outline-none focus:border-[#001F3F] focus:ring-2 focus:ring-[#001F3F]/10"
            value={b}
            rows={2}
            onChange={(e) => update(i, e.target.value)}
          />
          <button
            type="button"
            className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-[#E0E5EC] text-[10px] text-[#B7C0CF] transition hover:border-red-300 hover:text-red-600"
            onClick={() => remove(i)}
            title="Remove bullet"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        className="py-1.5 text-left font-mono text-xs text-[#001F3F] transition hover:opacity-70"
        onClick={add}
      >
        + Add bullet
      </button>
    </div>
  );
}

function ImageSlot({ slideNum, image, onImageChange }) {
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const result = await uploadImage(file);
      onImageChange({ url: result.path, alt: file.name });
    } catch (err) {
      setError("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className={labelClass + " mb-0"}>Image</span>
        {image && (
          <button
            type="button"
            className="font-mono text-[11px] text-red-600"
            onClick={() => onImageChange(null)}
          >
            Remove
          </button>
        )}
      </div>
      {image ? (
        <div className="flex items-center justify-between rounded-lg border border-[#001F3F]/20 bg-[#001F3F]/5 px-3 py-2">
          <div className="truncate font-mono text-xs text-[#8A94A6]">
            📎 {image.alt || image.url.split("/").pop()}
          </div>
          <button
            type="button"
            className="shrink-0 font-mono text-xs text-[#001F3F]"
            onClick={() => fileRef.current?.click()}
          >
            Replace
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="rounded-lg border border-dashed border-[#001F3F]/30 px-3.5 py-2 text-left font-mono text-[13px] text-[#001F3F] transition hover:border-[#001F3F] hover:bg-[#001F3F]/5 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "+ Add Image"}
        </button>
      )}
      {error && <p className="text-[11px] text-red-600">{error}</p>}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

function SlideEditorCard({ slide, index, isActive, onClick, onChange }) {
  const ACCENT_COLORS = [
    "#001F3F","#FFD700","#D7263D","#0A3361",
    "#E0BD00","#001F3F","#D7263D","#0A3361","#FFD700","#001F3F","#D7263D","#0A3361",
  ];
  const accent = ACCENT_COLORS[index] || "#001F3F";

  return (
    <div
      className={`flex-1 cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
        isActive ? "border-[#001F3F]/40" : "border-[#E0E5EC] hover:border-[#001F3F]/25"
      }`}
      onClick={onClick}
    >
      <div
        className="flex items-center justify-between border-l-[3px] px-4 py-3"
        style={{ borderLeftColor: accent }}
      >
        <div className="flex items-center gap-2.5">
          <span className="min-w-[18px] font-mono text-[11px] text-[#B7C0CF]">
            {slide.slide_number}
          </span>
          <input
            className="w-[180px] border-b border-transparent bg-transparent px-1 py-0.5 text-[13px] font-medium text-[#1A2332] outline-none focus:border-[#FFD700]/55"
            value={slide.title}
            onChange={(e) => onChange({ ...slide, title: e.target.value })}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        {slide.image && <span className="text-sm opacity-70">🖼</span>}
      </div>

      {isActive && (
        <div
          className="flex flex-col gap-4 border-t border-[#E0E5EC] p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Heading</label>
            <input
              className={inputClass}
              value={slide.heading}
              onChange={(e) => onChange({ ...slide, heading: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Subheading</label>
            <input
              className={inputClass}
              value={slide.subheading}
              onChange={(e) => onChange({ ...slide, subheading: e.target.value })}
            />
          </div>
          {slide.bullets && slide.bullets.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Bullets</label>
              <BulletEditor
                bullets={slide.bullets}
                onChange={(b) => onChange({ ...slide, bullets: b })}
              />
            </div>
          )}
          <ImageSlot
            slideNum={slide.slide_number}
            image={slide.image || null}
            onImageChange={(img) => onChange({ ...slide, image: img })}
          />
        </div>
      )}
    </div>
  );
}

export default function DeckEditor({ deck, themes, onBack }) {
  const base = deck.slides_json || {};
  const [companyName, setCompanyName] = useState(base.company_name || deck.title);
  const [tagline, setTagline] = useState(base.tagline || "");
  const [theme, setTheme] = useState(deck.theme || "gmbte");
  const [slides, setSlides] = useState(
    (base.slides || []).map((s) => ({ ...s, image: null }))
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState(null);

  function updateSlide(index, updated) {
    setSlides((prev) => prev.map((s, i) => (i === index ? updated : s)));
  }

  function moveSlide(index, dir) {
    const swap = index + dir;
    if (swap < 0 || swap >= slides.length) return;
    const next = [...slides];
    [next[index], next[swap]] = [next[swap], next[index]];
    setSlides(next);
    setActiveIndex(swap);
  }

  async function handleExport() {
    setExporting(true);
    setExportError(null);
    try {
      await exportDeck({
        deck_id: deck.id,
        theme,
        company_name: companyName,
        tagline,
        slides: slides.map((s) => ({
          slide_number: s.slide_number,
          title: s.title,
          heading: s.heading,
          subheading: s.subheading,
          bullets: s.bullets,
          image: s.image || undefined,
        })),
      });
    } catch (err) {
      setExportError(err.message);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#E0E5EC] bg-white px-4 py-2 text-sm font-semibold text-[#4A5568] transition hover:border-[#001F3F]/30 hover:text-[#001F3F]"
          type="button"
          onClick={onBack}
        >
          ← New Deck
        </button>
        <div className="flex items-center gap-3">
          {exportError && <span className="text-xs text-red-600">{exportError}</span>}
          <button
            className="flex items-center gap-2 rounded-xl bg-[#001F3F] px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
            onClick={handleExport}
            disabled={exporting}
          >
            {exporting ? (
              <>
                <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Export PPTX
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mb-5 flex flex-col gap-5 rounded-2xl border border-[#E0E5EC] bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Company Name</label>
            <input
              className={inputClass}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Tagline</label>
            <input
              className={inputClass}
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
          </div>
        </div>
        <ThemePicker selected={theme} onChange={setTheme} themes={themes} />
      </div>

      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.07em] text-[#8A94A6]">
          Slides — {slides.length} total
        </span>
        <span className="font-mono text-[11px] text-[#B7C0CF]">
          Click a slide to edit · Use arrows to reorder
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {slides.map((slide, i) => (
          <div key={slide.slide_number} className="flex items-start gap-2">
            <div className="hidden shrink-0 flex-col gap-1 pt-2.5 sm:flex">
              <button
                type="button"
                className="flex h-[26px] w-[26px] items-center justify-center rounded border border-[#E0E5EC] text-[11px] text-[#B7C0CF] transition hover:border-[#001F3F]/30 hover:text-[#001F3F] disabled:cursor-not-allowed disabled:opacity-20"
                onClick={() => moveSlide(i, -1)}
                disabled={i === 0}
              >
                ↑
              </button>
              <button
                type="button"
                className="flex h-[26px] w-[26px] items-center justify-center rounded border border-[#E0E5EC] text-[11px] text-[#B7C0CF] transition hover:border-[#001F3F]/30 hover:text-[#001F3F] disabled:cursor-not-allowed disabled:opacity-20"
                onClick={() => moveSlide(i, 1)}
                disabled={i === slides.length - 1}
              >
                ↓
              </button>
            </div>
            <SlideEditorCard
              slide={slide}
              index={i}
              isActive={activeIndex === i}
              onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
              onChange={(updated) => updateSlide(i, updated)}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#E0E5EC] pt-6">
        {exportError && <span className="text-xs text-red-600">{exportError}</span>}
        <button
          className="flex items-center gap-2 rounded-xl bg-[#001F3F] px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          onClick={handleExport}
          disabled={exporting}
        >
          {exporting ? (
            <>
              <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Export PPTX
            </>
          )}
        </button>
      </div>
    </div>
  );
}
