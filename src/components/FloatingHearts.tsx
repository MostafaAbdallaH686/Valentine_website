//components/FloatingHearts.tsx


import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FLOATING_HEARTS_COUNT } from "@/constants";

interface FloatingHeart {
  id: number;
  x: number;
  delay: number;
  scale: number;
  duration: number;
  size: number;
}

function generateHearts(count: number): FloatingHeart[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 10,
    scale: 0.5 + Math.random(),
    duration: 12 + Math.random() * 10,
    size: 18 + Math.random() * 28,
  }));
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    setHearts(generateHearts(FLOATING_HEARTS_COUNT));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            y: "110vh",
            x: `${heart.x}vw`,
            opacity: 0,
            scale: heart.scale,
          }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.7, 0.7, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          className="absolute text-pink-300/30"
          style={{ fontSize: heart.size }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}