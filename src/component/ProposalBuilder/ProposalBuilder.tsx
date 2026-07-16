// @ts-nocheck
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  PAGE_SIZE,
  deleteProposal as apiDelete,
  downloadProposal,
  generateProposal,
  getProposal,
  listProposals,
  updateProposal,
} from "./lib/proposalApi";
import BeeWatermark from "../MarketResearchDashboard/ui/BeeWatermark";

const SECTIONS = [
  { key: "executive_summary", label: "Executive Summary", isHtml: false },
  { key: "project_overview", label: "Project Overview", isHtml: false },
  {
    key: "scope_of_work",
    label: "Project Scope & Deliverables",
    isHtml: false,
    scope: true,
  },
  { key: "qualifications", label: "Our Qualifications", isHtml: false },
  {
    key: "timeline",
    label: "Project Timeline",
    isHtml: false,
    timeline: true,
  },
  {
    key: "pricing",
    label: "Investment & Budget Breakdown",
    isHtml: true,
  },
  {
    key: "terms_and_conditions",
    label: "Terms & Conditions",
    isHtml: false,
  },
  {
    key: "agreement",
    label: "Acceptance & Signature",
    isHtml: false,
    signature: true,
  },
];

const LOADING_STEPS = [
  "Analysing project requirements",
  "Structuring proposal sections",
  "Generating deliverables & timeline",
  "Building budget breakdown",
  "Finalising terms & signature blocks",
];

const INPUT_CLASS =
  "w-full rounded-lg border border-white/10 bg-white/[0.06] px-3.5 py-3 text-[13.5px] text-white outline-none transition placeholder:italic placeholder:text-white/25 focus:border-[#F5BB00]/50";
const LABEL_CLASS =
  "mb-1.5 block font-mono text-[10px] uppercase tracking-[1.5px] text-white/40";
const CARD_CLASS = "rounded-2xl border border-[#E5E7EB] bg-white shadow-sm";

const PRICING_HTML_CLASS =
  "overflow-x-auto text-gray-700 [&_.pricing-intro]:mb-2.5 [&_.pricing-intro]:text-sm [&_.pricing-intro]:leading-relaxed [&_.pricing-note]:mt-2 [&_.pricing-note]:text-xs [&_.pricing-note]:italic [&_.pricing-note]:text-gray-500 [&_h4]:my-3.5 [&_h4]:text-sm [&_h4]:font-bold [&_h4]:text-gray-900 [&_table]:w-full [&_table]:min-w-[420px] [&_table]:border-collapse [&_table]:text-xs [&_th]:bg-[#001F3F] [&_th]:px-2.5 [&_th]:py-2 [&_th]:text-left [&_th]:text-[10px] [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-white/80 [&_td]:border-b [&_td]:border-[#F4F6F9] [&_td]:px-2.5 [&_td]:py-2 [&_tbody_tr:nth-child(even)_td]:bg-gray-50 [&_tfoot_td]:border-t-2 [&_tfoot_td]:border-[#001F3F] [&_tfoot_td]:bg-[#F4F6F9] [&_tfoot_td]:pt-2.5 [&_tfoot_td]:text-sm [&_tfoot_td]:font-bold";

function decodeHtmlEntities(raw) {
  const t = document.createElement("textarea");
  t.innerHTML = raw || "";
  return t.value;
}

function fmtDate(d) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
  return fmtDate(iso);
}

function parseTextParagraphs(raw) {
  if (!raw) return [];
  const paras = raw.split(/\n\n+/).filter((p) => p.trim());
  if (paras.length <= 1) {
    return raw
      .split(/\n/)
      .filter((l) => l.trim())
      .map((l) => l.trim());
  }
  return paras.map((p) => p.trim());
}

function parseScopeItems(raw) {
  const lines = (raw || "").split("\n").filter((l) => l.trim());
  const items = [];
  const dashPattern = /^(.{3,50})\s+[—–-]\s+(.+)$/;
  const colonPattern = /^([A-Z][^:]{2,50}):\s+(.+)$/;

  lines.forEach((line) => {
    const dm = line.match(dashPattern);
    const cm = line.match(colonPattern);
    if (dm) items.push({ label: dm[1].trim(), desc: dm[2].trim() });
    else if (cm) items.push({ label: cm[1].trim(), desc: cm[2].trim() });
  });

  return items.length >= 3 ? items : null;
}

function parseTimelinePhases(raw) {
  const chunks = (raw || "").split(/\n\n+/);
  const weekRe =
    /^(Week[\s\d\-–]+|Phase\s*\d+|Discovery|Development|Testing|Launch|Support|Design|Planning|Delivery|Kickoff|Completion)/i;
  const phases = [];

  chunks.forEach((chunk) => {
    const firstLine = chunk.split("\n")[0].trim();
    if (weekRe.test(firstLine)) {
      const rest = chunk.split("\n").slice(1).join(" ").trim();
      const weekMatch = firstLine.match(/Week\s*([\d\s\-–]+)/i);
      phases.push({
        range: weekMatch ? `Week ${weekMatch[1].trim()}` : "",
        name:
          firstLine
            .replace(/^Week[\s\d\-–:]+/i, "")
            .replace(/^Phase\s*\d+[:\s]*/i, "")
            .trim() || firstLine,
        desc: rest,
      });
    }
  });

  return phases.length >= 2 ? phases : null;
}

function parsePricingHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html || "";

  const intro = tmp.querySelector(".pricing-intro")?.textContent?.trim() || "";
  const note = tmp.querySelector(".pricing-note")?.textContent?.trim() || "";

  function parseTable(table) {
    if (!table) return [];
    return Array.from(table.querySelectorAll("tbody tr")).map((tr) =>
      Array.from(tr.querySelectorAll("td")).map((td) => td.textContent.trim())
    );
  }

  const tables = tmp.querySelectorAll("table");
  const costRows = parseTable(tables[0]);
  const schedRows = parseTable(tables[1]);
  const totalCell = tables[0]?.querySelector("tfoot .total-row td:last-child");
  const total = totalCell?.textContent?.trim() || "";

  return { intro, note, costRows, schedRows, total };
}

function serializePricingEditor(state) {
  const costRowsHtml = state.costRows
    .filter((r) => r.item || r.desc)
    .map(
      (r) =>
        `<tr><td>${r.item}</td><td>${r.desc}</td><td>${r.qty}</td><td>${r.unit}</td><td>${r.sub}</td></tr>`
    )
    .join("");

  const schedRowsHtml = state.schedRows
    .filter((r) => r.payment || r.amount)
    .map(
      (r) =>
        `<tr><td>${r.payment}</td><td>${r.amount}</td><td>${r.due}</td><td>${r.trigger}</td></tr>`
    )
    .join("");

  return (
    `<div class='pricing-section'><p class='pricing-intro'>${state.intro}</p>` +
    `<h4>Cost Breakdown</h4>` +
    `<table class='pricing-table'><thead><tr><th>Item</th><th>Description</th><th>Qty</th><th>Unit Price</th><th>Subtotal</th></tr></thead>` +
    `<tbody>${costRowsHtml}</tbody>` +
    `<tfoot><tr class='total-row'><td colspan='4'>Total Investment</td><td>${state.total}</td></tr></tfoot></table>` +
    `<h4>Payment Schedule</h4>` +
    `<table class='pricing-table'><thead><tr><th>Payment</th><th>Amount</th><th>Due</th><th>Trigger</th></tr></thead>` +
    `<tbody>${schedRowsHtml}</tbody></table>` +
    `<p class='pricing-note'>${state.note}</p></div>`
  );
}

function TextParagraphs({ raw }) {
  return (
    <>
      {parseTextParagraphs(raw).map((p, i) => (
        <p key={i} className="mb-2.5 last:mb-0">
          {p}
        </p>
      ))}
    </>
  );
}

