"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function PageTransition() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [previousPathname, setPreviousPathname] = useState(pathname);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 350);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Only show transition if pathname actually changed
    if (pathname !== previousPathname) {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), 600);
      setPreviousPathname(pathname);
      return () => clearTimeout(timeout);
    }
  }, [pathname, previousPathname]);

  if (!visible) return null;

  return (
    <div
      className={`page-transition-overlay${visible ? " is-active" : ""}`}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--color-white)',
        zIndex: 'var(--z-preloader)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: visible ? 'all' : 'none',
      }}
    >
      <div
        style={{
          width: 'clamp(80px, 12vw, 100px)',
          height: 'clamp(80px, 12vw, 100px)',
          position: 'relative',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      >
        <Image
          src="/assets/logo/Icon-logo-well-edge-creative.svg"
          alt="Loading"
          fill
          priority
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}
