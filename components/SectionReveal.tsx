"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

/* ── Animation variant definitions ───────────────────────────────── */
const VARIANTS: Record<string, Variants> = {
  slideUp: {
    hidden:  { opacity: 0, y: 72 },
    visible: { opacity: 1, y: 0  },
  },
  slideLeft: {
    hidden:  { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0  },
  },
  slideRight: {
    hidden:  { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0  },
  },
  zoomIn: {
    hidden:  { opacity: 0, scale: 0.88, y: 32 },
    visible: { opacity: 1, scale: 1,    y: 0  },
  },
  fadeUp: {
    hidden:  { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0  },
  },
};

/* ── Easing curves ────────────────────────────────────────────────── */
// Expo-out — snappy entrance, no overshoot
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
// Back-out — slight "spring-back" feel
const BACK_OUT = [0.34, 1.56, 0.64, 1] as const;

interface SectionRevealProps {
  children:  ReactNode;
  /** Which entrance style to use */
  variant?:  keyof typeof VARIANTS;
  /** Seconds */
  duration?: number;
  /** Seconds — stagger between sibling reveals */
  delay?:    number;
  /** Extra className on the wrapper div */
  className?: string;
  /** Whether to use the spring-back easing (default: expo-out) */
  springy?: boolean;
}

export default function SectionReveal({
  children,
  variant   = "slideUp",
  duration  = 0.75,
  delay     = 0,
  className,
  springy   = false,
}: SectionRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.07 }}
      variants={VARIANTS[variant]}
      transition={{
        duration,
        delay,
        ease: springy ? BACK_OUT : EXPO_OUT,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
