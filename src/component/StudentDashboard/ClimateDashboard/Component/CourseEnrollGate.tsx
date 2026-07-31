import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Lock, Coins } from "lucide-react";
import toast from "react-hot-toast";

import { fetchCreditBalance } from "../../../../lib/creditsApi";
import { enrollInCourse } from "../../../../lib/coursesApi";
import type { SustainabilityCourse } from "../types/sustainability";

type CourseEnrollGateProps = {
  course: SustainabilityCourse;
  courseSlug: string;
  /** Called after a successful enroll so the caller can refetch the now-
   *  unlocked lesson instead of this component managing that itself. */
  onEnrolled: () => void;
};

export function CourseEnrollGate({ course, courseSlug, onEnrolled }: CourseEnrollGateProps) {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const cost = course.creditCost ?? 0;

  // Proactive balance check — shown before the enroll button is even
  // tappable, not discovered only after a failed request.
  const { data: balance, isLoading: isLoadingBalance } = useQuery({
    queryKey: ["credits", "balance"],
    queryFn: fetchCreditBalance,
  });

  const queryClient = useQueryClient();

  const insufficientCredits =
    !isLoadingBalance && balance !== undefined && balance.balance < cost;

  const handleEnroll = async () => {
    setIsEnrolling(true);
    try {
      await enrollInCourse(courseSlug);
      // Balance just changed — don't let a stale cached number linger.
      queryClient.invalidateQueries({ queryKey: ["credits", "balance"] });
      toast.success(`Enrolled — ${cost} credit${cost === 1 ? "" : "s"} used.`);
      onEnrolled();
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 402) {
        toast.error("Not enough credits to enroll in this course.");
      } else {
        toast.error("Couldn't enroll right now. Try again.");
      }
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div className="flex min-h-[420px] flex-1 flex-col items-center justify-center rounded-[14px] border border-[#E5E7EB] bg-[#FFFDF7] px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#001F3F]/5">
        <Lock size={24} className="text-[#001F3F]" />
      </div>

      <h2 className="mt-5 text-[22px] font-semibold tracking-[-0.02em] text-[#001F3F]">
        {course.title}
      </h2>

      <p className="mt-2 max-w-sm text-[15px] leading-6 text-[#4A5565]">
        This is a premium course. Enroll once to unlock every lesson.
      </p>

      <div className="mt-6 flex items-center gap-2 rounded-full bg-[#FFD700]/15 px-4 py-2 text-[15px] font-medium text-[#001F3F]">
        <Coins size={16} />
        {cost} credit{cost === 1 ? "" : "s"} to enroll
      </div>

      {!isLoadingBalance && balance !== undefined && (
        <p className="mt-3 text-[13px] text-[#8B93A1]">
          Your balance: {balance.balance} credit{balance.balance === 1 ? "" : "s"}
        </p>
      )}

      {insufficientCredits && (
        <p className="mt-2 text-[13px] font-medium text-[#D7263D]">
          You don't have enough credits for this course yet.
        </p>
      )}

      <button
        type="button"
        onClick={handleEnroll}
        disabled={isEnrolling || insufficientCredits}
        className="mt-6 flex h-[46px] w-full max-w-xs items-center justify-center rounded-[12px] bg-[#D7263D] text-[16px] font-medium text-white transition hover:bg-[#BE1F34] focus:outline-none focus:ring-2 focus:ring-[#D7263D]/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isEnrolling ? "Enrolling…" : `Enroll for ${cost} credit${cost === 1 ? "" : "s"}`}
      </button>
    </div>
  );
}
