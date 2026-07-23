import { api } from "./api";
import type { User } from "../contexts/userole";

export type UpdateProfilePayload = Partial<
  Pick<User, "firstname" | "lastname" | "organization"> & { region: string }
>;

export async function updateMyProfile(payload: UpdateProfilePayload): Promise<User> {
  const { data } = await api.patch("/users/profile", payload);
  return data?.data ?? data;
}

export async function updateProfileVisibility(
  profileVisibility: "PUBLIC" | "PRIVATE"
): Promise<User> {
  const { data } = await api.patch("/users/settings", { profileVisibility });
  return data?.data ?? data;
}

export async function changeMyPassword(currentPassword: string, newPassword: string) {
  const { data } = await api.put("/users/change-password", {
    currentPassword,
    newPassword,
  });
  return data?.data ?? data;
}

export type Badge = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  target: number;
  current: number;
  earned: boolean;
  earnedAt: string | null;
  progress: number; // 0-100
};

export async function fetchMyBadges(): Promise<Badge[]> {
  const { data } = await api.get("/badges/me");
  return data?.data ?? data ?? [];
}
