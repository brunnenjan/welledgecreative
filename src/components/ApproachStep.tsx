// src/components/ApproachStep.tsx
"use client";

import { motion } from "framer-motion";

interface ApproachStepProps {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  delay?: number;
}

export default function ApproachStep({
  number,
  title,
  subtitle,
  description,
  delay = 0,
}: ApproachStepProps) {
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
    },
  },
};

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      className="group relative rounded-2xl border border-foreground/20 bg-white p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-lg"
    >
      {/* Step Number */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-xl font-bold text-accent transition-colors group-hover:bg-accent/20">
          {number}
        </div>
        <div className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
          {subtitle}
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-3 text-xl font-bold text-foreground">{title}</h3>

      {/* Description */}
      <p className="leading-relaxed text-foreground/70">{description}</p>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </motion.div>
  );
}
