"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const previousPathnameRef = useRef(pathname);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log('[PageTransition] Effect triggered:', {
      pathname,
      previous: previousPathnameRef.current,
      visible
    });

    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }

    // Only show transition if pathname actually changed
    if (pathname !== previousPathnameRef.current) {
      console.log('[PageTransition] Pathname changed - showing overlay');
      setVisible(true);
      previousPathnameRef.current = pathname;

      // Hide after animation duration
      timeoutRef.current = setTimeout(() => {
        console.log('[PageTransition] Normal hide timeout fired');
        setVisible(false);
        timeoutRef.current = null;
      }, 300);

      // Safety timeout - force hide after max duration
      safetyTimeoutRef.current = setTimeout(() => {
        console.log('[PageTransition] SAFETY timeout fired - force hiding');
        setVisible(false);
        safetyTimeoutRef.current = null;
      }, 1000);
    } else {
      console.log('[PageTransition] Pathname unchanged - ensuring hidden');
      setVisible(false);
    }

    return () => {
      console.log('[PageTransition] Cleanup');
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (safetyTimeoutRef.current) {
        clearTimeout(safetyTimeoutRef.current);
        safetyTimeoutRef.current = null;
      }
    };
  }, [pathname]);

  console.log('[PageTransition] Render - visible:', visible);

  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#ffffff',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'all',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          border: '4px solid #f0f0f0',
          borderTop: '4px solid #f58222',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
