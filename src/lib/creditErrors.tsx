import toast from "react-hot-toast";

export type CreditErrorInfo = {
  /** 402 from CreditGuard.reserve() — InsufficientCreditsError */
  isCreditError: boolean;
  /** 403 from CreditGuard.checkEntitlement() — EntitlementError (tier too low) */
  isTierError: boolean;
  message: string;
};

/** Reads the backend's actual error message (set by AllExceptionsFilter as
 *  `{ success:false, message }`) rather than axios's generic
 *  "Request failed with status code 402" — the difference between showing
 *  "Insufficient credits: 7 required for mentor_ai." and a useless generic
 *  string. */
export function parseCreditError(err: any): CreditErrorInfo {
  const status = err?.response?.status;
  const backendMessage: string | undefined = err?.response?.data?.message;

  const isCreditError = status === 402;
  // EntitlementError messages are shaped "This feature requires X tier or
  // above (current: Y)." — distinguishing this from an unrelated 403 (e.g.
  // RolesGuard rejecting a non-admin) so we only show the upgrade CTA when
  // it's actually about plan tier.
  const isTierError =
    status === 403 && typeof backendMessage === "string" && /tier or above/i.test(backendMessage);

  return {
    isCreditError,
    isTierError,
    message: backendMessage ?? "",
  };
}

/** One-stop error handler for any credit-gated call: sets the caller's own
 *  inline error state (so existing UI doesn't regress) AND, specifically
 *  for credits/tier errors, pops an actionable toast with a link to
 *  Settings > Billing — so running out of credits or hitting a tier wall
 *  is never just a silent/generic failure. Safe to call for ANY error;
 *  non-credit errors just get the inline message with no extra toast. */
export function reportApiError(
  err: any,
  setError?: (message: string) => void,
  fallback = "Something went wrong. Please try again.",
) {
  const { isCreditError, isTierError, message } = parseCreditError(err);
  const resolved =
    message ||
    err?.response?.data?.error ||
    err?.message ||
    fallback;

  setError?.(resolved);

  if (isCreditError || isTierError) {
    // Fixed id — repeated attempts (e.g. mashing "Generate") update the same
    // toast instead of stacking duplicates.
    toast.error(
      (t) => (
        <div className="flex flex-col gap-1 text-sm">
          <span>{resolved}</span>
          <a
            href="/dashboard/settings"
            onClick={() => toast.dismiss(t.id)}
            className="text-xs font-semibold underline"
          >
            {isCreditError ? "Get more credits →" : "Upgrade your plan →"}
          </a>
        </div>
      ),
      { id: "credit-error", duration: 6000 },
    );
  }
}
