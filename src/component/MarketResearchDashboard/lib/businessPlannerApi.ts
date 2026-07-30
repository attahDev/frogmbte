/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../../lib/api";

export type GeneratePlanPayload = {
  business_idea: string;
  industry: string;
  target_audience: string;
  skills: string;
  budget: string;
  location: string;
  experience_level: string;
  goal: string;
  source_idea_id?: string;
};

export type BusinessPlanHistoryItem = {
  id: string;
  userId: string;
  businessIdea: string;
  industry: string;
  targetAudience: string;
  skills: string;
  budget: string;
  location: string;
  experienceLevel: string;
  goal: string;
  aiResponse: any;
  completedActionIndexes: number[];
  createdAt: string;
  updatedAt: string;
};

export const generateBusinessPlan = async (payload: GeneratePlanPayload) => {
  const response = await api.post("/business-planner/generate", payload);
  return response.data;
};

export const getBusinessPlanHistory = async () => {
  const response = await api.get<{
    success: boolean;
    data: BusinessPlanHistoryItem[];
    message: string;
    timestamp: string;
  }>("/business-planner/history");

  return response.data;
};

export const getBusinessPlanById = async (planId: string) => {
  const response = await api.get<BusinessPlanHistoryItem>(
    `/business-planner/${planId}`
  );

  return response.data;
};

export const updatePlanProgress = async (
  planId: string,
  completedActionIndexes: number[]
) => {
  const response = await api.patch<{
    success: boolean;
    planId: string;
    completedActionIndexes: number[];
  }>(`/business-planner/${planId}/progress`, { completedActionIndexes });

  return response.data;
};