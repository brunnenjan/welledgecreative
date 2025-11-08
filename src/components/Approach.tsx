// src/components/Approach.tsx
"use client";

import { motion } from "framer-motion";
import ApproachStep from "./ApproachStep";

const steps = [
  {
    number: 1,
    title: "Discover",
    subtitle: "Strategy",
    description:
      "Understand the project's foundation: goals, audience, and constraints. This is where I dive deep — asking the right questions to shape purpose and direction.",
  },
  {
    number: 2,
    title: "Define",
    subtitle: "Story",
    description:
      "Translate discovery into narrative. I clarify positioning, craft the message, and outline the content flow so your brand's story feels coherent and intentional.",
  },
  {
    number: 3,
    title: "Design",
    subtitle: "System",
    description:
      "Transform narrative into visuals and interaction. I design a scalable design system — modular, consistent, and expressive — that ties identity to experience.",
  },
  {
    number: 4,
    title: "Deliver",
    subtitle: "Site",
    description:
      "Bring everything to life. From building and testing to documentation and handover, every detail is considered to ensure a lasting, performant experience.",
  },
];

export default function Approach() {
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const headerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

  return (
    <section
      id="approach"
      className="relative z-[60] bg-background text-foreground scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        {/* Header */}
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-accent mb-6">
            My Approach — From Depth to Clarity
          </h2>
          <p className="mt-2 max-w-2xl text-foreground/70 text-lg md:text-xl leading-relaxed">
            The &ldquo;well &amp; bucket&rdquo; metaphor guides how I work —
            drawing clarity from depth, then crafting structure and meaning from
            it.
          </p>
        </motion.header>

        {/* Steps Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <ApproachStep
              key={step.number}
              number={step.number}
              title={step.title}
              subtitle={step.subtitle}
              description={step.description}
              delay={prefersReducedMotion ? 0 : index * 0.1}
            />
          ))}
        </div>

        {/* Optional subtle decorative element */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
          style={{ transformOrigin: "center" }}
        />
      </div>
    </section>
  );
}
