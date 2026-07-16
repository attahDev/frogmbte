// @ts-nocheck
import React, { useEffect, useState } from "react";
import { getDeckHistory, deleteDeck, getDeck } from "../api/pitchDeckApi";

const BADGE_STYLES = {
  done: "bg-[#1A8F5E]/10 text-[#1A8F5E] border-[#1A8F5E]/20",
  pending: "bg-[#F4F6F9] text-[#B7C0CF] border-[#E0E5EC]",
  processing: "bg-[#001F3F]/10 text-[#001F3F] border-[#001F3F]/20",
  failed: "bg-red-50 text-red-600 border-red-200",
};

function statusBadge(status) {
  const map = {
    done: { label: "Ready", cls: BADGE_STYLES.done },
    pending: { label: "Pending", cls: BADGE_STYLES.pending },
    processing: { label: "Processing", cls: BADGE_STYLES.processing },
    failed: { label: "Failed", cls: BADGE_STYLES.failed },
  };
  return map[status] || { label: status, cls: BADGE_STYLES.pending };
}

export default function DeckHistory({ onLoad }) {
  const [decks, setDecks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const VISIBLE_COUNT = 5;

  async function fetchHistory() {
    setLoading(true);
    try {
      const data = await getDeckHistory(0, 100);
      setDecks(data.decks);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  async function handleDelete(deckId, e) {
    e.stopPropagation();
    if (!confirm("Delete this deck? This cannot be undone.")) return;
    setDeleting(deckId);
    try {
      await deleteDeck(deckId);
      setDecks((prev) => prev.filter((d) => d.id !== deckId));
      setTotal((t) => t - 1);
    } catch (err) {
      alert("Delete failed: " + err.message);
    } finally {
      setDeleting(null);
    }
  }

  async function handleLoad(deck) {
    if (deck.status !== "done") return;
    try {
      const full = await getDeck(deck.id);
      onLoad(full);
    } catch (err) {
      alert("Failed to load deck: " + err.message);
    }
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-sm text-[#8A94A6]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#E0E5EC] border-t-[#001F3F]" />
        <span>Loading history...</span>
      </div>
    );
  }

  if (error) {
    return <p className="py-8 text-center text-sm text-red-600">Failed to load history: {error}</p>;
  }

  if (decks.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <div className="mb-1 text-[32px] text-[#B7C0CF]">◈</div>
        <p className="text-sm font-medium text-[#4A5568]">No decks generated yet.</p>
        <span className="text-xs text-[#B7C0CF]">Your generated pitch decks will appear here.</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#001F3F] sm:text-xl">Your Decks</h3>
        <span className="font-mono text-xs text-[#B7C0CF]">{total} total</span>
      </div>
      <div className="flex flex-col gap-2">
        {(expanded ? decks : decks.slice(0, VISIBLE_COUNT)).map((deck) => {
          const badge = statusBadge(deck.status);
          return (
            <div
              key={deck.id}
              className={`flex items-center justify-between gap-3 rounded-2xl border border-[#E0E5EC] bg-white px-4 py-3.5 transition sm:px-5 ${
                deck.status === "done"
                  ? "cursor-pointer hover:border-[#001F3F]/25 hover:bg-[#F4F6F9]"
                  : ""
              }`}
              onClick={() => handleLoad(deck)}
            >
              <div className="flex min-w-0 items-center gap-3.5 overflow-hidden">
                <span
                  className={`shrink-0 rounded border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.07em] ${badge.cls}`}
                >
                  {badge.label}
                </span>
                <div className="min-w-0 overflow-hidden">
                  <span className="block truncate text-sm font-medium text-[#1A2332]">
                    {deck.title}
                  </span>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.04em] text-[#B7C0CF]">
                    {deck.input_type} · {formatDate(deck.created_at)}
                  </span>
                </div>
              </div>
              <button
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#E0E5EC] text-xs text-[#B7C0CF] transition hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                onClick={(e) => handleDelete(deck.id, e)}
                disabled={deleting === deck.id}
                type="button"
                title="Delete deck"
              >
                {deleting === deck.id ? "..." : "✕"}
              </button>
            </div>
          );
        })}
      </div>
      {decks.length > VISIBLE_COUNT && (
        <button
          className="mx-auto mt-4 block rounded-xl border border-[#E0E5EC] bg-white px-5 py-2 text-sm font-semibold text-[#001F3F] transition hover:border-[#001F3F] hover:bg-[#F4F6F9]"
          onClick={() => setExpanded((e) => !e)}
          type="button"
        >
          {expanded ? "Show Less" : `View All (${decks.length})`}
        </button>
      )}
    </div>
  );
}
