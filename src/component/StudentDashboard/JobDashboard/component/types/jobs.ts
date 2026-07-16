export type AdzunaJob = {
    id: string;
    title: string;
    description: string;
    created: string;
    redirect_url: string;
    salary_min?: number;
    salary_max?: number;
    contract_type?: string;
    category?: {
      label?: string;
      tag?: string;
    };
    company?: {
      display_name?: string;
    };
    location?: {
      display_name?: string;
      area?: string[];
    };
  };
  
  export type AdzunaResponse = {
    count: number;
    mean?: number;
    results: AdzunaJob[];
  };
  
  export type JobCardData = {
    id: string;
    title: string;
    company: string;
    location: string;
    postedAt: string;
    description: string;
    salary: string;
    salaryMin?: number;
    salaryMax?: number;
    jobType: string;
    tags: string[];
    match: number;
    applyUrl: string;
    source: "dummy" | "live";
  };