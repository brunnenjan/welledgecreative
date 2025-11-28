"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function PageTransition() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [previousPathname, setPreviousPathname] = useState(pathname);

  useEffect(() => {
    console.log('[PageTransition] Pathname changed:', { pathname, previousPathname, visible });

    // Only show transition if pathname actually changed
    if (pathname !== previousPathname) {
      console.log('[PageTransition] Showing transition overlay');
      setVisible(true);
      setPreviousPathname(pathname);

      // Hide after a short delay
      const timeout = setTimeout(() => {
        console.log('[PageTransition] Hiding transition overlay');
        setVisible(false);
      }, 400);

      return () => {
        console.log('[PageTransition] Cleanup timeout');
        clearTimeout(timeout);
      };
    }
  }, [pathname, previousPathname]);

  if (!visible) {
    console.log('[PageTransition] Not visible, returning null');
    return null;
  }

  console.log('[PageTransition] Rendering overlay');
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
