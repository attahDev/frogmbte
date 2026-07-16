// @ts-nocheck
/**
 * usePolling.js
 * -------------
 * Polls getJobStatus every 2s until status is "done" or "failed".
 * Returns { status, deckId, error }
 */

import { useState, useEffect, useRef } from "react";
import { getJobStatus } from "../api/pitchDeckApi";

export function usePolling(jobId) {
  const [status, setStatus] = useState("pending");
  const [deckId, setDeckId] = useState(null);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);
  const notFoundCountRef = useRef(0);
  const NOT_FOUND_LIMIT = 5; // give up after 5 consecutive 404s (~10s)

  useEffect(() => {
    if (!jobId) return;

    const poll = async () => {
      try {
        const data = await getJobStatus(jobId);
        notFoundCountRef.current = 0; // reset on success
        setStatus(data.status);
        if (data.deck_id) setDeckId(data.deck_id);
        if (data.message && data.status === "failed") setError(data.message);
        if (data.status === "done" || data.status === "failed") {
          clearInterval(intervalRef.current);
        }
      } catch (err) {
        // 404 means the worker hasn't written to Redis yet — keep polling
        if (err.message.includes("404") || err.message.includes("not found")) {
          notFoundCountRef.current += 1;
          if (notFoundCountRef.current >= NOT_FOUND_LIMIT) {
            setError("Job not found after multiple retries");
            clearInterval(intervalRef.current);
          }
          // otherwise: silently retry on next interval tick
        } else {
          // Real error (network failure, 500, etc.) — stop polling
          setError(err.message);
          clearInterval(intervalRef.current);
        }
      }
    };

    // Small delay before first poll so the worker has time to write to Redis
    const initialDelay = setTimeout(() => {
      poll();
      intervalRef.current = setInterval(poll, 2000);
    }, 1000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(intervalRef.current);
    };
  }, [jobId]);

  return { status, deckId, error };
}