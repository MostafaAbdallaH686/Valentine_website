export const NO_BUTTON_MESSAGES = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart! 💔",
    "Don't be so cold! 🥶",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart 😢",
  ] as const;
  
  export const YES_BUTTON_MESSAGES = [
    "Yes",
    "Yes!",
    "Yes!! 💕",
    "YES! 💖",
    "YES!! 💝",
    "PLEASE! 🥺",
    "YESSS! 💗",
    "SAY YES! 🥹",
    "YES YES YES! 💖",
    "💖 YES 💖",
  ] as const;
  
  export const EVASIVE_BUTTON = {
    padding: 60,
    width: 280,
    height: 70,
    minJumpDistance: 100,
    maxAttempts: 20,
  } as const;
  
  export const CONFETTI_DURATION_MS = 3_500;
  export const CONFETTI_INTERVAL_MS = 250;
  export const FLOATING_HEARTS_COUNT = 18;
  export const YES_SCALE_INCREMENT = 0.12;
  export const YES_MAX_SCALE_STEPS = 10;
  export const NO_SHRINK_FACTOR = 0.04;
  export const NO_MIN_SCALE = 0.5;
  
  export const KISS_COUNT = 40;
  export const KISS_DISPLAY_DURATION_MS = 6_000;
  
  export const IMAGES = {
    proposal: "https://media.tenor.com/BMTXjT8Y-PoAAAAi/cute-bear.gif",
    celebration:
      "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif",
  } as const;