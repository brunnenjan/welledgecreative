// src/components/HeroWhiteTransition.tsx
"use client";

export default function HeroWhiteTransition() {
  return (
    <div
      className="hidden lg:block"
      style={{
        height: "100vh",
        backgroundColor: "#ffffff",
        width: "100%",
      }}
      aria-hidden
    />
  );
}
