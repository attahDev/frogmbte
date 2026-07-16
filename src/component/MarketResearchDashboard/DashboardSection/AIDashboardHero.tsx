/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { ArrowRight, FileText, Search } from "lucide-react";
import BeeWatermark from "../ui/BeeWatermark";
import AIDashboardButton from "../ui/AIDashboardButton";
import AIDashboardCard from "../ui/AIDashboardCard";
import InputField from "../ui/InputField";
import {
  generateBusinessPlan,
  type GeneratePlanPayload,
} from "../lib/businessPlannerApi";
import { GeneratedPlanResult } from "./generatedplan";

type Props = {
  hasContent?: boolean;
  onPlanGenerated?: (data: any) => void;
};

const initialForm: GeneratePlanPayload = {
  business_idea: "",
  industry: "",
  target_audience: "",
  skills: "",
  budget: "",
  location: "",
  experience_level: "",
  goal: "",
};

export default function DashboardHero({
  hasContent = true,
  onPlanGenerated,
}: Props) {
  const [form, setForm] = useState<GeneratePlanPayload>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  if (!hasContent) return null;

  const updateField = (key: keyof GeneratePlanPayload, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    if (!form.business_idea.trim()) return "Business idea is required.";
    if (!form.industry.trim()) return "Industry is required.";
    if (!form.target_audience.trim()) return "Target audience is required.";
    if (!form.skills.trim()) return "Skills/expertise is required.";
    if (!form.budget.trim()) return "Budget range is required.";
    if (!form.location.trim()) return "Location is required.";
    if (!form.experience_level.trim()) return "Experience level is required.";
    if (!form.goal.trim()) return "Goal is required.";
    return "";
  };

  const handleGeneratePlan = async () => {
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setGeneratedPlan(null);

      const result = await generateBusinessPlan(form);

      console.log("AI BUSINESS PLAN RESPONSE:", result);

      if (!result?.success) {
        throw new Error(result?.error || "Failed to generate business plan.");
      }

      setGeneratedPlan(result.data);
      onPlanGenerated?.(result.data);
    } catch (err: any) {
      console.log("AI BUSINESS PLAN ERROR:", err);

      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AIDashboardCard
      id="business-planner-form"
      variant="panel"
      padding="lg"
      className="relative overflow-hidden bg-[#07294A]"
    >
      <div className="pointer-events-none absolute -bottom-16 -right-10 z-0 sm:-bottom-10 sm:-right-6">
        <BeeWatermark className="h-[220px] w-auto sm:h-[300px] lg:h-[360px]" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          What do you want to{" "}
          <span className="text-[#FFD23F]">build today?</span>
        </h1>

        <p className="mt-3 text-sm text-white/65 sm:text-base">
          Describe your idea below, our AI will help you generate, validate, and
          execute it.
        </p>

        <div className="mt-6 grid gap-4">
          <InputField
            label="Business idea"
            placeholder="Describe your business idea... e.g. An AI-powered fitness coaching app for busy professionals"
            type="textarea"
            value={form.business_idea}
            onChange={(value) => updateField("business_idea", value)}
          />

          <div className="grid gap-4 md:grid-cols-3">
            <InputField
              label="Industry / Niche"
              placeholder="Select Industry"
              type="select"
              options={["Technology", "Health", "Education", "E-commerce"]}
              value={form.industry}
              onChange={(value) => updateField("industry", value)}
            />

            <InputField
              label="Target Audience"
              placeholder="e.g. Busy professionals, 25–40"
              value={form.target_audience}
              onChange={(value) => updateField("target_audience", value)}
            />

            <InputField
              label="Skills/Expertise"
              placeholder="e.g. Marketing, Coding, Design"
              value={form.skills}
              onChange={(value) => updateField("skills", value)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <InputField
              label="Budget Range"
              placeholder="Select Budget"
              type="select"
              options={["$0–$500", "$500–$5k", "$5k+"]}
              value={form.budget}
              onChange={(value) => updateField("budget", value)}
            />

            <InputField
              label="Location"
              placeholder="e.g. United Kingdom, Nigeria"
              value={form.location}
              onChange={(value) => updateField("location", value)}
            />

            <InputField
              label="Experience Level"
              placeholder="Select Level"
              type="select"
              options={["Beginner", "Intermediate", "Advanced"]}
              value={form.experience_level}
              onChange={(value) => updateField("experience_level", value)}
            />
          </div>

          <InputField
            label="Goal"
            placeholder="e.g. Financial freedom in 3 years, $10k/month passive income"
            value={form.goal}
            onChange={(value) => updateField("goal", value)}
          />

          {error && (
            <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <AIDashboardButton
              icon={ArrowRight}
              iconPosition="right"
              className="px-6 py-4 text-base"
              onClick={handleGeneratePlan}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate ideas for me"}
            </AIDashboardButton>

            <AIDashboardButton
              variant="secondary"
              icon={Search}
              iconPosition="left"
              className="px-6 py-4 text-base"
              onClick={handleGeneratePlan}
              disabled={loading}
            >
              {loading ? "Validating..." : "Validate Idea"}
            </AIDashboardButton>

            <AIDashboardButton
              variant="outline"
              icon={FileText}
              iconPosition="left"
              className="px-6 py-4 text-base"
              onClick={handleGeneratePlan}
              disabled={loading}
            >
              {loading ? "Building..." : "Build Plan"}
            </AIDashboardButton>
          </div>

          {generatedPlan && <GeneratedPlanResult plan={generatedPlan} />}
        </div>
      </div>
    </AIDashboardCard>
  );
}