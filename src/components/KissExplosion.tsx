//components/KissExplosion.tsx

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { KISS_COUNT, KISS_DISPLAY_DURATION_MS } from "@/constants";

interface KissParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  rotation: number;
}

function generateKisses(count: number): KissParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 24 + Math.random() * 40,
    delay: Math.random() * 1.5,
    rotation: -30 + Math.random() * 60,
  }));
}

const kissVariants: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
    rotate: 0,
  },
  visible: (particle: KissParticle) => ({
    scale: [0, 1.3, 1],
    opacity: [0, 1, 1, 0.8],
    rotate: particle.rotation,
    transition: {
      delay: particle.delay,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
  exit: {
    scale: 0,
    opacity: 0,
    transition: { duration: 1.2, ease: "easeIn" },
  },
};

export function KissExplosion() {
  const [kisses, setKisses] = useState<KissParticle[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setKisses(generateKisses(KISS_COUNT));

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, KISS_DISPLAY_DURATION_MS);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {kisses.map((kiss) => (
        <motion.div
          key={kiss.id}
          custom={kiss}
          variants={kissVariants}
          initial="hidden"
          animate="visible"
          className="absolute"
          style={{
            left: `${kiss.x}%`,
            top: `${kiss.y}%`,
            fontSize: kiss.size,
          }}
        >
          💋
        </motion.div>
      ))}

      {/* Pulsing large center kiss */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.5, 1.2, 1.5, 1.2],
          opacity: [0, 1, 0.9, 1, 0.8],
        }}
        transition={{
          delay: 0.3,
          duration: 3,
          ease: "easeInOut",
        }}
        style={{ fontSize: 80 }}
      >
        💋
      </motion.div>
    </motion.div>
  );
}