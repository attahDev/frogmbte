"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";

export default function SmoothScroll() {
  const location = useLocation();

  const isAppShell =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/ai-dashboard");

  const lenisRef = useRef<Lenis | null>(null);

  // Create Lenis only once
  useEffect(() => {
    if (isAppShell) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });

    lenisRef.current = lenis;

    let frame = 0;

    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isAppShell]);

  // Scroll to top on every page navigation
  useEffect(() => {
    if (isAppShell) return;

    requestAnimationFrame(() => {
      lenisRef.current?.scrollTo(0, {
        immediate: true,
      });
    });
  }, [location.pathname, isAppShell]);

  return null;
}
