import type { AdzunaJob, AdzunaResponse, JobCardData } from "../types/jobs";

const APP_ID = import.meta.env.VITE_ADZUNA_APP_ID;
const APP_KEY = import.meta.env.VITE_ADZUNA_APP_KEY;

function formatSalary(min?: number, max?: number) {
  if (!min && !max) return "Salary not specified";

  const fmt = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  });

  if (min && max) {
    if (Math.round(min) === Math.round(max)) return fmt.format(min);
    return `${fmt.format(min)} - ${fmt.format(max)}`;
  }

  return fmt.format(min || max || 0);
}

function timeAgo(dateString: string) {
  const now = new Date().getTime();
  const then = new Date(dateString).getTime();
  const diffMs = now - then;

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (hours < 24) return `${hours || 1} hours ago`;
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
}

function guessTags(job: AdzunaJob) {
  const text = `${job.title} ${job.description}`.toLowerCase();
  const tags: string[] = [];

  if (job.contract_type?.toLowerCase().includes("permanent")) tags.push("Full-time");
  if (text.includes("remote")) tags.push("Remote");
  if (text.includes("hybrid")) tags.push("Hybrid");
  if (text.includes("intern")) tags.push("Internship");
  if (tags.length === 0) tags.push("External");

  return tags.slice(0, 3);
}

function generateMatchScore(job: AdzunaJob) {
  const text = `${job.title} ${job.description}`.toLowerCase();
  let score = 70;

  if (text.includes("frontend")) score += 8;
  if (text.includes("react")) score += 6;
  if (text.includes("typescript")) score += 5;
  if (text.includes("remote")) score += 3;
  if (job.salary_max && job.salary_max > 70000) score += 5;

  return Math.min(score, 99);
}

export function transformAdzunaJob(job: AdzunaJob): JobCardData {
  return {
    id: job.id,
    title: job.title || "Untitled role",
    company: job.company?.display_name || "Unknown company",
    location: job.location?.display_name || "Location not specified",
    postedAt: timeAgo(job.created),
    description: job.description || "No description available",
    salary: formatSalary(job.salary_min, job.salary_max),
    salaryMin: job.salary_min,
    salaryMax: job.salary_max,
    jobType: job.contract_type || "Not specified",
    tags: guessTags(job),
    match: generateMatchScore(job),
    applyUrl: job.redirect_url,
    source: "live",
  };
}

export async function fetchJobs(search: string) {
  if (!APP_ID || !APP_KEY) {
    throw new Error("Missing Adzuna API credentials");
  }

  const params = new URLSearchParams({
    app_id: APP_ID,
    app_key: APP_KEY,
    results_per_page: "8",
    what: search || "frontend developer",
    "content-type": "application/json",
  });

  const res = await fetch(
    `https://api.adzuna.com/v1/api/jobs/gb/search/1?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = (await res.json()) as AdzunaResponse;
  return data.results.map(transformAdzunaJob);
}