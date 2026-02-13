//hooks/useEvasiveButton.ts

import { useState, useCallback, useRef } from "react";
import {
  EVASIVE_BUTTON,
  NO_BUTTON_MESSAGES,
  YES_BUTTON_MESSAGES,
  YES_SCALE_INCREMENT,
  YES_MAX_SCALE_STEPS,
  NO_SHRINK_FACTOR,
  NO_MIN_SCALE,
} from "@/constants";

interface Position {
  x: number;
  y: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function useEvasiveButton() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);
  const positionRef = useRef<Position>({ x: 0, y: 0 });

  const evade = useCallback(() => {
    setHoverCount((prev) => prev + 1);

    const { padding, width, height, minJumpDistance, maxAttempts } =
      EVASIVE_BUTTON;

    const safeMaxX = window.innerWidth - width - padding;
    const safeMaxY = window.innerHeight - height - padding;

    const minX = padding;
    const minY = padding;

    let newX: number;
    let newY: number;
    let attempts = 0;

    do {
      newX = Math.random() * (safeMaxX - minX) + minX;
      newY = Math.random() * (safeMaxY - minY) + minY;
      attempts++;
    } while (
      attempts < maxAttempts &&
      Math.hypot(
        newX - positionRef.current.x,
        newY - positionRef.current.y
      ) < minJumpDistance
    );

    const next: Position = {
      x: clamp(newX, minX, safeMaxX),
      y: clamp(newY, minY, safeMaxY),
    };

    positionRef.current = next;
    setPosition(next);
  }, []);

  const isEvading = hoverCount > 0;

  const noMessage =
    NO_BUTTON_MESSAGES[Math.min(hoverCount, NO_BUTTON_MESSAGES.length - 1)];

  const yesMessage =
    YES_BUTTON_MESSAGES[Math.min(hoverCount, YES_BUTTON_MESSAGES.length - 1)];

  const yesScale =
    1 + Math.min(hoverCount, YES_MAX_SCALE_STEPS) * YES_SCALE_INCREMENT;

  const noScale = Math.max(NO_MIN_SCALE, 1 - hoverCount * NO_SHRINK_FACTOR);

  return {
    position,
    hoverCount,
    evade,
    isEvading,
    noMessage,
    yesMessage,
    yesScale,
    noScale,
  };
}