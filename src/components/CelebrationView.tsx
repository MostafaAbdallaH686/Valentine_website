//components/CelebrationView.tsx

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Stars } from "lucide-react";
import { IMAGES } from "@/constants";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", bounce: 0.4 },
  },
};

export function CelebrationView() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-6"
    >
      <motion.div variants={itemVariants} className="relative">
        <img
          src={IMAGES.celebration}
          alt="Happy bears kissing"
          className="h-64 w-64 rounded-full object-contain"
          loading="eager"
        />
        <Stars className="absolute -right-6 -top-6 h-10 w-10 animate-pulse text-yellow-400" />
        <Stars className="absolute -left-6 bottom-6 h-10 w-10 animate-pulse text-yellow-400" />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-3">
        <h1 className="font-display text-5xl font-bold text-pink-600 drop-shadow-sm md:text-6xl">
          Yay!!! 💖
        </h1>
        <p className="text-xl font-medium text-pink-400 md:text-2xl">
          I knew you'd say yes!
        </p>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="mt-2 max-w-xs text-base text-pink-300"
      >
        You just made me the happiest person in the world 🥰
      </motion.p>
    </motion.div>
  );
}