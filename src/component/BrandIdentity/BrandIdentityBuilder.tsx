"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef, useState } from "react";
import {
  BadgeCheck,
  Building,
  ClipboardList,
  Download,
  Edit3,
  FileText,
  IdCard,
  Mail,
  Palette,
  Receipt,
  RefreshCw,
  Sparkles,
  Trophy,
  Wand2,
} from "lucide-react";
import AIDashboardCard from "../MarketResearchDashboard/ui/AIDashboardCard";
import { brandIdentityApi as api } from "./api/brandIdentityApi";

type ToolKey =
  | "business-card"
  | "logo"
  | "letterhead"
  | "email-sig"
  | "invoice"
  | "quotation"
  | "company-profile"
  | "capability"
  | "brand-guidelines";

type FieldConfig = {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "textarea" | "select";
  options?: string[];
  optional?: boolean;
  full?: boolean;
};

type ToolConfig = {
  key: ToolKey;
  title: string;
  desc: string;
  subtitle: string;
  icon: React.ElementType;
  fields: FieldConfig[];
  colors: boolean;
};

const presetColors = [
  "#001F3F",
  "#FFD700",
  "#FFB84D",
  "#D7263D",
  "#FFFFFF",
  "#000000",
  "#2563EB",
  "#16A34A",
];

