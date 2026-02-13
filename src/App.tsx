//App.tsx

import { useState } from "react";
import { FloatingHearts } from "@/components/FloatingHearts";
import { ProposalView } from "@/components/ProposalView";
import { CelebrationView } from "@/components/CelebrationView";
import { KissExplosion } from "@/components/KissExplosion";

export function App() {
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 p-4 text-center">
      <FloatingHearts />

      {/* Kiss overlay — renders ABOVE everything when accepted */}
      {isAccepted && <KissExplosion />}

      <div className="z-10 w-full max-w-md rounded-3xl bg-white/80 p-8 shadow-xl ring-4 ring-pink-100 backdrop-blur-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-pink-200/50">
        {isAccepted ? (
          <CelebrationView />
        ) : (
          <ProposalView onAccept={() => setIsAccepted(true)} />
        )}
      </div>

      <footer className="absolute bottom-4 text-sm font-medium text-pink-400/60">
        Made with ❤️ for mi Amor
      </footer>
    </div>
  );
}