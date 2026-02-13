//hooks/useConfetti.ts

import { useCallback, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { CONFETTI_DURATION_MS, CONFETTI_INTERVAL_MS } from "@/constants";

export function useConfetti() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fire = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const animationEnd = Date.now() + CONFETTI_DURATION_MS;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 100,
    };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    intervalRef.current = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        return;
      }

      const particleCount = 50 * (timeLeft / CONFETTI_DURATION_MS);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, CONFETTI_INTERVAL_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { fire };
}