const tools: ToolConfig[] = [
  {
    key: "business-card",
    title: "Business Card",
    desc: "Professional card design",
    subtitle: "Front & back card design with your brand",
    icon: IdCard,
    colors: true,
    fields: [
      { id: "name", label: "Full Name", placeholder: "e.g. Johnson Kate" },
      { id: "role", label: "Job Title / Role", placeholder: "e.g. CEO" },
      { id: "company", label: "Company Name", placeholder: "e.g. GM Black Tech Expo" },
      { id: "email", label: "Email Address", placeholder: "e.g. kate@company.com" },
      { id: "phone", label: "Phone", placeholder: "e.g. +234 800 000 0000" },
      { id: "website", label: "Website", placeholder: "e.g. www.company.com", optional: true },
      { id: "registrationNumber", label: "Company Registration Number", placeholder: "e.g. RC-123456", optional: true },
    ],
  },
  {
    key: "logo",
    title: "Logo",
    desc: "Brand logo concept",
    subtitle: "Wordmark and icon concept from your brand info",
    icon: BadgeCheck,
    colors: true,
    fields: [
      { id: "company", label: "Brand / Company Name", placeholder: "e.g. GM Black Tech Expo" },
      { id: "tagline", label: "Tagline", placeholder: "e.g. Connecting Africa's Tech Future", optional: true },
      { id: "industry", label: "Industry", placeholder: "e.g. Technology" },
      {
        id: "style",
        label: "Logo Style",
        type: "select",
        options: ["Wordmark", "Lettermark", "Emblem", "Combination Mark"],
      },
      {
        id: "logoType",
        label: "Logo Type",
        type: "select",
        options: ["image_based", "typographic"],
      },
      { id: "feel", label: "Brand Feel", placeholder: "Bold, Minimal, Trustworthy", full: true, optional: true },
    ],
  },
  {
    key: "letterhead",
    title: "Letterhead",
    desc: "Official documents",
    subtitle: "Official document header for correspondence",
    icon: FileText,
    colors: true,
    fields: [
      { id: "company", label: "Company Name" },
      { id: "address", label: "Company Address", placeholder: "12 Tech Street, Lagos" },
      { id: "email", label: "Email" },
      { id: "phone", label: "Phone" },
      { id: "website", label: "Website", optional: true },
      { id: "tagline", label: "Tagline", optional: true },
      { id: "registrationNumber", label: "Company Registration Number", placeholder: "e.g. RC-123456", optional: true },
    ],
  },
  {
    key: "email-sig",
    title: "Email Signature",
    desc: "Branded sign-off",
    subtitle: "Branded sign-off block for your emails",
    icon: Mail,
    colors: true,
    fields: [
      { id: "name", label: "Full Name" },
      { id: "role", label: "Job Title" },
      { id: "company", label: "Company" },
      { id: "email", label: "Email" },
      { id: "phone", label: "Phone" },
      { id: "social", label: "LinkedIn / Social", optional: true },
      { id: "registrationNumber", label: "Company Registration Number", placeholder: "e.g. RC-123456", optional: true },
    ],
  },
  {
    key: "invoice",
    title: "Invoice Template",
    desc: "Payment documents",
    subtitle: "Branded payment request document",
    icon: Receipt,
    colors: true,
    fields: [
      { id: "company", label: "Company Name" },
      { id: "address", label: "Company Address" },
      { id: "email", label: "Email" },
      { id: "phone", label: "Phone" },
      {
        id: "currency",
        label: "Currency",
        type: "select",
        options: ["NGN ₦", "USD $", "GBP £", "EUR €", "ZAR R"],
      },
      { id: "website", label: "Website", optional: true },
      { id: "registrationNumber", label: "Company Registration Number", placeholder: "e.g. RC-123456", optional: true },
      { id: "note", label: "Default Footer Note", type: "textarea", full: true, optional: true },
    ],
  },
  {
    key: "quotation",
    title: "Quotation",
    desc: "Pricing proposals",
    subtitle: "Pricing proposal document for clients",
    icon: ClipboardList,
    colors: true,
    fields: [
      { id: "company", label: "Company Name" },
      { id: "address", label: "Address" },
      { id: "email", label: "Email" },
      { id: "phone", label: "Phone", optional: true },
      { id: "website", label: "Website", optional: true },
      { id: "validity", label: "Quote Valid For", placeholder: "e.g. 30 days" },
      { id: "registrationNumber", label: "Company Registration Number", placeholder: "e.g. RC-123456", optional: true },
      { id: "terms", label: "Payment Terms", type: "textarea", full: true, optional: true },
    ],
  },
  {
    key: "company-profile",
    title: "Company Profile",
    desc: "About your business",
    subtitle: "Who you are, what you do, why it matters",
    icon: Building,
    colors: true,
    fields: [
      { id: "company", label: "Company Name" },
      { id: "industry", label: "Industry", placeholder: "Technology, Healthcare" },
      { id: "description", label: "What does your company do?", type: "textarea", full: true },
      { id: "services", label: "Key Services / Products", type: "textarea", full: true },
      { id: "location", label: "Location" },
      { id: "mission", label: "Mission Statement", type: "textarea", full: true, optional: true },
      { id: "tagline", label: "Tagline", optional: true },
      { id: "yearFounded", label: "Year Founded", placeholder: "e.g. 2018", optional: true },
      { id: "registrationNumber", label: "Company Registration Number", placeholder: "e.g. RC-123456", optional: true },
    ],
  },
  {
    key: "capability",
    title: "Capability Statement",
    desc: "Skills & services",
    subtitle: "Your core competencies and differentiators",
    icon: Trophy,
    colors: true,
    fields: [
      { id: "company", label: "Company Name" },
      { id: "core", label: "Core Competencies", type: "textarea", full: true },
      { id: "difference", label: "What makes you different?", type: "textarea", full: true },
      { id: "contact", label: "Contact Info" },
      { id: "clients", label: "Past Clients / Experience", type: "textarea", full: true, optional: true },
      { id: "registrationNumber", label: "Company Registration Number", placeholder: "e.g. RC-123456", optional: true },
    ],
  },
  {
    key: "brand-guidelines",
    title: "Brand Guidelines",
    desc: "Full brand rulebook",
    subtitle: "Typography, color, and logo usage rules",
    icon: Palette,
    colors: true,
    fields: [
      { id: "company", label: "Brand Name" },
      { id: "industry", label: "Industry" },
      { id: "mission", label: "Brand Mission", type: "textarea", full: true },
      { id: "audience", label: "Target Audience", full: true },
      { id: "personality", label: "Brand Personality", full: true },
      { id: "fonts", label: "Preferred Fonts", optional: true },
      { id: "registrationNumber", label: "Company Registration Number", placeholder: "e.g. RC-123456", optional: true },
    ],
  },
];

const assetTypeMap: Record<ToolKey, string> = {
  "business-card": "business_card",
  logo: "logo",
  letterhead: "letterhead",
  "email-sig": "email_signature",
  invoice: "invoice",
  quotation: "quotation",
  "company-profile": "company_profile",
  capability: "capability_statement",
  "brand-guidelines": "brand_guidelines",
};

