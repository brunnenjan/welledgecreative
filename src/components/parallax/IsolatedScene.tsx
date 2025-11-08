"use client";

import React from "react";

type Props = { heightVh?: number; className?: string; children: React.ReactNode; };

export default function IsolatedScene({ heightVh = 120, className = "", children }: Props) {
  return (
    <section
      className={`relative w-full overflow-hidden scene-contain ${className}`}
      style={{ height: `${heightVh}vh` }}
    >
      {children}
    </section>
  );
}
