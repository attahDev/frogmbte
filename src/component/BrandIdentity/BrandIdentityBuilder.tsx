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
  UploadCloud,
  Wand2,
  X,
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

type RepeaterSubField = {
  id: string;
  label: string;
  placeholder?: string;
};

type FieldConfig = {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "textarea" | "select" | "checkbox" | "tags" | "repeater";
  options?: string[];
  optional?: boolean;
  full?: boolean;
  /** For type "tags": comma-separated text turned into a string[] on submit */
  tagsHint?: string;
  /** For type "repeater": each row is an object with these sub-fields */
  repeaterFields?: RepeaterSubField[];
};

type ToolConfig = {
  key: ToolKey;
  title: string;
  desc: string;
  subtitle: string;
  icon: React.ElementType;
  fields: FieldConfig[];
  colors: boolean;
  /** Whether this asset accepts a user-uploaded logo (maps to `logo_url` on the backend) */
  logoUpload?: boolean;
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
    logoUpload: true,
    fields: [
      { id: "name", label: "Full Name", placeholder: "e.g. Johnson Kate" },
      { id: "role", label: "Job Title / Role", placeholder: "e.g. CEO" },
      { id: "company", label: "Company Name", placeholder: "e.g. GM Black Tech Expo" },
      { id: "email", label: "Email Address", placeholder: "e.g. kate@company.com" },
      { id: "phone", label: "Phone", placeholder: "e.g. +234 800 000 0000" },
      { id: "website", label: "Website", placeholder: "e.g. www.company.com", optional: true },
      { id: "industry", label: "Industry", placeholder: "e.g. Technology", optional: true },
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
    logoUpload: true,
    fields: [
      { id: "company", label: "Company Name" },
      { id: "address", label: "Company Address", placeholder: "12 Tech Street, Lagos" },
      { id: "email", label: "Email" },
      { id: "phone", label: "Phone" },
      { id: "website", label: "Website", optional: true },
      { id: "tagline", label: "Tagline", optional: true },
      { id: "registrationNumber", label: "Company Registration Number", placeholder: "e.g. RC-123456", optional: true },
      { id: "social", label: "Social / Website Link", placeholder: "e.g. linkedin.com/company/acme", optional: true },
      {
        id: "body",
        label: "Letter Body",
        placeholder: "Dear [Recipient],\n\n...",
        type: "textarea",
        optional: true,
        full: true,
      },
    ],
  },
  {
    key: "email-sig",
    title: "Email Signature",
    desc: "Branded sign-off",
    subtitle: "Branded sign-off block for your emails",
    icon: Mail,
    colors: true,
    logoUpload: true,
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
    logoUpload: true,
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
      { id: "invoicePrefix", label: "Invoice Number Prefix", placeholder: "e.g. INV-", optional: true },
      { id: "taxRate", label: "Tax Rate (%)", placeholder: "e.g. 7.5", optional: true },
      { id: "discount", label: "Discount Amount", placeholder: "e.g. 50", optional: true },
      { id: "paymentTerms", label: "Payment Terms", placeholder: "e.g. Net 30", optional: true },
      { id: "note", label: "Default Footer Note", type: "textarea", full: true, optional: true },
      { id: "termsAndConditions", label: "Terms & Conditions", type: "textarea", full: true, optional: true },
    ],
  },
  {
    key: "quotation",
    title: "Quotation",
    desc: "Pricing proposals",
    subtitle: "Pricing proposal document for clients",
    icon: ClipboardList,
    colors: true,
    logoUpload: true,
    fields: [
      { id: "company", label: "Company Name" },
      { id: "address", label: "Address" },
      { id: "email", label: "Email" },
      { id: "phone", label: "Phone", optional: true },
      { id: "website", label: "Website", optional: true },
      {
        id: "currency",
        label: "Currency",
        type: "select",
        options: ["NGN ₦", "USD $", "GBP £", "EUR €", "ZAR R"],
      },
      { id: "validity", label: "Quote Valid For", placeholder: "e.g. 30 days" },
      { id: "expirationDate", label: "Expiration Date", placeholder: "e.g. 2026-08-30", optional: true },
      { id: "preparedBy", label: "Prepared By", placeholder: "e.g. Kate Johnson", optional: true },
      { id: "registrationNumber", label: "Company Registration Number", placeholder: "e.g. RC-123456", optional: true },
      { id: "deliveryRequired", label: "Delivery Required", type: "checkbox", optional: true },
      { id: "packagingRequired", label: "Packaging Required", type: "checkbox", optional: true },
      { id: "signatureSection", label: "Include Signature Section", type: "checkbox", optional: true },
      { id: "terms", label: "Payment Terms", type: "textarea", full: true, optional: true },
      { id: "termsAndConditions", label: "Terms & Conditions", type: "textarea", full: true, optional: true },
    ],
  },
  {
    key: "company-profile",
    title: "Company Profile",
    desc: "About your business",
    subtitle: "Who you are, what you do, why it matters",
    icon: Building,
    colors: true,
    logoUpload: true,
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
      {
        id: "teamMembers",
        label: "Team Members",
        type: "repeater",
        full: true,
        optional: true,
        repeaterFields: [
          { id: "name", label: "Name", placeholder: "e.g. Kate Johnson" },
          { id: "title", label: "Title", placeholder: "e.g. Co-Founder" },
        ],
      },
    ],
  },
  {
    key: "capability",
    title: "Capability Statement",
    desc: "Skills & services",
    subtitle: "Your core competencies and differentiators",
    icon: Trophy,
    colors: true,
    logoUpload: true,
    fields: [
      { id: "company", label: "Company Name" },
      { id: "core", label: "Core Competencies", type: "textarea", full: true },
      { id: "difference", label: "What makes you different?", type: "textarea", full: true },
      { id: "contact", label: "Contact Info" },
      { id: "clients", label: "Past Clients / Experience", type: "textarea", full: true, optional: true },
      { id: "registrationNumber", label: "Company Registration Number", placeholder: "e.g. RC-123456", optional: true },
      { id: "dunsNumber", label: "DUNS Number", placeholder: "e.g. 123456789", optional: true },
      { id: "cageCode", label: "CAGE Code", placeholder: "e.g. 1A2B3", optional: true },
      {
        id: "certifications",
        label: "Certifications",
        type: "tags",
        tagsHint: "Comma-separated, e.g. WBENC, ISO 9001, 8(a)",
        full: true,
        optional: true,
      },
      {
        id: "naicsCodes",
        label: "NAICS Codes",
        type: "repeater",
        full: true,
        optional: true,
        repeaterFields: [
          { id: "code", label: "Code", placeholder: "e.g. 541511" },
          { id: "description", label: "Description", placeholder: "e.g. Custom Computer Programming" },
        ],
      },
      {
        id: "pastPerformance",
        label: "Past Performance",
        type: "repeater",
        full: true,
        optional: true,
        repeaterFields: [
          { id: "client", label: "Client", placeholder: "e.g. City of Manchester" },
          { id: "description", label: "Description", placeholder: "e.g. Delivered a 6-month platform build" },
          { id: "year", label: "Year", placeholder: "e.g. 2025" },
        ],
      },
    ],
  },
  {
    key: "brand-guidelines",
    title: "Brand Guidelines",
    desc: "Full brand rulebook",
    subtitle: "Typography, color, and logo usage rules",
    icon: Palette,
    colors: true,
    logoUpload: true,
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

/** "WBENC, ISO 9001" -> ["WBENC", "ISO 9001"] */
function parseTags(value?: string): string[] | undefined {
  if (!value) return undefined;
  const items = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length ? items : undefined;
}

/** JSON-stringified array of rows (see RepeaterField) -> array of objects, dropping empty rows */
function parseRepeater(value?: string): Record<string, string>[] | undefined {
  if (!value) return undefined;
  try {
    const rows = JSON.parse(value) as Record<string, string>[];
    const cleaned = rows
      .map((row) => cleanObject(row))
      .filter((row) => Object.keys(row).length > 0);
    return cleaned.length ? cleaned : undefined;
  } catch {
    return undefined;
  }
}

function parseNumber(value?: string): number | undefined {
  if (!value || !value.trim()) return undefined;
  const num = Number(value);
  return Number.isFinite(num) ? num : undefined;
}

function parseBool(value?: string): boolean | undefined {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

function cleanObject(obj: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === "string" && value.trim() === "") return false;
      return true;
    })
  );
}