function cleanObject(obj: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === "string" && value.trim() === "") return false;
      return true;
    })
  );
}

function buildPayload(toolKey: ToolKey, values: Record<string, string>, colors: string[]) {
  const primary_color = colors[0] || "#001F3F";
  const secondary_color = colors[1] || "#FFD700";

  switch (toolKey) {
    case "logo":
      return cleanObject({
        brand_name: values.company,
        industry: values.industry,
        logo_style: values.style || "Combination Mark",
        logo_type: values.logoType || "image_based",
        tagline: values.tagline,
        brand_feel: values.feel,
        primary_color,
        secondary_color,
      });

    case "business-card":
      return cleanObject({
        full_name: values.name,
        job_title: values.role,
        company_name: values.company,
        email: values.email,
        phone: values.phone,
        website: values.website,
        registration_number: values.registrationNumber,
        primary_color,
        secondary_color,
      });

    case "letterhead":
      return cleanObject({
        company_name: values.company,
        company_address: values.address,
        email: values.email,
        phone: values.phone,
        website: values.website,
        tagline: values.tagline,
        registration_number: values.registrationNumber,
        primary_color,
        secondary_color,
      });

    case "email-sig":
      return cleanObject({
        full_name: values.name,
        job_title: values.role,
        company: values.company,
        email: values.email,
        phone: values.phone,
        social_link: values.social,
        registration_number: values.registrationNumber,
        primary_color,
        secondary_color,
      });

    case "invoice":
      return cleanObject({
        company_name: values.company,
        company_address: values.address,
        email: values.email,
        phone: values.phone,
        currency: values.currency || "NGN ₦",
        website: values.website,
        registration_number: values.registrationNumber,
        footer_note: values.note,
        primary_color,
        secondary_color,
      });

    case "quotation":
      return cleanObject({
        company_name: values.company,
        company_address: values.address,
        email: values.email,
        phone: values.phone,
        website: values.website,
        quote_valid_for: values.validity,
        payment_terms: values.terms,
        registration_number: values.registrationNumber,
        currency: "NGN ₦",
        primary_color,
        secondary_color,
      });

    case "company-profile":
      return cleanObject({
        company_name: values.company,
        industry: values.industry,
        description: values.description,
        key_services: values.services,
        location: values.location,
        mission_statement: values.mission,
        tagline: values.tagline,
        year_founded: values.yearFounded,
        registration_number: values.registrationNumber,
        primary_color,
        secondary_color,
      });

    case "capability":
      return cleanObject({
        company_name: values.company,
        core_competencies: values.core,
        differentiator: values.difference,
        contact_info: values.contact,
        past_clients: values.clients,
        registration_number: values.registrationNumber,
        primary_color,
        secondary_color,
      });

    case "brand-guidelines":
      return cleanObject({
        brand_name: values.company,
        industry: values.industry,
        brand_mission: values.mission,
        target_audience: values.audience,
        brand_personality: values.personality,
        preferred_fonts: values.fonts,
        registration_number: values.registrationNumber,
        primary_color,
        secondary_color,
      });

    default:
      return {};
  }
}

function validateTool(tool: ToolConfig, values: Record<string, string>) {
  for (const field of tool.fields) {
    if (!field.optional && !values[field.id]?.trim()) {
      return `${field.label} is required.`;
    }
  }

  return "";
}

