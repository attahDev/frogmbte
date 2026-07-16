"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";

export default function SmoothScroll() {
  const location = useLocation();
  const isAppShell =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/ai-dashboard");

  useEffect(() => {
    if (isAppShell) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [isAppShell]);

  return null;
}