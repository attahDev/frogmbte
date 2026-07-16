import { useEffect, useState } from "react";

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

const ZERO: CountdownParts = { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };

function computeParts(target: Date): CountdownParts {
  const diffMs = target.getTime() - Date.now();
  if (diffMs <= 0) return ZERO;

  const totalSeconds = Math.floor(diffMs / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isPast: false,
  };
}

/**
 * Ticking countdown to a real timestamp. This replaces the old hardcoded
 * "10 Days : 12 Hrs : 54 Mins : 19 Sec" string in dashboardHero.tsx, which
 * never changed no matter when you loaded the page.
 */
export function useCountdown(target: Date | string | null | undefined): CountdownParts | null {
  const targetDate = target ? new Date(target) : null;
  const [parts, setParts] = useState<CountdownParts | null>(targetDate ? computeParts(targetDate) : null);

  useEffect(() => {
    if (!targetDate) {
      setParts(null);
      return;
    }
    setParts(computeParts(targetDate));
    const id = setInterval(() => setParts(computeParts(targetDate)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return parts;
}