export default function BrandIdentityBuilder() {
  const [activeTool, setActiveTool] = useState<ToolKey | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [selectedColors, setSelectedColors] = useState<string[]>(["#001F3F", "#FFD700", "#FFB84D"]);
  const [view, setView] = useState<"empty" | "form" | "loading" | "result">("empty");
  const [error, setError] = useState("");
  const [assetStatus, setAssetStatus] = useState<any>(null);
  const [exportsData, setExportsData] = useState<any>(null);

  const pollingRef = useRef<number | null>(null);

  const currentTool = useMemo(
    () => tools.find((tool) => tool.key === activeTool),
    [activeTool]
  );

  const clearPolling = () => {
    if (pollingRef.current) {
      window.clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  const selectTool = (key: ToolKey) => {
    clearPolling();
    setActiveTool(key);
    setValues({});
    setView("form");
    setError("");
    setAssetStatus(null);
    setExportsData(null);
  };

  const updateValue = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const fetchExports = async (assetId: string) => {
    const result = await api.get(`/assets/${assetId}/export`);
    setExportsData(result.data);
  };

  const pollStatus = (assetId: string) => {
    clearPolling();

    pollingRef.current = window.setInterval(async () => {
      try {
        const result = await api.get(`/assets/${assetId}/status`);
        const statusData = result.data.data;

        setAssetStatus(statusData);

        if (statusData?.status === "done") {
          clearPolling();
          await fetchExports(assetId);
          setView("result");
        }

        if (statusData?.status === "failed") {
          clearPolling();
          setView("result");
          setError(statusData?.error_message || "Asset generation failed.");
        }
      } catch (err: any) {
        clearPolling();
        setView("form");
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Could not check asset status."
        );
      }
    }, 4000);
  };

  const generate = async () => {
    if (!currentTool || !activeTool) return;

    const validationError = validateTool(currentTool, values);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      clearPolling();
      setError("");
      setAssetStatus(null);
      setExportsData(null);
      setView("loading");

      const payload = buildPayload(activeTool, values, selectedColors);
      const assetType = assetTypeMap[activeTool];

      const result = await api.post(
        `/assets/generate/${assetType}`,
        payload
      );

      const assetId = result.data?.asset_id;

      if (!assetId) {
        throw new Error("No asset ID returned.");
      }

      setAssetStatus(result.data);
      pollStatus(assetId);
    } catch (err: any) {
      setView("form");
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while generating asset."
      );
    }
  };

  const handleDownload = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9]">
      <div className="sticky top-0 z-30 flex items-center gap-3 bg-[#001F3F] px-5 py-4 shadow-lg">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFD700] font-extrabold text-[#001F3F]">
          GM
        </div>

        <h1 className="text-sm font-bold text-white sm:text-base">
          Brand Identity Builder
        </h1>

        <div className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 px-3 py-1 text-xs font-semibold text-[#FFD700]">
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered
        </div>
      </div>

      <div className="grid min-h-[calc(100vh-68px)] grid-cols-1 lg:grid-cols-[300px_1fr]">
        <aside className="border-r border-white/10 bg-[#001F3F] p-4 lg:p-6">
          <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/45">
            What to generate
          </p>

          <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.key;

              return (
                <button
                  key={tool.key}
                  onClick={() => selectTool(tool.key)}
                  className={`flex min-w-[230px] items-center gap-3 rounded-xl border px-3 py-3 text-left transition lg:min-w-0 ${
                    isActive
                      ? "border-[#FFD700] bg-[#FFD700]/10 shadow-[0_0_0_1px_rgba(255,215,0,0.15)]"
                      : "border-transparent hover:border-white/10 hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
                      isActive
                        ? "bg-[#FFD700] text-[#001F3F]"
                        : "bg-white/10 text-[#FFD700]"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>

                  <span className="min-w-0">
                    <span
                      className={`block text-sm font-semibold ${
                        isActive ? "text-white" : "text-white/85"
                      }`}
                    >
                      {tool.title}
                    </span>

                    <span
                      className={`block text-xs ${
                        isActive ? "text-[#FFD700]/80" : "text-white/40"
                      }`}
                    >
                      {tool.desc}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="p-5 lg:p-8">
          {error && (
            <div className="mb-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          {view === "empty" && <EmptyState />}

          {view === "form" && currentTool && (
            <FormPanel
              tool={currentTool}
              values={values}
              selectedColors={selectedColors}
              onValueChange={updateValue}
              onColorToggle={(color) =>
                setSelectedColors((prev) =>
                  prev.includes(color)
                    ? prev.filter((item) => item !== color)
                    : [...prev, color]
                )
              }
              onGenerate={generate}
            />
          )}

          {view === "loading" && <LoadingState assetStatus={assetStatus} />}

          {view === "result" && currentTool && (
            <ResultPanel
              tool={currentTool}
              values={values}
              colors={selectedColors}
              assetStatus={assetStatus}
              exportsData={exportsData}
              onEdit={() => setView("form")}
              onRegenerate={generate}
              onDownload={handleDownload}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[430px] flex-col items-center justify-center rounded-3xl border border-dashed border-[#D7DEE8] bg-white text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0F4F9] text-[#B7C0CF]">
        <Sparkles className="h-8 w-8" />
      </div>
      <h2 className="text-base font-bold text-[#1A2332]">Pick something to build</h2>
      <p className="mt-2 max-w-[290px] text-sm leading-6 text-[#8A94A6]">
        Select a brand asset from the left. Fill in your details and generate your branded preview.
      </p>
    </div>
  );
}

function FormPanel({
  tool,
  values,
  selectedColors,
  onValueChange,
  onColorToggle,
  onGenerate,
}: {
  tool: ToolConfig;
  values: Record<string, string>;
  selectedColors: string[];
  onValueChange: (id: string, value: string) => void;
  onColorToggle: (color: string) => void;
  onGenerate: () => void;
}) {
  const Icon = tool.icon;

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#001F3F] text-[#FFD700]">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-[#001F3F]">{tool.title}</h2>
          <p className="text-sm text-[#8A94A6]">{tool.subtitle}</p>
        </div>
      </div>

      <AIDashboardCard variant="panel" padding="lg" className="bg-white">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.1em] text-[#8A94A6]">
          Brand Details
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {tool.fields.map((field) => (
            <div key={field.id} className={field.full ? "md:col-span-2" : ""}>
              <label className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-[#4A5568]">
                {field.label}
                {field.optional && (
                  <span className="rounded-full bg-[#F0F3F8] px-2 py-0.5 text-[10px] font-normal text-[#8A94A6]">
                    optional
                  </span>
                )}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  value={values[field.id] || ""}
                  onChange={(e) => onValueChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="min-h-[90px] w-full rounded-xl border border-[#E0E5EC] px-3 py-2.5 text-sm outline-none focus:border-[#001F3F] focus:ring-4 focus:ring-[#001F3F]/10"
                />
              ) : field.type === "select" ? (
                <select
                  value={values[field.id] || field.options?.[0] || ""}
                  onChange={(e) => onValueChange(field.id, e.target.value)}
                  className="w-full rounded-xl border border-[#E0E5EC] px-3 py-2.5 text-sm outline-none focus:border-[#001F3F] focus:ring-4 focus:ring-[#001F3F]/10"
                >
                  {field.options?.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  value={values[field.id] || ""}
                  onChange={(e) => onValueChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-[#E0E5EC] px-3 py-2.5 text-sm outline-none focus:border-[#001F3F] focus:ring-4 focus:ring-[#001F3F]/10"
                />
              )}
            </div>
          ))}
        </div>
      </AIDashboardCard>

      {tool.colors && (
        <AIDashboardCard variant="panel" padding="lg" className="mt-4 bg-white">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-[#8A94A6]">
            Brand Colors <span className="font-normal normal-case">optional</span>
          </p>

          <div className="flex flex-wrap gap-3">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => onColorToggle(color)}
                className={`h-8 w-8 rounded-full border transition ${
                  selectedColors.includes(color)
                    ? "ring-2 ring-[#001F3F] ring-offset-2"
                    : "ring-0"
                }`}
                style={{ backgroundColor: color }}
                aria-label={color}
              />
            ))}
          </div>
        </AIDashboardCard>
      )}

      <button
        onClick={onGenerate}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D7263D] px-5 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#A81D2F] hover:shadow-lg"
      >
        <Wand2 className="h-5 w-5" />
        Generate {tool.title}
      </button>
    </div>
  );
}

function LoadingState({ assetStatus }: { assetStatus: any }) {
  return (
    <div className="flex min-h-[430px] flex-col items-center justify-center rounded-3xl bg-white text-center">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#E0E5EC] border-t-[#001F3F]" />
      <h3 className="mt-5 text-base font-bold text-[#001F3F]">Generating your asset…</h3>
      <p className="mt-1 text-sm text-[#8A94A6]">
        Current status: {assetStatus?.status || "pending"}
      </p>
    </div>
  );
}

function ResultPanel({
  tool,
  values,
  colors,
  assetStatus,
  exportsData,
  onEdit,
  onRegenerate,
  onDownload,
}: {
  tool: ToolConfig;
  values: Record<string, string>;
  colors: string[];
  assetStatus: any;
  exportsData: any;
  onEdit: () => void;
  onRegenerate: () => void;
  onDownload: (url: string) => void;
}) {
  const isFailed = assetStatus?.status === "failed";
  const exports = exportsData?.exports || {};

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-extrabold text-[#001F3F]">
          {tool.title} — {isFailed ? "Failed" : "Ready"}
        </h2>

        <div className="flex flex-wrap gap-2">
          <button onClick={onRegenerate} className="rounded-xl border border-[#E0E5EC] bg-white px-4 py-2 text-xs font-semibold">
            <RefreshCw className="mr-1 inline h-4 w-4" />
            Regenerate
          </button>
          <button onClick={onEdit} className="rounded-xl border border-[#E0E5EC] bg-white px-4 py-2 text-xs font-semibold">
            <Edit3 className="mr-1 inline h-4 w-4" />
            Edit
          </button>

          {Object.entries(exports).map(([key, url]) => (
            <button
              key={key}
              onClick={() => onDownload(String(url))}
              className="rounded-xl bg-[#001F3F] px-4 py-2 text-xs font-semibold text-white"
            >
              <Download className="mr-1 inline h-4 w-4" />
              Download {key}
            </button>
          ))}
        </div>
      </div>

      {isFailed && (
        <div className="mb-5 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          {assetStatus?.error_message || "Asset generation failed."}
        </div>
      )}

      {!isFailed && (
        <>
          <Preview tool={tool.key} values={values} colors={colors} />

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
            {tool.fields.slice(0, 6).map((field) => (
              <div key={field.id} className="rounded-xl border border-[#E0E5EC] bg-white p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#8A94A6]">
                  {field.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-[#1A2332]">
                  {values[field.id] || "—"}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Preview({
  tool,
  values,
  colors: _colors,
}: {
  tool: ToolKey;
  values: Record<string, string>;
  colors: string[];
}) {
  const name = values.name || "Your Name";
  const role = values.role || "Your Role";
  const company = values.company || "Your Company";
  const email = values.email || "hello@company.com";
  const phone = values.phone || "+234 800 000 0000";
  const initials = company
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (tool === "business-card") {
    return (
      <div className="flex flex-wrap gap-6">
        <div className="relative flex h-[190px] w-full max-w-[340px] flex-col justify-between overflow-hidden rounded-2xl bg-[#001F3F] p-6 text-white shadow-xl">
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#FFD700]/10" />
          <div>
            <h3 className="text-lg font-extrabold">{name}</h3>
            <p className="text-xs uppercase tracking-wider text-white/60">{role}</p>
          </div>
          <div>
            <p className="text-sm font-bold">{company}</p>
            <p className="mt-1 text-xs leading-5 text-white/60">{email}<br />{phone}</p>
          </div>
        </div>

        <div className="relative flex h-[190px] w-full max-w-[340px] flex-col justify-between overflow-hidden rounded-2xl bg-[#FFD700] p-6 text-[#001F3F] shadow-xl">
          <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-[#001F3F]/10" />
          <h3 className="text-3xl font-extrabold">{initials || "GM"}</h3>
          <p className="text-sm font-bold opacity-70">{company}</p>
        </div>
      </div>
    );
  }

  if (tool === "brand-guidelines") {
    return (
      <div className="rounded-2xl border border-[#E0E5EC] bg-white p-5">
        <div className="rounded-2xl bg-[#001F3F] p-6 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#FFD700]">
            Brand Guidelines
          </p>
          <h3 className="mt-2 text-3xl font-extrabold">{company}</h3>
          <p className="mt-2 text-sm text-white/50">
            {values.personality || "Bold · Trustworthy · Modern"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E0E5EC] bg-white p-6 shadow-sm">
      <div className="rounded-2xl bg-[#001F3F] p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFD700] font-extrabold text-[#001F3F]">
            {initials || "GM"}
          </div>
          <div>
            <h3 className="text-xl font-extrabold">{company}</h3>
            <p className="text-sm text-white/50">{values.industry || tool.replace("-", " ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