function ScopeView({ raw }) {
  const items = parseScopeItems(raw);
  if (!items) return <TextParagraphs raw={raw} />;
  return (
    <div>
      {items.map((item, i) => (
        <div
          className="flex items-start gap-2.5 border-b border-[#F4F6F9] py-2 last:border-b-0"
          key={i}
        >
          <div className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-sm bg-[#001F3F] text-[10px] text-[#FFD700]">
            ✓
          </div>
          <div>
            <div className="font-semibold text-gray-900">{item.label}</div>
            <div className="text-sm text-gray-500">{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TimelineView({ raw }) {
  const phases = parseTimelinePhases(raw);
  if (!phases) return <TextParagraphs raw={raw} />;
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
      {phases.map((ph, i) => (
        <div className="rounded-lg bg-[#F4F6F9] px-4 py-3.5" key={i}>
          <div className="mb-2 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#001F3F] text-[11px] font-bold text-[#FFD700]">
            {i + 1}
          </div>
          <div className="mb-1 text-xs font-bold text-gray-900">{ph.name}</div>
          {ph.range ? (
            <div className="mb-1.5 text-[10px] text-gray-500">{ph.range}</div>
          ) : null}
          <div className="text-xs leading-relaxed text-gray-500">
            {ph.desc.slice(0, 140)}
            {ph.desc.length > 140 ? "…" : ""}
          </div>
        </div>
      ))}
    </div>
  );
}

function SignatureView({ raw, clientName }) {
  const intro = (raw || "").split("Prepared by:")[0].trim();
  const clientLabel = clientName ? `Client — ${clientName}` : "Client";
  return (
    <div>
      {intro ? <p className="mb-4">{intro}</p> : null}
      <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="mb-3 text-[9px] font-semibold uppercase tracking-widest text-gray-500">
            Service Provider
          </div>
          <div className="mb-2.5 border-b border-gray-200 pb-5 text-xs text-gray-500">
            Name
          </div>
          <div className="mb-2.5 border-b border-gray-200 pb-5 text-xs text-gray-500">
            Title
          </div>
          <div className="mb-2.5 border-b border-gray-200 pb-5 text-xs text-gray-500">
            Signature
          </div>
          <div className="border-b border-gray-200 pb-5 text-xs text-gray-500">
            Date
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="mb-3 text-[9px] font-semibold uppercase tracking-widest text-gray-500">
            {clientLabel}
          </div>
          <div className="mb-2.5 border-b border-gray-200 pb-5 text-xs text-gray-500">
            Name
          </div>
          <div className="mb-2.5 border-b border-gray-200 pb-5 text-xs text-gray-500">
            Title
          </div>
          <div className="mb-2.5 border-b border-gray-200 pb-5 text-xs text-gray-500">
            Organisation
          </div>
          <div className="mb-2.5 border-b border-gray-200 pb-5 text-xs text-gray-500">
            Signature
          </div>
          <div className="border-b border-gray-200 pb-5 text-xs text-gray-500">
            Date
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingEditor({ value, onChange }) {
  const update = (patch) => onChange({ ...value, ...patch });

  const updateCost = (idx, col, v) => {
    const costRows = value.costRows.map((r, i) =>
      i === idx ? { ...r, [col]: v } : r
    );
    update({ costRows });
  };

  const updateSched = (idx, col, v) => {
    const schedRows = value.schedRows.map((r, i) =>
      i === idx ? { ...r, [col]: v } : r
    );
    update({ schedRows });
  };

  const editInputClass =
    "w-full rounded border-none bg-transparent px-2 py-1.5 text-xs text-gray-900 outline-none focus:bg-[#fffde7] focus:outline focus:outline-1 focus:outline-[#FFD700]";

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          Introduction paragraph
        </div>
        <textarea
          className="min-h-[60px] w-full rounded-lg border border-[#FFD700]/35 bg-[#fffdf0] px-3 py-2.5 text-sm leading-relaxed text-gray-900 outline-none focus:border-[#FFD700]"
          rows={3}
          value={value.intro}
          onChange={(e) => update({ intro: e.target.value })}
        />
      </div>

      <div>
        <div className="mb-1.5 mt-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          Cost Breakdown
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr>
                <th className="whitespace-nowrap bg-[#001F3F] px-2.5 py-2 text-left text-[10px] uppercase tracking-wide text-white/80">
                  Item
                </th>
                <th className="whitespace-nowrap bg-[#001F3F] px-2.5 py-2 text-left text-[10px] uppercase tracking-wide text-white/80">
                  Description
                </th>
                <th
                  className="whitespace-nowrap bg-[#001F3F] px-2.5 py-2 text-left text-[10px] uppercase tracking-wide text-white/80"
                  style={{ width: 48 }}
                >
                  Qty
                </th>
                <th
                  className="whitespace-nowrap bg-[#001F3F] px-2.5 py-2 text-left text-[10px] uppercase tracking-wide text-white/80"
                  style={{ width: 110 }}
                >
                  Unit Price
                </th>
                <th
                  className="whitespace-nowrap bg-[#001F3F] px-2.5 py-2 text-left text-[10px] uppercase tracking-wide text-white/80"
                  style={{ width: 110 }}
                >
                  Subtotal
                </th>
                <th className="bg-[#001F3F]" style={{ width: 32 }} />
              </tr>
            </thead>
            <tbody>
              {value.costRows.map((row, idx) => (
                <tr key={idx} className="even:bg-gray-50">
                  <td className="border-b border-[#F4F6F9] px-0.5 py-0.5">
                    <input
                      className={editInputClass}
                      value={row.item}
                      placeholder="e.g. Web Development"
                      onChange={(e) => updateCost(idx, "item", e.target.value)}
                    />
                  </td>
                  <td className="border-b border-[#F4F6F9] px-0.5 py-0.5">
                    <input
                      className={editInputClass}
                      value={row.desc}
                      placeholder="Description"
                      onChange={(e) => updateCost(idx, "desc", e.target.value)}
                    />
                  </td>
                  <td className="border-b border-[#F4F6F9] px-0.5 py-0.5">
                    <input
                      className={`${editInputClass} text-right font-mono`}
                      style={{ width: 44 }}
                      value={row.qty}
                      placeholder="1"
                      onChange={(e) => updateCost(idx, "qty", e.target.value)}
                    />
                  </td>
                  <td className="border-b border-[#F4F6F9] px-0.5 py-0.5">
                    <input
                      className={`${editInputClass} text-right font-mono`}
                      value={row.unit}
                      placeholder="0"
                      onChange={(e) => updateCost(idx, "unit", e.target.value)}
                    />
                  </td>
                  <td className="border-b border-[#F4F6F9] px-0.5 py-0.5">
                    <input
                      className={`${editInputClass} text-right font-mono`}
                      value={row.sub}
                      placeholder="0"
                      onChange={(e) => updateCost(idx, "sub", e.target.value)}
                    />
                  </td>
                  <td className="border-b border-[#F4F6F9] px-0.5 py-0.5">
                    <button
                      type="button"
                      className="rounded px-1.5 py-1 text-sm text-gray-300 transition hover:bg-red-50 hover:text-[#D7263D]"
                      title="Remove row"
                      onClick={() =>
                        update({
                          costRows: value.costRows.filter((_, i) => i !== idx),
                        })
                      }
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={4}
                  className="border-t-2 border-[#001F3F] bg-[#F4F6F9] px-2.5 py-2 font-bold"
                >
                  Total Investment
                </td>
                <td className="border-t-2 border-[#001F3F] bg-[#F4F6F9] px-0.5 py-0.5">
                  <input
                    className={`${editInputClass} text-right font-mono`}
                    value={value.total}
                    placeholder="0"
                    onChange={(e) => update({ total: e.target.value })}
                  />
                </td>
                <td className="border-t-2 border-[#001F3F] bg-[#F4F6F9]" />
              </tr>
            </tfoot>
          </table>
        </div>
        <button
          type="button"
          className="mt-1 flex items-center gap-1.5 rounded-lg border border-dashed border-gray-200 bg-white px-3.5 py-1.5 text-xs text-gray-500 transition hover:border-[#FFD700] hover:bg-[#fffdf0] hover:text-gray-900"
          onClick={() =>
            update({
              costRows: [
                ...value.costRows,
                { item: "", desc: "", qty: "1", unit: "", sub: "" },
              ],
            })
          }
        >
          + Add line item
        </button>
      </div>

      <div>
        <div className="mb-1.5 mt-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          Payment Schedule
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr>
                <th className="whitespace-nowrap bg-[#001F3F] px-2.5 py-2 text-left text-[10px] uppercase tracking-wide text-white/80">
                  Payment
                </th>
                <th className="whitespace-nowrap bg-[#001F3F] px-2.5 py-2 text-left text-[10px] uppercase tracking-wide text-white/80">
                  Amount
                </th>
                <th className="whitespace-nowrap bg-[#001F3F] px-2.5 py-2 text-left text-[10px] uppercase tracking-wide text-white/80">
                  Due
                </th>
                <th className="whitespace-nowrap bg-[#001F3F] px-2.5 py-2 text-left text-[10px] uppercase tracking-wide text-white/80">
                  Trigger
                </th>
                <th className="bg-[#001F3F]" style={{ width: 32 }} />
              </tr>
            </thead>
            <tbody>
              {value.schedRows.map((row, idx) => (
                <tr key={idx} className="even:bg-gray-50">
                  <td className="border-b border-[#F4F6F9] px-0.5 py-0.5">
                    <input
                      className={editInputClass}
                      value={row.payment}
                      placeholder="e.g. Deposit"
                      onChange={(e) =>
                        updateSched(idx, "payment", e.target.value)
                      }
                    />
                  </td>
                  <td className="border-b border-[#F4F6F9] px-0.5 py-0.5">
                    <input
                      className={`${editInputClass} text-right font-mono`}
                      value={row.amount}
                      placeholder="0"
                      onChange={(e) =>
                        updateSched(idx, "amount", e.target.value)
                      }
                    />
                  </td>
                  <td className="border-b border-[#F4F6F9] px-0.5 py-0.5">
                    <input
                      className={editInputClass}
                      value={row.due}
                      placeholder="e.g. Upon signing"
                      onChange={(e) => updateSched(idx, "due", e.target.value)}
                    />
                  </td>
                  <td className="border-b border-[#F4F6F9] px-0.5 py-0.5">
                    <input
                      className={editInputClass}
                      value={row.trigger}
                      placeholder="e.g. Project kickoff"
                      onChange={(e) =>
                        updateSched(idx, "trigger", e.target.value)
                      }
                    />
                  </td>
                  <td className="border-b border-[#F4F6F9] px-0.5 py-0.5">
                    <button
                      type="button"
                      className="rounded px-1.5 py-1 text-sm text-gray-300 transition hover:bg-red-50 hover:text-[#D7263D]"
                      title="Remove row"
                      onClick={() =>
                        update({
                          schedRows: value.schedRows.filter(
                            (_, i) => i !== idx
                          ),
                        })
                      }
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="mt-1 flex items-center gap-1.5 rounded-lg border border-dashed border-gray-200 bg-white px-3.5 py-1.5 text-xs text-gray-500 transition hover:border-[#FFD700] hover:bg-[#fffdf0] hover:text-gray-900"
          onClick={() =>
            update({
              schedRows: [
                ...value.schedRows,
                { payment: "", amount: "", due: "", trigger: "" },
              ],
            })
          }
        >
          + Add payment
        </button>
      </div>

      <div>
        <div className="mb-1.5 mt-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          Pricing note
        </div>
        <textarea
          className="w-full rounded-lg border border-[#FFD700]/35 bg-[#fffdf0] px-3 py-2 text-xs italic text-gray-500 outline-none focus:border-[#FFD700]"
          rows={2}
          value={value.note}
          onChange={(e) => update({ note: e.target.value })}
        />
      </div>
    </div>
  );
}

function SectionContent({ sec, raw, clientName, editing, editValue, onEdit }) {
  if (editing) {
    if (sec.isHtml) {
      return <PricingEditor value={editValue} onChange={onEdit} />;
    }
    return (
      <textarea
        className="min-h-[120px] w-full rounded-lg border border-[#FFD700]/35 bg-[#fffdf0] px-3 py-2.5 text-sm leading-relaxed text-gray-900 outline-none focus:border-[#FFD700]"
        rows={6}
        value={editValue ?? ""}
        onChange={(e) => onEdit(e.target.value)}
      />
    );
  }

  if (sec.isHtml) {
    return (
      <div
        className={PRICING_HTML_CLASS}
        dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(raw) }}
      />
    );
  }
  if (sec.signature) {
    return <SignatureView raw={raw} clientName={clientName} />;
  }
  if (sec.timeline) return <TimelineView raw={raw} />;
  if (sec.scope) return <ScopeView raw={raw} />;
  return <TextParagraphs raw={raw} />;
}

export default function ProposalBuilder() {
  const [prompt, setPrompt] = useState("");
  const [clientName, setClientName] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");
  const [generating, setGenerating] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const [proposal, setProposal] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editSections, setEditSections] = useState({});
  const [editPricing, setEditPricing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const [downloadFmt, setDownloadFmt] = useState(null);
  const [history, setHistory] = useState({
    proposals: [],
    total: 0,
    page: 1,
    limit: PAGE_SIZE,
  });
  const [historyError, setHistoryError] = useState(false);
  const [metaDates, setMetaDates] = useState({ date: "", valid: "" });

  const stepTimer = useRef(null);
  const resultRef = useRef(null);
  const rootRef = useRef(null);

  const loadHistory = useCallback(async (page = 1) => {
    try {
      setHistoryError(false);
      const data = await listProposals(page, PAGE_SIZE);
      setHistory(data);
    } catch {
      setHistoryError(true);
      setHistory((h) => ({ ...h, proposals: [], page }));
    }
  }, []);

  useEffect(() => {
    loadHistory(1);
    return () => {
      if (stepTimer.current) clearInterval(stepTimer.current);
    };
  }, [loadHistory]);

  const startStepAnimation = () => {
    setActiveStep(0);
    if (stepTimer.current) clearInterval(stepTimer.current);
    let current = 0;
    stepTimer.current = setInterval(() => {
      if (current < LOADING_STEPS.length - 1) {
        current += 1;
        setActiveStep(current);
      }
    }, 4500);
  };

  const stopStepAnimation = (success) => {
    if (stepTimer.current) {
      clearInterval(stepTimer.current);
      stepTimer.current = null;
    }
    if (success) {
      setActiveStep(LOADING_STEPS.length);
      setTimeout(() => setShowLoading(false), 600);
    } else {
      setShowLoading(false);
    }
  };

  const applyProposal = (data) => {
    setProposal(data);
    setEditing(false);
    setEditError("");
    const now = new Date();
    const valid = new Date(now);
    valid.setDate(valid.getDate() + 30);
    setMetaDates({ date: fmtDate(now), valid: fmtDate(valid) });
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleGenerate = async () => {
    if (prompt.trim().length < 10) {
      setError("Please describe your project (at least 10 characters).");
      return;
    }
    setError("");
    setGenerating(true);
    setShowLoading(true);
    setProposal(null);
    startStepAnimation();

    try {
      const data = await generateProposal({
        prompt: prompt.trim(),
        client_name: clientName.trim(),
        estimated_budget: budget.trim(),
      });
      stopStepAnimation(true);
      applyProposal(data);
      loadHistory(1);
    } catch (e) {
      stopStepAnimation(false);
      setError(e.message || "Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const handleView = async (id) => {
    try {
      setError("");
      const data = await getProposal(id);
      applyProposal(data);
    } catch (e) {
      setError(e.message || "Could not load proposal.");
    }
  };

  const handleDownload = async (id, format) => {
    setDownloadFmt(format);
    try {
      setError("");
      await downloadProposal(id, format);
    } catch (e) {
      setError(e.message || "Download failed");
    } finally {
      setDownloadFmt(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this proposal permanently?")) return;
    try {
      await apiDelete(id);
      if (proposal?.id === id) {
        setProposal(null);
        setEditing(false);
      }
      loadHistory(history.page || 1);
    } catch (e) {
      setError(e.message || "Delete failed");
    }
  };

  const enterEditMode = () => {
    if (!proposal) return;
    const content = proposal.content || {};
    const sections = {};
    SECTIONS.forEach((sec) => {
      if (!sec.isHtml) sections[sec.key] = content[sec.key] || "";
    });
    setEditSections(sections);

    const pricingRaw = decodeHtmlEntities(content.pricing || "");
    const parsed = parsePricingHtml(pricingRaw);
    setEditPricing({
      intro: parsed.intro,
      note: parsed.note,
      total: parsed.total,
      costRows: (parsed.costRows.length
        ? parsed.costRows
        : [["", "", "1", "", ""]]
      ).map((cells) => ({
        item: cells[0] || "",
        desc: cells[1] || "",
        qty: cells[2] || "1",
        unit: cells[3] || "",
        sub: cells[4] || "",
      })),
      schedRows: (parsed.schedRows.length
        ? parsed.schedRows
        : [["", "", "", ""]]
      ).map((cells) => ({
        payment: cells[0] || "",
        amount: cells[1] || "",
        due: cells[2] || "",
        trigger: cells[3] || "",
      })),
    });

    setEditTitle(proposal.title || "");
    setEditError("");
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditError("");
  };

  const saveEdit = async () => {
    if (!proposal?.id) return;
    setSaving(true);
    setEditError("");

    const contentUpdate = { ...editSections };
    if (editPricing) {
      contentUpdate.pricing = serializePricingEditor(editPricing);
    }

    try {
      const data = await updateProposal(proposal.id, {
        title: editTitle.trim(),
        content: contentUpdate,
      });
      setEditing(false);
      applyProposal(data);
      loadHistory(history.page || 1);
    } catch (e) {
      setEditError(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const newProposal = () => {
    setPrompt("");
    setClientName("");
    setBudget("");
    setError("");
    setProposal(null);
    setEditing(false);
    setShowLoading(false);
    rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const totalPages = Math.ceil((history.total || 0) / (history.limit || PAGE_SIZE));
  const showEmpty = !showLoading && !proposal;

  return (
    <div className="min-h-full bg-[#F4F6F9] text-sm leading-relaxed text-[#111827]" ref={rootRef}>
      <div className="mx-auto max-w-[1100px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Dark hero panel — matches Figma Proposal Builder */}
        <div className="relative mb-6 overflow-hidden rounded-2xl bg-[#001F3F] px-5 py-7 shadow-[0_8px_32px_rgba(0,31,63,0.18)] sm:px-8 sm:py-9">
          <div className="pointer-events-none absolute -bottom-16 -right-10 z-0 sm:-bottom-12 sm:-right-6">
            <BeeWatermark className="h-[240px] w-auto sm:h-[320px] lg:h-[400px]" />
          </div>

          <div className="relative z-10">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FFD700] px-3 py-1 text-[11px] font-semibold text-[#001F3F]">
                <span aria-hidden>✨</span>
                AI-Powered Instant Generation
              </div>
              <button
                type="button"
                className="rounded-lg bg-[#D7263D] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#b01e32]"
                onClick={newProposal}
              >
                + New Proposal
              </button>
            </div>

            <h1 className="mb-2 text-[26px] font-bold tracking-tight text-white sm:text-[32px]">
              Proposal Builder
            </h1>
            <p className="mb-7 max-w-xl text-[13px] text-white/55 sm:text-sm">
              Generate professional, client-ready proposals in seconds. Describe
              your project and let AI write the full document.
            </p>

            <div className="mb-3.5">
              <label className={LABEL_CLASS}>
                Describe your project or service
              </label>
              <textarea
                className={`${INPUT_CLASS} min-h-[110px] resize-y`}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. A web and mobile app development project for a fintech startup in Lagos. The project includes building a user management dashboard with React and Node.js. Budget is around $15,000..."
              />
            </div>

            <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div>
                <label className={LABEL_CLASS}>Client / Company Name</label>
                <input
                  type="text"
                  className={INPUT_CLASS}
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. FinVest Technologies"
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>Estimated Budget</label>
                <input
                  type="text"
                  className={INPUT_CLASS}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. $15,000"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-[#FFD700] px-6 py-3 text-sm font-bold text-[#001F3F] transition hover:bg-[#e0bd00] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handleGenerate}
                disabled={generating}
              >
                {generating ? (
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#001F3F]/30 border-t-[#001F3F]" />
                ) : null}
                <span>{generating ? "Generating…" : "Generate Proposal"}</span>
                {!generating ? <span aria-hidden>→</span> : null}
              </button>
            </div>

            {error ? (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
                {error}
              </div>
            ) : null}
          </div>
        </div>

        {showLoading ? (
          <>
            <div className={`${CARD_CLASS} mb-4 flex items-start gap-7 p-7`}>
              <div className="mt-1 h-14 w-14 shrink-0 animate-spin rounded-full border-4 border-[#FFD700]/15 border-t-[#FFD700]" />
              <div>
                <h3 className="mb-3.5 text-[15px] font-semibold text-gray-900">
                  Building your proposal...
                </h3>
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {LOADING_STEPS.map((label, i) => {
                    const isDone =
                      activeStep > i || activeStep >= LOADING_STEPS.length;
                    const isActive = activeStep === i;
                    return (
                      <li
                        key={i}
                        className={`flex items-center gap-2.5 text-sm ${
                          isDone || isActive
                            ? "font-medium text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 shrink-0 rounded-full ${
                            isDone
                              ? "bg-green-500"
                              : isActive
                                ? "animate-pulse bg-[#FFD700]"
                                : "bg-gray-300"
                          }`}
                        />
                        {label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className={`${CARD_CLASS} mb-5 p-7`}>
              <div className="mb-4 h-4 w-[45%] animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]" />
              <div className="mb-2.5 h-2.5 w-[90%] animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]" />
              <div className="mb-2.5 h-2.5 w-[80%] animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]" />
              <div className="mb-2.5 h-2.5 w-[85%] animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]" />
              <div className="mb-5 h-2.5 w-[60%] animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]" />
              <div className="mb-2.5 h-2.5 w-[75%] animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]" />
              <div className="mb-2.5 h-2.5 w-[88%] animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]" />
              <div className="h-2.5 w-[70%] animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]" />
            </div>
          </>
        ) : null}

        {showEmpty ? (
          <div className={`${CARD_CLASS} mb-5 px-8 py-14 text-center`}>
            <div className="mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full border-[3px] border-[#FFD700] text-[28px]">
              📋
            </div>
            <h3 className="mb-2 text-[17px] font-semibold text-gray-900">
              Your proposals will appear here
            </h3>
            <p className="mx-auto max-w-sm text-sm text-gray-500">
              Fill in the project details above and click &quot;Generate
              Proposal&quot; — your full professional document will be ready in
              seconds.
            </p>
          </div>
        ) : null}

        {proposal && !showLoading ? (
          <div ref={resultRef}>
            <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
              Generated Proposal
            </div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-gray-900">
                Proposal for {proposal.client_name || "Client"}
              </h2>
              <div className="flex items-center gap-2">
                {!editing ? (
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-medium text-gray-900 transition hover:bg-[#F4F6F9] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={enterEditMode}
                  >
                    ✎ Edit
                  </button>
                ) : null}
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-medium text-gray-900 transition hover:bg-[#F4F6F9] disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={editing || !!downloadFmt}
                  onClick={() => handleDownload(proposal.id, "docx")}
                >
                  {downloadFmt === "docx" ? (
                    <span className="h-2.5 w-2.5 animate-spin rounded-full border-[1.5px] border-gray-300 border-t-gray-900" />
                  ) : (
                    <span>📄</span>
                  )}
                  Word
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-lg border border-[#001F3F] bg-[#001F3F] px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-[#0C1829] disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={editing || !!downloadFmt}
                  onClick={() => handleDownload(proposal.id, "pdf")}
                >
                  {downloadFmt === "pdf" ? (
                    <span className="h-2.5 w-2.5 animate-spin rounded-full border-[1.5px] border-white/30 border-t-white" />
                  ) : (
                    <span>⬇</span>
                  )}
                  PDF
                </button>
              </div>
            </div>

            <div className={`${CARD_CLASS} mb-7 overflow-hidden`}>
              <div className="bg-[#001F3F] px-6 py-7 sm:px-8">
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#FFD700]">
                  ⭐ Professional Proposal
                </div>
                {editing ? (
                  <input
                    type="text"
                    className="w-full rounded-md border border-[#FFD700]/50 bg-white/10 px-2.5 py-1 text-[22px] font-bold text-[#FFD700] outline-none"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                ) : (
                  <div className="text-[22px] font-bold leading-snug text-[#FFD700]">
                    {proposal.title}
                  </div>
                )}
                <div className="mb-5 mt-1 text-xs text-white/45">
                  {proposal.user_name
                    ? `Prepared by ${proposal.user_name} · Business Toolkit AI`
                    : "Prepared by Business Toolkit AI"}
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 sm:grid-cols-4">
                  <div>
                    <div className="mb-1 text-[9px] font-semibold uppercase tracking-widest text-white/35">
                      Prepared For
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {proposal.client_name || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-[9px] font-semibold uppercase tracking-widest text-white/35">
                      Total Value
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {proposal.total_value || proposal.estimated_budget || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-[9px] font-semibold uppercase tracking-widest text-white/35">
                      Date
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {metaDates.date}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-[9px] font-semibold uppercase tracking-widest text-white/35">
                      Valid Until
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {metaDates.valid}
                    </div>
                  </div>
                </div>
              </div>

              {editing ? (
                <div className="flex flex-wrap items-center gap-2 border-b border-[#FFD700]/15 bg-[#FFD700]/5 px-6 py-3 sm:px-8">
                  <span className="flex-1 text-[10px] font-semibold uppercase tracking-wide text-[#DCA800]">
                    ✎ EDITING MODE — changes will be saved
                  </span>
                  {editError ? (
                    <span className="mr-2 text-xs text-red-600">
                      ⚠ {editError}
                    </span>
                  ) : null}
                  <button
                    type="button"
                    className="rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-xs transition hover:bg-[#F4F6F9] disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={cancelEdit}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg bg-[#001F3F] px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-[#0C1829] disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={saveEdit}
                    disabled={saving}
                  >
                    {saving ? (
                      <span className="h-2.5 w-2.5 animate-spin rounded-full border-[1.5px] border-white/30 border-t-white" />
                    ) : null}
                    Save &amp; Close
                  </button>
                </div>
              ) : null}

              <div className="py-2">
                {SECTIONS.map((sec, idx) => {
                  const raw = proposal.content?.[sec.key] || "";
                  return (
                    <div
                      className="border-b border-[#F4F6F9] px-6 py-6 last:border-b-0 sm:px-8"
                      key={sec.key}
                    >
                      <div className="mb-3.5 flex items-center gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#001F3F] text-[11px] font-bold text-[#FFD700]">
                          {idx + 1}
                        </div>
                        <div className="text-[15px] font-bold text-gray-900">
                          {sec.label}
                        </div>
                      </div>
                      <div className="pl-10 text-[13.5px] leading-[1.78] text-gray-700">
                        <SectionContent
                          sec={sec}
                          raw={raw}
                          clientName={proposal.client_name}
                          editing={editing}
                          editValue={
                            sec.isHtml
                              ? editPricing
                              : editSections[sec.key]
                          }
                          onEdit={
                            sec.isHtml
                              ? setEditPricing
                              : (v) =>
                                  setEditSections((s) => ({
                                    ...s,
                                    [sec.key]: v,
                                  }))
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between bg-[#F4F6F9] px-6 py-3 text-[10px] tracking-wide text-gray-500 sm:px-8">
                <span>
                  Generated by <strong className="text-gray-900">GMBTE Proposal Builder</strong>
                </span>
                <span>Confidential · Page 1 of 1</span>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">Past Proposals</h3>
            <button
              type="button"
              className="border-none bg-transparent p-0 text-sm font-medium text-[#001F3F] hover:underline"
              onClick={() => loadHistory(1)}
            >
              View All
            </button>
          </div>
          <div className={`${CARD_CLASS} overflow-x-auto`}>
            <table className="w-full min-w-[480px] border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-gray-200 px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                    Proposal Title
                  </th>
                  <th className="border-b border-gray-200 px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                    Value
                  </th>
                  <th className="border-b border-gray-200 px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {historyError ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-10 text-center text-sm text-gray-500"
                    >
                      Could not load proposals.
                    </td>
                  </tr>
                ) : !history.proposals?.length ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-10 text-center text-sm text-gray-500"
                    >
                      No proposals yet. Generate your first one above.
                    </td>
                  </tr>
                ) : (
                  history.proposals.map((p) => (
                    <tr
                      key={p.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="border-b border-[#F4F6F9] px-4 py-3.5 align-middle">
                        <div className="mb-0.5 text-[13.5px] font-semibold text-gray-900">
                          {p.title}
                        </div>
                        <div className="text-[11.5px] text-gray-500">
                          Generated {timeAgo(p.created_at)}
                        </div>
                      </td>
                      <td className="border-b border-[#F4F6F9] px-4 py-3.5 align-middle">
                        <span className="text-sm font-bold text-gray-900">
                          {p.total_value || "—"}
                        </span>
                      </td>
                      <td className="border-b border-[#F4F6F9] px-4 py-3.5 align-middle">
                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                          <button
                            type="button"
                            className="rounded-md border border-gray-200 bg-white px-3 py-1 text-[11.5px] font-medium text-gray-900 transition hover:bg-[#F4F6F9]"
                            onClick={() => handleView(p.id)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="rounded-md border border-gray-200 bg-white px-3 py-1 text-[11.5px] font-medium text-gray-900 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                            onClick={() => handleDownload(p.id, "docx")}
                          >
                            Word
                          </button>
                          <button
                            type="button"
                            className="rounded-md border border-red-200 bg-red-50 px-3 py-1 text-[11.5px] font-medium text-[#D7263D] transition hover:bg-red-100"
                            onClick={() => handleDownload(p.id, "pdf")}
                          >
                            PDF
                          </button>
                          <button
                            type="button"
                            className="rounded-md border border-gray-200 bg-white px-2 py-1 text-[11.5px] text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-[#D7263D]"
                            title="Delete"
                            onClick={() => handleDelete(p.id)}
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 ? (
            <div className="mt-3.5 flex justify-center gap-1.5">
              <button
                type="button"
                className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs transition hover:border-[#001F3F] hover:bg-[#001F3F] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                disabled={history.page <= 1}
                onClick={() => loadHistory(history.page - 1)}
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  type="button"
                  key={n}
                  className={`rounded-md border px-3 py-1.5 text-xs transition ${
                    n === history.page
                      ? "border-[#001F3F] bg-[#001F3F] text-white"
                      : "border-gray-200 bg-white hover:border-[#001F3F] hover:bg-[#001F3F] hover:text-white"
                  }`}
                  onClick={() => loadHistory(n)}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs transition hover:border-[#001F3F] hover:bg-[#001F3F] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                disabled={history.page >= totalPages}
                onClick={() => loadHistory(history.page + 1)}
              >
                Next →
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
