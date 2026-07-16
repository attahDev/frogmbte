// @ts-nocheck
import React, { useState, useEffect } from "react";
import QuickForm from "./components/QuickForm";
import StructuredForm from "./components/StructuredForm";
import RawForm from "./components/RawForm";
import GeneratingState from "./components/GeneratingState";
import SlidePreview from "./components/SlidePreview";
import DeckEditor from "./components/DeckEditor";
import DeckHistory from "./components/DeckHistory";
import ThemePicker from "./components/ThemePicker";
import { generateDeck, getDeck, getThemes } from "./api/pitchDeckApi";
import { usePolling } from "./hooks/usePolling";
import BeeWatermark from "../MarketResearchDashboard/ui/BeeWatermark";

const VIEWS = { INPUT: "input", GENERATING: "generating", EDITOR: "editor", PREVIEW: "preview" };

const MODES = [
  { id: "quick", label: "Quick Idea" },
  { id: "structured", label: "Structured" },
  { id: "raw", label: "Raw Notes" },
];

function validateInput(mode, values) {
  if (!values.title?.trim()) return "Deck title is required.";
  if (mode === "quick" && !values.idea?.trim()) return "Please enter your business idea.";
  if (mode === "structured") {
    const required = ["problem", "solution", "market", "business_model", "team", "ask"];
    for (const f of required)
      if (!values[f]?.trim()) return `"${f.replace("_", " ")}" is required.`;
  }
  if (mode === "raw" && !values.notes?.trim()) return "Please paste your notes.";
  return null;
}

export default function PitchDeckGenerator() {
  const [mode, setMode] = useState("quick");
  const [formValues, setFormValues] = useState({});
  const [selectedTheme, setSelectedTheme] = useState("gmbte");
  const [themes, setThemes] = useState([]);
  const [view, setView] = useState(VIEWS.INPUT);
  const [jobId, setJobId] = useState(null);
  const [deck, setDeck] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { status: jobStatus, deckId: jobDeckId, error: pollError } = usePolling(jobId);

  useEffect(() => {
    getThemes()
      .then((d) => setThemes(d.themes))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (jobStatus === "done" && jobDeckId) {
      getDeck(jobDeckId)
        .then((d) => {
          setDeck(d);
          setView(VIEWS.EDITOR);
        })
        .catch((err) => {
          setSubmitError("Failed to fetch generated deck: " + err.message);
          setView(VIEWS.INPUT);
        });
    }
    if (jobStatus === "failed") {
      setView(VIEWS.GENERATING);
    }
  }, [jobStatus, jobDeckId]);

  async function handleGenerate() {
    const validationError = validateInput(mode, formValues);
    if (validationError) {
      setSubmitError(validationError);
      return;
    }
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await generateDeck(mode, formValues, selectedTheme);
      setJobId(res.job_id);
      setView(VIEWS.GENERATING);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setView(VIEWS.INPUT);
    setJobId(null);
    setDeck(null);
    setFormValues({});
    setSubmitError(null);
  }

  function handleLoadFromHistory(loadedDeck) {
    setDeck(loadedDeck);
    setView(VIEWS.PREVIEW);
  }

  const FormComponent = { quick: QuickForm, structured: StructuredForm, raw: RawForm }[mode];
  const showGeneratorChrome = view === VIEWS.INPUT;

  return (
    <div className="relative min-h-full overflow-x-hidden bg-[#F4F6F9] text-sm leading-relaxed text-[#33414F]">
      <main className="relative z-[1] mx-auto max-w-[1100px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {view === VIEWS.INPUT && (
          <section className="relative overflow-hidden rounded-2xl bg-[#001F3F] px-5 py-7 shadow-[0_8px_32px_rgba(0,31,63,0.18)] sm:px-8 sm:py-9">
            <div className="pointer-events-none absolute -bottom-16 -right-10 z-0 sm:-bottom-10 sm:-right-6">
              <BeeWatermark className="h-[220px] w-auto sm:h-[300px] lg:h-[380px]" />
            </div>

            <div className="relative z-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#FFD700]">
                AI Pitch Deck Generator
              </p>
              <h1 className="mb-2 text-[26px] font-extrabold leading-tight text-white sm:text-[32px]">
                Build your <span className="text-[#FFD700]">Pitch deck</span>
              </h1>
              <p className="mb-7 max-w-xl text-sm text-white/60">
                Describe your startup and let AI craft a compelling investor-ready deck.
              </p>

              <div className="mb-6 inline-flex gap-1 rounded-[9px] border border-white/10 bg-white/[0.06] p-1">
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={`rounded-md px-4 py-1.5 text-xs font-semibold transition ${
                      mode === m.id
                        ? "bg-[#FFD700] text-[#001F3F]"
                        : "text-white/60 hover:text-white"
                    }`}
                    onClick={() => {
                      setMode(m.id);
                      setFormValues({});
                      setSubmitError(null);
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <FormComponent values={formValues} onChange={setFormValues} />

              <div className="mt-6">
                <ThemePicker
                  selected={selectedTheme}
                  onChange={setSelectedTheme}
                  themes={themes}
                  variant="dark"
                />
              </div>

              {submitError && (
                <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 text-sm text-white">
                  <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#D7263D] text-[11px] font-bold">
                    !
                  </span>
                  {submitError}
                </div>
              )}

              <div className="mt-7 flex justify-end">
                <button
                  className="group flex items-center gap-2 rounded-xl bg-[#FFD700] px-6 py-3 text-sm font-bold text-[#001F3F] transition hover:bg-[#e0bd00] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={handleGenerate}
                  disabled={submitting}
                  type="button"
                >
                  {submitting ? (
                    <>
                      <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#001F3F]/25 border-t-[#001F3F]" />
                      Starting...
                    </>
                  ) : (
                    <>
                      Generate Deck{" "}
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>
        )}

        {view === VIEWS.GENERATING && (
          <div className="flex flex-col items-center py-12">
            <GeneratingState status={jobStatus} error={pollError} />
            {(jobStatus === "failed" || pollError) && (
              <button
                className="mt-6 inline-flex items-center gap-1.5 rounded-xl border border-[#001F3F]/15 bg-white px-4 py-2 text-sm font-semibold text-[#001F3F] transition hover:border-[#001F3F]/30"
                onClick={handleReset}
                type="button"
              >
                ← Try Again
              </button>
            )}
          </div>
        )}

        {view === VIEWS.EDITOR && deck && (
          <DeckEditor deck={deck} themes={themes} onBack={handleReset} />
        )}

        {view === VIEWS.PREVIEW && deck && (
          <div>
            <button
              className="mb-6 inline-flex items-center gap-1.5 rounded-xl border border-[#001F3F]/15 bg-white px-4 py-2 text-sm font-semibold text-[#001F3F] transition hover:border-[#001F3F]/30"
              onClick={handleReset}
              type="button"
            >
              ← New Deck
            </button>
            <SlidePreview deck={deck} />
          </div>
        )}

        {showGeneratorChrome && (
          <section className="mt-14 border-t border-[rgba(0,31,63,0.1)] pt-8">
            <DeckHistory onLoad={handleLoadFromHistory} />
          </section>
        )}
      </main>
    </div>
  );
}