function buildPayload(
  toolKey: ToolKey,
  values: Record<string, string>,
  colors: string[],
  logoUrl?: string
) {
  const primary_color = colors[0] || "#001F3F";
  const secondary_color = colors[1] || "#FFD700";
  const logo_url = logoUrl || undefined;

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
        industry: values.industry,
        email: values.email,
        phone: values.phone,
        website: values.website,
        registration_number: values.registrationNumber,
        logo_url,
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
        social_links: values.social ? [{ url: values.social }] : undefined,
        content_body: values.body,
        logo_url,
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
        social_links: values.social ? [{ url: values.social }] : undefined,
        registration_number: values.registrationNumber,
        logo_url,
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
        invoice_number_prefix: values.invoicePrefix || undefined,
        tax_rate: parseNumber(values.taxRate),
        discount: parseNumber(values.discount),
        payment_terms: values.paymentTerms,
        footer_note: values.note,
        terms_and_conditions: values.termsAndConditions,
        logo_url,
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
        expiration_date: values.expirationDate,
        prepared_by: values.preparedBy,
        payment_terms: values.terms,
        terms_and_conditions: values.termsAndConditions,
        delivery_required: parseBool(values.deliveryRequired),
        packaging_required: parseBool(values.packagingRequired),
        signature_section: parseBool(values.signatureSection) ?? true,
        registration_number: values.registrationNumber,
        currency: values.currency || "NGN ₦",
        logo_url,
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
        team_members: parseRepeater(values.teamMembers),
        logo_url,
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
        duns_number: values.dunsNumber,
        cage_code: values.cageCode,
        certifications: parseTags(values.certifications),
        naics_codes: parseRepeater(values.naicsCodes),
        past_performance: parseRepeater(values.pastPerformance),
        logo_url,
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
        logo_url,
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
  const [primaryColor, setPrimaryColor] = useState("#001F3F");
  const [secondaryColor, setSecondaryColor] = useState("#FFD700");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoError, setLogoError] = useState("");
  const [view, setView] = useState<"empty" | "form" | "loading" | "result">("empty");
  const [error, setError] = useState("");
  const [assetStatus, setAssetStatus] = useState<any>(null);
  const [exportsData, setExportsData] = useState<any>(null);

  const selectedColors = useMemo(
    () => [primaryColor, secondaryColor],
    [primaryColor, secondaryColor]
  );

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
    setLogoUrl("");
    setLogoError("");
  };

  const updateValue = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogoUpload = async (file: File) => {
    const MAX_MB = 5;
    if (file.size > MAX_MB * 1024 * 1024) {
      setLogoError(`File too large (max ${MAX_MB}MB).`);
      return;
    }
    if (!["image/png", "image/jpeg", "image/jpg", "image/svg+xml"].includes(file.type)) {
      setLogoError("Only PNG, JPG or SVG files are allowed.");
      return;
    }

    setLogoError("");
    setLogoUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await api.post("/assets/upload/logo", formData);
      const url = result.data?.logo_url;

      if (!url) throw new Error("No logo_url returned from upload.");
      setLogoUrl(url);
    } catch (err: any) {
      setLogoError(
        err?.response?.data?.detail || err?.message || "Logo upload failed."
      );
    } finally {
      setLogoUploading(false);
    }
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
        const statusData = result.data;

        setAssetStatus(statusData);

        if (statusData?.status?.toLowerCase() === "done") {
          clearPolling();
          await fetchExports(assetId);
          setView("result");
        }

        if (statusData?.status?.toLowerCase() === "failed") {
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

      const payload = buildPayload(activeTool, values, selectedColors, logoUrl);
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

  const handleDownload = async (url: string, assetName?: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Preserve the real extension from the asset URL (png/pdf/etc.),
      // but name the file after the company + asset type instead of the
      // storage host's opaque UUID path.
      const urlPath = url.split("?")[0];
      const ext = urlPath.includes(".") ? urlPath.split(".").pop() : "png";
      const filename = assetName ? `${assetName}.${ext}` : urlPath.split("/").pop() || "download";

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // Fall back to opening in a new tab if the fetch/blob approach fails
      // (e.g. CORS on the storage host) — better than a silent no-op.
      window.open(url, "_blank", "noopener,noreferrer");
    }
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
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              onPrimaryColorChange={setPrimaryColor}
              onSecondaryColorChange={setSecondaryColor}
              logoUrl={logoUrl}
              logoUploading={logoUploading}
              logoError={logoError}
              onLogoUpload={handleLogoUpload}
              onLogoClear={() => {
                setLogoUrl("");
                setLogoError("");
              }}
              onValueChange={updateValue}
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

function RepeaterField({
  value,
  subFields,
  onChange,
}: {
  value: string;
  subFields: RepeaterSubField[];
  onChange: (next: string) => void;
}) {
  const rows: Record<string, string>[] = useMemo(() => {
    try {
      const parsed = JSON.parse(value || "[]");
      return Array.isArray(parsed) && parsed.length ? parsed : [{}];
    } catch {
      return [{}];
    }
  }, [value]);

  const updateRow = (index: number, subId: string, subValue: string) => {
    const next = rows.map((row, i) =>
      i === index ? { ...row, [subId]: subValue } : row
    );
    onChange(JSON.stringify(next));
  };

  const addRow = () => onChange(JSON.stringify([...rows, {}]));

  const removeRow = (index: number) => {
    const next = rows.filter((_, i) => i !== index);
    onChange(JSON.stringify(next.length ? next : [{}]));
  };

  return (
    <div className="space-y-2">
      {rows.map((row, index) => (
        <div
          key={index}
          className="flex flex-wrap items-center gap-2 rounded-xl border border-[#E0E5EC] bg-[#F9FAFC] p-2"
        >
          {subFields.map((sub) => (
            <input
              key={sub.id}
              value={row[sub.id] || ""}
              onChange={(e) => updateRow(index, sub.id, e.target.value)}
              placeholder={sub.placeholder || sub.label}
              className="min-w-[120px] flex-1 rounded-lg border border-[#E0E5EC] bg-white px-2.5 py-2 text-sm outline-none focus:border-[#001F3F]"
            />
          ))}
          <button
            type="button"
            onClick={() => removeRow(index)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#E0E5EC] bg-white text-[#8A94A6] hover:bg-[#F4F6F9]"
            aria-label="Remove row"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addRow}
        className="rounded-lg border border-dashed border-[#D7DEE8] px-3 py-1.5 text-xs font-semibold text-[#4A5568] hover:border-[#001F3F]/40"
      >
        + Add row
      </button>
    </div>
  );
}

function ColorPickerField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (color: string) => void;
}) {
  const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(value);

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-[#4A5568]">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-[#E0E5EC] bg-[#F9FAFC] px-2 py-1.5 focus-within:border-[#001F3F] focus-within:ring-4 focus-within:ring-[#001F3F]/10">
        <input
          type="color"
          value={isValidHex ? value : "#000000"}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="h-8 w-9 shrink-0 cursor-pointer rounded-md border-0 bg-transparent p-0"
          aria-label={`${label} color wheel`}
        />
        <input
          type="text"
          value={value}
          maxLength={7}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#001F3F"
          className="w-full bg-transparent text-sm font-medium uppercase tracking-wide text-[#1A2332] outline-none"
          aria-label={`${label} hex value`}
        />
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
  primaryColor,
  secondaryColor,
  onPrimaryColorChange,
  onSecondaryColorChange,
  logoUrl,
  logoUploading,
  logoError,
  onLogoUpload,
  onLogoClear,
  onValueChange,
  onGenerate,
}: {
  tool: ToolConfig;
  values: Record<string, string>;
  primaryColor: string;
  secondaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
  logoUrl: string;
  logoUploading: boolean;
  logoError: string;
  onLogoUpload: (file: File) => void;
  onLogoClear: () => void;
  onValueChange: (id: string, value: string) => void;
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
              ) : field.type === "checkbox" ? (
                <label className="flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-[#E0E5EC] bg-[#F9FAFC] px-3 py-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={values[field.id] === "true"}
                    onChange={(e) =>
                      onValueChange(field.id, e.target.checked ? "true" : "false")
                    }
                    className="h-4 w-4 accent-[#001F3F]"
                  />
                  <span className="text-[#4A5568]">Yes</span>
                </label>
              ) : field.type === "tags" ? (
                <>
                  <input
                    value={values[field.id] || ""}
                    onChange={(e) => onValueChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-[#E0E5EC] px-3 py-2.5 text-sm outline-none focus:border-[#001F3F] focus:ring-4 focus:ring-[#001F3F]/10"
                  />
                  {field.tagsHint && (
                    <p className="mt-1 text-[11px] text-[#8A94A6]">{field.tagsHint}</p>
                  )}
                </>
              ) : field.type === "repeater" && field.repeaterFields ? (
                <RepeaterField
                  value={values[field.id] || ""}
                  subFields={field.repeaterFields}
                  onChange={(next) => onValueChange(field.id, next)}
                />
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ColorPickerField
              label="Primary"
              value={primaryColor}
              onChange={onPrimaryColorChange}
            />
            <ColorPickerField
              label="Secondary"
              value={secondaryColor}
              onChange={onSecondaryColorChange}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {presetColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => onPrimaryColorChange(color)}
                className="h-7 w-7 rounded-full border border-black/5 transition hover:ring-2 hover:ring-[#001F3F] hover:ring-offset-2"
                style={{ backgroundColor: color }}
                aria-label={`Use ${color} as primary`}
                title={color}
              />
            ))}
          </div>
        </AIDashboardCard>
      )}

      {tool.logoUpload && (
        <AIDashboardCard variant="panel" padding="lg" className="mt-4 bg-white">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-[#8A94A6]">
            Logo <span className="font-normal normal-case">optional</span>
          </p>

          {logoUrl ? (
            <div className="flex items-center gap-4 rounded-xl border border-[#E0E5EC] p-3">
              <img
                src={logoUrl}
                alt="Uploaded logo"
                className="h-14 w-14 rounded-lg border border-[#E0E5EC] object-contain"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#1A2332]">Logo uploaded</p>
                <p className="truncate text-xs text-[#8A94A6]">{logoUrl}</p>
              </div>
              <button
                type="button"
                onClick={onLogoClear}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E0E5EC] text-[#8A94A6] hover:bg-[#F4F6F9]"
                aria-label="Remove logo"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#D7DEE8] bg-[#F9FAFC] px-4 py-6 text-center transition hover:border-[#001F3F]/40">
              <input
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                className="hidden"
                disabled={logoUploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onLogoUpload(file);
                  e.target.value = "";
                }}
              />
              <UploadCloud className="h-6 w-6 text-[#8A94A6]" />
              <span className="text-sm font-semibold text-[#1A2332]">
                {logoUploading ? "Uploading…" : "Click to upload PNG, JPG or SVG (max 5MB)"}
              </span>
            </label>
          )}

          {logoError && (
            <p className="mt-2 text-xs font-medium text-red-600">{logoError}</p>
          )}
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
  onDownload: (url: string, assetName?: string) => void;
}) {
  const isFailed = assetStatus?.status?.toLowerCase() === "failed";
  const exports = exportsData?.exports || {};
  const companySlug = (values.company || "brand")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "brand";

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
              onClick={() => onDownload(String(url), `${companySlug}-${key}`)}
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
          {assetStatus?.png_url ? (
            <div className="flex flex-wrap gap-6">
              <img
                src={assetStatus.png_url}
                alt={`${tool.title} — front`}
                className="max-w-full rounded-2xl border border-[#E0E5EC] shadow-xl sm:max-w-[340px]"
              />
              {assetStatus.png_transparent_url && (
                <img
                  src={assetStatus.png_transparent_url}
                  alt={`${tool.title} — back`}
                  className="max-w-full rounded-2xl border border-[#E0E5EC] shadow-xl sm:max-w-[340px]"
                />
              )}
            </div>
          ) : assetStatus?.svg_light_url ? (
            <div className="flex flex-wrap gap-6">
              <img
                src={assetStatus.svg_light_url}
                alt={`${tool.title} — generated`}
                className="max-w-full rounded-2xl border border-[#E0E5EC] bg-white p-6 shadow-xl sm:max-w-[340px]"
              />
            </div>
          ) : assetStatus?.pdf_url ? (
            <div className="overflow-hidden rounded-2xl border border-[#E0E5EC] shadow-xl">
              <iframe
                src={`${assetStatus.pdf_url}#toolbar=0&navpanes=0`}
                title={`${tool.title} preview`}
                className="h-[520px] w-full bg-white"
              />
              <div className="flex items-center justify-between border-t border-[#E0E5EC] bg-[#F9FAFC] px-4 py-2.5">
                <span className="text-xs text-[#8A94A6]">PDF preview</span>
                <a
                  href={assetStatus.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#001F3F] hover:underline"
                >
                  Open in new tab ↗
                </a>
              </div>
            </div>
          ) : (
            <Preview tool={tool.key} values={values} colors={colors} />
          )}

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
