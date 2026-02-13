//components/ProposalView.tsx

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useConfetti } from "@/hooks/useConfetti";
import { useEvasiveButton } from "@/hooks/useEvasiveButton";
import { IMAGES } from "@/constants";

interface ProposalViewProps {
  onAccept: () => void;
}

export function ProposalView({ onAccept }: ProposalViewProps) {
  const {
    position,
    evade,
    isEvading,
    noMessage,
    yesMessage,
    yesScale,
    noScale,
    hoverCount,
  } = useEvasiveButton();

  const { fire: fireConfetti } = useConfetti();

  const handleYes = () => {
    fireConfetti();
    onAccept();
  };

  const glowIntensity = Math.min(hoverCount, 10);
  const glowStyle = {
    boxShadow: `0 0 ${20 + glowIntensity * 4}px ${4 + glowIntensity * 2}px rgba(236, 72, 153, ${0.25 + glowIntensity * 0.04})`,
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-8"
      >
        {/* Bear image */}
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={IMAGES.proposal}
              alt="Cute bear asking to be your valentine"
              className="h-48 w-48 object-contain drop-shadow-md"
              loading="eager"
            />
          </motion.div>

          <motion.div
            className="absolute -right-4 -top-4 text-pink-500"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="h-8 w-8 fill-current" />
          </motion.div>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl font-bold text-pink-600 drop-shadow-sm md:text-5xl">
          Will you be my Valentine?
        </h1>

        {/* Buttons row */}
        <div className="flex w-full items-center justify-center gap-6">
          {/* Yes Button */}
          <motion.button
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.08 }}
            whileTap={{ scale: yesScale * 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            onClick={handleYes}
            className="group relative flex min-w-[120px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-4 text-xl font-bold text-white shadow-lg transition-colors hover:from-pink-600 hover:to-rose-600 focus:outline-none"
            style={glowStyle}
          >
            <span>{yesMessage}</span>
            <Heart className="h-5 w-5 fill-white transition-transform group-hover:scale-125" />
          </motion.button>

          {/* Placeholder */}
          <div className="h-14 w-40 shrink-0">
            {!isEvading && (
              <button
                onMouseEnter={evade}
                onFocus={evade}
                onClick={evade}
                className="h-full w-full cursor-pointer rounded-full bg-slate-200 text-lg font-bold text-slate-600 shadow-md transition-colors hover:bg-slate-300 focus:outline-none"
              >
                {noMessage}
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Evading No button — SLOW tween instead of spring */}
      {isEvading && (
        <motion.button
          onMouseEnter={evade}
          onFocus={evade}
          onClick={evade}
          initial={{ left: position.x, top: position.y }}
          animate={{
            left: position.x,
            top: position.y,
            scale: noScale,
          }}
          transition={{
            type: "tween",
            duration: 0.6,
            ease: "easeOut",
          }}
          className="fixed z-50 cursor-pointer whitespace-nowrap rounded-full bg-slate-200 px-8 py-4 text-lg font-bold text-slate-600 shadow-lg transition-colors hover:bg-slate-300 focus:outline-none"
        >
          {noMessage}
        </motion.button>
      )}
    </>
  );
}